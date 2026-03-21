export const competitiveProgramming = [
  { platform: "LeetCode", rating: "1828", highlight: "Top 6.5% globally", detail: "380+ problems solved" },
  { platform: "CodeChef", rating: "5★", highlight: "Top 1% globally", detail: "150+ challenges completed" },
];

export const impactMetrics = [
  { label: "Cold Start", value: "93%", description: "NestJS API cold-start reduced from 45s to 3s" },
  { label: "Throughput", value: "42%", description: "quiz throughput boost via Redis async pipelining" },
  { label: "Search Latency", value: "78%", description: "p95 cut to <280ms on 10M+ records (ElasticSearch)" },
  { label: "DB Load", value: "85%", description: "reduction via multi-tier Redis caching (L1/L2)" },
  { label: "RAM Usage", value: "85%", description: "1.2GB → 180MB via Redis pooling & chunked streaming" },
  { label: "Gateway", value: "10K", description: "req/min with 99.99% uptime under burst traffic" },
];

export const openSourceContributions = [
  {
    repo: "DeepSpeed",
    org: "Microsoft Research",
    repoUrl: "https://github.com/deepspeedai/DeepSpeed",
    prs: [
      { number: 7742, title: "Fixed deadlocks in DecoupledCheckpointEngine", impact: "Eliminated indefinite hangs with timeouts & health checks" },
      { number: 7736, title: "Prevented NaN in OneBitLamb with empty tensors", impact: "Stabilized optimizer scaling" },
      { number: 7740, title: "Fixed NebulaCheckpointEngine crash on commit", impact: "CheckpointCommitInfo API fix" },
      { number: 7737, title: "Fixed PEFT/LoRA + DeepSpeed attention crash", impact: "Training init compatibility" },
      { number: 7735, title: "Restored LR scaling under dynamic batching", impact: "sqrt / tensor TypeError fix" },
    ],
  },
  {
    repo: "Cal.com",
    org: "Cal.com",
    repoUrl: "https://github.com/calcom/cal.com",
    prs: [
      { number: 25941, title: "Unblocked org signup with pre-existing usernames", impact: "Enterprise onboarding fix" },
    ],
  },
];
