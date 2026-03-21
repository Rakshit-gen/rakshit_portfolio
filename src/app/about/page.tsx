import dynamic from "next/dynamic";
import type { Metadata } from "next";

const ExperienceTimeline = dynamic(() => import("@/components/experience/experience-timeline").then((m) => m.ExperienceTimeline));
const SkillsOrbit = dynamic(() => import("@/components/skills/skills-orbit").then((m) => m.SkillsOrbit));
const OpenSource = dynamic(() => import("@/components/opensource/opensource").then((m) => m.OpenSource));
const CompetitiveProgramming = dynamic(() => import("@/components/about/competitive-programming").then((m) => m.CompetitiveProgramming));

export const metadata: Metadata = {
  title: "About | Rakshit Sisodiya",
  description: "Background, experience, skills, and open source contributions.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// about</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <div className="max-w-2xl space-y-4 text-[var(--color-text-dim)] leading-relaxed">
            <p>
              I&apos;m a Full Stack Developer & AI Engineer based in India, currently building
              LLM inference APIs at <span className="text-white font-medium">HSV Digital</span>.
              I graduated from <span className="text-white font-medium">NIT Hamirpur</span>.
            </p>
            <p>
              I specialize in distributed systems, AI pipelines, and high-performance backends.
              My work spans from building real-time collaboration engines with Go and WebSockets
              to designing multi-agent AI systems with LangChain and custom orchestration layers.
            </p>
            <p>
              Outside of work, I contribute to open source — including{" "}
              <span className="text-white font-medium">Microsoft&apos;s DeepSpeed</span> — and compete
              in algorithmic programming (LeetCode Top 6.5%, CodeChef Top 1%).
            </p>
          </div>
        </div>

        <ExperienceTimeline />
        <SkillsOrbit />
        <CompetitiveProgramming />
        <OpenSource />
      </div>
    </div>
  );
}
