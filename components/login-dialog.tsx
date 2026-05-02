'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from './cart-provider';

export function LoginDialog() {
  const { isLoginOpen, setIsLoginOpen, setUser } = useCart();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUser({ phone, name: 'User' });
      setIsLoginOpen(false);
      // Reset for next time
      setTimeout(() => {
        setStep('phone');
        setPhone('');
        setOtp('');
      }, 500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <button 
                onClick={() => setIsLoginOpen(false)} 
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="mb-6 flex flex-col items-center text-center mt-4">
                <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-black">
                  {step === 'phone' ? 'Login or Sign Up' : 'Verify OTP'}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  {step === 'phone' 
                    ? 'Enter your mobile number to proceed' 
                    : `We sent a 4-digit code to +91 ${phone}`}
                </p>
              </div>
              
              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-r border-gray-200 pr-3">
                      +91
                    </span>
                    <input 
                      autoFocus
                      required
                      type="tel" 
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-14 pl-[72px] pr-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#FFD700] focus:ring-0 outline-none transition-all font-bold tracking-widest text-lg"
                      placeholder="9999999999"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={phone.length < 10 || isLoading}
                    className="w-full h-14 bg-black text-white rounded-2xl font-bold tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                  <input 
                    autoFocus
                    required
                    type="text" 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-14 text-center bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#FFD700] focus:ring-0 outline-none transition-all font-black tracking-[1em] text-2xl"
                    placeholder="••••"
                  />
                  <button 
                    type="submit"
                    disabled={otp.length < 4 || isLoading}
                    className="w-full h-14 bg-[#FFD700] text-black rounded-2xl font-bold tracking-wide hover:bg-yellow-400 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-gray-500 hover:text-black mt-2 transition-colors"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[10px] font-medium text-gray-400">
                By continuing, you agree to our Terms of Service & Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
