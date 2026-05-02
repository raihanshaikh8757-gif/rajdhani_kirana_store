'use client';

import { Category } from '@/lib/data';
import * as Icons from 'lucide-react';

export function CategoryList({ categories }: { categories: Category[] }) {
  const scrollToCategory = (id: string) => {
    const el = document.getElementById(`category-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 py-4 md:py-8">
      {categories.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ElementType || Icons.Box;
        
        return (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className="flex flex-col items-center gap-2 md:gap-3 p-2 md:p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FFD700] hover:shadow-lg transition-all group"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#FFD700]/10 text-black group-hover:bg-[#FFD700] rounded-full flex items-center justify-center transition-colors">
              <IconComponent className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className="text-[10px] md:text-sm font-bold text-center leading-tight group-hover:text-black">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
