import React from 'react';
import { Laptop, Shirt, Watch } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  {
    name: 'Electronics',
    icon: Laptop,
    gradient: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1761207850745-d41a776ef897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBzdG9yZXxlbnwxfHx8fDE3NjIzMTA0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    count: '250+ Products',
  },
  {
    name: 'Fashion',
    icon: Shirt,
    gradient: 'from-pink-600 to-purple-600',
    image: 'https://images.unsplash.com/photo-1758520388383-55023490a258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvcHBpbmclMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzYyMzA0MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    count: '180+ Products',
  },
  {
    name: 'Accessories',
    icon: Watch,
    gradient: 'from-amber-600 to-orange-600',
    image: 'https://images.unsplash.com/photo-1725368844213-c167fe556f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NvcmllcyUyMGpld2VscnklMjBsdXh1cnl8ZW58MXx8fHwxNzYyNDEwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    count: '120+ Products',
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity`}
                  />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl text-white mb-2">{category.name}</h3>
                  <p className="text-white/90">{category.count}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
