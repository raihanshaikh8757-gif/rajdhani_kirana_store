'use client';

import { useCart } from './cart-provider';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingCart() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="md:hidden fixed bottom-20 left-4 right-4 z-[80]"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#FFD700] text-black rounded-xl p-4 flex items-center justify-between shadow-lg shadow-[#FFD700]/20 border-2 border-black"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-bold leading-tight">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                <span className="text-xs font-black tracking-tight">₹{totalPrice}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 font-black text-sm uppercase tracking-wider">
              View Cart
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
