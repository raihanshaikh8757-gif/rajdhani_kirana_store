import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-24 md:pb-8 border-t-[6px] border-[#FFD700]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Store */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter uppercase text-white">
                Rajdhani<span className="text-black bg-[#FFD700] px-2 py-1 ml-1 rounded">Store</span>
              </span>
            </Link>
            <p className="text-gray-400 mt-2 font-medium">
              Your one-stop destination for daily essentials, fresh groceries, and fast delivery in Inderpuri, Patna.
            </p>
            <div className="flex gap-4 mt-4 text-[#FFD700]">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#FFD700]">Categories</h3>
            <ul className="flex flex-col gap-3 text-gray-400 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Atta & Rice</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dal & Pulses</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Oil & Ghee</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Snacks & Beverages</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Personal Care</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#FFD700]">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-gray-400 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#FFD700]">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-gray-400 font-medium mt-2">
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-[#FFD700] shrink-0" />
                <span>Inderpuri, Patna<br/>Bihar, India - 800024</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FFD700] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FFD700] shrink-0" />
                <span>support@rajdhanistore.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Rajdhani Store. All rights reserved.</p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png" alt="RuPay" className="h-6 bg-white px-2 py-1 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/UPI-Logo.png/1200px-UPI-Logo.png" alt="UPI" className="h-6 bg-white px-2 py-1 rounded" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 bg-white px-2 py-1 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
}
