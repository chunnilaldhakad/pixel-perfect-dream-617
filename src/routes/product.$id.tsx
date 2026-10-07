import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/product/$id")({
  head: () => ({ meta: [{ title: "Product — Aura Vision" }, { name: "description", content: "Product at Aura Vision." }, { property: "og:title", content: "Product — Aura Vision" }, { property: "og:description", content: "Product at Aura Vision." }] }),
  component: () => <main className="px-6 pt-40 pb-20 text-center"><h1 className="headline text-6xl text-navy">Product</h1><p className="mt-4 text-muted-foreground">Coming soon.</p></main>,
});
