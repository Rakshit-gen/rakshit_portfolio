import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/hero/hero").then((m) => m.Hero), {
  loading: () => <div className="min-h-screen" />,
});
const FeaturedWork = dynamic(() => import("@/components/projects/featured-work").then((m) => m.FeaturedWork));
const MetricsDashboard = dynamic(() => import("@/components/metrics/metrics-dashboard").then((m) => m.MetricsDashboard));

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <MetricsDashboard />
    </>
  );
}
