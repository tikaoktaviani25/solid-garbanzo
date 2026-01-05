'use client';

import { Product, PriceData } from '@/types';
import { getBestDeal, calculateSavings } from '@/lib/productRecognition';

interface ProductCardProps {
  product: Product;
  prices: PriceData[];
  onViewDetails: () => void;
  onAddToWishlist: () => void;
  isInWishlist: boolean;
}

export default function ProductCard({ 
  product, 
  prices, 
  onViewDetails, 
  onAddToWishlist,
  isInWishlist 
}: ProductCardProps) {
  const bestDeal = getBestDeal(prices);
  const savings = calculateSavings(prices);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group">
      <div className="relative h-64 bg-slate-900/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onAddToWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-black/50 text-white hover:bg-red-500'
            }`}
          >
            <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {savings > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Save ${savings}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm text-purple-400 font-medium mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{product.name}</h3>
          </div>
        </div>

        {product.avgRating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.avgRating!) ? 'text-yellow-400' : 'text-slate-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-400">
              {product.avgRating} ({product.reviewCount?.toLocaleString()} reviews)
            </span>
          </div>
        )}

        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{product.description}</p>

        {bestDeal && (
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Best Price</span>
              <span className="text-xs text-green-400 font-semibold">{bestDeal.retailer}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${bestDeal.price}</span>
              {bestDeal.originalPrice && (
                <span className="text-lg text-slate-500 line-through">${bestDeal.originalPrice}</span>
              )}
              {bestDeal.discount && (
                <span className="text-sm text-green-400 font-semibold">-{bestDeal.discount}%</span>
              )}
            </div>
            {bestDeal.shipping === 0 ? (
              <p className="text-sm text-green-400 mt-1">Free shipping</p>
            ) : (
              <p className="text-sm text-slate-400 mt-1">+ ${bestDeal.shipping} shipping</p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            View All Prices
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{prices.length} retailers</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
