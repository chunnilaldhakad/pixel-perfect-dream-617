import { createFileRoute } from "@tanstack/react-router";
import { Listing } from "@/components/aura/Listing";
import { categoryMeta } from "@/lib/data";

export const Route = createFileRoute("/sunglasses")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : undefined }),
  head: () => ({ meta: [
    { title: "Sunglasses — Aura Vision" },
    { name: "description", content: categoryMeta["sunglasses"].desc },
    { property: "og:title", content: "Sunglasses — Aura Vision" },
    { property: "og:description", content: categoryMeta["sunglasses"].desc },
  ] }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <Listing key={q ?? ""} category="sunglasses" initialQ={q} />;
}
