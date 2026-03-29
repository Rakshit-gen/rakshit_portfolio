"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const socials = [
  { name: "GitHub", url: "https://github.com/Rakshit-gen", handle: "@Rakshit-gen", icon: "gh" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rakshit-sisodiya", handle: "rakshit-sisodiya", icon: "li" },
  { name: "Twitter", url: "https://x.com/rakshit_sisodia", handle: "@rakshit_sisodia", icon: "tw" },
  { name: "Instagram", url: "https://www.instagram.com/sky_andflowers_/", handle: "@sky_andflowers_", icon: "ig" },
];

const commands: Record<string, { output: string[]; action?: () => void }> = {
  help: {
    output: [
      "Commands:",
      "",
      "whois rakshit — about me",
      "ls projects   — my work",
      "cat resume    — open resume",
      "ping          — am I alive?",
      "mail <msg>    — email me",
      "clear         — clean up",
      "help          — this list",
    ],
  },
  "whois rakshit": {
    output: [
      "Backend Engineer @ HSV Digital. NIT Hamirpur grad.",
      "GATE 2026 qualified. Writes Go and TypeScript.",
      "5 PRs merged at Microsoft DeepSpeed.",
      "LeetCode 1828 · CodeChef 5★ (Top 1%).",
      "Mass consumer of chai and Stack Overflow answers.",
      "Probably debugging something right now.",
    ],
  },
  "ls projects": {
    output: [
      "NervaAI    — AI podcast generator",
      "OpenSkill  — Claude skill manager CLI",
      "VentaEdge  — API gateway in Go",
      "SyncLayer  — Real-time collab board",
      "SentralQ   — AI API debugger",
      "",
      "→ /work for the full list",
    ],
  },
  "cat resume": {
    output: ["Opening resume..."],
    action: () => window.open("https://drive.google.com/drive/folders/1aClhIvgOrajbDFBAmhJVDRn81wz74JNI", "_blank"),
  },
  ping: {
    output: ["pong. I'm alive. Probably caffeinated."],
  },
};

const quickCmds = [
  { label: "help", cmd: "help" },
  { label: "whois", cmd: "whois rakshit" },
  { label: "projects", cmd: "ls projects" },
  { label: "resume", cmd: "cat resume" },
  { label: "ping", cmd: "ping" },
];

function MagneticCard({ children, className, href, target, rel }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const Tag = href ? "a" : "div";
  const linkProps = href ? { href, target, rel } : {};

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={reset}>
      <Tag {...linkProps} className={className}>{children}</Tag>
    </motion.div>
  );
}

