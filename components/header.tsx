'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from './cart-provider';

export function Header() {
  const { totalItems, setIsCartOpen, setIsLoginOpen, user } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFD700] text-black shadow-md">
      {/* Desktop Header */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
              Rajdhani<span className="text-white bg-black px-2 py-1 ml-1 rounded">Store</span>
            </span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl flex items-center relative">
          <input 
            type="text" 
            placeholder="Search for groceries, essentials..." 
            className="w-full h-12 pl-5 pr-12 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-black/50 text-black font-medium"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black text-[#FFD700] rounded-full hover:bg-gray-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Login & Cart */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-2 font-bold cursor-default">
              <User className="w-6 h-6 text-black" />
              <span>{user.name}</span>
            </div>
          ) : (
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
              <User className="w-6 h-6" />
              <span>Login</span>
            </button>
          )}
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 md:px-5 md:py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-[#FFD700] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Header (Mobile First Pattern) */}
      <div className="md:hidden flex flex-col px-4 pt-3 pb-4 gap-3">
        <div className="flex items-center justify-between mb-1">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-black tracking-tighter uppercase">
              Rajdhani<span className="text-white bg-black px-1.5 py-0.5 ml-1 rounded text-sm">Store</span>
            </span>
          </Link>
          <button onClick={() => !user && setIsLoginOpen(true)} className={`w-9 h-9 ${user ? 'bg-[#FFD700]' : 'bg-black text-white'} rounded-full flex items-center justify-center shadow-sm`}>
            <User className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-black text-lg tracking-tight">
              Delivery in 10 mins
            </div>
            <div className="flex items-center gap-1 text-sm font-medium opacity-80 cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[200px]">Inderpuri, Patna, Bihar</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative w-full mt-1">
          <input 
            type="text" 
            placeholder="Search 'Milk', 'Bread'..." 
            className="w-full h-12 pl-5 pr-12 rounded-xl border border-black/20 focus:outline-none focus:ring-2 focus:ring-black/50 text-black font-medium shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#FFD700] text-black border border-black/10 rounded-lg">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
