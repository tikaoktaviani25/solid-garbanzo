'use client';

import { Product } from '@/types';

interface SimilarProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function SimilarProducts({ products, onProductClick }: SimilarProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Similar Products</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-40 bg-slate-900/50 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4">
              <p className="text-xs text-purple-400 font-medium mb-1">{product.brand}</p>
              <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">{product.name}</h4>
              
              {product.avgRating && (
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.avgRating!) ? 'text-yellow-400' : 'text-slate-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{product.avgRating}</span>
                </div>
              )}
              
              <button className="w-full bg-slate-700 hover:bg-purple-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                Compare Prices
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
