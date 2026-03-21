import dynamic from "next/dynamic";
import type { Metadata } from "next";

const ProjectsGrid = dynamic(() => import("@/components/projects/projects-grid").then((m) => m.ProjectsGrid));
const CaseStudies = dynamic(() => import("@/components/projects/case-studies").then((m) => m.CaseStudies));

export const metadata: Metadata = {
  title: "Work | Rakshit Sisodiya",
  description: "Projects and case studies — distributed systems, AI pipelines, and production backends.",
};

export default function WorkPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// projects</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Work</h1>
          <p className="text-[var(--color-text-dim)] max-w-xl">
            Systems I&apos;ve designed and built — from distributed API gateways to multi-agent AI pipelines.
          </p>
        </div>
        <ProjectsGrid />
        <CaseStudies />
      </div>
    </div>
  );
}
