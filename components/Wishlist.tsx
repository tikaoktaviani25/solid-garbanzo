'use client';

import { WishlistItem } from '@/types';

interface WishlistProps {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onToggleAlert: (id: string, enabled: boolean) => void;
  onSetTargetPrice: (id: string, price: number) => void;
}

export default function Wishlist({ items, onRemove, onToggleAlert, onSetTargetPrice }: WishlistProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-24 h-24 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h3>
        <p className="text-slate-400 text-center max-w-md">
          Start adding products to your wishlist to track prices and get alerts when they drop!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Wishlist</h2>
        <div className="text-sm text-slate-400">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48 bg-slate-900/50">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-purple-400 font-medium mb-1">{item.product.brand}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{item.product.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{item.product.description}</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Current Best Price</p>
                    <p className="text-xl font-bold text-white">${item.currentBestPrice}</p>
                    <p className="text-xs text-purple-400 mt-1">{item.currentBestRetailer}</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Target Price</p>
                    <input
                      type="number"
                      value={item.targetPrice || ''}
                      onChange={(e) => onSetTargetPrice(item.id, parseFloat(e.target.value))}
                      placeholder="Set target"
                      className="w-full bg-slate-800 text-white text-lg font-bold px-2 py-1 rounded border border-slate-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Price Alerts</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.alertEnabled}
                        onChange={(e) => onToggleAlert(item.id, e.target.checked)}
                        className="w-5 h-5 rounded border-slate-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                      />
                      <span className="text-sm text-white font-medium">
                        {item.alertEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Added {new Date(item.addedDate).toLocaleDateString()}</span>
                  {item.targetPrice && item.currentBestPrice <= item.targetPrice && (
                    <span className="text-green-400 font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Target price reached!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
