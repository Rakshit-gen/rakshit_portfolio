"use client";

const socials = [
  { name: "GitHub", url: "https://github.com/Rakshit-gen", handle: "@Rakshit-gen" },
  { name: "LinkedIn", url: "https://linkedin.com/in/rakshit-sisodiya", handle: "rakshit-sisodiya" },
  { name: "Twitter", url: "https://x.com/rakshit_sisodia", handle: "@rakshit_sisodia" },
  { name: "Instagram", url: "https://www.instagram.com/sky_andflowers_/", handle: "@sky_andflowers_" },
];

export function ContactSection() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-16">
        <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// contact</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Let&apos;s Build Something
          <span className="text-gradient"> Together</span>
        </h1>
        <p className="text-[var(--color-text-dim)] max-w-xl text-lg">
          Open to opportunities and collaboration. Whether it&apos;s a distributed system,
          an AI pipeline, or something entirely new — let&apos;s talk.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8 h-full">
          <h2 className="text-lg font-semibold mb-6">Direct</h2>
          <div className="space-y-6">
            <a href="mailto:sisodiarakshit456@gmail.com" className="block group">
              <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Email</span>
              <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1">
                sisodiarakshit456@gmail.com
              </p>
            </a>
            <a href="https://calendly.com/sisodiarakshit456/new-meeting" target="_blank" rel="noopener noreferrer" className="block group">
              <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Schedule a call</span>
              <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1">
                Book on Calendly &rarr;
              </p>
            </a>
            <a href="https://drive.google.com/drive/folders/1aClhIvgOrajbDFBAmhJVDRn81wz74JNI" target="_blank" rel="noopener noreferrer" className="block group">
              <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Resume</span>
              <p className="text-white group-hover:text-[var(--color-accent)] transition-colors mt-1">
                View Resume &rarr;
              </p>
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-sm text-[var(--color-text-dim)]">Open to opportunities</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8 h-full">
          <h2 className="text-lg font-semibold mb-6">Elsewhere</h2>
          <div className="space-y-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-white">{social.name}</p>
                  <p className="text-xs font-mono text-[var(--color-text-dimmer)]">{social.handle}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-[var(--color-text-dimmer)] group-hover:text-[var(--color-accent)] transition-colors">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">Location</span>
            <p className="text-sm text-[var(--color-text-dim)] mt-1">Gurgaon, Haryana, India</p>
          </div>
        </div>
      </div>

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
