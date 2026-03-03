import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import * as storage from "@/lib/localStorage";
import { products as fallbackProducts, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const mapDbProduct = (p: storage.Product) => ({
  id: p.slug,
  name: p.name,
  price: p.price,
  originalPrice: p.original_price ?? undefined,
  description: p.description,
  longDescription: p.long_description || p.description,
  category: p.category,
  image: p.image_url || "",
  badge: p.badge ?? undefined,
});

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [dbProducts, setDbProducts] = useState<ReturnType<typeof mapDbProduct>[] | null>(null);

  useEffect(() => {
    const data = storage.getProducts();
    if (data && data.length > 0) {
      setDbProducts(data.map(mapDbProduct));
    } else {
      setDbProducts(null);
    }
  }, []);

  const allProducts = dbProducts ?? fallbackProducts;

  const filtered = useMemo(() => {
    if (activeCategory === "all") return allProducts;
    return allProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProducts]);

  const handleCategory = (id: string) => {
    setActiveCategory(id);
    if (id === "all") setSearchParams({});
    else setSearchParams({ category: id });
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <h1 className="section-heading mb-3">Our Collection</h1>
        <div className="gold-divider mb-4" />
        <p className="section-subheading mx-auto">
          Handcrafted imitation jewellery for every occasion
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default Shop;
