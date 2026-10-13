import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/aura/Listing";
import { categoryMeta } from "@/lib/data";

export const Route = createFileRoute("/computer-glasses")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] as string } : {}),
  head: () => ({ meta: [
    { title: "Computer Glasses — Aura Vision" },
    { name: "description", content: categoryMeta["computer-glasses"].desc },
    { property: "og:title", content: "Computer Glasses — Aura Vision" },
    { property: "og:description", content: categoryMeta["computer-glasses"].desc },
  ] }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <Listing key={q ?? ""} category="computer-glasses" initialQ={q} />;
}
