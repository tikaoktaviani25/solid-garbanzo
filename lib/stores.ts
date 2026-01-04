import { Store } from '@/types';

export const STORES: Store[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '🛒',
    rating: 4.5,
    trustScore: 95,
    shippingInfo: 'Free shipping on orders over $25',
    returnPolicy: '30-day return policy'
  },
  {
    id: 'ebay',
    name: 'eBay',
    logo: '🏪',
    rating: 4.3,
    trustScore: 88,
    shippingInfo: 'Varies by seller',
    returnPolicy: 'Seller-specific return policy'
  },
  {
    id: 'walmart',
    name: 'Walmart',
    logo: '🏬',
    rating: 4.4,
    trustScore: 92,
    shippingInfo: 'Free 2-day shipping on orders over $35',
    returnPolicy: '90-day return policy'
  },
  {
    id: 'target',
    name: 'Target',
    logo: '🎯',
    rating: 4.6,
    trustScore: 93,
    shippingInfo: 'Free shipping on orders over $35',
    returnPolicy: '90-day return policy'
  },
  {
    id: 'bestbuy',
    name: 'Best Buy',
    logo: '💻',
    rating: 4.5,
    trustScore: 91,
    shippingInfo: 'Free shipping on most items',
    returnPolicy: '15-day return policy'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    logo: '🎨',
    rating: 4.7,
    trustScore: 89,
    shippingInfo: 'Varies by seller',
    returnPolicy: 'Seller-specific return policy'
  },
  {
    id: 'aliexpress',
    name: 'AliExpress',
    logo: '🌐',
    rating: 4.2,
    trustScore: 82,
    shippingInfo: 'Free shipping on most items',
    returnPolicy: '15-day return policy'
  },
  {
    id: 'zappos',
    name: 'Zappos',
    logo: '👟',
    rating: 4.8,
    trustScore: 96,
    shippingInfo: 'Free shipping and returns',
    returnPolicy: '365-day return policy'
  },
  {
    id: 'wayfair',
    name: 'Wayfair',
    logo: '🏠',
    rating: 4.4,
    trustScore: 87,
    shippingInfo: 'Free shipping on orders over $35',
    returnPolicy: '30-day return policy'
  },
  {
    id: 'nordstrom',
    name: 'Nordstrom',
    logo: '👗',
    rating: 4.7,
    trustScore: 94,
    shippingInfo: 'Free shipping and returns',
    returnPolicy: 'No time limit on returns'
  }
];

export function getStoreById(storeId: string): Store | undefined {
  return STORES.find(store => store.id === storeId);
}

export function getStoresByIds(storeIds: string[]): Store[] {
  return STORES.filter(store => storeIds.includes(store.id));
}