function TerminalContact() {
  const [lines, setLines] = useState<{ type: "system" | "user" | "response"; text: string }[]>([
    { type: "system", text: "rakshit@portfolio:~$ contact --interactive" },
    { type: "response", text: "Welcome. Type 'help' to see what you can do here." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim().toLowerCase();

    // Echo the user input
    const newLines: { type: "system" | "user" | "response"; text: string }[] = [
      { type: "user", text: raw.trim() },
    ];

    if (trimmed === "clear") {
      setLines([
        { type: "system", text: "rakshit@portfolio:~$ contact --interactive" },
        { type: "response", text: "Cleared. Type 'help' if you're lost." },
      ]);
      return;
    }

    if (trimmed.startsWith("mail ")) {
      const message = raw.trim().slice(5);
      if (!message) {
        newLines.push({ type: "response", text: "Usage: mail <your message>" });
      } else {
        const mailtoUrl = `mailto:sisodiarakshit456@gmail.com?subject=${encodeURIComponent("Portfolio Contact")}&body=${encodeURIComponent(message)}`;
        window.open(mailtoUrl, "_blank");
        newLines.push({ type: "response", text: "Email client opened. Go hit send!" });
      }
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    const cmd = commands[trimmed];
    if (cmd) {
      cmd.output.forEach((line) => {
        newLines.push({ type: "response", text: line });
      });
      if (cmd.action) {
        setTimeout(cmd.action, 300);
      }
    } else {
      newLines.push({ type: "response", text: `zsh: command not found: ${trimmed}` });
      newLines.push({ type: "response", text: "Type 'help' to see available commands." });
    }

    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setHistory((prev) => [input.trim(), ...prev]);
    setHistoryIndex(-1);
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      const allCmds = [...Object.keys(commands), "mail", "clear"];
      const match = allCmds.find((c) => c.startsWith(partial));
      if (match) setInput(match);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] md:text-xs font-mono text-[var(--color-text-dimmer)] ml-2 truncate">contact@rakshit ~ zsh</span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="p-3 md:p-4 font-mono text-xs md:text-sm max-h-[220px] md:max-h-[300px] overflow-y-auto space-y-1 cursor-text overflow-x-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={`${i}-${line.text.slice(0, 20)}`}
            className={`break-words animate-[fadeSlideIn_0.15s_ease-out] ${
              line.type === "user"
                ? "text-[var(--color-accent)]"
                : line.type === "response"
                ? "text-[var(--color-text-dim)]"
                : "text-[var(--color-text-dimmer)]"
            }`}
          >
            {line.type === "user" && <span className="text-[var(--color-accent-warm)]">$ </span>}
            {line.type === "response" && <span className="text-[var(--color-success)]">  </span>}
            {line.text}
          </div>
        ))}
      </div>

      {/* Quick command buttons */}
      <div className="px-3 pb-3 md:px-4">
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
          {quickCmds.map((qc) => (
            <button
              key={qc.cmd}
              onClick={() => {
                processCommand(qc.cmd);
                setHistory((prev) => [qc.cmd, ...prev]);
              }}
              className="text-[10px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-all duration-200 font-mono"
            >
              {qc.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 focus-within:border-[var(--color-accent)]/50 transition-colors">
          <span className="text-[var(--color-accent)] text-xs md:text-sm font-mono">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            className="flex-1 bg-transparent text-xs md:text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dimmer)] outline-none font-mono min-w-0"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="text-[10px] md:text-xs font-mono px-2.5 py-1 md:px-3 rounded bg-[var(--color-accent)] text-[var(--color-bg)] disabled:opacity-30 hover:opacity-90 transition-opacity shrink-0"
          >
            run
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const background = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, var(--color-accent) 0%, transparent 60%)`
  );

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -12);
    rotateY.set((x - 0.5) * 12);
    glowX.set(x * 100);
    glowY.set(y * 100);
  }, [rotateX, rotateY, glowX, glowY]);

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-[0.06] transition-opacity pointer-events-none"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = "sisodiarakshit456@gmail.com";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 w-full text-left"
    >
      <div className="flex-1">
        <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Email</span>
        <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1">
          {email}
        </p>
      </div>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-[var(--color-success)] text-sm font-mono"
          >
            ✓ copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-xs font-mono text-[var(--color-text-dimmer)] group-hover:text-[var(--color-accent)] transition-colors px-2 py-1 border border-[var(--color-border)] rounded group-hover:border-[var(--color-accent)]/30"
          >
            copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ContactSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// contact</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Let&apos;s Build Something
          <span className="text-gradient"> Together</span>
        </h1>
        <p className="text-[var(--color-text-dim)] max-w-xl text-base sm:text-lg">
          Open to opportunities and collaboration. Whether it&apos;s a distributed system,
          an API gateway, or something entirely new — let&apos;s talk.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Terminal — takes more space */}
        <div className="lg:col-span-3">
          <TerminalContact />
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Direct contact */}
          <TiltCard className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-5">Direct</h2>
            <div className="space-y-5">
              <CopyEmail />
              <a href="https://calendly.com/sisodiarakshit456/new-meeting" target="_blank" rel="noopener noreferrer" className="block group">
                <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Schedule a call</span>
                <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1 flex items-center gap-2">
                  Book on Calendly
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    →
                  </motion.span>
                </p>
              </a>
              <a href="https://drive.google.com/drive/folders/1aClhIvgOrajbDFBAmhJVDRn81wz74JNI" target="_blank" rel="noopener noreferrer" className="block group">
                <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Resume</span>
                <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1 flex items-center gap-2">
                  View Resume
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    →
                  </motion.span>
                </p>
              </a>
            </div>
            <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                <span className="text-sm text-[var(--color-text-dim)]">Open to opportunities</span>
              </div>
            </div>
          </TiltCard>

          {/* Socials */}
          <div className="grid grid-cols-2 gap-3">
            {socials.map((social, i) => (
              <MagneticCard
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--color-accent)]/30 transition-all group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <p className="text-sm font-medium text-white group-hover:text-[var(--color-accent)] transition-colors">{social.name}</p>
                  <p className="text-[10px] font-mono text-[var(--color-text-dimmer)] mt-0.5">{social.handle}</p>
                </motion.div>
              </MagneticCard>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[var(--color-border)] text-center">
        <p className="text-xs font-mono text-[var(--color-text-dimmer)]">
          Built with Next.js, TypeScript, Tailwind CSS, Framer Motion
        </p>
        <p className="text-xs text-[var(--color-text-dimmer)] mt-1">
          &copy; {new Date().getFullYear()} Rakshit Sisodiya
        </p>
      </div>
    </div>
  );
}
