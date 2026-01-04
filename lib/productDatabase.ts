import { Product, PriceInfo, ProductCategory } from '@/types';

// Helper function to generate random prices
function generatePrices(basePrice: number, storeIds: string[]): PriceInfo[] {
  const storeNames: Record<string, string> = {
    amazon: 'Amazon',
    ebay: 'eBay',
    walmart: 'Walmart',
    target: 'Target',
    bestbuy: 'Best Buy',
    etsy: 'Etsy',
    aliexpress: 'AliExpress',
    zappos: 'Zappos',
    wayfair: 'Wayfair',
    nordstrom: 'Nordstrom'
  };

  return storeIds.map(storeId => {
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const price = Math.round(basePrice * (1 + variation) * 100) / 100;
    const hasDiscount = Math.random() > 0.6;
    const originalPrice = hasDiscount ? Math.round(price * 1.2 * 100) / 100 : undefined;
    const discount = hasDiscount ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : undefined;
    
    const availabilityOptions: PriceInfo['availability'][] = ['In Stock', 'In Stock', 'In Stock', 'Limited Stock', 'Out of Stock'];
    const availability = availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)];
    
    return {
      storeId,
      storeName: storeNames[storeId],
      price,
      originalPrice,
      discount,
      currency: 'USD',
      availability,
      shippingCost: Math.random() > 0.5 ? 0 : Math.round(Math.random() * 10 * 100) / 100,
      estimatedDelivery: `${Math.ceil(Math.random() * 7)} days`,
      url: `https://${storeId}.com/product/${Math.random().toString(36).substring(7)}`
    };
  });
}

