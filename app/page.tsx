import { HeroSlider } from '@/components/hero-slider';
import { CategoryList } from '@/components/category-list';
import { CategoryProductSlider } from '@/components/category-product-slider';
import { categories, products, productReviews } from '@/lib/data';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col font-sans w-full">
      
      {/* 100vh Hero Slider */}
      <section>
        <HeroSlider />
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Grid */}
        <section id="categories" className="py-4 md:py-8 border-b border-gray-200 scroll-mt-20">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black flex items-center gap-3">
              Shop by Category
              <span className="w-12 h-1 bg-[#FFD700] block mt-1"></span>
            </h2>
          </div>
          <CategoryList categories={categories} />
        </section>

        {/* Product Sliders per Category */}
        <div className="flex flex-col gap-2 md:gap-4 py-2 md:py-4">
          {categories.map(category => {
            const categoryProducts = products.filter(p => p.categoryId === category.id);
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category.id} id={`category-${category.id}`} className="scroll-mt-24">
                <CategoryProductSlider 
                  categoryName={category.name} 
                  products={categoryProducts} 
                />
              </div>
            );
          })}
        </div>

        {/* Customer Reviews Section */}
        <section className="py-8 md:py-16 border-t border-gray-200">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black inline-flex flex-col items-center gap-2">
              Customer Reviews
              <span className="w-16 h-1 bg-[#FFD700] block"></span>
            </h2>
            <p className="mt-4 text-gray-500 font-medium">What our customers in Inderpuri, Patna say about us.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.slice(0, 6).map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#FFD700] transition-colors">
                <div className="flex items-center gap-1 text-[#FFD700] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 font-medium mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="font-bold text-black">{review.name}</span>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
