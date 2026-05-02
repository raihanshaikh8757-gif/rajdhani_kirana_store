'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './product-card';

export function CategoryProductSlider({ categoryName, products }: { categoryName: string, products: any[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="flex flex-col gap-3 md:gap-4 py-2 md:py-4 relative group border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-black flex items-center gap-3">
          {categoryName}
          <span className="w-12 h-1 bg-[#FFD700] block mt-1"></span>
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border-2 border-black/10 flex items-center justify-center hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black transition-colors bg-white shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border-2 border-black/10 flex items-center justify-center hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black transition-colors bg-white shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden relative">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-3 md:gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[150px] max-w-[150px] md:min-w-[280px] md:max-w-[280px] snap-start shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
