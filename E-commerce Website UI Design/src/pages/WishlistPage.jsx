import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { X } from "lucide-react";

export function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Wishlist
          </h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-600">
              You don't have any items in your wishlist yet.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${item.price?.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="ml-2 inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
