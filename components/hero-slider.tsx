'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: '50% OFF on Daily Essentials',
    subtitle: 'Stock up your pantry today',
    bg: 'bg-black text-[#FFD700]',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80'
  },
  {
    id: 2,
    title: 'Free Delivery in Inderpuri, Patna',
    subtitle: 'On all orders above ₹500',
    bg: 'bg-[#FFD700] text-black',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1920&q=80'
  },
  {
    id: 3,
    title: 'Fresh Grocery Delivered Fast',
    subtitle: 'From Rajdhani Store directly to your doorstep',
    bg: 'bg-white text-black border border-gray-200',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1920&q=80'
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[45vh] md:h-[calc(100vh-80px)] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 flex items-center justify-start p-6 md:p-24 ${slides[current].bg}`}
        >
          <div className="absolute inset-0 z-0">
             <img 
               src={slides[current].image} 
               alt="Offer" 
               className="w-full h-full object-cover object-center"
             />
             <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>

          <div className="relative z-20 flex flex-col items-start gap-3 md:gap-4 max-w-3xl text-white">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-7xl font-black tracking-tight leading-tight"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-2xl font-medium opacity-90"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 md:mt-6 px-6 py-3 md:px-8 md:py-4 bg-[#FFD700] text-black text-sm md:text-lg font-bold rounded shadow-lg hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-[#FFD700] hover:text-black text-white backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-[#FFD700] hover:text-black text-white backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'bg-[#FFD700] w-8' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
