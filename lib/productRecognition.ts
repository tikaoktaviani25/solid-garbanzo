import { Product, SearchResult, PriceData, PriceHistoryPoint, Retailer } from '@/types';
import { productDatabase, findSimilarProducts, getRandomProducts } from './productDatabase';

// Simulate AI product recognition from image
export function recognizeProduct(imageData: string): Product {
  // In a real app, this would call an AI API (Google Vision, AWS Rekognition, etc.)
  // For demo, we randomly select a product or use image characteristics
  
  // Simulate processing delay
  const randomIndex = Math.floor(Math.random() * productDatabase.length);
  return productDatabase[randomIndex];
}

// Generate realistic price data for multiple retailers
export function generatePriceData(product: Product): PriceData[] {
  const basePrice = getBasePrice(product);
  const retailers: Retailer[] = ['Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy', 'AliExpress'];
  
  const priceData: PriceData[] = retailers.map(retailer => {
    const priceVariation = 1 + (Math.random() * 0.4 - 0.2); // ±20% variation
    const price = Math.round(basePrice * priceVariation * 100) / 100;
    const hasDiscount = Math.random() > 0.6;
    const originalPrice = hasDiscount ? Math.round(price * 1.2 * 100) / 100 : undefined;
    const discount = hasDiscount ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : undefined;
    
    const availabilityOptions: PriceData['availability'][] = ['In Stock', 'In Stock', 'In Stock', 'Limited Stock', 'Out of Stock'];
    const availability = availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)];
    
    const shipping = availability === 'In Stock' ? (Math.random() > 0.5 ? 0 : Math.round(Math.random() * 15 * 100) / 100) : 0;
    const shippingTime = availability === 'In Stock' 
      ? shipping === 0 ? 'Free 2-day shipping' : `${Math.ceil(Math.random() * 7)} business days`
      : 'Currently unavailable';
    
    return {
      retailer,
      price,
      originalPrice,
      discount,
      availability,
      shipping,
      shippingTime,
      url: generateRetailerUrl(retailer, product),
      lastUpdated: new Date().toISOString()
    };
  });
  
  // Sort by total price (price + shipping)
  return priceData.sort((a, b) => (a.price + a.shipping) - (b.price + b.shipping));
}

// Generate price history for the last 30 days
export function generatePriceHistory(product: Product, currentPrices: PriceData[]): PriceHistoryPoint[] {
  const history: PriceHistoryPoint[] = [];
  const days = 30;
  
  currentPrices.slice(0, 3).forEach(priceData => {
    const currentPrice = priceData.price;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate price fluctuation
      const fluctuation = 1 + (Math.random() * 0.15 - 0.075); // ±7.5%
      const historicalPrice = Math.round(currentPrice * fluctuation * 100) / 100;
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: historicalPrice,
        retailer: priceData.retailer
      });
    }
  });
  
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Main function to perform product search
export async function performProductSearch(imageData: string): Promise<SearchResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Recognize product from image
  const product = recognizeProduct(imageData);
  
  // Generate price data
  const prices = generatePriceData(product);
  
  // Find similar products
  const similarProducts = findSimilarProducts(product, 6);
  
  // Generate price history
  const priceHistory = generatePriceHistory(product, prices);
  
  // Calculate confidence score (simulate AI confidence)
  const confidence = Math.round(85 + Math.random() * 14); // 85-99%
  
  return {
    id: `search-${Date.now()}`,
    product,
    prices,
    similarProducts,
    priceHistory,
    timestamp: new Date().toISOString(),
    imageUrl: imageData,
    confidence
  };
}

// Helper function to determine base price based on product category
function getBasePrice(product: Product): number {
  const priceRanges: Record<string, [number, number]> = {
    'Fashion': [30, 200],
    'Electronics': [100, 2000],
    'Home & Furniture': [50, 1500],
    'Beauty & Personal Care': [20, 400],
    'Sports & Outdoors': [40, 800],
    'Books & Media': [10, 300]
  };
  
  const [min, max] = priceRanges[product.category] || [50, 500];
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

// Helper function to generate retailer URLs
function generateRetailerUrl(retailer: Retailer, product: Product): string {
  const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');
  const baseUrls: Record<Retailer, string> = {
    'Amazon': 'https://amazon.com/dp/',
    'eBay': 'https://ebay.com/itm/',
    'Walmart': 'https://walmart.com/ip/',
    'Target': 'https://target.com/p/',
    'Best Buy': 'https://bestbuy.com/site/',
    'AliExpress': 'https://aliexpress.com/item/',
    'Local Store': '#'
  };
  
  return `${baseUrls[retailer]}${productSlug}-${product.id}`;
}

// Calculate savings compared to highest price
export function calculateSavings(prices: PriceData[]): number {
  if (prices.length < 2) return 0;
  
  const inStockPrices = prices.filter(p => p.availability === 'In Stock');
  if (inStockPrices.length < 2) return 0;
  
  const totalPrices = inStockPrices.map(p => p.price + p.shipping);
  const lowest = Math.min(...totalPrices);
  const highest = Math.max(...totalPrices);
  
  return Math.round((highest - lowest) * 100) / 100;
}

// Get best deal (lowest total price with in-stock availability)
export function getBestDeal(prices: PriceData[]): PriceData | null {
  const inStockPrices = prices.filter(p => p.availability === 'In Stock');
  if (inStockPrices.length === 0) return null;
  
  return inStockPrices.reduce((best, current) => {
    const bestTotal = best.price + best.shipping;
    const currentTotal = current.price + current.shipping;
    return currentTotal < bestTotal ? current : best;
  });
}
