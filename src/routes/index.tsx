import { createFileRoute } from "@tanstack/react-router";
import { AuraCollection, ChooseMood, EditorialBand, FaceShapeFinder, Hero, ShopByCategory, TrustStrip } from "@/components/aura/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura Vision — Frame Your World | Premium Eyewear" },
      { name: "description", content: "Precision-crafted eyeglasses, sunglasses, computer and smart glasses. Atelier Collection 2026, free shipping and 7-day returns." },
      { property: "og:title", content: "Aura Vision — Frame Your World" },
      { property: "og:description", content: "Precision-crafted eyewear designed for modern vision, comfort and everyday expression." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ShopByCategory />
      <ChooseMood />
      <FaceShapeFinder />
      <AuraCollection />
      <EditorialBand />
    </>
  );
}
