'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { useCart } from '@/components/cart-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const [imgSrc, setImgSrc] = useState(product.image);
  const fallbacks = [
    `https://loremflickr.com/400/400/vegetable?lock=${product.id}`,
    `https://loremflickr.com/400/400/fruit?lock=${product.id}`,
    `https://loremflickr.com/400/400/dal?lock=${product.id}`,
    `https://loremflickr.com/400/400/chips?lock=${product.id}`
  ];
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = () => {
    if (fallbackIndex < fallbacks.length) {
      setImgSrc(fallbacks[fallbackIndex]);
      setFallbackIndex(prev => prev + 1);
    } else {
      setImgSrc('https://loremflickr.com/400/400/grocery');
    }
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-2 md:p-3 flex flex-col gap-2 md:gap-3 hover:shadow-lg transition-all hover:-translate-y-1 group relative">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0"></Link>
      <div className="relative z-10 aspect-square rounded-lg md:rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 md:p-4 pointer-events-none">
        <Image 
          src={imgSrc} 
          alt={product.name} 
          width={150} 
          height={150}
          className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300 w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
          referrerPolicy="no-referrer"
          onError={handleError}
        />
        <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-white/90 backdrop-blur-sm px-1.5 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100">
          {product.unit || '1 pc'}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col flex-1 justify-between gap-2 md:gap-3">
        <div className="pointer-events-none">
          <h3 className="text-xs md:text-sm font-semibold leading-tight text-gray-900 line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs md:text-sm border border-yellow-400 bg-yellow-50 px-1 md:px-2 rounded font-bold text-black tracking-tight">
            ₹{product.price}
          </span>
          
          {quantity > 0 ? (
            <div className="flex items-center bg-black text-white rounded-lg h-7 md:h-8 overflow-hidden shadow-sm">
              <button 
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-6 md:w-8 h-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 md:w-6 text-center text-[10px] md:text-xs font-bold font-mono">
                {quantity}
              </span>
              <button 
                onClick={() => addItem(product)}
                className="w-6 md:w-8 h-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addItem(product)}
              className="h-7 md:h-8 px-3 md:px-4 border border-black text-black text-[10px] md:text-xs font-bold rounded-lg hover:bg-[#FFD700] hover:border-[#FFD700] transition-colors shadow-sm"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
