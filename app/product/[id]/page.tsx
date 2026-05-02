'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products, productReviews } from '@/lib/data';
import { useCart } from '@/components/cart-provider';
import { Star, Truck, ShieldCheck, Clock, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) return notFound();

  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setReviewName('');
    setReviewComment('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div className="bg-gray-50 rounded-3xl p-8 flex items-center justify-center border border-gray-100 relative max-h-[600px]">
          <Image 
            src={imgSrc} 
            alt={product.name} 
            width={500} 
            height={500} 
            className="object-contain mix-blend-multiply w-full h-auto max-h-[500px]"
            onError={handleError}
          />
          <div className="absolute top-6 left-6 bg-[#FFD700] text-black font-black px-4 py-2 rounded-full shadow-md">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#FFD700]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-black font-bold ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-400 font-medium">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-black">₹{product.price}</span>
            <span className="text-xl text-gray-400 font-bold line-through mb-1">₹{product.originalPrice}</span>
          </div>

          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col gap-4 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <Clock className="w-6 h-6 text-[#FFD700]" /> Delivery in 10 minutes to Inderpuri, Patna
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <Truck className="w-6 h-6 text-[#FFD700]" /> Free delivery above ₹500
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <ShieldCheck className="w-6 h-6 text-[#FFD700]" /> 100% Genuine product guarantee
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="mt-4">
            {quantity > 0 ? (
              <div className="flex items-center bg-black text-white rounded-xl h-16 max-w-[200px] shadow-lg">
                <button 
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="flex-1 h-full flex items-center justify-center hover:bg-gray-800 transition-colors rounded-l-xl"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="flex-1 text-center text-xl font-bold font-mono">
                  {quantity}
                </span>
                <button 
                  onClick={() => addItem(product)}
                  className="flex-1 h-full flex items-center justify-center hover:bg-gray-800 transition-colors rounded-r-xl"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => addItem(product)}
                className="w-full md:w-auto px-12 py-5 bg-[#FFD700] hover:bg-yellow-400 text-black text-xl font-black rounded-xl shadow-lg hover:-translate-y-1 transition-all"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 pt-16 border-t border-gray-200">
        <h2 className="text-3xl font-black tracking-tight text-black flex items-center gap-3 mb-10">
          Customer Reviews
          <span className="w-12 h-1 bg-[#FFD700] block mt-1"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {productReviews.map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg text-black">{review.name}</span>
                  <span className="text-sm font-medium text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[#FFD700] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>

          {/* Write Review Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-black">Write a Review</h3>
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium border border-green-200">
                Thank you! Your review has been submitted for moderation.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2 text-[#FFD700]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        type="button" 
                        key={star} 
                        onClick={() => setReviewRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star className={`w-8 h-8 ${star <= reviewRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input 
                    required 
                    type="text" 
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all" 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Comment</label>
                  <textarea 
                    required 
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none transition-all min-h-[120px]" 
                    placeholder="Share your experience..." 
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl shadow-md transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
