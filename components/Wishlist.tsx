'use client';

import { useState, useEffect } from 'react';
import { WishlistItem, Product } from '@/types';
import { getWishlist, removeFromWishlist } from '@/lib/storage';
import { getLowestPrice } from '@/lib/productDatabase';

interface WishlistProps {
  onProductClick: (product: Product) => void;
}

export default function Wishlist({ onProductClick }: WishlistProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'price-low' | 'price-high'>('recent');

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const items = getWishlist();
    setWishlist(items);
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    loadWishlist();
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.addedAt - a.addedAt;
    } else if (sortBy === 'price-low') {
      const priceA = getLowestPrice(a.product)?.price || 0;
      const priceB = getLowestPrice(b.product)?.price || 0;
      return priceA - priceB;
    } else {
      const priceA = getLowestPrice(a.product)?.price || 0;
      const priceB = getLowestPrice(b.product)?.price || 0;
      return priceB - priceA;
    }
  });

  const totalValue = wishlist.reduce((sum, item) => {
    const price = getLowestPrice(item.product)?.price || 0;
    return sum + price;
  }, 0);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">💝</div>
        <h3 className="text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h3>
        <p className="text-gray-400 text-center max-w-md">
          Start searching for products and add them to your wishlist to keep track of items you love
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">My Wishlist</h2>
          <p className="text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} • Total value: ${totalValue.toFixed(2)}
          </p>
        </div>
        
        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="recent">Recently Added</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWishlist.map((item) => {
          const lowestPrice = getLowestPrice(item.product);
          const hasDiscount = lowestPrice?.discount && lowestPrice.discount > 0;

          return (
            <div
              key={item.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div
                onClick={() => onProductClick(item.product)}
                className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-8 flex items-center justify-center h-48 cursor-pointer"
              >
                <div className="text-6xl">{item.product.images[0]}</div>
                
                {hasDiscount && (
                  <div className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold text-white">
                    -{lowestPrice.discount}%
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.product.id);
                  }}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-purple-400">{item.product.brand}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs text-gray-500">{item.product.category}</span>
                </div>

                <h3
                  onClick={() => onProductClick(item.product)}
                  className="text-lg font-bold text-white mb-2 line-clamp-2 cursor-pointer hover:text-purple-400 transition-colors"
                >
                  {item.product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.product.rating) ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{item.product.rating}</span>
                </div>

                {/* Price */}
                {lowestPrice && (
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">
                      ${lowestPrice.price.toFixed(2)}
                    </span>
                    {lowestPrice.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${lowestPrice.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}

                {/* Added Date */}
                <div className="text-xs text-gray-500 mb-3">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onProductClick(item.product)}
                    className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="px-4 py-2 bg-gray-700 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
