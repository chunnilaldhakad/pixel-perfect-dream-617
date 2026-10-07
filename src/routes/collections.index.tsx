import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/collections/")({
  head: () => ({ meta: [{ title: "Collections — Aura Vision" }, { name: "description", content: "Collections at Aura Vision." }, { property: "og:title", content: "Collections — Aura Vision" }, { property: "og:description", content: "Collections at Aura Vision." }] }),
  component: () => <main className="px-6 pt-40 pb-20 text-center"><h1 className="headline text-6xl text-navy">Collections</h1><p className="mt-4 text-muted-foreground">Coming soon.</p></main>,
});
