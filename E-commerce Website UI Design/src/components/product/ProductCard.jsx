import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star, Zap, TrendingUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { QuickViewModal } from './QuickViewModal';
import { motion } from 'motion/react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showQuickView, setShowQuickView] = useState(false);
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist! ❤️');
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 relative"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isFlashDeal && (
            <span className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
              <Zap className="w-3 h-3" />
              Flash Deal
            </span>
          )}
          {product.isTrending && (
            <span className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
          {product.discount && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden bg-gray-100 relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.reviewCount})</span>
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.originalPrice ? (
                  <>
                    <span className="text-xl text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};
