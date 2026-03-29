export const competitiveProgramming = [
  { platform: "LeetCode", rating: "1828", highlight: "Top 6.5% globally", detail: "380+ problems solved" },
  { platform: "CodeChef", rating: "5★", highlight: "Top 1% globally", detail: "150+ challenges completed" },
  { platform: "GATE 2026", rating: "Qualified", highlight: "Computer Science & IT", detail: "Graduate Aptitude Test in Engineering" },
];

export const impactMetrics = [
  { label: "Cold Start", value: "93%", description: "API boot went from 45s to 3s — yes, 45 seconds was real" },
  { label: "Throughput", value: "42%", description: "Quiz serving got faster with Redis. Users didn't notice. That's the point." },
  { label: "Search Latency", value: "78%", description: "Search over 10M+ records now under 280ms. Was painful before." },
  { label: "DB Load", value: "85%", description: "Added caching layers so the database could finally breathe" },
  { label: "RAM Usage", value: "85%", description: "1.2GB → 180MB. The server stopped sweating." },
  { label: "Gateway", value: "10K", description: "req/min and it stays up. That's the whole job." },
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
