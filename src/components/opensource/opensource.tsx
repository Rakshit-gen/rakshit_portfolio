"use client";

import { motion } from "framer-motion";
import { openSourceContributions } from "@/data/achievements";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function OpenSource() {
  return (
    <section>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// open source</p>
          <h2 className="text-3xl font-bold">Contributions</h2>
          <p className="text-sm text-[var(--color-text-dim)] mt-2">
            Merged PRs in production open source projects
          </p>
        </motion.div>

        <div className="space-y-6">
          {openSourceContributions.map((contrib) => (
            <motion.div
              key={contrib.repo}
              variants={fadeInUp}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-dim)" strokeWidth="1.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-white">{contrib.repo}</h3>
                    <p className="text-xs text-[var(--color-text-dimmer)]">{contrib.org}</p>
                  </div>
                </div>
                <a
                  href={contrib.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-accent)] hover:underline"
                >
                  View repo &rarr;
                </a>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {contrib.prs.map((pr) => (
                  <div key={pr.number} className="px-6 py-3 flex items-start gap-4 hover:bg-[var(--color-bg-card-hover)] transition-colors">
                    <div className="shrink-0 mt-0.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M7 13l3 3 7-7" />
                        </svg>
                        merged
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <a
                        href={`${contrib.repoUrl}/pull/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:text-[var(--color-accent)] transition-colors"
                      >
                        {pr.title}
                        <span className="text-[var(--color-text-dimmer)] ml-2">#{pr.number}</span>
                      </a>
                      <p className="text-xs text-[var(--color-text-dimmer)] mt-0.5">{pr.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
