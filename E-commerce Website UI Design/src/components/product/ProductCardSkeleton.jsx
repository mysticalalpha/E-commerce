import React from 'react';
import { motion } from 'motion/react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-20" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};
