import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { motion } from 'motion/react';

export const FlashDealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashDeals = products.filter((p) => p.isFlashDeal);

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-gray-900 mb-2">⚡ Flash Deals</h2>
            <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Clock className="w-5 h-5 text-red-600" />
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Sec' },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="bg-white rounded-lg px-3 py-2 shadow-md">
                    <div className="text-2xl text-red-600 tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                  </div>
                  {index < 2 && <div className="flex items-center text-red-600 text-xl">:</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashDeals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
