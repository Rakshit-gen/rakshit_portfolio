"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Chinmay Joshi",
    role: "Engineering Manager at Google",
    company: "Ex-Postman, Amazon",
    text: "I was Rakshit's manager during his 6 month internship period at Wayground. Rakshit is a diligent, hardworking and sharp coder and has a good grasp of backend as well as frontend. He is a quick learner and is already as good as someone with a couple of years of work experience. Any team would be lucky to have him.",
  },
  {
    name: "Rahul Kocheta",
    role: "Software Engineer (IC-2) at ServiceNow",
    company: "IIT (BHU) Varanasi",
    text: "You're truly a hardworking and a passionate developer. You've been doing awesome on the self-learning projects that you've showcased me along the time. Your discipline and dedication to your goals will take you places. Best of Luck, keep hustling and the correct opportunity will soon arrive for you in no time!",
  },
  {
    name: "Open Source Community",
    role: "DeepSpeed Maintainers",
    company: "Microsoft Research",
    text: "Rakshit's PRs consistently addressed real production issues — deadlocks, NaN propagation, checkpoint crashes. Clean fixes with minimal surface area. The kind of contributor you want in your repo.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-20">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// what people say (when I&apos;m not around)</p>
          <h2 className="text-3xl font-bold">Kind Words</h2>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-8">
            {/* Quote mark */}
            <div className="absolute top-4 right-6 text-6xl font-serif text-[var(--color-accent)]/10 select-none leading-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--color-text-dim)] leading-relaxed text-base mb-6 max-w-2xl">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-medium text-sm">{testimonials[active].name}</p>
                  <p className="text-xs font-mono text-[var(--color-text-dimmer)]">
                    {testimonials[active].role} · {testimonials[active].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-dimmer)]"
                  }`}
                />
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-8 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                  className="w-8 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-sm"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
