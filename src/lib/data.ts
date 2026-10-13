import pTitanium from "@/assets/p-titanium.jpg";
import pSun from "@/assets/p-sun.jpg";
import pTortoise from "@/assets/p-tortoise.jpg";
import pCrystal from "@/assets/p-crystal.jpg";
import hero from "@/assets/hero.jpg";
import catSun from "@/assets/cat-sun.jpg";
import catComputer from "@/assets/cat-computer.jpg";
import catSmart from "@/assets/cat-smart.jpg";

export const IMG = { pTitanium, pSun, pTortoise, pCrystal, hero, catSun, catComputer, catSmart };

export type Category = "eyeglasses" | "sunglasses" | "computer-glasses" | "smart-glasses";

export type Product = {
  id: string;
  name: string;
  category: Category;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  material: "Titanium" | "Acetate" | "Stainless Steel" | "TR90";
  shape: "Round" | "Square" | "Rectangle" | "Cat-Eye" | "Aviator" | "Wayfarer";
  frameType: "Full Rim" | "Half Rim" | "Rimless";
  colors: { name: string; swatch: string }[];
  size: "Small" | "Medium" | "Large";
  gender: "Men" | "Women" | "Unisex";
  description: string;
  images: string[];
  badge?: string;
  featured?: boolean;
  tags: ("bestseller" | "signature" | "new")[];
  createdAt: number;
};

const C = {
  midnight: { name: "Midnight Blue", swatch: "oklch(0.3 0.1 260)" },
  crystal: { name: "Crystal", swatch: "oklch(0.96 0.01 230)" },
  grey: { name: "Ice Grey", swatch: "oklch(0.75 0.01 250)" },
  gold: { name: "Warm Gold", swatch: "oklch(0.82 0.12 85)" },
  black: { name: "Onyx", swatch: "oklch(0.2 0.01 260)" },
  tortoise: { name: "Tortoise", swatch: "oklch(0.45 0.09 55)" },
  olive: { name: "Olive", swatch: "oklch(0.5 0.07 120)" },
};

const p = (o: Omit<Product, "rating" | "reviews"> & { rating?: number; reviews?: number }): Product => ({
  rating: 4.7,
  reviews: 96,
  ...o,
});

