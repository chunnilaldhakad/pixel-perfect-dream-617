import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/aura/Listing";
import { categoryMeta } from "@/lib/data";

export const Route = createFileRoute("/eyeglasses")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (typeof s["q"] === "string" ? { q: s["q"] as string } : {}),
  head: () => ({ meta: [
    { title: "Eyeglasses — Aura Vision" },
    { name: "description", content: categoryMeta["eyeglasses"].desc },
    { property: "og:title", content: "Eyeglasses — Aura Vision" },
    { property: "og:description", content: categoryMeta["eyeglasses"].desc },
  ] }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <Listing key={q ?? ""} category="eyeglasses" initialQ={q} />;
}
