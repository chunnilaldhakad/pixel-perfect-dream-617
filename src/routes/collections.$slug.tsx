import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/collections/$slug")({
  head: () => ({ meta: [{ title: "Collection — Aura Vision" }, { name: "description", content: "Collection at Aura Vision." }, { property: "og:title", content: "Collection — Aura Vision" }, { property: "og:description", content: "Collection at Aura Vision." }] }),
  component: () => <main className="px-6 pt-40 pb-20 text-center"><h1 className="headline text-6xl text-navy">Collection</h1><p className="mt-4 text-muted-foreground">Coming soon.</p></main>,
});
