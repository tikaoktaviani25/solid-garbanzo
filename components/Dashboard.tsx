'use client';

import { Statistics } from '@/types';

interface DashboardProps {
  stats: Statistics;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-slate-400">Track your shopping insights and savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 rounded-xl p-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Searches</p>
          <p className="text-4xl font-bold text-white">{stats.totalSearches}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 rounded-xl p-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-1">Products Found</p>
          <p className="text-4xl font-bold text-white">{stats.totalProductsFound}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 rounded-xl p-3">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-1">Avg Savings</p>
          <p className="text-4xl font-bold text-white">${stats.averageSavings}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-600/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-pink-500/20 rounded-xl p-3">
              <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-1">Wishlist Items</p>
          <p className="text-4xl font-bold text-white">{stats.wishlistItems}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active Price Alerts</span>
              <span className="text-2xl font-bold text-purple-400">{stats.priceAlertsActive}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Savings Potential</span>
              <span className="text-2xl font-bold text-green-400">
                ${(stats.averageSavings * stats.totalSearches).toFixed(2)}
              </span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Avg Products per Search</span>
              <span className="text-2xl font-bold text-blue-400">
                {stats.totalSearches > 0 
                  ? Math.round(stats.totalProductsFound / stats.totalSearches) 
                  : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Shopping Insights</h3>
          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-semibold">Smart Shopping</span>
              </div>
              <p className="text-sm text-slate-400">
                You&apos;re saving an average of ${stats.averageSavings} per product by comparing prices!
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-white font-semibold">Quick Searches</span>
              </div>
              <p className="text-sm text-slate-400">
                AI-powered recognition finds products in seconds across multiple retailers.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-white font-semibold">Price Alerts</span>
              </div>
              <p className="text-sm text-slate-400">
                Get notified when prices drop on your wishlist items.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Start Saving Today!</h3>
            <p className="text-slate-300">
              Upload a product image to find the best prices across {stats.totalSearches > 0 ? '6+' : 'multiple'} retailers
            </p>
          </div>
          <div className="hidden md:block">
            <svg className="w-24 h-24 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
