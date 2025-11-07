import React from 'react';
import { X, ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.isFlashDeal && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    Flash Deal
                  </div>
                )}
                {product.isTrending && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <span className="inline-block text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 self-start">
                  {product.category}
                </span>
                <h2 className="text-gray-900 mb-3">{product.name}</h2>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-4">
                  {product.originalPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        Save {product.discount}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                      isInWishlist(product.id)
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders $100+</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day policy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Secure Pay</p>
                    <p className="text-xs text-gray-500">100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
