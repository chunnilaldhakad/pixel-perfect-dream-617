import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/aura/Header";
import { Footer } from "@/components/aura/Footer";
import { CartDrawer, QuickViewModal, SearchOverlay, WishlistDrawer } from "@/components/aura/Overlays";
import { Cursor, LoadingScreen, PageTransition, ScrollProgress, SmoothScroll } from "@/components/aura/Effects";

function NotFoundComponent() {
  return (
    <div className="bg-hero flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="label-tech text-primary">Error 404</p>
        <h1 className="headline mt-4 text-7xl text-navy">Out of focus.</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="label-tech mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="headline text-4xl text-navy">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="label-tech h-11 rounded-full bg-primary px-5 text-primary-foreground">Try again</button>
          <a href="/" className="label-tech inline-flex h-11 items-center rounded-full border border-border px-5">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AURA VISION — Frame Your World" },
      { name: "description", content: "Precision-crafted luxury eyewear for modern living. Eyeglasses, sunglasses, computer and smart glasses." },
      { property: "og:title", content: "AURA VISION — Frame Your World" },
      { property: "og:description", content: "Precision-crafted luxury eyewear for modern living." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
        <LoadingScreen />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />
        <main id="main" className="min-h-screen pb-20 md:pb-0">
          <PageTransition><Outlet /></PageTransition>
        </main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SearchOverlay />
      </StoreProvider>
    </QueryClientProvider>
  );
}
