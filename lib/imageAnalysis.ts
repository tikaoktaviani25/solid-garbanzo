import { Product, ProductMatch, ProductCategory } from '@/types';
import { PRODUCTS, getRandomProducts } from './productDatabase';

// Simulate AI image analysis with realistic delays and confidence scores
export async function analyzeImage(imageFile: File | string): Promise<ProductMatch[]> {
  // Simulate processing time (1-3 seconds)
  const processingTime = 1000 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, processingTime));

  // Determine category based on "image analysis" (simulated)
  const category = detectCategory();
  
  // Get products from detected category
  const categoryProducts = PRODUCTS.filter(p => p.category === category);
  
  // If category has products, use them; otherwise use random products
  const candidateProducts = categoryProducts.length > 0 
    ? categoryProducts 
    : getRandomProducts(10);

  // Generate 3-5 matches with varying confidence scores
  const matchCount = 3 + Math.floor(Math.random() * 3);
  const matches: ProductMatch[] = [];

  // Shuffle and select products
  const shuffled = [...candidateProducts].sort(() => Math.random() - 0.5);
  const selectedProducts = shuffled.slice(0, matchCount);

  selectedProducts.forEach((product, index) => {
    // First match has highest confidence (70-95%)
    // Subsequent matches have decreasing confidence
    const baseConfidence = 95 - (index * 15);
    const confidence = Math.max(50, baseConfidence - Math.random() * 10);
    
    // Visual similarity score (slightly different from confidence)
    const visualSimilarity = Math.max(60, confidence - 5 + Math.random() * 10);

    // Generate match reason
    const matchReason = generateMatchReason(product, confidence);

    matches.push({
      product,
      confidence: Math.round(confidence * 10) / 10,
      matchReason,
      visualSimilarity: Math.round(visualSimilarity * 10) / 10
    });
  });

  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence);
}

// Simulate category detection from image
function detectCategory(): ProductCategory {
  const categories: ProductCategory[] = [
    'Fashion',
    'Electronics',
    'Home & Living',
    'Beauty',
    'Sports',
    'Accessories',
    'Furniture',
    'Toys',
    'Books'
  ];

  // Weighted random selection (Fashion and Electronics more common)
  const weights = [25, 20, 15, 10, 10, 10, 5, 3, 2];
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < categories.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return categories[i];
    }
  }

  return 'Fashion'; // Fallback
}

// Generate realistic match reasons
function generateMatchReason(product: Product, confidence: number): string {
  const reasons = [];

  // Add reasons based on confidence level
  if (confidence > 85) {
    reasons.push('Exact visual match');
    reasons.push(`${product.brand} logo detected`);
  } else if (confidence > 70) {
    reasons.push('Strong visual similarity');
    reasons.push('Matching design elements');
  } else {
    reasons.push('Similar style and appearance');
    reasons.push('Comparable features');
  }

  // Add product-specific reasons
  if (product.attributes.color) {
    reasons.push(`Color: ${product.attributes.color}`);
  }

  if (product.category === 'Fashion') {
    reasons.push('Pattern and texture match');
  } else if (product.category === 'Electronics') {
    reasons.push('Device shape recognition');
  } else if (product.category === 'Furniture') {
    reasons.push('Structural design match');
  }

  // Return 2-3 random reasons
  const shuffled = reasons.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2 + Math.floor(Math.random() * 2)).join(', ');
}

// Analyze image from URL (for uploaded images)
export async function analyzeImageFromUrl(imageUrl: string): Promise<ProductMatch[]> {
  return analyzeImage(imageUrl);
}

// Find similar products based on a product
export function findSimilarProducts(product: Product, count: number = 5): Product[] {
  // Find products in same category
  const sameCategory = PRODUCTS.filter(p => 
    p.id !== product.id && 
    p.category === product.category
  );

  // Find products with similar price range (±30%)
  const minPrice = Math.min(...product.prices.map(p => p.price)) * 0.7;
  const maxPrice = Math.max(...product.prices.map(p => p.price)) * 1.3;

  const similarPrice = sameCategory.filter(p => {
    const productMinPrice = Math.min(...p.prices.map(pr => pr.price));
    return productMinPrice >= minPrice && productMinPrice <= maxPrice;
  });

  // If we have enough similar products, use them
  if (similarPrice.length >= count) {
    return similarPrice.sort(() => Math.random() - 0.5).slice(0, count);
  }

  // Otherwise, fill with same category products
  const remaining = count - similarPrice.length;
  const additional = sameCategory
    .filter(p => !similarPrice.includes(p))
    .sort(() => Math.random() - 0.5)
    .slice(0, remaining);

  return [...similarPrice, ...additional];
}

// Extract dominant colors from image (simulated)
export async function extractColors(imageFile: File | string): Promise<string[]> {
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return random colors
  const colors = [
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 
    'Gray', 'Brown', 'Pink', 'Purple', 'Orange', 'Navy'
  ];

  const count = 2 + Math.floor(Math.random() * 3);
  return colors.sort(() => Math.random() - 0.5).slice(0, count);
}

// Detect product attributes from image (simulated)
export async function detectAttributes(imageFile: File | string): Promise<Record<string, string>> {
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 800));

  const attributes: Record<string, string> = {};

  // Randomly add detected attributes
  if (Math.random() > 0.5) {
    const colors = ['Black', 'White', 'Blue', 'Red', 'Gray', 'Brown'];
    attributes.color = colors[Math.floor(Math.random() * colors.length)];
  }

  if (Math.random() > 0.6) {
    const materials = ['Leather', 'Cotton', 'Polyester', 'Metal', 'Plastic', 'Wood'];
    attributes.material = materials[Math.floor(Math.random() * materials.length)];
  }

  if (Math.random() > 0.7) {
    const conditions = ['New', 'Like New', 'Used'];
    attributes.condition = conditions[Math.floor(Math.random() * conditions.length)];
  }

  return attributes;
}
