// Product Categories
export type ProductCategory = 
  | 'Fashion'
  | 'Electronics'
  | 'Home & Living'
  | 'Beauty'
  | 'Sports'
  | 'Accessories'
  | 'Furniture'
  | 'Toys'
  | 'Books'
  | 'Other';

// Product Condition
export type ProductCondition = 'New' | 'Like New' | 'Used' | 'Refurbished';

// Store/Retailer Information
export interface Store {
  id: string;
  name: string;
  logo: string;
  rating: number;
  trustScore: number;
  shippingInfo: string;
  returnPolicy: string;
}

// Price Information
export interface PriceInfo {
  storeId: string;
  storeName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock' | 'Pre-Order';
  shippingCost: number;
  estimatedDelivery: string;
  url: string;
}

// Product Information
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  images: string[];
  prices: PriceInfo[];
  rating: number;
  reviewCount: number;
  condition: ProductCondition;
  attributes: {
    color?: string;
    size?: string;
    material?: string;
    weight?: string;
    dimensions?: string;
    [key: string]: string | undefined;
  };
  tags: string[];
  sku?: string;
  upc?: string;
}

// Search Result
export interface SearchResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  imageFile?: File;
  matches: ProductMatch[];
  searchDuration: number;
  status: 'analyzing' | 'completed' | 'failed';
}

// Product Match (from image analysis)
export interface ProductMatch {
  product: Product;
  confidence: number;
  matchReason: string;
  visualSimilarity: number;
}

// Wishlist Item
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: number;
  notes?: string;
  priceAlert?: {
    enabled: boolean;
    targetPrice: number;
    notified: boolean;
  };
}

// Search History Item
export interface SearchHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  resultCount: number;
  topMatch?: Product;
}

// Price Alert
export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  storeId: string;
  storeName: string;
  enabled: boolean;
  createdAt: number;
  lastChecked: number;
}

// User Preferences
export interface UserPreferences {
  preferredStores: string[];
  maxPrice?: number;
  preferredCategories: ProductCategory[];
  notifications: {
    priceAlerts: boolean;
    newMatches: boolean;
    backInStock: boolean;
  };
}

// App Statistics
export interface AppStatistics {
  totalSearches: number;
  totalProductsFound: number;
  totalWishlistItems: number;
  totalPriceAlerts: number;
  averageConfidence: number;
  mostSearchedCategory: ProductCategory;
  totalSavings: number;
}

// Filter Options
export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: {
    min: number;
    max: number;
  };
  stores: string[];
  condition: ProductCondition[];
  minRating: number;
  inStockOnly: boolean;
}

// Sort Options
export type SortOption = 
  | 'relevance'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating'
  | 'popularity'
  | 'newest';

// Tab Navigation
export type TabType = 'search' | 'results' | 'wishlist' | 'history' | 'settings';
