// Product Categories
export type ProductCategory = 
  | 'Fashion'
  | 'Electronics'
  | 'Home & Furniture'
  | 'Beauty & Personal Care'
  | 'Sports & Outdoors'
  | 'Books & Media';

// Retailers
export type Retailer = 
  | 'Amazon'
  | 'eBay'
  | 'Walmart'
  | 'Target'
  | 'Best Buy'
  | 'AliExpress'
  | 'Local Store';

// Product Interface
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;
  description: string;
  features: string[];
  avgRating?: number;
  reviewCount?: number;
}

// Price Data Interface
export interface PriceData {
  retailer: Retailer;
  price: number;
  originalPrice?: number;
  discount?: number;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock' | 'Pre-Order';
  shipping: number;
  shippingTime: string;
  url: string;
  lastUpdated: string;
}

// Price History Point
export interface PriceHistoryPoint {
  date: string;
  price: number;
  retailer: Retailer;
}

// Search Result Interface
export interface SearchResult {
  id: string;
  product: Product;
  prices: PriceData[];
  similarProducts: Product[];
  priceHistory: PriceHistoryPoint[];
  timestamp: string;
  imageUrl?: string;
  confidence: number; // AI confidence score 0-100
}

// Wishlist Item Interface
export interface WishlistItem {
  id: string;
  product: Product;
  targetPrice?: number;
  alertEnabled: boolean;
  addedDate: string;
  currentBestPrice: number;
  currentBestRetailer: Retailer;
}

// Search History Item
export interface SearchHistoryItem {
  id: string;
  imageUrl: string;
  productName: string;
  timestamp: string;
  resultId: string;
}

// App State
export interface AppState {
  currentTab: 'search' | 'results' | 'wishlist' | 'history';
  searchResults: SearchResult[];
  wishlist: WishlistItem[];
  searchHistory: SearchHistoryItem[];
  isSearching: boolean;
  selectedResult: SearchResult | null;
}

// Filter Options
export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  retailers?: Retailer[];
  availability?: ('In Stock' | 'Out of Stock' | 'Limited Stock' | 'Pre-Order')[];
  sortBy: 'price-low' | 'price-high' | 'rating' | 'relevance';
}

// Statistics
export interface Statistics {
  totalSearches: number;
  totalProductsFound: number;
  averageSavings: number;
  wishlistItems: number;
  priceAlertsActive: number;
}
