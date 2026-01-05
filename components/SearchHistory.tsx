'use client';

import { SearchHistoryItem } from '@/types';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSearchAgain: (id: string) => void;
  onClear: () => void;
}

export default function SearchHistory({ history, onSearchAgain, onClear }: SearchHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-24 h-24 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-white mb-2">No Search History</h3>
        <p className="text-slate-400 text-center max-w-md">
          Your recent searches will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Search History</h2>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSearchAgain(item.resultId)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <div className="relative h-40 bg-slate-900/50 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-semibold line-clamp-2">{item.productName}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="text-purple-400 font-medium group-hover:text-purple-300">
                  Search Again →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
