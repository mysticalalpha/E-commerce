import React, { useState } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { FlashDealsSection } from "../components/home/FlashDealsSection";
import { TrendingSection } from "../components/home/TrendingSection";
import { CategoryShowcase } from "../components/home/CategoryShowcase";
import { NewsletterPopup } from "../components/home/NewsletterPopup";
import { motion } from "motion/react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showAllProducts = searchQuery === "" && selectedCategory === "All";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Search Bar Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              {/* Use a hidden-scrollbar utility to prevent layout shift when scrollbars appear */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show featured sections when no filters applied */}
      {showAllProducts ? (
        <>
          <FlashDealsSection />
          <TrendingSection />
          <CategoryShowcase />
        </>
      ) : (
        /* Filtered Products Grid */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-xl mb-4">
                No products found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 flex items-center justify-between"
              >
                <p className="text-gray-600">
                  Showing {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Newsletter Popup */}
      <NewsletterPopup />
    </div>
  );
}