export const products: Product[] = [
  p({ id: "aura-vector", name: "Aura Vector", category: "eyeglasses", type: "Titanium Frame", price: 2999, originalPrice: 3999, rating: 4.8, reviews: 128, material: "Titanium", shape: "Round", frameType: "Full Rim", colors: [C.midnight, C.crystal, C.grey, C.gold], size: "Medium", gender: "Unisex", description: "Ultra-light beta-titanium round frame with hand-polished bridge and hypoallergenic nose pads.", images: [pTitanium, hero], badge: "Bestseller", featured: true, tags: ["bestseller", "signature"], createdAt: 10 }),
  p({ id: "aura-craft", name: "Aura Craft", category: "eyeglasses", type: "Acetate Frame", price: 2499, rating: 4.7, reviews: 211, material: "Acetate", shape: "Square", frameType: "Full Rim", colors: [C.tortoise, C.black, C.crystal], size: "Medium", gender: "Men", description: "Italian cellulose acetate, cut and polished over 40 hours for a deep tortoise finish.", images: [pTortoise, catComputer], featured: true, tags: ["bestseller"], createdAt: 6 }),
  p({ id: "aura-olive", name: "Aura Olive", category: "sunglasses", type: "Polarised Sunglasses", price: 3499, rating: 4.6, reviews: 74, material: "Acetate", shape: "Wayfarer", frameType: "Full Rim", colors: [C.olive, C.black], size: "Large", gender: "Unisex", description: "Polarised CR-39 lenses in a softened wayfarer silhouette with 100% UV400 protection.", images: [pSun, catSun], badge: "New", featured: true, tags: ["new"], createdAt: 20 }),
  p({ id: "aura-edge", name: "Aura Edge", category: "sunglasses", type: "Acetate Sunglasses", price: 3999, originalPrice: 4999, rating: 4.9, reviews: 163, material: "Acetate", shape: "Square", frameType: "Full Rim", colors: [C.black, C.tortoise], size: "Large", gender: "Men", description: "Architectural square sunglasses with five-barrel hinges and smoke-grey mineral lenses.", images: [pSun, catSun], badge: "Signature", featured: true, tags: ["signature", "bestseller"], createdAt: 8 }),
  p({ id: "aura-nova", name: "Aura Nova", category: "computer-glasses", type: "Blue Light Glasses", price: 1999, rating: 4.7, reviews: 302, material: "TR90", shape: "Rectangle", frameType: "Full Rim", colors: [C.crystal, C.grey, C.midnight], size: "Medium", gender: "Unisex", description: "Featherweight TR90 frame with BluCut anti-glare lenses for long screen sessions.", images: [pCrystal, catComputer], badge: "Bestseller", featured: true, tags: ["bestseller", "new"], createdAt: 18 }),
  p({ id: "aura-classic", name: "Aura Classic", category: "eyeglasses", type: "Acetate Frame", price: 2499, rating: 4.6, reviews: 88, material: "Acetate", shape: "Wayfarer", frameType: "Full Rim", colors: [C.black, C.tortoise], size: "Large", gender: "Men", description: "The everyday icon — a confident wayfarer with spring hinges and a matte finish.", images: [pTortoise, hero], featured: true, tags: ["signature"], createdAt: 4 }),
  p({ id: "aura-form", name: "Aura Form", category: "eyeglasses", type: "Cat-Eye Frame", price: 3499, rating: 4.8, reviews: 141, material: "Acetate", shape: "Cat-Eye", frameType: "Full Rim", colors: [C.crystal, C.gold, C.black], size: "Small", gender: "Women", description: "Crystal cat-eye with sculpted gold hinge detail — light catching every edge.", images: [pCrystal, hero], badge: "New", featured: true, tags: ["new", "signature"], createdAt: 22 }),
  p({ id: "aura-heritage", name: "Aura Heritage", category: "eyeglasses", type: "Titanium Round", price: 4499, rating: 4.9, reviews: 57, material: "Titanium", shape: "Round", frameType: "Full Rim", colors: [C.gold, C.grey], size: "Small", gender: "Unisex", description: "Soft geometry and balanced proportions in Japanese titanium, finished in warm gold.", images: [pTitanium, hero], badge: "Signature", featured: true, tags: ["signature"], createdAt: 12 }),
  p({ id: "aura-meridian", name: "Aura Meridian", category: "eyeglasses", type: "Half-Rim Frame", price: 2999, rating: 4.5, reviews: 63, material: "Stainless Steel", shape: "Rectangle", frameType: "Half Rim", colors: [C.grey, C.black], size: "Medium", gender: "Men", description: "Precision half-rim with a nylon-wire lower edge for a weightless, professional line.", images: [pTitanium, catComputer], tags: ["new"], createdAt: 19 }),
  p({ id: "aura-luma", name: "Aura Luma", category: "eyeglasses", type: "Rimless Frame", price: 5999, rating: 4.8, reviews: 39, material: "Titanium", shape: "Round", frameType: "Rimless", colors: [C.gold, C.crystal], size: "Medium", gender: "Women", description: "Three-piece rimless titanium — nearly invisible, endlessly comfortable.", images: [pCrystal, hero], badge: "Atelier", tags: ["signature"], createdAt: 21 }),
  p({ id: "aura-sol", name: "Aura Sol", category: "sunglasses", type: "Aviator Sunglasses", price: 4499, rating: 4.7, reviews: 118, material: "Stainless Steel", shape: "Aviator", frameType: "Full Rim", colors: [C.gold, C.grey], size: "Large", gender: "Unisex", description: "A double-bridge aviator with gradient lenses and adjustable titanium pads.", images: [pSun, catSun], tags: ["bestseller"], createdAt: 9 }),
  p({ id: "aura-coast", name: "Aura Coast", category: "sunglasses", type: "Round Sunglasses", price: 2999, rating: 4.5, reviews: 52, material: "Acetate", shape: "Round", frameType: "Full Rim", colors: [C.tortoise, C.olive], size: "Medium", gender: "Women", description: "Sun-washed round acetate made for long coastal afternoons.", images: [pSun, catSun], badge: "New", tags: ["new"], createdAt: 23 }),
  p({ id: "aura-dune", name: "Aura Dune", category: "sunglasses", type: "Cat-Eye Sunglasses", price: 3499, rating: 4.6, reviews: 81, material: "Acetate", shape: "Cat-Eye", frameType: "Full Rim", colors: [C.black, C.tortoise], size: "Medium", gender: "Women", description: "A lifted cat-eye with deep brown lenses and subtle metal temple inlay.", images: [pSun, catSun], tags: ["signature"], createdAt: 7 }),
  p({ id: "aura-pixel", name: "Aura Pixel", category: "computer-glasses", type: "Blue Light Glasses", price: 2499, rating: 4.6, reviews: 190, material: "TR90", shape: "Square", frameType: "Full Rim", colors: [C.black, C.midnight], size: "Large", gender: "Men", description: "Square TR90 for long coding nights — anti-glare, anti-smudge, zero-power ready.", images: [pTortoise, catComputer], tags: ["bestseller"], createdAt: 11 }),
  p({ id: "aura-focus", name: "Aura Focus", category: "computer-glasses", type: "Blue Light Glasses", price: 1999, rating: 4.4, reviews: 144, material: "TR90", shape: "Round", frameType: "Full Rim", colors: [C.crystal, C.grey], size: "Small", gender: "Women", description: "Soft round crystal frame with 40% blue-light filtration and a feather-light feel.", images: [pCrystal, catComputer], tags: ["new"], createdAt: 17 }),
  p({ id: "aura-desk", name: "Aura Desk", category: "computer-glasses", type: "Half-Rim Blue Light", price: 2999, rating: 4.7, reviews: 66, material: "Stainless Steel", shape: "Rectangle", frameType: "Half Rim", colors: [C.grey, C.midnight], size: "Medium", gender: "Unisex", description: "A workday essential with a clean half-rim and premium BluCut coating.", images: [pTitanium, catComputer], tags: ["signature"], createdAt: 5 }),
  p({ id: "aura-sense", name: "Aura Sense", category: "smart-glasses", type: "Audio Smart Glasses", price: 5999, originalPrice: 7499, rating: 4.6, reviews: 48, material: "TR90", shape: "Rectangle", frameType: "Full Rim", colors: [C.black, C.midnight], size: "Large", gender: "Unisex", description: "Open-ear audio, touch controls and 8-hour battery in an everyday frame.", images: [catSmart, pTortoise], badge: "Tech", tags: ["new", "signature"], createdAt: 24 }),
  p({ id: "aura-pulse", name: "Aura Pulse", category: "smart-glasses", type: "Smart Sunglasses", price: 5999, rating: 4.5, reviews: 31, material: "TR90", shape: "Wayfarer", frameType: "Full Rim", colors: [C.black], size: "Large", gender: "Men", description: "Polarised smart sunglasses with directional speakers and voice assistant.", images: [catSmart, pSun], tags: ["new"], createdAt: 16 }),
  p({ id: "aura-link", name: "Aura Link", category: "smart-glasses", type: "Smart Blue Light", price: 4999, rating: 4.4, reviews: 27, material: "TR90", shape: "Square", frameType: "Full Rim", colors: [C.midnight, C.grey], size: "Medium", gender: "Unisex", description: "Blue-light lenses meet calls, music and fitness reminders.", images: [catSmart, pCrystal], tags: ["bestseller"], createdAt: 14 }),
  p({ id: "aura-arc", name: "Aura Arc", category: "eyeglasses", type: "Titanium Square", price: 3999, rating: 4.7, reviews: 92, material: "Titanium", shape: "Square", frameType: "Full Rim", colors: [C.midnight, C.gold], size: "Large", gender: "Men", description: "A strong square line rendered in fine titanium for an architect's precision.", images: [pTitanium, hero], tags: ["bestseller"], createdAt: 13 }),
  p({ id: "aura-zenith", name: "Aura Zenith", category: "eyeglasses", type: "Titanium Minimalist", price: 3799, originalPrice: 4499, rating: 4.9, reviews: 84, material: "Titanium", shape: "Round", frameType: "Half Rim", colors: [C.midnight, C.gold, C.grey], size: "Medium", gender: "Unisex", description: "Featherweight Japanese titanium with hand-burnished temples and silicone-cushioned bridges.", images: [pTitanium, pCrystal], badge: "New", featured: true, tags: ["new", "signature"], createdAt: 25 }),
  p({ id: "aura-studio", name: "Aura Studio", category: "eyeglasses", type: "Bold Acetate Round", price: 2799, rating: 4.6, reviews: 115, material: "Acetate", shape: "Round", frameType: "Full Rim", colors: [C.tortoise, C.black, C.crystal], size: "Large", gender: "Men", description: "Sculpted Italian acetate silhouette inspired by mid-century atelier eyewear.", images: [pTortoise, hero], tags: ["bestseller"], createdAt: 15 }),
  p({ id: "aura-monaco", name: "Aura Monaco", category: "sunglasses", type: "Square Polarised Sun", price: 4299, originalPrice: 5299, rating: 4.8, reviews: 97, material: "Titanium", shape: "Square", frameType: "Full Rim", colors: [C.gold, C.black], size: "Large", gender: "Men", description: "Precision dual-tone titanium aviator-square with gradient polarised lenses.", images: [pSun, catSun], badge: "Signature", featured: true, tags: ["signature", "bestseller"], createdAt: 26 }),
  p({ id: "aura-azure", name: "Aura Azure", category: "sunglasses", type: "Cat-Eye Polarised Sun", price: 3699, rating: 4.7, reviews: 62, material: "Acetate", shape: "Cat-Eye", frameType: "Full Rim", colors: [C.midnight, C.crystal], size: "Small", gender: "Women", description: "Dramatic ocean-blue acetate cat-eye with 100% UV400 anti-reflective sun protection.", images: [pSun, catSun], badge: "New", tags: ["new"], createdAt: 27 }),
  p({ id: "aura-clarity", name: "Aura Clarity", category: "computer-glasses", type: "Anti-Fatigue Computer", price: 2299, originalPrice: 2899, rating: 4.8, reviews: 154, material: "TR90", shape: "Round", frameType: "Full Rim", colors: [C.crystal, C.grey, C.olive], size: "Medium", gender: "Unisex", description: "Ultra-flexible TR90 frame with harmonic 420nm blue-light filtration for digital professionals.", images: [pCrystal, catComputer], tags: ["bestseller"], createdAt: 28 }),
  p({ id: "aura-prism", name: "Aura Prism", category: "computer-glasses", type: "Stainless Steel Computer", price: 2899, rating: 4.6, reviews: 89, material: "Stainless Steel", shape: "Rectangle", frameType: "Half Rim", colors: [C.grey, C.black], size: "Medium", gender: "Men", description: "Engineered ultra-slim stainless steel frame with BluCut multi-coat lenses.", images: [pTitanium, catComputer], tags: ["new"], createdAt: 29 }),
  p({ id: "aura-echo", name: "Aura Echo", category: "smart-glasses", type: "Acoustic Smart Frames", price: 6499, originalPrice: 7999, rating: 4.7, reviews: 52, material: "TR90", shape: "Round", frameType: "Full Rim", colors: [C.black, C.midnight], size: "Medium", gender: "Unisex", description: "Micro-speakers, noise-canceling dual mics, and capacitive gesture touch in an ultra-sleek round frame.", images: [catSmart, pCrystal], badge: "Tech", featured: true, tags: ["new", "signature"], createdAt: 30 }),
  p({ id: "aura-vantage", name: "Aura Vantage", category: "smart-glasses", type: "Smart Sports Audio", price: 6999, originalPrice: 8499, rating: 4.8, reviews: 41, material: "TR90", shape: "Rectangle", frameType: "Full Rim", colors: [C.black], size: "Large", gender: "Men", description: "IPX5 water-resistant smart performance eyewear with polarized lenses and 10-hour battery life.", images: [catSmart, pSun], badge: "Tech", tags: ["bestseller"], createdAt: 31 }),
];

