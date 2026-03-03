import { Link } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-jewelry.jpg";
import categoryNecklaces from "@/assets/category-necklaces.jpg";
import categoryEarrings from "@/assets/category-earrings.jpg";
import categoryBangles from "@/assets/category-bangles.jpg";
import categoryBracelets from "@/assets/category-bracelets.jpg";

const shopCategories = [
  { name: "Necklaces", image: categoryNecklaces, slug: "necklaces" },
  { name: "Earrings", image: categoryEarrings, slug: "earrings" },
  { name: "Bangles", image: categoryBangles, slug: "bangles" },
  { name: "Bracelets", image: categoryBracelets, slug: "bracelets" },
];

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero with scroll animation */}
      <ContainerScroll
        titleComponent={
          <div className="mb-6">
            <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Exquisite Imitation Jewellery
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Adorn Yourself with{" "}
              <span className="text-primary">Timeless Elegance</span>
            </h1>
          </div>
        }
      >
        <img
          src={heroImage}
          alt="ALANKARA Jewellery Collection"
          className="w-full h-full object-cover"
        />
      </ContainerScroll>

      {/* Categories */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Shop by Category</h2>
          <div className="gold-divider mb-4" />
          <p className="section-subheading mx-auto">
            Discover our curated collections of handcrafted imitation jewellery
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {shopCategories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="block relative aspect-[3/4] rounded-sm overflow-hidden group"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-lg font-semibold text-primary-foreground">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-primary-foreground/70 uppercase tracking-wider flex items-center gap-1">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto bg-secondary/30">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-3">Bestsellers</h2>
          <div className="gold-divider mb-4" />
          <p className="section-subheading mx-auto">Our most loved pieces</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop" className="btn-gold inline-block">
            View All Collections
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="section-heading mb-4">Order via WhatsApp</h2>
          <div className="gold-divider mb-6" />
          <p className="section-subheading mx-auto mb-8">
            Browse our collection and order directly through WhatsApp for a personalised shopping experience.
          </p>
          <Link to="/shop" className="btn-outline-gold inline-block">
            Browse Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
