'use client';

import { Product, ProductMatch } from '@/types';
import { getLowestPrice } from '@/lib/productDatabase';
import { isInWishlist, saveToWishlist, removeFromWishlist } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  match: ProductMatch;
  onClick: () => void;
}

export default function ProductCard({ match, onClick }: ProductCardProps) {
  const { product, confidence, visualSimilarity } = match;
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInWishlist(isInWishlist(product.id));
  }, [product.id]);

  const lowestPrice = getLowestPrice(product);
  const hasDiscount = lowestPrice?.discount && lowestPrice.discount > 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      setInWishlist(false);
    } else {
      saveToWishlist({
        id: `wishlist-${Date.now()}`,
        product,
        addedAt: Date.now()
      });
      setInWishlist(true);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-8 flex items-center justify-center h-48">
        <div className="text-6xl">{product.images[0]}</div>
        
        {/* Confidence Badge */}
        <div className="absolute top-3 left-3 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {confidence}% Match
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            inWishlist
              ? 'bg-pink-500 text-white'
              : 'bg-gray-800/80 text-gray-400 hover:bg-pink-500 hover:text-white'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={inWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute bottom-3 right-3 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold text-white">
            -{lowestPrice.discount}%
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-purple-400">{product.brand}</span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-400">
            {product.rating} ({product.reviewCount})
          </span>
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

        {/* Store Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Available at {product.prices.length} stores
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            lowestPrice?.availability === 'In Stock'
              ? 'bg-green-500/20 text-green-400'
              : lowestPrice?.availability === 'Limited Stock'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {lowestPrice?.availability}
          </span>
        </div>

        {/* Visual Similarity Bar */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Visual Similarity</span>
            <span>{visualSimilarity}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${visualSimilarity}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