export const getProduct = (id: string) => products.find((x) => x.id === id);

export const categories: { slug: Category; title: string; desc: string; img: string; n: string }[] = [
  { slug: "eyeglasses", n: "01", title: "Eyeglasses", desc: "Precision optics, everyday elegance.", img: IMG.hero },
  { slug: "sunglasses", n: "02", title: "Sunglasses", desc: "Polarised clarity under bright skies.", img: IMG.catSun },
  { slug: "computer-glasses", n: "03", title: "Computer Glasses", desc: "Blue-light comfort for long screen days.", img: IMG.catComputer },
  { slug: "smart-glasses", n: "04", title: "Smart Glasses", desc: "Audio, calls and assistant — in a frame.", img: IMG.catSmart },
];

export const categoryMeta: Record<Category, { title: string; desc: string }> = {
  eyeglasses: { title: "Eyeglasses", desc: "Titanium, acetate and rimless frames engineered for all-day comfort and precise vision." },
  sunglasses: { title: "Sunglasses", desc: "Polarised, UV400 sun frames shaped for Indian summers and editorial afternoons." },
  "computer-glasses": { title: "Computer Glasses", desc: "Blue-light filtering lenses in featherweight frames for focused screen time." },
  "smart-glasses": { title: "Smart Glasses", desc: "Open-ear audio, calls and voice assistant built into refined everyday frames." },
};