export const PRODUCTS: Product[] = [
  // Fashion - Shoes
  {
    id: 'prod-001',
    name: 'Classic White Sneakers',
    brand: 'Nike',
    category: 'Fashion',
    description: 'Timeless white leather sneakers with comfortable cushioning and iconic design.',
    images: ['👟'],
    prices: generatePrices(89.99, ['amazon', 'zappos', 'nordstrom', 'target']),
    rating: 4.7,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'White',
      size: 'US 8-12',
      material: 'Leather',
      weight: '1.2 lbs'
    },
    tags: ['sneakers', 'casual', 'sports', 'white']
  },
  {
    id: 'prod-002',
    name: 'Running Shoes Pro',
    brand: 'Adidas',
    category: 'Fashion',
    description: 'High-performance running shoes with advanced cushioning technology.',
    images: ['👟'],
    prices: generatePrices(129.99, ['amazon', 'bestbuy', 'zappos', 'walmart']),
    rating: 4.8,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Black/Red',
      size: 'US 7-13',
      material: 'Mesh/Synthetic',
      weight: '0.9 lbs'
    },
    tags: ['running', 'sports', 'athletic', 'performance']
  },
  
  // Fashion - Clothing
  {
    id: 'prod-003',
    name: 'Denim Jacket Classic',
    brand: "Levi's",
    category: 'Fashion',
    description: 'Iconic denim jacket with vintage wash and comfortable fit.',
    images: ['🧥'],
    prices: generatePrices(79.99, ['amazon', 'target', 'nordstrom', 'walmart']),
    rating: 4.6,
    reviewCount: 1523,
    condition: 'New',
    attributes: {
      color: 'Blue',
      size: 'S-XXL',
      material: 'Denim',
      weight: '1.5 lbs'
    },
    tags: ['jacket', 'denim', 'casual', 'vintage']
  },
  {
    id: 'prod-004',
    name: 'Cotton T-Shirt Pack',
    brand: 'Hanes',
    category: 'Fashion',
    description: 'Premium cotton t-shirts in pack of 3, soft and breathable.',
    images: ['👕'],
    prices: generatePrices(24.99, ['amazon', 'walmart', 'target', 'ebay']),
    rating: 4.5,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Multi',
      size: 'S-XXL',
      material: '100% Cotton',
      weight: '0.8 lbs'
    },
    tags: ['t-shirt', 'basic', 'cotton', 'pack']
  },
  {
    id: 'prod-005',
    name: 'Leather Handbag',
    brand: 'Michael Kors',
    category: 'Fashion',
    description: 'Elegant leather handbag with multiple compartments and adjustable strap.',
    images: ['👜'],
    prices: generatePrices(249.99, ['nordstrom', 'amazon', 'ebay', 'target']),
    rating: 4.7,
    reviewCount: 892,
    condition: 'New',
    attributes: {
      color: 'Brown',
      material: 'Genuine Leather',
      dimensions: '12x10x5 inches'
    },
    tags: ['handbag', 'leather', 'luxury', 'accessories']
  },

  // Electronics
  {
    id: 'prod-006',
    name: 'Wireless Earbuds Pro',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio.',
    images: ['🎧'],
    prices: generatePrices(249.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.8,
    reviewCount: 5234,
    condition: 'New',
    attributes: {
      color: 'White',
      weight: '0.2 lbs',
      material: 'Plastic/Silicone'
    },
    tags: ['earbuds', 'wireless', 'audio', 'noise-cancelling']
  },
  {
    id: 'prod-007',
    name: 'Smart Watch Series 9',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Advanced smartwatch with health tracking, GPS, and cellular connectivity.',
    images: ['⌚'],
    prices: generatePrices(399.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.9,
    reviewCount: 4123,
    condition: 'New',
    attributes: {
      color: 'Midnight',
      size: '41mm/45mm',
      material: 'Aluminum'
    },
    tags: ['smartwatch', 'fitness', 'health', 'wearable']
  },
  {
    id: 'prod-008',
    name: 'Laptop 15" Ultra',
    brand: 'Dell',
    category: 'Electronics',
    description: 'Powerful laptop with Intel i7, 16GB RAM, 512GB SSD, perfect for work and gaming.',
    images: ['💻'],
    prices: generatePrices(899.99, ['amazon', 'bestbuy', 'walmart', 'ebay']),
    rating: 4.6,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'Silver',
      weight: '4.2 lbs',
      dimensions: '14x9.5x0.7 inches'
    },
    tags: ['laptop', 'computer', 'work', 'gaming']
  },
  {
    id: 'prod-009',
    name: 'Smartphone 5G Pro',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Latest 5G smartphone with 6.8" display, 128GB storage, and triple camera.',
    images: ['📱'],
    prices: generatePrices(799.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 3892,
    condition: 'New',
    attributes: {
      color: 'Phantom Black',
      weight: '0.5 lbs',
      dimensions: '6.4x3x0.3 inches'
    },
    tags: ['smartphone', '5g', 'android', 'camera']
  },
  {
    id: 'prod-010',
    name: '4K Smart TV 55"',
    brand: 'LG',
    category: 'Electronics',
    description: 'Ultra HD 4K Smart TV with HDR, webOS, and built-in streaming apps.',
    images: ['📺'],
    prices: generatePrices(599.99, ['amazon', 'bestbuy', 'walmart', 'target']),
    rating: 4.8,
    reviewCount: 1923,
    condition: 'New',
    attributes: {
      color: 'Black',
      dimensions: '48.5x28x2.5 inches',
      weight: '35 lbs'
    },
    tags: ['tv', '4k', 'smart', 'entertainment']
  },

  // Home & Living
  {
    id: 'prod-011',
    name: 'Coffee Maker Deluxe',
    brand: 'Keurig',
    category: 'Home & Living',
    description: 'Single-serve coffee maker with multiple brew sizes and auto-off feature.',
    images: ['☕'],
    prices: generatePrices(129.99, ['amazon', 'walmart', 'target', 'bestbuy']),
    rating: 4.6,
    reviewCount: 2876,
    condition: 'New',
    attributes: {
      color: 'Black',
      weight: '6 lbs',
      dimensions: '10x13x13 inches'
    },
    tags: ['coffee', 'kitchen', 'appliance', 'brewing']
  },
  {
    id: 'prod-012',
    name: 'Vacuum Cleaner Robot',
    brand: 'iRobot',
    category: 'Home & Living',
    description: 'Smart robot vacuum with mapping, scheduling, and app control.',
    images: ['🤖'],
    prices: generatePrices(349.99, ['amazon', 'bestbuy', 'walmart', 'target']),
    rating: 4.7,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Black',
      weight: '7.5 lbs',
      dimensions: '13.5x13.5x3.5 inches'
    },
    tags: ['vacuum', 'robot', 'cleaning', 'smart-home']
  },
  {
    id: 'prod-013',
    name: 'Air Purifier HEPA',
    brand: 'Dyson',
    category: 'Home & Living',
    description: 'Advanced air purifier with HEPA filter, removes 99.97% of allergens.',
    images: ['💨'],
    prices: generatePrices(449.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.8,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'White/Silver',
      weight: '10 lbs',
      dimensions: '8x8x40 inches'
    },
    tags: ['air-purifier', 'hepa', 'health', 'home']
  },
  {
    id: 'prod-014',
    name: 'Bedding Set Queen',
    brand: 'Brooklinen',
    category: 'Home & Living',
    description: 'Luxury bedding set with duvet cover, pillowcases, and fitted sheet.',
    images: ['🛏️'],
    prices: generatePrices(199.99, ['amazon', 'target', 'wayfair', 'nordstrom']),
    rating: 4.7,
    reviewCount: 1234,
    condition: 'New',
    attributes: {
      color: 'Navy Blue',
      size: 'Queen',
      material: '100% Cotton'
    },
    tags: ['bedding', 'sheets', 'bedroom', 'luxury']
  },
  {
    id: 'prod-015',
    name: 'Kitchen Knife Set',
    brand: 'Wüsthof',
    category: 'Home & Living',
    description: 'Professional 7-piece knife set with wooden block and sharpener.',
    images: ['🔪'],
    prices: generatePrices(299.99, ['amazon', 'walmart', 'target', 'wayfair']),
    rating: 4.9,
    reviewCount: 987,
    condition: 'New',
    attributes: {
      color: 'Silver/Wood',
      material: 'Stainless Steel',
      weight: '5 lbs'
    },
    tags: ['knives', 'kitchen', 'cooking', 'professional']
  },

  // Beauty
  {
    id: 'prod-016',
    name: 'Skincare Set Premium',
    brand: 'Clinique',
    category: 'Beauty',
    description: 'Complete skincare routine with cleanser, toner, and moisturizer.',
    images: ['💄'],
    prices: generatePrices(89.99, ['amazon', 'nordstrom', 'target', 'walmart']),
    rating: 4.6,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'N/A',
      material: 'Various',
      weight: '1 lb'
    },
    tags: ['skincare', 'beauty', 'cosmetics', 'routine']
  },
  {
    id: 'prod-017',
    name: 'Hair Dryer Professional',
    brand: 'Dyson',
    category: 'Beauty',
    description: 'High-speed hair dryer with intelligent heat control and multiple attachments.',
    images: ['💇'],
    prices: generatePrices(429.99, ['amazon', 'nordstrom', 'bestbuy', 'target']),
    rating: 4.8,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Fuchsia/Nickel',
      weight: '1.8 lbs',
      dimensions: '9.6x3.8x3 inches'
    },
    tags: ['hair-dryer', 'beauty', 'styling', 'professional']
  },
  {
    id: 'prod-018',
    name: 'Makeup Palette Pro',
    brand: 'Urban Decay',
    category: 'Beauty',
    description: 'Professional eyeshadow palette with 12 highly pigmented shades.',
    images: ['🎨'],
    prices: generatePrices(54.99, ['amazon', 'nordstrom', 'target', 'ebay']),
    rating: 4.7,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Multi',
      weight: '0.3 lbs',
      dimensions: '6x4x0.5 inches'
    },
    tags: ['makeup', 'eyeshadow', 'palette', 'cosmetics']
  },

  // Sports
  {
    id: 'prod-019',
    name: 'Yoga Mat Premium',
    brand: 'Lululemon',
    category: 'Sports',
    description: 'Extra-thick yoga mat with superior grip and cushioning.',
    images: ['🧘'],
    prices: generatePrices(78.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 2134,
    condition: 'New',
    attributes: {
      color: 'Purple',
      size: '72x24 inches',
      material: 'TPE',
      weight: '2.5 lbs'
    },
    tags: ['yoga', 'fitness', 'exercise', 'mat']
  },
  {
    id: 'prod-020',
    name: 'Dumbbell Set Adjustable',
    brand: 'Bowflex',
    category: 'Sports',
    description: 'Adjustable dumbbells from 5-52.5 lbs, space-saving design.',
    images: ['🏋️'],
    prices: generatePrices(349.99, ['amazon', 'walmart', 'target', 'bestbuy']),
    rating: 4.7,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'Black/Red',
      weight: '52.5 lbs each',
      material: 'Steel/Plastic'
    },
    tags: ['dumbbells', 'weights', 'fitness', 'strength']
  },
  {
    id: 'prod-021',
    name: 'Fitness Tracker Band',
    brand: 'Fitbit',
    category: 'Sports',
    description: 'Activity tracker with heart rate monitor, sleep tracking, and GPS.',
    images: ['⌚'],
    prices: generatePrices(149.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.6,
    reviewCount: 3892,
    condition: 'New',
    attributes: {
      color: 'Black',
      size: 'S/L',
      weight: '0.1 lbs'
    },
    tags: ['fitness', 'tracker', 'health', 'wearable']
  },

  // Accessories
  {
    id: 'prod-022',
    name: 'Sunglasses Aviator',
    brand: 'Ray-Ban',
    category: 'Accessories',
    description: 'Classic aviator sunglasses with UV protection and polarized lenses.',
    images: ['🕶️'],
    prices: generatePrices(169.99, ['amazon', 'nordstrom', 'target', 'ebay']),
    rating: 4.8,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'Gold/Green',
      material: 'Metal/Glass',
      weight: '0.2 lbs'
    },
    tags: ['sunglasses', 'aviator', 'fashion', 'uv-protection']
  },
  {
    id: 'prod-023',
    name: 'Leather Wallet',
    brand: 'Fossil',
    category: 'Accessories',
    description: 'Genuine leather bifold wallet with RFID protection.',
    images: ['👛'],
    prices: generatePrices(49.99, ['amazon', 'nordstrom', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Brown',
      material: 'Genuine Leather',
      dimensions: '4.5x3.5x0.5 inches'
    },
    tags: ['wallet', 'leather', 'rfid', 'accessories']
  },
  {
    id: 'prod-024',
    name: 'Backpack Travel',
    brand: 'Osprey',
    category: 'Accessories',
    description: 'Durable travel backpack with laptop compartment and multiple pockets.',
    images: ['🎒'],
    prices: generatePrices(129.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 2134,
    condition: 'New',
    attributes: {
      color: 'Black',
      material: 'Nylon',
      dimensions: '20x12x8 inches',
      weight: '2 lbs'
    },
    tags: ['backpack', 'travel', 'laptop', 'durable']
  },

  // Furniture
  {
    id: 'prod-025',
    name: 'Office Chair Ergonomic',
    brand: 'Herman Miller',
    category: 'Furniture',
    description: 'Premium ergonomic office chair with lumbar support and adjustable features.',
    images: ['🪑'],
    prices: generatePrices(799.99, ['amazon', 'wayfair', 'target', 'walmart']),
    rating: 4.9,
    reviewCount: 1234,
    condition: 'New',
    attributes: {
      color: 'Black',
      material: 'Mesh/Aluminum',
      weight: '45 lbs',
      dimensions: '27x27x40 inches'
    },
    tags: ['chair', 'office', 'ergonomic', 'furniture']
  },
  {
    id: 'prod-026',
    name: 'Standing Desk Electric',
    brand: 'Uplift',
    category: 'Furniture',
    description: 'Electric height-adjustable standing desk with memory presets.',
    images: ['🖥️'],
    prices: generatePrices(599.99, ['amazon', 'wayfair', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 987,
    condition: 'New',
    attributes: {
      color: 'Bamboo',
      material: 'Wood/Steel',
      dimensions: '60x30 inches',
      weight: '85 lbs'
    },
    tags: ['desk', 'standing', 'adjustable', 'office']
  },
  {
    id: 'prod-027',
    name: 'Bookshelf Modern',
    brand: 'IKEA',
    category: 'Furniture',
    description: 'Modern 5-tier bookshelf with open design and sturdy construction.',
    images: ['📚'],
    prices: generatePrices(149.99, ['amazon', 'wayfair', 'target', 'walmart']),
    rating: 4.6,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'White',
      material: 'Engineered Wood',
      dimensions: '60x30x12 inches',
      weight: '50 lbs'
    },
    tags: ['bookshelf', 'storage', 'furniture', 'modern']
  },

  // Toys
  {
    id: 'prod-028',
    name: 'LEGO Creator Set',
    brand: 'LEGO',
    category: 'Toys',
    description: 'Advanced LEGO building set with 1000+ pieces for ages 10+.',
    images: ['🧱'],
    prices: generatePrices(89.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.9,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Multi',
      weight: '3 lbs',
      dimensions: '15x10x3 inches'
    },
    tags: ['lego', 'building', 'toys', 'creative']
  },
  {
    id: 'prod-029',
    name: 'RC Car Racing',
    brand: 'Traxxas',
    category: 'Toys',
    description: 'High-speed remote control car with rechargeable battery.',
    images: ['🏎️'],
    prices: generatePrices(199.99, ['amazon', 'target', 'walmart', 'bestbuy']),
    rating: 4.7,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Red',
      weight: '4 lbs',
      dimensions: '18x12x8 inches'
    },
    tags: ['rc-car', 'remote-control', 'racing', 'toys']
  },
  {
    id: 'prod-030',
    name: 'Board Game Strategy',
    brand: 'Hasbro',
    category: 'Toys',
    description: 'Classic strategy board game for 2-4 players, ages 8+.',
    images: ['🎲'],
    prices: generatePrices(34.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'Multi',
      weight: '2 lbs',
      dimensions: '15x10x2 inches'
    },
    tags: ['board-game', 'strategy', 'family', 'toys']
  },

  // Books
  {
    id: 'prod-031',
    name: 'Bestseller Novel',
    brand: 'Penguin Random House',
    category: 'Books',
    description: 'Award-winning fiction novel, hardcover edition.',
    images: ['📖'],
    prices: generatePrices(27.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.7,
    reviewCount: 5234,
    condition: 'New',
    attributes: {
      color: 'N/A',
      weight: '1.2 lbs',
      dimensions: '9x6x1.5 inches'
    },
    tags: ['book', 'fiction', 'bestseller', 'hardcover']
  },
  {
    id: 'prod-032',
    name: 'Cookbook Healthy',
    brand: 'America\'s Test Kitchen',
    category: 'Books',
    description: 'Comprehensive healthy cooking guide with 200+ recipes.',
    images: ['📚'],
    prices: generatePrices(32.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'N/A',
      weight: '2 lbs',
      dimensions: '10x8x1 inches'
    },
    tags: ['cookbook', 'healthy', 'recipes', 'cooking']
  },

  // Additional Fashion Items
  {
    id: 'prod-033',
    name: 'Winter Coat Puffer',
    brand: 'The North Face',
    category: 'Fashion',
    description: 'Insulated puffer coat with water-resistant exterior and hood.',
    images: ['🧥'],
    prices: generatePrices(249.99, ['amazon', 'nordstrom', 'target', 'walmart']),
    rating: 4.8,
    reviewCount: 1234,
    condition: 'New',
    attributes: {
      color: 'Black',
      size: 'S-XXL',
      material: 'Polyester/Down',
      weight: '2.5 lbs'
    },
    tags: ['coat', 'winter', 'puffer', 'warm']
  },
  {
    id: 'prod-034',
    name: 'Dress Casual Summer',
    brand: 'Zara',
    category: 'Fashion',
    description: 'Lightweight summer dress with floral pattern and comfortable fit.',
    images: ['👗'],
    prices: generatePrices(59.99, ['amazon', 'nordstrom', 'target', 'ebay']),
    rating: 4.6,
    reviewCount: 987,
    condition: 'New',
    attributes: {
      color: 'Floral',
      size: 'XS-XL',
      material: 'Cotton/Linen',
      weight: '0.5 lbs'
    },
    tags: ['dress', 'summer', 'casual', 'floral']
  },
  {
    id: 'prod-035',
    name: 'Jeans Slim Fit',
    brand: "Levi's",
    category: 'Fashion',
    description: 'Classic slim fit jeans with stretch denim for comfort.',
    images: ['👖'],
    prices: generatePrices(69.99, ['amazon', 'nordstrom', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'Dark Blue',
      size: '28-38',
      material: 'Denim/Elastane',
      weight: '1.2 lbs'
    },
    tags: ['jeans', 'denim', 'slim-fit', 'casual']
  },

  // Additional Electronics
  {
    id: 'prod-036',
    name: 'Tablet 10" Pro',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'High-performance tablet with S Pen, 128GB storage, and 10" display.',
    images: ['📱'],
    prices: generatePrices(449.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 2134,
    condition: 'New',
    attributes: {
      color: 'Graphite',
      weight: '1.1 lbs',
      dimensions: '9.7x6.3x0.3 inches'
    },
    tags: ['tablet', 'android', 'stylus', 'productivity']
  },
  {
    id: 'prod-037',
    name: 'Gaming Console Next-Gen',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Latest gaming console with 4K gaming, 1TB storage, and wireless controller.',
    images: ['🎮'],
    prices: generatePrices(499.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.9,
    reviewCount: 5234,
    condition: 'New',
    attributes: {
      color: 'White',
      weight: '9.9 lbs',
      dimensions: '15.4x10.2x4.1 inches'
    },
    tags: ['gaming', 'console', '4k', 'entertainment']
  },
  {
    id: 'prod-038',
    name: 'Wireless Keyboard Mouse',
    brand: 'Logitech',
    category: 'Electronics',
    description: 'Ergonomic wireless keyboard and mouse combo with long battery life.',
    images: ['⌨️'],
    prices: generatePrices(79.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.6,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Black',
      weight: '2 lbs',
      material: 'Plastic'
    },
    tags: ['keyboard', 'mouse', 'wireless', 'computer']
  },

  // Additional Home & Living
  {
    id: 'prod-039',
    name: 'Blender High-Speed',
    brand: 'Vitamix',
    category: 'Home & Living',
    description: 'Professional-grade blender with variable speed control and self-cleaning.',
    images: ['🥤'],
    prices: generatePrices(449.99, ['amazon', 'target', 'walmart', 'bestbuy']),
    rating: 4.9,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Black',
      weight: '10.5 lbs',
      dimensions: '8x9x18 inches'
    },
    tags: ['blender', 'kitchen', 'smoothie', 'appliance']
  },
  {
    id: 'prod-040',
    name: 'Throw Pillows Set',
    brand: 'West Elm',
    category: 'Home & Living',
    description: 'Decorative throw pillows set of 4 with removable covers.',
    images: ['🛋️'],
    prices: generatePrices(79.99, ['amazon', 'wayfair', 'target', 'nordstrom']),
    rating: 4.7,
    reviewCount: 1234,
    condition: 'New',
    attributes: {
      color: 'Multi',
      size: '18x18 inches',
      material: 'Cotton/Polyester'
    },
    tags: ['pillows', 'decor', 'living-room', 'home']
  },

  // Additional Beauty
  {
    id: 'prod-041',
    name: 'Perfume Luxury',
    brand: 'Chanel',
    category: 'Beauty',
    description: 'Iconic luxury perfume with floral notes, 3.4 oz bottle.',
    images: ['💐'],
    prices: generatePrices(135.99, ['amazon', 'nordstrom', 'target', 'ebay']),
    rating: 4.8,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'N/A',
      weight: '0.5 lbs',
      dimensions: '4x2x6 inches'
    },
    tags: ['perfume', 'fragrance', 'luxury', 'beauty']
  },
  {
    id: 'prod-042',
    name: 'Electric Toothbrush',
    brand: 'Oral-B',
    category: 'Beauty',
    description: 'Rechargeable electric toothbrush with pressure sensor and timer.',
    images: ['🪥'],
    prices: generatePrices(89.99, ['amazon', 'target', 'walmart', 'bestbuy']),
    rating: 4.7,
    reviewCount: 3892,
    condition: 'New',
    attributes: {
      color: 'White',
      weight: '0.5 lbs',
      dimensions: '9x3x3 inches'
    },
    tags: ['toothbrush', 'electric', 'dental', 'health']
  },

  // Additional Sports
  {
    id: 'prod-043',
    name: 'Tennis Racket Pro',
    brand: 'Wilson',
    category: 'Sports',
    description: 'Professional tennis racket with graphite frame and comfortable grip.',
    images: ['🎾'],
    prices: generatePrices(199.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 987,
    condition: 'New',
    attributes: {
      color: 'Black/Red',
      weight: '11 oz',
      material: 'Graphite'
    },
    tags: ['tennis', 'racket', 'sports', 'professional']
  },
  {
    id: 'prod-044',
    name: 'Bicycle Mountain 27.5"',
    brand: 'Trek',
    category: 'Sports',
    description: 'Mountain bike with 21-speed gears, front suspension, and disc brakes.',
    images: ['🚴'],
    prices: generatePrices(599.99, ['amazon', 'walmart', 'target', 'ebay']),
    rating: 4.7,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'Blue',
      weight: '35 lbs',
      material: 'Aluminum'
    },
    tags: ['bicycle', 'mountain-bike', 'cycling', 'outdoor']
  },

  // Additional Accessories
  {
    id: 'prod-045',
    name: 'Watch Chronograph',
    brand: 'Citizen',
    category: 'Accessories',
    description: 'Stainless steel chronograph watch with date display and water resistance.',
    images: ['⌚'],
    prices: generatePrices(299.99, ['amazon', 'nordstrom', 'target', 'ebay']),
    rating: 4.8,
    reviewCount: 1876,
    condition: 'New',
    attributes: {
      color: 'Silver',
      material: 'Stainless Steel',
      weight: '0.4 lbs'
    },
    tags: ['watch', 'chronograph', 'accessories', 'luxury']
  },
  {
    id: 'prod-046',
    name: 'Belt Leather Classic',
    brand: 'Coach',
    category: 'Accessories',
    description: 'Genuine leather belt with reversible design and signature buckle.',
    images: ['👔'],
    prices: generatePrices(78.99, ['amazon', 'nordstrom', 'target', 'walmart']),
    rating: 4.7,
    reviewCount: 1234,
    condition: 'New',
    attributes: {
      color: 'Black/Brown',
      material: 'Genuine Leather',
      size: '32-42'
    },
    tags: ['belt', 'leather', 'accessories', 'reversible']
  },

  // Additional Furniture
  {
    id: 'prod-047',
    name: 'Sofa 3-Seater Modern',
    brand: 'Article',
    category: 'Furniture',
    description: 'Contemporary 3-seater sofa with velvet upholstery and wooden legs.',
    images: ['🛋️'],
    prices: generatePrices(1299.99, ['amazon', 'wayfair', 'target', 'walmart']),
    rating: 4.8,
    reviewCount: 987,
    condition: 'New',
    attributes: {
      color: 'Navy Blue',
      material: 'Velvet/Wood',
      dimensions: '84x36x33 inches',
      weight: '120 lbs'
    },
    tags: ['sofa', 'couch', 'furniture', 'modern']
  },
  {
    id: 'prod-048',
    name: 'Dining Table Set',
    brand: 'IKEA',
    category: 'Furniture',
    description: 'Dining table with 4 chairs, modern design with easy assembly.',
    images: ['🍽️'],
    prices: generatePrices(499.99, ['amazon', 'wayfair', 'target', 'walmart']),
    rating: 4.6,
    reviewCount: 1654,
    condition: 'New',
    attributes: {
      color: 'Oak',
      material: 'Wood',
      dimensions: '60x36x30 inches',
      weight: '85 lbs'
    },
    tags: ['dining-table', 'furniture', 'chairs', 'modern']
  },

  // Additional Toys
  {
    id: 'prod-049',
    name: 'Drone Camera 4K',
    brand: 'DJI',
    category: 'Toys',
    description: 'Camera drone with 4K video, GPS, and 30-minute flight time.',
    images: ['🚁'],
    prices: generatePrices(799.99, ['amazon', 'bestbuy', 'target', 'walmart']),
    rating: 4.9,
    reviewCount: 2341,
    condition: 'New',
    attributes: {
      color: 'White',
      weight: '1.6 lbs',
      dimensions: '12x8x3 inches'
    },
    tags: ['drone', 'camera', '4k', 'aerial']
  },
  {
    id: 'prod-050',
    name: 'Action Figure Collection',
    brand: 'Marvel',
    category: 'Toys',
    description: 'Collectible action figures set with 6 superhero characters.',
    images: ['🦸'],
    prices: generatePrices(129.99, ['amazon', 'target', 'walmart', 'ebay']),
    rating: 4.8,
    reviewCount: 3421,
    condition: 'New',
    attributes: {
      color: 'Multi',
      weight: '2 lbs',
      dimensions: '12x10x3 inches'
    },
    tags: ['action-figures', 'collectible', 'marvel', 'toys']
  }
];

// Helper functions
export function getProductById(productId: string): Product | undefined {
  return PRODUCTS.find(p => p.id === productId);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRandomProducts(count: number): Product[] {
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getBestDeals(count: number = 10): Product[] {
  return [...PRODUCTS]
    .filter(p => p.prices.some(price => price.discount && price.discount > 20))
    .sort((a, b) => {
      const aMaxDiscount = Math.max(...a.prices.filter(p => p.discount).map(p => p.discount!));
      const bMaxDiscount = Math.max(...b.prices.filter(p => p.discount).map(p => p.discount!));
      return bMaxDiscount - aMaxDiscount;
    })
    .slice(0, count);
}

export function getLowestPrice(product: Product): PriceInfo | undefined {
  return product.prices
    .filter(p => p.availability === 'In Stock')
    .sort((a, b) => a.price - b.price)[0];
}
