import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { MobileNav } from '@/components/mobile-nav';
import { FloatingCart } from '@/components/floating-cart';
import { LoginDialog } from '@/components/login-dialog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rajdhani Store - Quick Grocery Delivery',
  description: 'Rajdhani Store - Your online grocery store in Inderpuri, Patna delivering in minutes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`} suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <MobileNav />
          <FloatingCart />
          <LoginDialog />
        </CartProvider>
      </body>
    </html>
  );
}
