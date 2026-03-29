import dynamic from "next/dynamic";
import Image from "next/image";
import type { Metadata } from "next";

const Education = dynamic(() => import("@/components/about/education").then((m) => m.Education));
const SkillsOrbit = dynamic(() => import("@/components/skills/skills-orbit").then((m) => m.SkillsOrbit));
const OpenSource = dynamic(() => import("@/components/opensource/opensource").then((m) => m.OpenSource));
const CompetitiveProgramming = dynamic(() => import("@/components/about/competitive-programming").then((m) => m.CompetitiveProgramming));
const Testimonials = dynamic(() => import("@/components/about/testimonials").then((m) => m.Testimonials));

export const metadata: Metadata = {
  title: "About | Rakshit Sisodiya",
  description: "Background, experience, skills, and open source contributions.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row gap-10 items-start">
          <div className="relative shrink-0 w-fit">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-warm)] to-[var(--color-accent)] opacity-40 blur-[4px]" />
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-[var(--color-bg)]">
              <Image src="/picofme.png" alt="Rakshit Sisodiya" fill className="object-cover" priority />
            </div>
          </div>
          <div>
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// about</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <div className="max-w-2xl space-y-4 text-[var(--color-text-dim)] leading-relaxed">
            <p>
              I&apos;m a Backend Engineer based in India, currently building
              scalable systems at <span className="text-white font-medium">HSV Digital</span>.
              I graduated from <span className="text-white font-medium">NIT Hamirpur</span> and
              cleared <span className="text-white font-medium">GATE 2026</span> in Computer Science.
            </p>
            <p>
              I specialize in distributed systems and high-performance backends.
              My work spans from engineering Go/Python microservices handling millions of daily requests
              to building multi-tenant platforms with complex authorization systems.
            </p>
            <p>
              Outside of work, I contribute to open source — including{" "}
              <span className="text-white font-medium">Microsoft&apos;s DeepSpeed</span> — and compete
              in algorithmic programming (LeetCode Top 6.5%, CodeChef Top 1%).
            </p>
          </div>
          </div>
        </div>

        <Education />
        <SkillsOrbit />
        <CompetitiveProgramming />
        <OpenSource />
        <Testimonials />
      </div>
    </div>
  );
}
