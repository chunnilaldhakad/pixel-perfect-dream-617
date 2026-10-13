import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/aura/Listing";
import { categoryMeta } from "@/lib/data";

export const Route = createFileRoute("/smart-glasses")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] as string } : {}),
  head: () => ({ meta: [
    { title: "Smart Glasses — Aura Vision" },
    { name: "description", content: categoryMeta["smart-glasses"].desc },
    { property: "og:title", content: "Smart Glasses — Aura Vision" },
    { property: "og:description", content: categoryMeta["smart-glasses"].desc },
  ] }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <Listing key={q ?? ""} category="smart-glasses" initialQ={q} />;
}
