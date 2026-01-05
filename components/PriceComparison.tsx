'use client';

import { PriceData } from '@/types';
import { useState } from 'react';

interface PriceComparisonProps {
  prices: PriceData[];
}

export default function PriceComparison({ prices }: PriceComparisonProps) {
  const [sortBy, setSortBy] = useState<'price' | 'retailer'>('price');

  const sortedPrices = [...prices].sort((a, b) => {
    if (sortBy === 'price') {
      return (a.price + a.shipping) - (b.price + b.shipping);
    }
    return a.retailer.localeCompare(b.retailer);
  });

  const getAvailabilityColor = (availability: PriceData['availability']) => {
    switch (availability) {
      case 'In Stock':
        return 'text-green-400 bg-green-500/20';
      case 'Limited Stock':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'Out of Stock':
        return 'text-red-400 bg-red-500/20';
      case 'Pre-Order':
        return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Price Comparison</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('price')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'price'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sort by Price
          </button>
          <button
            onClick={() => setSortBy('retailer')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'retailer'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sort by Retailer
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedPrices.map((priceData, index) => (
          <div
            key={`${priceData.retailer}-${index}`}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-white">{priceData.retailer}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(priceData.availability)}`}>
                    {priceData.availability}
                  </span>
                  {index === 0 && sortBy === 'price' && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                      Best Deal
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-white">${priceData.price}</span>
                  {priceData.originalPrice && (
                    <>
                      <span className="text-lg text-slate-500 line-through">${priceData.originalPrice}</span>
                      <span className="text-sm text-green-400 font-semibold">-{priceData.discount}% OFF</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm">
                  {priceData.shipping === 0 ? (
                    <span className="text-green-400 font-medium">Free Shipping</span>
                  ) : (
                    <span className="text-slate-400">Shipping: ${priceData.shipping}</span>
                  )}
                  <span className="text-slate-400">{priceData.shippingTime}</span>
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  Last updated: {new Date(priceData.lastUpdated).toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-sm text-slate-400">Total</p>
                  <p className="text-xl font-bold text-purple-400">
                    ${(priceData.price + priceData.shipping).toFixed(2)}
                  </p>
                </div>
                {priceData.availability === 'In Stock' && (
                  <a
                    href={priceData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Potential Savings</p>
            <p className="text-2xl font-bold text-green-400">
              ${(() => {
                const inStock = sortedPrices.filter(p => p.availability === 'In Stock');
                if (inStock.length < 2) return '0.00';
                const totals = inStock.map(p => p.price + p.shipping);
                return (Math.max(...totals) - Math.min(...totals)).toFixed(2);
              })()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Price Range</p>
            <p className="text-lg font-semibold text-white">
              ${Math.min(...sortedPrices.map(p => p.price)).toFixed(2)} - ${Math.max(...sortedPrices.map(p => p.price)).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
