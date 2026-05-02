'use client';

import { useCart } from './cart-provider';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { CheckoutDialog } from './checkout-dialog';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, totalItems, totalPrice, updateQuantity, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center border-2 border-black">
                    <ShoppingBag className="w-4 h-4 text-black" />
                  </div>
                  <h2 className="text-lg font-black tracking-tight">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 hide-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p className="font-medium text-black">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2 bg-[#FFD700] text-black font-bold rounded-full hover:scale-105 transition-transform border-2 border-black"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={64} 
                            height={64} 
                            className="object-contain w-full h-full mix-blend-multiply" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://loremflickr.com/64/64/grocery';
                              target.srcset = '';
                            }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="text-sm font-semibold leading-tight">{item.name}</h4>
                            <span className="text-xs text-gray-500">{item.unit || '1 pc'}</span>
                          </div>
                          <span className="font-bold text-sm tracking-tight">₹{item.price * item.quantity}</span>
                        </div>
                        <div className="flex flex-col justify-end">
                           <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-3 h-3 text-black" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-black border-x border-gray-200">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 transition-colors text-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Item total ({totalItems})</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Delivery charge</span>
                      <span className={totalPrice > 500 ? 'text-green-600' : ''}>
                        {totalPrice > 500 ? 'FREE' : '₹40'}
                      </span>
                    </div>
                    <div className="flex justify-between font-black text-lg pt-2 border-t border-gray-100">
                      <span>Grand Total</span>
                      <span>₹{totalPrice + (totalPrice > 500 ? 0 : 40)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-black text-white hover:bg-gray-900 active:scale-[0.98] transition-all py-4 rounded-xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-black/10"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutDialog 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(false);
          clearCart();
        }}
        total={totalPrice + (totalPrice > 500 ? 0 : 40)}
      />
    </>
  );
}
