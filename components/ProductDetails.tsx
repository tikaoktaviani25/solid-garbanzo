'use client';

import { Product } from '@/types';
import { getStoreById } from '@/lib/stores';
import { isInWishlist, saveToWishlist, removeFromWishlist } from '@/lib/storage';
import { useState, useEffect } from 'react';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const [inWishlist, setInWishlist] = useState(false);
  const [selectedStore, setSelectedStore] = useState(product.prices[0]);

  useEffect(() => {
    setInWishlist(isInWishlist(product.id));
  }, [product.id]);

  const handleWishlistToggle = () => {
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

  const lowestPrice = [...product.prices]
    .filter(p => p.availability === 'In Stock')
    .sort((a, b) => a.price - b.price)[0];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white">Product Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image & Info */}
            <div>
              {/* Product Image */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-12 flex items-center justify-center mb-6">
                <div className="text-9xl">{product.images[0]}</div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Brand</div>
                  <div className="text-white font-semibold">{product.brand}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Category</div>
                  <div className="text-white font-semibold">{product.category}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Condition</div>
                  <div className="text-white font-semibold">{product.condition}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">Rating</div>
                  <div className="text-white font-semibold flex items-center gap-1">
                    ⭐ {product.rating} ({product.reviewCount})
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Title & Actions */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    {product.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    inWishlist
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-pink-500 hover:text-white'
                  }`}
                >
                  <svg
                    className="w-6 h-6"
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
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

              {/* Attributes */}
              {Object.keys(product.attributes).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      value && (
                        <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-gray-400 text-xs mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-white font-medium">{value}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Price Comparison */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Price Comparison ({product.prices.length} stores)
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {product.prices
                    .sort((a, b) => a.price - b.price)
                    .map((price, index) => {
                      const store = getStoreById(price.storeId);
                      const isLowest = price.storeId === lowestPrice?.storeId;
                      
                      return (
                        <div
                          key={price.storeId}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            selectedStore.storeId === price.storeId
                              ? 'bg-purple-500/20 border-purple-500'
                              : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                          } ${isLowest ? 'ring-2 ring-green-500' : ''}`}
                          onClick={() => setSelectedStore(price)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{store?.logo}</span>
                              <div>
                                <div className="font-semibold text-white">{price.storeName}</div>
                                <div className="text-xs text-gray-400">{price.estimatedDelivery}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">
                                ${price.price.toFixed(2)}
                              </div>
                              {price.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${price.originalPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              price.availability === 'In Stock'
                                ? 'bg-green-500/20 text-green-400'
                                : price.availability === 'Limited Stock'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {price.availability}
                            </span>
                            <span className="text-gray-400">
                              {price.shippingCost === 0 ? 'Free Shipping' : `+$${price.shippingCost} shipping`}
                            </span>
                          </div>
                          {isLowest && (
                            <div className="mt-2 text-xs text-green-400 font-semibold">
                              🏆 Best Price
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={selectedStore.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-center rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View at {selectedStore.storeName} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
