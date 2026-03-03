import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as storage from "@/lib/localStorage";
import { products as fallbackProducts } from "@/data/products";
import { MessageCircle, ArrowLeft, Shield, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = storage.getProducts();
    if (data && data.length > 0) {
      setAllProducts(data.map(mapDbProduct));
    }
    setLoading(false);
  }, []);

  const product = allProducts.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 text-center min-h-screen">
        <h1 className="section-heading mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-gold inline-block">Back to Shop</Link>
      </div>
    );
  }

  const whatsappMessage = `Hi! I'm interested in ordering "${product.name}" (₹${product.price.toLocaleString()}) from ALANKARA by Karthika. Please share details.`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 md:pt-28 pb-16 px-4 max-w-7xl mx-auto">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-square rounded-sm overflow-hidden bg-secondary"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          {product.badge && (
            <span className="inline-block w-fit bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-sm mb-3">
              {product.badge}
            </span>
          )}

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {product.longDescription}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn justify-center text-base mb-6"
          >
            <MessageCircle size={20} />
            Order via WhatsApp
          </a>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Shield size={20} className="mx-auto text-primary mb-1" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Quality Assured</p>
            </div>
            <div className="text-center">
              <Truck size={20} className="mx-auto text-primary mb-1" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pan India Delivery</p>
            </div>
            <div className="text-center">
              <RotateCcw size={20} className="mx-auto text-primary mb-1" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Easy Returns</p>
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="section-heading text-center mb-3">You May Also Like</h2>
          <div className="gold-divider mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
