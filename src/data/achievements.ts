export const competitiveProgramming = [
  { platform: "LeetCode", rating: "1828", highlight: "Top 6.5% globally", detail: "380+ problems solved" },
  { platform: "CodeChef", rating: "5★", highlight: "Top 1% globally", detail: "150+ challenges completed" },
];

export const impactMetrics = [
  { label: "Throughput Boost", value: "42%", description: "via pipelining & async orchestration" },
  { label: "Query Optimization", value: "99.8%", description: "PostgreSQL performance on 1M+ rows" },
  { label: "Deployment Speed", value: "63%", description: "improvement with CI/CD automation" },
  { label: "Search Latency", value: "280ms", description: "from 1.3s via ElasticSearch" },
  { label: "API Performance", value: "<200ms", description: "at 10K+ daily requests" },
  { label: "Inference Speed", value: "6s", description: "multi-agent, 30+ reasoning steps" },
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
