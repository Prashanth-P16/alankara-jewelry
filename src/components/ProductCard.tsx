import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="product-card group block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
