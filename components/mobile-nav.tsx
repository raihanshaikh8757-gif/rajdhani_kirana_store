'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { useCart } from './cart-provider';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const { totalItems, setIsCartOpen, setIsLoginOpen, user } = useCart();
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[90] pb-safe">
      <div className="flex items-center justify-around h-16">
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-black' : 'text-gray-400'}`}>
          <Home className={`w-6 h-6 ${pathname === '/' ? 'fill-black' : ''}`} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        <button onClick={() => {
          const el = document.getElementById('categories');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-black">
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-bold">Categories</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400 hover:text-black relative"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#FFD700] text-black w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black border border-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </button>

        <button 
          onClick={() => !user && setIsLoginOpen(true)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${user ? 'text-black' : 'text-gray-400'} hover:text-black`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">{user ? user.name : 'Profile'}</span>
        </button>
      </div>
    </div>
  );
}
