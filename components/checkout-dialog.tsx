'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, MapPin } from 'lucide-react';

export function CheckoutDialog({ 
  isOpen, 
  onClose, 
  onSuccess,
  total
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSuccess: () => void;
  total: number;
}) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Inderpuri, Patna', // Default as requested
    paymentMethod: 'cod'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        setStep('form');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            {step === 'form' && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FFD700]">
                  <h3 className="text-lg font-black tracking-tight text-black">Checkout Securely</h3>
                  <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 tracking-tight uppercase">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-sm font-medium"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 tracking-tight uppercase">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-sm font-medium"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 tracking-tight uppercase">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <textarea 
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-sm font-medium resize-none"
                          rows={2}
                          placeholder="Complete address details"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
                    <label className="block text-xs font-bold text-gray-700 tracking-tight uppercase">Payment Method</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-black bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="cod" 
                          checked={formData.paymentMethod === 'cod'}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          className="hidden"
                        />
                         <span className={`text-sm font-bold ${formData.paymentMethod === 'cod' ? 'text-black' : 'text-gray-500'}`}>Cash on Delivery</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.paymentMethod === 'online' ? 'border-black bg-white shadow-sm' : 'border-transparent hover:bg-gray-100'}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="online" 
                          checked={formData.paymentMethod === 'online'}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                          className="hidden"
                        />
                        <span className={`text-sm font-bold ${formData.paymentMethod === 'online' ? 'text-black' : 'text-gray-500'}`}>Pay Online (Demo)</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-3.5 rounded-xl font-bold tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all flex justify-between items-center px-6 mt-2"
                  >
                    <span>Place Order</span>
                    <span>₹{total}</span>
                  </button>
                </form>
              </>
            )}

            {step === 'processing' && (
              <div className="p-12 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-[#FFD700] animate-spin" />
                <p className="text-lg font-bold text-black animate-pulse">Processing your order...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="p-12 flex flex-col items-center justify-center gap-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </motion.div>
                <div>
                   <h3 className="text-2xl font-black text-black tracking-tight mb-2">Order Placed!</h3>
                   <p className="text-gray-500 font-medium text-sm">Your groceries will be delivered in 10 minutes.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