export const collections = [
  { slug: "atelier-2026", title: "Atelier 2026", img: IMG.hero, story: "Our flagship season. Hand-finished titanium and crystal acetate drawn from Jaipur's architectural light.", ids: ["aura-vector", "aura-heritage", "aura-luma", "aura-form", "aura-zenith"] },
  { slug: "essentials", title: "Essentials", img: IMG.pTortoise, story: "The frames you reach for every morning. Honest shapes, durable materials, quietly perfect.", ids: ["aura-craft", "aura-classic", "aura-arc", "aura-meridian", "aura-studio"] },
  { slug: "signature", title: "Signature", img: IMG.pTitanium, story: "The defining Aura silhouettes — refined over years, recognised at a glance.", ids: ["aura-vector", "aura-edge", "aura-heritage", "aura-dune", "aura-monaco"] },
  { slug: "urban-optics", title: "Urban Optics", img: IMG.catSun, story: "Bold lines for city movement. Sun frames with structure and nerve.", ids: ["aura-edge", "aura-sol", "aura-olive", "aura-pulse", "aura-azure"] },
  { slug: "digital-comfort", title: "Digital Comfort", img: IMG.catComputer, story: "For the hours you spend in light that isn't the sun. Blue-light lenses, weightless frames.", ids: ["aura-nova", "aura-pixel", "aura-focus", "aura-desk", "aura-clarity", "aura-prism"] },
  { slug: "summer-light", title: "Summer Light", img: IMG.pSun, story: "Polarised lenses and warm acetates for long, bright afternoons by the sea.", ids: ["aura-coast", "aura-olive", "aura-sol", "aura-dune", "aura-monaco"] },
];

export const stores = [
  { id: "jaipur", name: "Aura Vision Jaipur", address: "C-Scheme, Ashok Marg, Jaipur 302001", hours: "10:30 AM – 9:00 PM", phone: "+91 141 400 2026", pins: ["302001", "jaipur"], x: 38, y: 40 },
  { id: "delhi", name: "Aura Vision Delhi", address: "Khan Market, Middle Lane, New Delhi 110003", hours: "11:00 AM – 9:30 PM", phone: "+91 11 4100 2026", pins: ["110003", "delhi"], x: 44, y: 28 },
  { id: "mumbai", name: "Aura Vision Mumbai", address: "Linking Road, Bandra West, Mumbai 400050", hours: "11:00 AM – 10:00 PM", phone: "+91 22 4200 2026", pins: ["400050", "mumbai"], x: 30, y: 60 },
  { id: "bangalore", name: "Aura Vision Bangalore", address: "100 Ft Road, Indiranagar, Bengaluru 560038", hours: "10:30 AM – 9:30 PM", phone: "+91 80 4300 2026", pins: ["560038", "bangalore", "bengaluru"], x: 42, y: 78 },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
