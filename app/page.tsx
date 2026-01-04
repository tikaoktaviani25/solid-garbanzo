'use client';

import { useState, useEffect } from 'react';
import { Product, ProductMatch, SearchResult, TabType } from '@/types';
import { analyzeImage } from '@/lib/imageAnalysis';
import { saveSearchHistory, saveSearchResult, getAppStatistics } from '@/lib/storage';
import CameraCapture from '@/components/CameraCapture';
import ProductCard from '@/components/ProductCard';
import ProductDetails from '@/components/ProductDetails';
import Wishlist from '@/components/Wishlist';
import SearchHistory from '@/components/SearchHistory';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentSearch, setCurrentSearch] = useState<SearchResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stats, setStats] = useState({
    totalSearches: 0,
    totalProductsFound: 0,
    totalWishlistItems: 0,
    totalSavings: 0
  });

  useEffect(() => {
    updateStats();
  }, [activeTab]);

  const updateStats = () => {
    const appStats = getAppStatistics();
    setStats(appStats);
  };

  const handleImageCapture = async (file: File, previewUrl: string) => {
    setIsAnalyzing(true);
    
    try {
      // Analyze image
      const matches = await analyzeImage(file);
      
      // Create search result
      const searchResult: SearchResult = {
        id: `search-${Date.now()}`,
        timestamp: Date.now(),
        imageUrl: previewUrl,
        imageFile: file,
        matches,
        searchDuration: 2000,
        status: 'completed'
      };

      setCurrentSearch(searchResult);
      
      // Save to history
      saveSearchHistory({
        id: searchResult.id,
        timestamp: searchResult.timestamp,
        imageUrl: previewUrl,
        resultCount: matches.length,
        topMatch: matches[0]?.product
      });

      saveSearchResult(searchResult);
      
      // Switch to results tab
      setActiveTab('results');
      updateStats();
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHistoryImageClick = async (imageUrl: string) => {
    setActiveTab('search');
    setIsAnalyzing(true);
    
    try {
      const matches = await analyzeImage(imageUrl);
      
      const searchResult: SearchResult = {
        id: `search-${Date.now()}`,
        timestamp: Date.now(),
        imageUrl,
        matches,
        searchDuration: 2000,
        status: 'completed'
      };

      setCurrentSearch(searchResult);
      
      saveSearchHistory({
        id: searchResult.id,
        timestamp: searchResult.timestamp,
        imageUrl,
        resultCount: matches.length,
        topMatch: matches[0]?.product
      });

      saveSearchResult(searchResult);
      setActiveTab('results');
      updateStats();
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ShopSnap</h1>
                <p className="text-xs text-gray-400">Visual Product Search</p>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalSearches}</div>
                <div className="text-xs text-gray-400">Searches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalProductsFound}</div>
                <div className="text-xs text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalWishlistItems}</div>
                <div className="text-xs text-gray-400">Wishlist</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${stats.totalSavings.toFixed(0)}</div>
                <div className="text-xs text-gray-400">Saved</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-[73px] z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'search', label: 'Search', icon: '🔍' },
              { id: 'results', label: 'Results', icon: '📊', badge: currentSearch?.matches.length },
              { id: 'wishlist', label: 'Wishlist', icon: '💝', badge: stats.totalWishlistItems },
              { id: 'history', label: 'History', icon: '🕐', badge: stats.totalSearches }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="animate-fadeIn">
            <CameraCapture onImageCapture={handleImageCapture} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="animate-fadeIn">
            {currentSearch && currentSearch.matches.length > 0 ? (
              <div>
                {/* Search Info */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
                  <div className="flex items-center gap-6">
                    {/* Image Preview */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {currentSearch.imageUrl.startsWith('data:') || currentSearch.imageUrl.startsWith('blob:') ? (
                        <img
                          src={currentSearch.imageUrl}
                          alt="Search"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">📷</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Found {currentSearch.matches.length} Matching Products
                      </h2>
                      <p className="text-gray-400">
                        Searched on {new Date(currentSearch.timestamp).toLocaleString()}
                      </p>
                    </div>

                    {/* New Search Button */}
                    <button
                      onClick={() => setActiveTab('search')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                    >
                      New Search
                    </button>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSearch.matches.map((match) => (
                    <ProductCard
                      key={match.product.id}
                      match={match}
                      onClick={() => setSelectedProduct(match.product)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Results Yet</h3>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  Upload an image to start searching for products
                </p>
                <button
                  onClick={() => setActiveTab('search')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Start Searching
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="animate-fadeIn">
            <Wishlist onProductClick={setSelectedProduct} />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="animate-fadeIn">
            <SearchHistory onImageClick={handleHistoryImageClick} />
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">📸</span>
              </div>
              <div>
                <div className="font-bold text-white">ShopSnap</div>
                <div className="text-xs text-gray-400">Visual Product Search & Price Comparison</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 ShopSnap. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
