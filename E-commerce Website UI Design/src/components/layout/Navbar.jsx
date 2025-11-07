import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, User, Store, Heart, List } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { motion } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = getCartItemsCount();
  const wishlistCount = wishlistItems.length;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Store className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="text-xl text-blue-600">ShopNow+</span>
            <span className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded-full ml-1">
              Premium
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/wishlist"
              aria-label="Open wishlist"
              title="Wishlist"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all relative focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive("/wishlist")
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <Heart className="w-5 h-5" aria-hidden="true" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 bg-pink-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center"
                    aria-hidden="false"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.div>
              <span className="hidden sm:inline">Wishlist</span>
            </Link>

            <Link
              to="/orders"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive("/orders")
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
              <span className="hidden sm:inline">My Orders</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all relative ${
                isActive("/cart")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Login / Profile */}
            <AuthSection />
          </div>
        </div>
      </div>
    </nav>
  );
};

function AuthSection() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <Link
        to="/profile"
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          isActive("/profile")
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">{user?.name || user?.email}</span>
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        isActive("/login")
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <User className="w-5 h-5" />
      <span className="hidden sm:inline">Login</span>
    </Link>
  );
}
