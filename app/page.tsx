'use client';

import { useState, useEffect } from 'react';
import { SearchResult, WishlistItem, SearchHistoryItem, Product } from '@/types';
import { performProductSearch, generatePriceData, generatePriceHistory } from '@/lib/productRecognition';
import { findSimilarProducts } from '@/lib/productDatabase';
import {
  saveSearchResult,
  getSearchResults,
  saveToWishlist,
  getWishlist,
  removeFromWishlist,
  updateWishlistItem,
  isInWishlist,
  saveSearchHistory,
  getSearchHistory,
  clearSearchHistory,
  getStatistics
} from '@/lib/storage';

import ImageUpload from '@/components/ImageUpload';
import ProductCard from '@/components/ProductCard';
import PriceComparison from '@/components/PriceComparison';
import SimilarProducts from '@/components/SimilarProducts';
import PriceHistory from '@/components/PriceHistory';
import Wishlist from '@/components/Wishlist';
import SearchHistory from '@/components/SearchHistory';
import Dashboard from '@/components/Dashboard';

type Tab = 'search' | 'results' | 'wishlist' | 'history' | 'dashboard';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<Tab>('search');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchHistory, setSearchHistoryState] = useState<SearchHistoryItem[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setSearchResults(getSearchResults());
    setWishlist(getWishlist());
    setSearchHistoryState(getSearchHistory());
  }, []);

  const handleImageSelect = async (imageData: string) => {
    setIsSearching(true);
    
    try {
      const result = await performProductSearch(imageData);
      
      // Save to storage
      saveSearchResult(result);
      
      // Save to search history
      const historyItem: SearchHistoryItem = {
        id: `history-${Date.now()}`,
        imageUrl: imageData,
        productName: result.product.name,
        timestamp: result.timestamp,
        resultId: result.id
      };
      saveSearchHistory(historyItem);
      
      // Update state
      setSearchResults([result, ...searchResults]);
      setSearchHistoryState([historyItem, ...searchHistory]);
      setSelectedResult(result);
      setCurrentTab('results');
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to search product. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewDetails = (result: SearchResult) => {
    setSelectedResult(result);
    setCurrentTab('results');
  };

  const handleAddToWishlist = (result: SearchResult) => {
    if (isInWishlist(result.product.id)) {
      alert('Product is already in your wishlist!');
      return;
    }

    const bestPrice = result.prices
      .filter(p => p.availability === 'In Stock')
      .sort((a, b) => (a.price + a.shipping) - (b.price + b.shipping))[0];

    const wishlistItem: WishlistItem = {
      id: `wishlist-${Date.now()}`,
      product: result.product,
      targetPrice: undefined,
      alertEnabled: false,
      addedDate: new Date().toISOString(),
      currentBestPrice: bestPrice.price,
      currentBestRetailer: bestPrice.retailer
    };

    saveToWishlist(wishlistItem);
    setWishlist([wishlistItem, ...wishlist]);
    alert('Added to wishlist!');
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleToggleAlert = (id: string, enabled: boolean) => {
    updateWishlistItem(id, { alertEnabled: enabled });
    setWishlist(wishlist.map(item => 
      item.id === id ? { ...item, alertEnabled: enabled } : item
    ));
  };

  const handleSetTargetPrice = (id: string, price: number) => {
    updateWishlistItem(id, { targetPrice: price });
    setWishlist(wishlist.map(item => 
      item.id === id ? { ...item, targetPrice: price } : item
    ));
  };

  const handleSimilarProductClick = async (product: Product) => {
    setIsSearching(true);
    
    try {
      // Generate new search result for similar product
      const prices = generatePriceData(product);
      const similarProducts = findSimilarProducts(product, 6);
      const priceHistory = generatePriceHistory(product, prices);
      
      const result: SearchResult = {
        id: `search-${Date.now()}`,
        product,
        prices,
        similarProducts,
        priceHistory,
        timestamp: new Date().toISOString(),
        confidence: Math.round(85 + Math.random() * 14)
      };
      
      saveSearchResult(result);
      setSearchResults([result, ...searchResults]);
      setSelectedResult(result);
    } catch (error) {
      console.error('Failed to load similar product:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchAgain = (resultId: string) => {
    const result = searchResults.find(r => r.id === resultId);
    if (result) {
      setSelectedResult(result);
      setCurrentTab('results');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all search history?')) {
      clearSearchHistory();
      setSearchHistoryState([]);
    }
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ShopLens</h1>
                <p className="text-sm text-slate-400">AI Visual Product Search</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Searches:</span>
                <span className="text-white font-semibold">{stats.totalSearches}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Saved:</span>
                <span className="text-purple-400 font-semibold">${stats.averageSavings}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Wishlist:</span>
                <span className="text-pink-400 font-semibold">{stats.wishlistItems}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {[
              { id: 'search' as Tab, label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { id: 'results' as Tab, label: 'Results', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { id: 'wishlist' as Tab, label: 'Wishlist', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { id: 'history' as Tab, label: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'dashboard' as Tab, label: 'Dashboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  currentTab === tab.id
                    ? 'text-white border-b-2 border-purple-500 bg-slate-800/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
                {tab.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'search' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Find the Best Prices</h2>
              <p className="text-lg text-slate-400">
                Upload a product image and we&apos;ll find the best deals across multiple retailers
              </p>
            </div>
            <ImageUpload onImageSelect={handleImageSelect} isSearching={isSearching} />
          </div>
        )}

        {currentTab === 'results' && (
          <div>
            {selectedResult ? (
              <div className="space-y-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-lg px-3 py-1">
                      <span className="text-green-400 font-semibold text-sm">
                        {selectedResult.confidence}% Match
                      </span>
                    </div>
                    <span className="text-slate-400 text-sm">
                      Found {new Date(selectedResult.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <ProductCard
                    product={selectedResult.product}
                    prices={selectedResult.prices}
                    onViewDetails={() => {}}
                    onAddToWishlist={() => handleAddToWishlist(selectedResult)}
                    isInWishlist={isInWishlist(selectedResult.product.id)}
                  />
                </div>

                <PriceComparison prices={selectedResult.prices} />
                <PriceHistory history={selectedResult.priceHistory} />
                <SimilarProducts 
                  products={selectedResult.similarProducts} 
                  onProductClick={handleSimilarProductClick}
                />
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Recent Searches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map(result => (
                    <ProductCard
                      key={result.id}
                      product={result.product}
                      prices={result.prices}
                      onViewDetails={() => handleViewDetails(result)}
                      onAddToWishlist={() => handleAddToWishlist(result)}
                      isInWishlist={isInWishlist(result.product.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-24 h-24 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">No Results Yet</h3>
                <p className="text-slate-400 text-center max-w-md mb-6">
                  Upload a product image to start finding the best prices!
                </p>
                <button
                  onClick={() => setCurrentTab('search')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  Start Searching
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === 'wishlist' && (
          <Wishlist
            items={wishlist}
            onRemove={handleRemoveFromWishlist}
            onToggleAlert={handleToggleAlert}
            onSetTargetPrice={handleSetTargetPrice}
          />
        )}

        {currentTab === 'history' && (
          <SearchHistory
            history={searchHistory}
            onSearchAgain={handleSearchAgain}
            onClear={handleClearHistory}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard stats={stats} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-semibold mb-1">ShopLens - AI Visual Product Search</p>
              <p className="text-sm text-slate-400">Find the best prices with a single photo</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>v1.0.0</span>
              <span>•</span>
              <span>{stats.totalSearches} searches</span>
              <span>•</span>
              <span>${stats.averageSavings} avg savings</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
