"use client";

import { motion } from "framer-motion";
import { competitiveProgramming } from "@/data/achievements";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CompetitiveProgramming() {
  return (
    <section className="mb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// competitive programming</p>
          <h2 className="text-3xl font-bold">Rankings</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {competitiveProgramming.map((cp) => (
            <motion.div
              key={cp.platform}
              variants={fadeInUp}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent)]/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">{cp.platform}</h3>
                <span className="text-2xl font-bold font-mono text-[var(--color-accent)]">{cp.rating}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-accent-warm)]">{cp.highlight}</span>
                <span className="text-xs font-mono text-[var(--color-text-dimmer)]">{cp.detail}</span>
              </div>

              {/* Progress bar visual */}
              <div className="mt-4 h-1 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: cp.platform === "CodeChef" ? "99%" : "93.5%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] font-mono text-[var(--color-text-dimmer)] mt-1 text-right">
                {cp.platform === "CodeChef" ? "Top 1%" : "Top 6.5%"} percentile
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
