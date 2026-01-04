'use client';

import { useState, useEffect } from 'react';
import { SearchHistoryItem } from '@/types';
import { getSearchHistory, clearSearchHistory, deleteSearchHistoryItem } from '@/lib/storage';

interface SearchHistoryProps {
  onImageClick: (imageUrl: string) => void;
}

export default function SearchHistory({ onImageClick }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const items = getSearchHistory();
    setHistory(items);
  };

  const handleClearAll = () => {
    clearSearchHistory();
    loadHistory();
    setShowClearConfirm(false);
  };

  const handleDelete = (id: string) => {
    deleteSearchHistoryItem(id);
    loadHistory();
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">No Search History</h3>
        <p className="text-gray-400 text-center max-w-md">
          Your search history will appear here once you start searching for products
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Search History</h2>
          <p className="text-gray-400">{history.length} searches</p>
        </div>
        
        <button
          onClick={() => setShowClearConfirm(true)}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 rounded-lg transition-all duration-300 font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">Clear Search History?</h3>
            <p className="text-gray-400 mb-6">
              This will permanently delete all your search history. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group"
          >
            {/* Image Preview */}
            <div
              onClick={() => onImageClick(item.imageUrl)}
              className="relative bg-gradient-to-br from-gray-700 to-gray-800 h-48 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {item.imageUrl.startsWith('data:') || item.imageUrl.startsWith('blob:') ? (
                <img
                  src={item.imageUrl}
                  alt="Search"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">📷</div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">Search Again</span>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Result Count Badge */}
              <div className="absolute bottom-3 left-3 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                {item.resultCount} {item.resultCount === 1 ? 'match' : 'matches'}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Date & Time */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date(item.timestamp).toLocaleString()}</span>
              </div>

              {/* Top Match */}
              {item.topMatch && (
                <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-400 mb-1">Top Match</div>
                  <div className="font-semibold text-white text-sm line-clamp-1">
                    {item.topMatch.name}
                  </div>
                  <div className="text-xs text-purple-400 mt-1">
                    {item.topMatch.brand}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onImageClick(item.imageUrl)}
                  className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Search Again
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-gray-700 hover:bg-red-500 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
