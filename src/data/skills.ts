export interface SkillCategory {
  label: string;
  ring: "core" | "framework" | "infrastructure";
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Core Languages",
    ring: "core",
    items: ["Go", "Python", "TypeScript", "JavaScript"],
  },
  {
    label: "Frameworks & Libraries",
    ring: "framework",
    items: ["Next.js", "React", "FastAPI", "Node.js", "LangChain", "LangGraph", "GraphQL", "gRPC", "REST API"],
  },
  {
    label: "Infrastructure & Cloud",
    ring: "infrastructure",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "PostgreSQL", "Redis", "ElasticSearch", "DynamoDB", "S3", "Linux", "CI/CD"],
  },
];

export const systemsSkills = [
  "Distributed Systems",
  "Reverse Proxying",
  "Load Balancing",
  "Redis Caching",
  "Edge Routing",
  "Microservices",
];
