import { SearchResult, WishlistItem, SearchHistoryItem } from '@/types';

// LocalStorage keys
const STORAGE_KEYS = {
  SEARCH_RESULTS: 'shoplens_search_results',
  WISHLIST: 'shoplens_wishlist',
  SEARCH_HISTORY: 'shoplens_search_history'
};

// Search Results Storage
export function saveSearchResult(result: SearchResult): void {
  if (typeof window === 'undefined') return;
  
  const existing = getSearchResults();
  const updated = [result, ...existing].slice(0, 50); // Keep last 50 searches
  localStorage.setItem(STORAGE_KEYS.SEARCH_RESULTS, JSON.stringify(updated));
}

export function getSearchResults(): SearchResult[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteSearchResult(id: string): void {
  if (typeof window === 'undefined') return;
  
  const existing = getSearchResults();
  const updated = existing.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.SEARCH_RESULTS, JSON.stringify(updated));
}

export function clearSearchResults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SEARCH_RESULTS);
}

// Wishlist Storage
export function saveToWishlist(item: WishlistItem): void {
  if (typeof window === 'undefined') return;
  
  const existing = getWishlist();
  const updated = [item, ...existing];
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
}

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function removeFromWishlist(id: string): void {
  if (typeof window === 'undefined') return;
  
  const existing = getWishlist();
  const updated = existing.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
}

export function updateWishlistItem(id: string, updates: Partial<WishlistItem>): void {
  if (typeof window === 'undefined') return;
  
  const existing = getWishlist();
  const updated = existing.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
}

export function isInWishlist(productId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const wishlist = getWishlist();
  return wishlist.some(item => item.product.id === productId);
}

// Search History Storage
export function saveSearchHistory(item: SearchHistoryItem): void {
  if (typeof window === 'undefined') return;
  
  const existing = getSearchHistory();
  const updated = [item, ...existing].slice(0, 20); // Keep last 20 searches
  localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
}

export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
}

// Statistics
export function getStatistics() {
  const searchResults = getSearchResults();
  const wishlist = getWishlist();
  
  const totalProductsFound = searchResults.reduce((sum, result) => 
    sum + 1 + result.similarProducts.length, 0
  );
  
  const averageSavings = searchResults.length > 0
    ? searchResults.reduce((sum, result) => {
        const prices = result.prices.filter(p => p.availability === 'In Stock');
        if (prices.length < 2) return sum;
        const totalPrices = prices.map(p => p.price + p.shipping);
        const savings = Math.max(...totalPrices) - Math.min(...totalPrices);
        return sum + savings;
      }, 0) / searchResults.length
    : 0;
  
  const priceAlertsActive = wishlist.filter(item => item.alertEnabled).length;
  
  return {
    totalSearches: searchResults.length,
    totalProductsFound,
    averageSavings: Math.round(averageSavings * 100) / 100,
    wishlistItems: wishlist.length,
    priceAlertsActive
  };
}
