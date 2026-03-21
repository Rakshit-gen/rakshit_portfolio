"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What's Rakshit's experience?",
  "Tell me about NervaAI",
  "Open source contributions?",
  "What makes Rakshit stand out?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMac(navigator.platform?.toLowerCase().includes("mac") || navigator.userAgent?.toLowerCase().includes("mac"));
  }, []);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamingContent]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) throw new Error("Failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullContent += decoder.decode(value, { stream: true });
          setStreamingContent(fullContent);
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: fullContent }]);
      setStreamingContent("");
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Reach out at sisodiarakshit456@gmail.com" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* FAB - visible on all screens */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium text-sm rounded-full shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/40 hover:scale-105 active:scale-95 transition-all"
        aria-label="Ask AI"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      {/* Modal / Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Desktop: centered modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50
                bottom-0 inset-x-0 md:bottom-auto md:inset-x-auto
                md:top-[12vh] md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl"
            >
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] md:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl max-h-[85vh] md:max-h-[70vh] flex flex-col">
                {/* Drag handle (mobile) */}
                <div className="md:hidden flex justify-center pt-2 pb-1">
                  <div className="w-10 h-1 rounded-full bg-[var(--color-text-dimmer)]/30" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    <span className="text-sm font-mono text-[var(--color-text-dim)]">ask.rakshit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="hidden md:inline text-[10px] font-mono text-[var(--color-text-dimmer)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                      ESC
                    </kbd>
                    <button onClick={() => setOpen(false)} className="text-[var(--color-text-dimmer)] hover:text-white p-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[200px]">
                  {messages.length === 0 && !loading && (
                    <div className="space-y-3">
                      <p className="text-sm text-[var(--color-text-dim)]">
                        Ask anything about Rakshit&apos;s work, skills, or experience.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="text-xs px-3 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors active:scale-95"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={msg.role === "user" ? "flex justify-end" : ""}>
                      <div
                        className={
                          msg.role === "user"
                            ? "bg-[var(--color-accent)] text-[var(--color-bg)] px-4 py-2 rounded-2xl rounded-br-md text-sm max-w-[85%]"
                            : "text-sm text-[var(--color-text)] leading-relaxed max-w-[90%]"
                        }
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {streamingContent && (
                    <div className="text-sm text-[var(--color-text)] leading-relaxed max-w-[90%]">
                      {streamingContent}
                      <span className="inline-block w-1.5 h-4 bg-[var(--color-accent)] animate-pulse ml-0.5 align-middle" />
                    </div>
                  )}

                  {loading && !streamingContent && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                            style={{ animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[var(--color-text-dimmer)] font-mono">thinking...</span>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="border-t border-[var(--color-border)] px-4 py-3 safe-bottom">
                  <div className="flex items-center gap-3 bg-[var(--color-bg)] rounded-xl px-4 py-2 border border-[var(--color-border)]">
                    <span className="text-[var(--color-accent)] font-mono text-sm shrink-0">&gt;</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Rakshit..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-[var(--color-text-dimmer)] focus:outline-none min-w-0"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] disabled:opacity-30 transition-opacity active:scale-90"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-dimmer)] text-center mt-2 font-mono">
                    {isMac ? "⌘K" : "Ctrl+K"} to toggle · Powered by AI
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
