import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Aura Vision" }, { name: "description", content: "Account at Aura Vision." }, { property: "og:title", content: "Account — Aura Vision" }, { property: "og:description", content: "Account at Aura Vision." }] }),
  component: () => <main className="px-6 pt-40 pb-20 text-center"><h1 className="headline text-6xl text-navy">Account</h1><p className="mt-4 text-muted-foreground">Coming soon.</p></main>,
});
