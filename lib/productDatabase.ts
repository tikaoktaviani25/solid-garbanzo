import { Product, ProductCategory } from '@/types';

// Comprehensive mock product database
export const productDatabase: Product[] = [
  // Fashion - Shoes
  {
    id: 'fashion-001',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colors.',
    features: ['Air Max cushioning', 'Breathable mesh upper', 'Rubber outsole', 'Lightweight design'],
    avgRating: 4.5,
    reviewCount: 2847
  },
  {
    id: 'fashion-002',
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    description: 'Experience energy return like never before with Boost cushioning technology. The Ultraboost 22 features a Primeknit upper that adapts to your foot for a supportive fit.',
    features: ['Boost cushioning', 'Primeknit upper', 'Continental rubber outsole', 'Torsion system'],
    avgRating: 4.7,
    reviewCount: 3521
  },
  {
    id: 'fashion-003',
    name: 'Levi\'s 501 Original Jeans',
    brand: 'Levi\'s',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'The original blue jean since 1873. The 501 Original is an iconic straight fit jean that sits at the waist with a regular fit through the hip and thigh.',
    features: ['100% cotton denim', 'Button fly', 'Classic 5-pocket design', 'Straight leg'],
    avgRating: 4.6,
    reviewCount: 5234
  },
  {
    id: 'fashion-004',
    name: 'Ray-Ban Aviator Classic',
    brand: 'Ray-Ban',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
    description: 'The iconic Ray-Ban Aviator sunglasses with classic metal frame and crystal lenses. Originally designed for pilots, now a timeless fashion statement.',
    features: ['UV protection', 'Metal frame', 'Crystal lenses', 'Adjustable nose pads'],
    avgRating: 4.8,
    reviewCount: 4123
  },

  // Electronics
  {
    id: 'electronics-001',
    name: 'Apple AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
    description: 'Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio immerse you in sound. The Apple-designed H2 chip helps to create smarter noise cancellation.',
    features: ['Active Noise Cancellation', 'Adaptive Transparency', 'Spatial Audio', 'Up to 6 hours battery'],
    avgRating: 4.7,
    reviewCount: 8934
  },
  {
    id: 'electronics-002',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
    description: 'Industry-leading noise cancellation with two processors controlling 8 microphones. Up to 30-hour battery life with quick charging.',
    features: ['Industry-leading ANC', '30-hour battery', 'Multipoint connection', 'Premium sound quality'],
    avgRating: 4.8,
    reviewCount: 6721
  },
  {
    id: 'electronics-003',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    description: 'The ultimate smartphone with 200MP camera, S Pen, and AI-powered features. 6.8" Dynamic AMOLED display with 120Hz refresh rate.',
    features: ['200MP camera', 'S Pen included', 'Snapdragon 8 Gen 3', '5000mAh battery'],
    avgRating: 4.6,
    reviewCount: 3456
  },
  {
    id: 'electronics-004',
    name: 'MacBook Pro 14" M3',
    brand: 'Apple',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    description: 'Supercharged by M3 chip. Up to 22 hours battery life. Liquid Retina XDR display. The most advanced Mac laptop ever.',
    features: ['M3 chip', '14" Liquid Retina XDR', 'Up to 22hr battery', 'Three Thunderbolt 4 ports'],
    avgRating: 4.9,
    reviewCount: 2134
  },
  {
    id: 'electronics-005',
    name: 'iPad Pro 12.9" M2',
    brand: 'Apple',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    description: 'The ultimate iPad experience with M2 chip and stunning Liquid Retina XDR display. Works with Apple Pencil and Magic Keyboard.',
    features: ['M2 chip', '12.9" Liquid Retina XDR', 'ProMotion 120Hz', 'Face ID'],
    avgRating: 4.8,
    reviewCount: 1876
  },

  // Home & Furniture
  {
    id: 'home-001',
    name: 'Dyson V15 Detect',
    brand: 'Dyson',
    category: 'Home & Furniture',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    description: 'Intelligent cordless vacuum with laser detection and LCD screen showing real-time particle count. Up to 60 minutes run time.',
    features: ['Laser detection', 'LCD screen', '60min runtime', 'HEPA filtration'],
    avgRating: 4.6,
    reviewCount: 2341
  },
  {
    id: 'home-002',
    name: 'Instant Pot Duo Plus',
    brand: 'Instant Pot',
    category: 'Home & Furniture',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
    description: '9-in-1 programmable pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warmer, sterilizer, and sous vide.',
    features: ['9-in-1 functionality', '6 quart capacity', 'Stainless steel', 'Dishwasher safe'],
    avgRating: 4.7,
    reviewCount: 12456
  },
  {
    id: 'home-003',
    name: 'Herman Miller Aeron Chair',
    brand: 'Herman Miller',
    category: 'Home & Furniture',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    description: 'Iconic ergonomic office chair with PostureFit SL support, 8Z Pellicle suspension, and fully adjustable arms. 12-year warranty.',
    features: ['PostureFit SL', '8Z Pellicle mesh', 'Fully adjustable', '12-year warranty'],
    avgRating: 4.9,
    reviewCount: 3421
  },

  // Beauty & Personal Care
  {
    id: 'beauty-001',
    name: 'Dyson Airwrap Complete',
    brand: 'Dyson',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
    description: 'Multi-styler for multiple hair types. Curl, wave, smooth, and dry with no extreme heat. Includes 6 attachments.',
    features: ['Coanda effect styling', 'No extreme heat', '6 attachments', 'Intelligent heat control'],
    avgRating: 4.5,
    reviewCount: 5678
  },
  {
    id: 'beauty-002',
    name: 'Olaplex Hair Repair Treatment',
    brand: 'Olaplex',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    description: 'Professional-quality hair repair treatment that rebuilds broken bonds. Suitable for all hair types.',
    features: ['Bond-building technology', 'All hair types', 'Cruelty-free', 'Vegan formula'],
    avgRating: 4.8,
    reviewCount: 8923
  },

  // Sports & Outdoors
  {
    id: 'sports-001',
    name: 'Peloton Bike+',
    brand: 'Peloton',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    description: 'Premium indoor cycling bike with rotating HD touchscreen, Auto-Follow resistance, and access to thousands of live and on-demand classes.',
    features: ['23.8" rotating touchscreen', 'Auto-Follow resistance', 'Apple GymKit', 'Dolby Atmos speakers'],
    avgRating: 4.7,
    reviewCount: 4532
  },
  {
    id: 'sports-002',
    name: 'Yeti Rambler 30oz',
    brand: 'Yeti',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    description: 'Insulated stainless steel tumbler with MagSlider lid. Keeps drinks cold for 24 hours, hot for 6 hours.',
    features: ['Double-wall insulation', 'Dishwasher safe', 'No sweat design', 'MagSlider lid'],
    avgRating: 4.8,
    reviewCount: 9234
  },
  {
    id: 'sports-003',
    name: 'GoPro HERO12 Black',
    brand: 'GoPro',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=400',
    description: 'Revolutionary action camera with 5.3K60 video, HyperSmooth 6.0 stabilization, and waterproof to 33ft.',
    features: ['5.3K60 video', 'HyperSmooth 6.0', 'Waterproof 33ft', 'HDR photo & video'],
    avgRating: 4.6,
    reviewCount: 3421
  },

  // Books & Media
  {
    id: 'books-001',
    name: 'Kindle Paperwhite (11th Gen)',
    brand: 'Amazon',
    category: 'Books & Media',
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400',
    description: 'Now with a 6.8" display and adjustable warm light. Waterproof and with weeks of battery life. Access to millions of books.',
    features: ['6.8" glare-free display', 'Adjustable warm light', 'Waterproof IPX8', 'Weeks of battery'],
    avgRating: 4.7,
    reviewCount: 15234
  },
  {
    id: 'books-002',
    name: 'Bose QuietComfort Earbuds II',
    brand: 'Bose',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    description: 'Personalized noise cancellation and sound. CustomTune technology auto-adjusts to your ears. Up to 6 hours battery life.',
    features: ['Personalized ANC', 'CustomTune technology', '6hr battery', 'IPX4 water resistant'],
    avgRating: 4.6,
    reviewCount: 4123
  }
];

// Function to get random products
export function getRandomProducts(count: number): Product[] {
  const shuffled = [...productDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return productDatabase.filter(p => p.category === category);
}

// Function to find similar products
export function findSimilarProducts(product: Product, count: number = 4): Product[] {
  const similar = productDatabase.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.brand === product.brand)
  );
  return similar.slice(0, count);
}

// Function to search products by name or brand
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return productDatabase.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}
