import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Heart,
  Star,
  Share2,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/product/ProductCard";
import { motion } from "motion/react";

export function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // redirect to login and indicate buy now intent
      navigate("/login", {
        state: { from: "/checkout", buyNow: true, productId: product.id },
      });
      toast.error("Please log in to complete your purchase");
      return;
    }
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate("/checkout");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist! ❤️");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </motion.button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm relative"
          >
            {product.isFlashDeal && (
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                Flash Deal
              </div>
            )}
            {product.discount && (
              <div className="absolute top-4 right-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                -{product.discount}% OFF
              </div>
            )}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isLiked
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <h1 className="text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-xl border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                >
                  Buy Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/cart")}
                  className="flex-1 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Go to Cart
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-gray-900 mb-4">Why Shop With Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Free Shipping</h4>
                    <p className="text-sm text-gray-600">
                      On all orders over $100
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-600">
                      100% secure transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Easy Returns</h4>
                    <p className="text-sm text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
