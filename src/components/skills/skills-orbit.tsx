"use client";

import { motion } from "framer-motion";
import { skillCategories, systemsSkills } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ringColors = {
  core: "var(--color-accent)",
  framework: "var(--color-accent-warm)",
  infrastructure: "var(--color-success)",
};

const ringLabels = {
  core: "Core",
  framework: "Frameworks",
  infrastructure: "Infrastructure",
};

export function SkillsOrbit() {
  return (
    <section className="mb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// skills</p>
          <h2 className="text-3xl font-bold">Tech Stack</h2>
        </motion.div>

        {/* Skill rings */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.ring}
              variants={fadeInUp}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ringColors[cat.ring] }}
                />
                <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">
                  {ringLabels[cat.ring]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:border-[color:var(--tw-ring-color)] transition-colors cursor-default"
                    style={{ ["--tw-ring-color" as string]: ringColors[cat.ring] }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = ringColors[cat.ring];
                      (e.target as HTMLElement).style.color = ringColors[cat.ring];
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = "";
                      (e.target as HTMLElement).style.color = "";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Systems & Architecture */}
        <motion.div
          variants={fadeInUp}
          className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-xs font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">
              Systems & Architecture
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {systemsSkills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:border-purple-400 hover:text-purple-400 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
