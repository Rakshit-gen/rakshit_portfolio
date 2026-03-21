export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  link: string;
  github?: string;
  featured: boolean;
  tags: string[];
  metrics?: string;
  architecture?: {
    title: string;
    points: string[];
  }[];
  challenges?: string[];
}

export const projects: Project[] = [
  {
    slug: "nervaai",
    name: "NervaAI",
    tagline: "AI-Driven Podcast Generation",
    description:
      "Event-driven pipeline processing long-form audio into synthesized podcasts. Fault-tolerant architecture handling high-concurrency workloads with async task orchestration, vector context engine, and multi-agent script generation.",
    stack: ["FastAPI", "Qdrant", "Redis", "AWS", "Next.js", "PostgreSQL", "HuggingFace"],
    link: "https://nervaai.vercel.app/",
    featured: true,
    tags: ["System Design", "Event-Driven", "AI/ML", "Scalability"],
    metrics: "500+ concurrent workflows",
    architecture: [
      { title: "Async Task Orchestration", points: ["Redis queues", "Job ID return pattern", "Celery workers", "FastAPI async"] },
      { title: "Vector Context Engine", points: ["RAG pipeline", "HuggingFace embeddings", "Qdrant vector DB", "LangChain integration"] },
      { title: "Multi-Agent Script Generation", points: ["Researcher + Writer agents", "GPT-4 backbone", "Custom agent orchestration"] },
      { title: "Optimized Asset Delivery", points: ["S3 signed URLs", "CloudFront CDN", "Streaming responses"] },
    ],
    challenges: ["Long-running TTS (5-10 min)", "HTTP timeout management", "Multi-agent state coordination", "Vector search for context retrieval"],
  },
  {
    slug: "openskill",
    name: "OpenSkill",
    tagline: "AI-Powered Claude Skill Orchestrator",
    description:
      "CLI tool for creating and managing Claude skills with AI-powered content generation. Modular LLM provider system supporting Groq, OpenAI, Anthropic, and Ollama with local state versioning.",
    stack: ["Go", "Next.js", "Tailwind", "TypeScript"],
    link: "https://www.openskill.online/",
    featured: true,
    tags: ["CLI", "LLMs", "Golang", "Developer Tools"],
    architecture: [
      { title: "Modular LLM Provider System", points: ["Go interfaces", "Groq, OpenAI, Anthropic, Ollama support"] },
      { title: "Local State & Versioning", points: [".claude/skills/ directory", "SKILL.md rollback history"] },
      { title: "Skill Composition Engine", points: ["Extends/includes support", "Template system"] },
    ],
    challenges: ["Skill format standardization across providers", "Async AI generation in CLI context", "Cross-platform compatibility"],
  },
  {
    slug: "ventaedge",
    name: "VentaEdge",
    tagline: "Distributed API Gateway",
    description:
      "Enterprise-grade distributed API gateway with intelligent load balancing, Redis caching, real-time analytics dashboard, and advanced rate limiting using token bucket + Redis + Lua.",
    stack: ["Go", "Redis", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
    link: "https://vantageedge.vercel.app/",
    featured: true,
    tags: ["Distributed Systems", "Golang", "Networking", "Security"],
    metrics: "<200ms latency at 10K+ req/day",
    architecture: [
      { title: "Intelligent Load Balancing", points: ["Round-robin", "Least-connections", "Health checks"] },
      { title: "Distributed Rate Limiting", points: ["Token bucket algorithm", "Redis + Lua atomics"] },
      { title: "Circuit Breaker", points: ["Fail-fast on downstream errors", "Automatic recovery"] },
    ],
    challenges: ["Cascading failure prevention", "Low-latency overhead", "Distributed rate limit synchronization"],
  },
  {
    slug: "synclayer",
    name: "SyncLayer",
    tagline: "Real-Time Collaboration Engine",
    description:
      "Real-time collaborative task management platform (Trello/Notion-inspired) built with Go Fiber, WebSockets, Redis Pub/Sub, and optimistic UI with write batching.",
    stack: ["Go", "Redis", "PostgreSQL", "Next.js", "TypeScript"],
    link: "https://sync-layer.vercel.app/teams",
    featured: true,
    tags: ["Real-Time", "WebSockets", "Distributed Systems", "Go"],
    architecture: [
      { title: "WebSocket Connection Layer", points: ["Go Fiber stateful connections", "Connection pooling"] },
      { title: "Pub/Sub Message Bus", points: ["Redis Pub/Sub across instances", "Fan-out pattern"] },
      { title: "Optimistic UI & Write Batching", points: ["Batched PostgreSQL writes", "Client-side optimistic updates"] },
    ],
    challenges: ["Scaling WebSocket connections", "Concurrent edit conflicts", "Delivery guarantees"],
  },
  {
    slug: "sentralq",
    name: "SentralQ",
    tagline: "Multi-Agent AI Debugging",
    description:
      "AI-powered API debugging platform with multi-agent systems for auto-diagnosing failures and delivering actionable real-time solutions via supervisor + specialist agent architecture.",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind", "Docker"],
    link: "https://api-analyse-fe.vercel.app/",
    featured: true,
    tags: ["AI Agents", "Observability", "LLMs", "Automation"],
    metrics: "6s avg inference, 30+ reasoning steps",
    architecture: [
      { title: "Log Ingestion & Normalization", points: ["FastAPI intake", "Pandas processing", "Standard JSON schema"] },
      { title: "Agent Swarm Orchestration", points: ["Supervisor + specialist agents", "LangChain backbone"] },
      { title: "Synthesized Solution Delivery", points: ["Aggregated findings", "Reviewer LLM (GPT-4)", "Streaming output"] },
    ],
    challenges: ["Multi-agent coordination", "Hallucination control", "Varied log format parsing"],
  },
  {
    slug: "synthforce",
    name: "SynthForce",
    tagline: "Multi-Agent Startup Simulation",
    description: "Multi-agent AI system simulating an entire startup workforce collaborating to generate MVP roadmaps. Groq-accelerated LLMs.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Docker", "AWS"],
    link: "https://synth-force-fe.vercel.app/",
    featured: false,
    tags: ["AI Agents", "Simulation", "LLMs"],
  },
  {
    slug: "aegis-agent",
    name: "Aegis Agent",
    tagline: "AI Code Review Automation",
    description: "AI code review automation platform with microservices architecture for security audits, performance optimization, and code quality.",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Docker"],
    link: "https://www.aegisagent.online",
    featured: false,
    tags: ["AI", "Code Review", "Security"],
  },
  {
    slug: "slanine",
    name: "Slanine",
    tagline: "AI Toolkit Suite",
    description: "Comprehensive AI toolkit suite with intelligent tools for streamlining workflows and productivity.",
    stack: ["Next.js", "PostgreSQL", "Tailwind", "TypeScript", "Docker"],
    link: "https://www.slanine.online",
    featured: false,
    tags: ["AI", "Productivity", "SaaS"],
  },
  {
    slug: "random-web",
    name: "Random Web",
    tagline: "Curated Web Discovery",
    description: "Curated collection of odd/nostalgic internet corners. Built with Manya Srivastava. Mood-based, time travel, submissions.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://random-web-azure.vercel.app/",
    featured: false,
    tags: ["Fun", "Discovery", "Web"],
  },
  {
    slug: "setup-chat",
    name: "SetUp ChatWebApp",
    tagline: "Encrypted Real-Time Messaging",
    description: "Secure real-time messaging with end-to-end encryption and multimedia support.",
    stack: ["React", "Next.js", "Tailwind", "TypeScript"],
    link: "https://setup-chatapp.vercel.app/",
    featured: false,
    tags: ["Real-Time", "Security", "Chat"],
  },
  {
    slug: "questme",
    name: "QuestMe",
    tagline: "Community Discussion Platform",
    description: "Reddit-inspired community platform with nested comments, voting, and real-time updates via Redis.",
    stack: ["Next.js", "Redis", "Tailwind", "TypeScript", "React"],
    link: "https://flyuphigh.vercel.app/",
    featured: false,
    tags: ["Community", "Real-Time", "Social"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
