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
      "Built multi-tenant Rubrics System end-to-end for enterprise customers like Ingram Micro. Reduced NestJS API cold-start from 45s to 3s (93%). Implemented multi-level manager hierarchy with junction-table architecture. Shipped 6+ analytics BFF endpoints replacing ad-hoc frontend transformations across 30+ components.",
    skills: ["TypeScript", "Node.js", "NestJS", "AWS", "PostgreSQL", "Redis", "BullMQ"],
    current: true,
  },
  {
    company: "Quizizz (Wayground)",
    role: "Software Engineer",
    period: "Jan 2025 — Oct 2025",
    location: "Bengaluru, Karnataka",
    description:
      "Engineered Go/Python microservices improving quiz throughput 42% for 1M+ daily quizzes. Optimized ElasticSearch over 10M+ records cutting p95 latency 78% to <280ms. Deployed 25+ containerized services on AWS EKS with GitHub Actions CI/CD, reducing DB load 85%.",
    skills: ["Go", "Python", "Vue.js", "GraphQL", "AWS", "ElasticSearch", "Redis", "Docker"],
  },
];
