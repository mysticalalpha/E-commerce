import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const CartItemCard = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <span className="text-gray-900">
          ${ (item.price * item.quantity).toFixed(2) }
        </span>
      </div>
    </div>
  );
};
