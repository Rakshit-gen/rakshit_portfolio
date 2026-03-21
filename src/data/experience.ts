export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    company: "HSV Digital",
    role: "AI Backend Engineer",
    period: "Dec 2025 — Present",
    location: "Gurugram, Haryana",
    description:
      "Built scalable LLM inference APIs powering an AI-driven interview platform used by 500+ recruiters. Migrated legacy evaluation system to a rubric-first approach, improving assessment consistency by 40%.",
    skills: ["Nest.js", "Python", "AWS", "ElevenLabs", "CI/CD"],
    current: true,
  },
  {
    company: "Wayground",
    role: "Software Engineer",
    period: "Aug 2024 — Nov 2024",
    location: "Bengaluru, Karnataka",
    description:
      "Built scalable backends, optimized APIs, and contributed to frontend features. Streamlined deployments with cloud and CI/CD.",
    skills: ["Go", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    company: "Mood Analytica",
    role: "Software Development Intern",
    period: "May 2024 — Jul 2024",
    location: "Remote",
    description:
      "Developed data-driven features, optimized backends, and built APIs to support analytics workflows.",
    skills: ["Python", "FastAPI", "React", "PostgreSQL"],
  },
];
