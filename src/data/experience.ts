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
    role: "Backend Engineer",
    period: "Dec 2025 — Present",
    location: "Remote",
    description:
      "Built a multi-tenant Rubrics System end-to-end with tenant-isolated access control. Reduced NestJS API cold-start from ~45s to ~3s (93%). Implemented multi-level manager hierarchy and role system. Shipped 6+ analytics BFF endpoints replacing ad-hoc frontend data transformations.",
    skills: ["TypeScript", "Node.js", "NestJS", "AWS", "PostgreSQL", "Redis"],
    current: true,
  },
  {
    company: "Quizizz (Wayground)",
    role: "Software Engineer",
    period: "Jan 2025 — Oct 2025",
    location: "Bengaluru, Karnataka",
    description:
      "Engineered Go/Python microservices improving quiz throughput 42% for 1M+ daily quizzes via Redis async pipelining. Optimized ElasticSearch over 10M+ records cutting p95 latency to <280ms (78% reduction). Deployed 25+ containerized services on AWS EKS with multi-tier Redis caching reducing DB load 85%.",
    skills: ["Go", "Python", "Vue.js", "GraphQL", "AWS", "ElasticSearch"],
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
