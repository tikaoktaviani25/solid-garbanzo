import { SearchResult, WishlistItem, SearchHistoryItem, PriceAlert, UserPreferences } from '@/types';

const STORAGE_KEYS = {
  SEARCH_HISTORY: 'shopsnap_search_history',
  WISHLIST: 'shopsnap_wishlist',
  PRICE_ALERTS: 'shopsnap_price_alerts',
  USER_PREFERENCES: 'shopsnap_preferences',
  SEARCH_RESULTS: 'shopsnap_search_results'
};

// Search History
export function saveSearchHistory(item: SearchHistoryItem): void {
  if (typeof window === 'undefined') return;
  
  const history = getSearchHistory();
  history.unshift(item);
  
  // Keep only last 50 searches
  const trimmed = history.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(trimmed));
}

export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
  return data ? JSON.parse(data) : [];
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
}

export function deleteSearchHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;
  
  const history = getSearchHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(filtered));
}

// Wishlist
export function saveToWishlist(item: WishlistItem): void {
  if (typeof window === 'undefined') return;
  
  const wishlist = getWishlist();
  
  // Check if already exists
  const exists = wishlist.find(w => w.product.id === item.product.id);
  if (exists) return;
  
  wishlist.unshift(item);
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}

export function removeFromWishlist(productId: string): void {
  if (typeof window === 'undefined') return;
  
  const wishlist = getWishlist();
  const filtered = wishlist.filter(item => item.product.id !== productId);
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(filtered));
}

export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some(item => item.product.id === productId);
}

export function updateWishlistItem(productId: string, updates: Partial<WishlistItem>): void {
  if (typeof window === 'undefined') return;
  
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.product.id === productId);
  
  if (index !== -1) {
    wishlist[index] = { ...wishlist[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }
}

export function clearWishlist(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.WISHLIST);
}

// Price Alerts
export function savePriceAlert(alert: PriceAlert): void {
  if (typeof window === 'undefined') return;
  
  const alerts = getPriceAlerts();
  
  // Check if already exists
  const existingIndex = alerts.findIndex(a => 
    a.productId === alert.productId && a.storeId === alert.storeId
  );
  
  if (existingIndex !== -1) {
    alerts[existingIndex] = alert;
  } else {
    alerts.push(alert);
  }
  
  localStorage.setItem(STORAGE_KEYS.PRICE_ALERTS, JSON.stringify(alerts));
}

export function getPriceAlerts(): PriceAlert[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.PRICE_ALERTS);
  return data ? JSON.parse(data) : [];
}

export function deletePriceAlert(alertId: string): void {
  if (typeof window === 'undefined') return;
  
  const alerts = getPriceAlerts();
  const filtered = alerts.filter(alert => alert.id !== alertId);
  localStorage.setItem(STORAGE_KEYS.PRICE_ALERTS, JSON.stringify(filtered));
}

export function getActiveAlerts(): PriceAlert[] {
  return getPriceAlerts().filter(alert => alert.enabled);
}

// User Preferences
export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
}

export function getUserPreferences(): UserPreferences | null {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
  return data ? JSON.parse(data) : null;
}

// Search Results (temporary storage for current session)
export function saveSearchResult(result: SearchResult): void {
  if (typeof window === 'undefined') return;
  
  const results = getSearchResults();
  results.unshift(result);
  
  // Keep only last 10 results
  const trimmed = results.slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.SEARCH_RESULTS, JSON.stringify(trimmed));
}

export function getSearchResults(): SearchResult[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEYS.SEARCH_RESULTS);
  return data ? JSON.parse(data) : [];
}

export function getSearchResultById(id: string): SearchResult | undefined {
  const results = getSearchResults();
  return results.find(r => r.id === id);
}

export function clearSearchResults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SEARCH_RESULTS);
}

// Statistics
export function getAppStatistics() {
  const searchHistory = getSearchHistory();
  const wishlist = getWishlist();
  const priceAlerts = getPriceAlerts();

  const totalProductsFound = searchHistory.reduce((sum, item) => sum + item.resultCount, 0);
  
  // Calculate total savings from wishlist items with discounts
  const totalSavings = wishlist.reduce((sum, item) => {
    const savings = item.product.prices.reduce((priceSum, price) => {
      if (price.originalPrice && price.discount) {
        return priceSum + (price.originalPrice - price.price);
      }
      return priceSum;
    }, 0);
    return sum + savings;
  }, 0);

  return {
    totalSearches: searchHistory.length,
    totalProductsFound,
    totalWishlistItems: wishlist.length,
    totalPriceAlerts: priceAlerts.filter(a => a.enabled).length,
    totalSavings: Math.round(totalSavings * 100) / 100
  };
}
