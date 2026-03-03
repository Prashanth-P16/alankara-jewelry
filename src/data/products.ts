import productNecklace1 from "@/assets/product-necklace-1.jpg";
import productEarrings1 from "@/assets/product-earrings-1.jpg";
import productBangles1 from "@/assets/product-bangles-1.jpg";
import productBracelet1 from "@/assets/product-bracelet-1.jpg";
import productNecklace2 from "@/assets/product-necklace-2.jpg";
import productMaangtikka1 from "@/assets/product-maangtikka-1.jpg";
import productRing1 from "@/assets/product-ring-1.jpg";
import productChoker1 from "@/assets/product-choker-1.jpg";
import productNosering1 from "@/assets/product-nosering-1.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  badge?: string;
}

export const categories = [
  { id: "all", name: "All" },
  { id: "necklaces", name: "Necklaces" },
  { id: "earrings", name: "Earrings" },
  { id: "bangles", name: "Bangles" },
  { id: "bracelets", name: "Bracelets" },
  { id: "rings", name: "Rings" },
  { id: "bridal", name: "Bridal" },
];

export const products: Product[] = [
  {
    id: "kundan-necklace-set",
    name: "Kundan Bridal Necklace Set",
    price: 2499,
    originalPrice: 3999,
    description: "Exquisite kundan work with ruby accents",
    longDescription: "This stunning Kundan Bridal Necklace Set features intricate traditional craftsmanship with hand-set kundan stones and delicate ruby accents. The set includes a statement necklace with matching jhumka earrings, perfect for weddings, festivals, and special celebrations. Made with high-quality imitation gold finish that retains its shine. Adjustable chain length for a comfortable fit.",
    category: "necklaces",
    image: productNecklace1,
    badge: "Bestseller",
  },
  {
    id: "traditional-jhumka",
    name: "Traditional Gold Jhumka Earrings",
    price: 899,
    originalPrice: 1299,
    description: "Classic temple-style jhumkas with bead detailing",
    longDescription: "These Traditional Gold Jhumka Earrings showcase the timeless beauty of South Indian temple jewelry design. Featuring intricate floral motifs, vibrant stone settings, and delicate gold bead hangings, these jhumkas add a regal touch to any outfit. Lightweight and comfortable for all-day wear. Push-back closure for secure fit.",
    category: "earrings",
    image: productEarrings1,
    badge: "New",
  },
  {
    id: "gold-bangle-set",
    name: "Classic Gold Bangle Set",
    price: 1599,
    description: "Set of 4 textured gold-finish bangles",
    longDescription: "This elegant Classic Gold Bangle Set includes 4 beautifully textured bangles with varying designs — from smooth polished to intricately carved patterns. Made with premium imitation gold that maintains its lustre over time. Available in multiple sizes. Stack them together or wear individually for a versatile look.",
    category: "bangles",
    image: productBangles1,
  },
  {
    id: "chain-bracelet",
    name: "Woven Chain Bracelet",
    price: 699,
    description: "Delicate woven chain with sparkling accents",
    longDescription: "This Woven Chain Bracelet features a beautifully crafted chain in a woven pattern with subtle sparkling stone accents. The warm gold finish gives it a luxurious appearance. Adjustable lobster-claw clasp fits most wrist sizes. Perfect for daily wear or layering with other bracelets.",
    category: "bracelets",
    image: productBracelet1,
  },
  {
    id: "temple-necklace-set",
    name: "Temple Necklace & Earring Set",
    price: 3299,
    originalPrice: 4499,
    description: "Grand temple jewelry set with pearl drops",
    longDescription: "This majestic Temple Necklace & Earring Set is inspired by traditional South Indian temple jewelry. The necklace features an elaborate design with intricate motifs and pearl drop embellishments. Comes with matching jhumka earrings. The grand, statement-making design is ideal for weddings, receptions, and cultural events.",
    category: "necklaces",
    image: productNecklace2,
    badge: "Premium",
  },
  {
    id: "bridal-maangtikka",
    name: "Kundan Bridal Maang Tikka",
    price: 1199,
    description: "Ornate bridal headpiece with ruby & pearl",
    longDescription: "This Kundan Bridal Maang Tikka is an exquisite headpiece designed for the modern bride. Featuring vibrant ruby-colored stones, shimmering kundan setting, and delicate pearl drops, it adds the perfect finishing touch to bridal or festive attire. Adjustable hook for comfortable wear. Pairs beautifully with our necklace sets.",
    category: "bridal",
    image: productMaangtikka1,
    badge: "Bridal",
  },
  {
    id: "scallop-ring",
    name: "Golden Scallop Ring",
    price: 499,
    description: "Elegant scalloped design with stone inlay",
    longDescription: "This Golden Scallop Ring features a unique scalloped pattern with tiny stone inlays that catch the light beautifully. Made with durable imitation gold plating for long-lasting wear. Adjustable band fits most finger sizes. A versatile piece that elevates both ethnic and western outfits.",
    category: "rings",
    image: productRing1,
  },
  {
    id: "bridal-choker",
    name: "Grand Bridal Choker Necklace",
    price: 2899,
    originalPrice: 3999,
    description: "Statement choker with medallion pendant & pearls",
    longDescription: "This Grand Bridal Choker Necklace is a show-stopping piece featuring a wide choker band with intricate filigree work, a stunning circular medallion pendant, and cascading pearl drops. The warm antique gold finish gives it a regal, heritage feel. Adjustable back chain. Perfect as a bridal statement piece.",
    category: "necklaces",
    image: productChoker1,
    badge: "Trending",
  },
  {
    id: "chandbali-earrings",
    name: "Chandbali Hoop Earrings",
    price: 799,
    description: "Ornate crescent hoops with bead drops",
    longDescription: "These Chandbali Hoop Earrings feature the classic crescent moon (chandbali) design with elaborate lattice work and golden bead drops. Inspired by Rajasthani and Hyderabadi jewelry traditions. Lightweight for comfortable wear. Fish-hook closure. A versatile piece for festivals, parties, and ethnic wear.",
    category: "earrings",
    image: productNosering1,
  },
];
