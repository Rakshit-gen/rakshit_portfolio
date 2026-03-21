import { aiSystemPrompt } from "@/data/ai-context";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return fallbackResponse(messages[messages.length - 1]?.content || "");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: "system", content: aiSystemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      stream: true,
    }),
  });

  if (!response.ok) {
    return fallbackResponse(messages[messages.length - 1]?.content || "");
  }

  const reader = response.body?.getReader();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      if (!reader) {
        controller.close();
        return;
      }
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices?.[0]?.delta?.content;
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // Skip unparseable chunks
            }
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function fallbackResponse(query: string): Response {
  const q = query.toLowerCase();
  let answer = "";

  if (q.includes("distributed") || q.includes("system")) {
    answer = "Rakshit specializes in distributed systems — he's built VentaEdge (API gateway with Go, Redis rate limiting, circuit breakers), SyncLayer (real-time collab with WebSockets + Redis Pub/Sub), and has deep experience with microservices, load balancing, and edge routing. His impact includes 42% throughput boosts and <200ms API responses at 10K+ daily requests.";
  } else if (q.includes("nerva") || q.includes("podcast") || q.includes("pipeline")) {
    answer = "NervaAI is Rakshit's event-driven AI podcast generation platform. It uses FastAPI for async task orchestration with Redis queues, a RAG pipeline with HuggingFace embeddings + Qdrant, multi-agent script generation (Researcher + Writer agents), and optimized asset delivery via S3 signed URLs + CloudFront CDN. It handles 500+ concurrent workflows.";
  } else if (q.includes("open source") || q.includes("deepspeed") || q.includes("contribution")) {
    answer = "Rakshit has 5 merged PRs in Microsoft's DeepSpeed — fixing deadlocks in checkpoint engines, NaN propagation bugs, runtime crashes, LoRA compatibility issues, and LR scaling under dynamic batching. He also contributed to Cal.com, fixing enterprise org signup. These aren't trivial — they're deep systems-level fixes in production ML infrastructure.";
  } else if (q.includes("stand out") || q.includes("different") || q.includes("unique") || q.includes("why")) {
    answer = "What sets Rakshit apart: (1) He works across the full stack from Go backends to Next.js frontends to AI/LLM pipelines — that's rare. (2) He's contributed to Microsoft DeepSpeed, a core ML training framework. (3) His competitive programming ratings (LeetCode Top 6.5%, CodeChef Top 1%) prove algorithmic depth. (4) He builds production systems, not just demos — real rate limiters, real distributed coordination, real AI pipelines.";
  } else if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
    answer = "Core: Go, Python, TypeScript. Frameworks: Next.js, React, FastAPI, Node.js, LangChain, LangGraph. Infrastructure: AWS, GCP, Docker, Kubernetes, PostgreSQL, Redis, ElasticSearch. Architecture: Distributed Systems, Microservices, Load Balancing, Event-Driven Systems, Multi-Agent AI.";
  } else if (q.includes("experience") || q.includes("work") || q.includes("job")) {
    answer = "Currently: AI Backend Engineer at HSV Digital (Dec 2025–Present) — building LLM inference APIs for 500+ recruiters. Previously: Software Engineer at Wayground (Go, TypeScript, AWS) and SDE Intern at Mood Analytica (Python, FastAPI). He's an NIT Hamirpur graduate.";
  } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
    answer = "You can reach Rakshit at sisodiarakshit456@gmail.com, or connect on LinkedIn (linkedin.com/in/rakshit-sisodiya), GitHub (github.com/Rakshit-gen), or Twitter/X (@rakshit_sisodia). He's open to opportunities!";
  } else {
    answer = "Rakshit is a Full Stack Developer & AI Engineer based in India (NIT Hamirpur grad). He builds distributed systems, AI pipelines, and high-performance backends with Go, Python, and TypeScript. Currently at HSV Digital building LLM inference APIs. He's a Top 1% competitive programmer and has contributed to Microsoft DeepSpeed. Ask me something specific about his projects, skills, or experience!";
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const words = answer.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          controller.enqueue(encoder.encode((i > 0 ? " " : "") + words[i]));
          i++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 30);
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
