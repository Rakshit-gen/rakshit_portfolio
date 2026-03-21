"use client";

import dynamic from "next/dynamic";

const AIAssistant = dynamic(
  () => import("./ai-assistant").then((m) => m.AIAssistant),
  { ssr: false }
);

export function AIWrapper() {
  return <AIAssistant />;
}
