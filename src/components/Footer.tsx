"use client";

import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#113E21] text-white pt-16 pb-8 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand Description Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center bg-white">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-[#113E21]" fill="currentColor">
                <path d="M50 15 C52 22 46 26 42 22 C38 18 45 12 50 15 Z" className="fill-[#3B7A57]" />
                <path d="M58 18 C62 24 57 28 53 25 C49 22 54 15 58 18 Z" className="fill-[#8FA89B]" />
                <text x="50" y="55" fontFamily="'Cormorant Garamond', serif" fontSize="15" fontWeight="bold" fontStyle="italic" textAnchor="middle" className="fill-[#113E21]">Herbs</text>
                <text x="50" y="70" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="1.5" className="fill-[#3B7A57]">ZEN</text>
              </svg>
            </div>
            <span className="font-serif text-lg font-bold tracking-wide">
              HERBSZEN
            </span>
          </div>
          <p className="text-white/70 text-xs leading-relaxed max-w-sm">
            HERBSZEN PRIVATE LIMITED is committed to bringing the therapeutic healing power of Ayurveda into modern lifestyles through carefully formulated wellness products. 100% natural, scientifically standardized, and chromatography-verified.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-white" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-white" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-white" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.716 3.745 12 3.745 12 3.745s-7.717 0-9.478.398c-.98.272-1.748 1.04-2.02 2.02C0 7.925 0 12 0 12s0 4.075.398 5.837c.272.98 1.04 1.748 2.02 2.02 1.761.398 9.478.398 9.478.398s7.716 0 9.478-.398c.98-.272 1.748-1.04 2.02-2.02C24 16.075 24 12 24 12s0-4.075-.398-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <Link href="/" className="hover:text-[#8FA89B] transition-colors">Home Page</Link>
            </li>
            <li>
              <Link href="/#products" className="hover:text-[#8FA89B] transition-colors">Our Products</Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-[#8FA89B] transition-colors">Brand Story</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#8FA89B] transition-colors">Health Blogs</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#8FA89B] transition-colors">Admin Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Products Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">
            Our Formulations
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            {products.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.id}`} className="hover:text-[#8FA89B] transition-colors">
                  {p.name} ({p.category})
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Help Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm font-bold tracking-wider uppercase border-b border-white/10 pb-2">
            Company Policies
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <Link href="/privacy-policy" className="hover:text-[#8FA89B] transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#8FA89B] transition-colors">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-[#8FA89B] transition-colors">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-[#8FA89B] transition-colors">Refund & Cancellation</Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-[#8FA89B] transition-colors">Contact Support</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Address & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/10 mt-12 pt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/70 leading-relaxed">
          <div className="flex gap-2 items-start">
            <MapPin className="w-4 h-4 text-[#8FA89B] flex-shrink-0 mt-0.5" />
            <span>F.No-01 Hansraj Apartment, UGF, Vill Sarfabad, Sector-73, Noida, Gautam Buddha Nagar, UP 201301</span>
          </div>
          <div className="flex gap-2 items-start">
            <Phone className="w-4 h-4 text-[#8FA89B] flex-shrink-0 mt-0.5" />
            <span>+91 94588 23560 (Mon-Sat, 9AM-6PM)</span>
          </div>
          <div className="flex gap-2 items-start">
            <Mail className="w-4 h-4 text-[#8FA89B] flex-shrink-0 mt-0.5" />
            <span>herbszen007@gmail.com</span>
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/50">
          <div>
            &copy; 2026 HerbsZen Private Limited. All Rights Reserved.
          </div>
          {/* Payment Badges */}
          <div className="flex items-center gap-2.5 grayscale opacity-70">
            <span className="border border-white/20 rounded px-1.5 py-0.5 bg-white/5 font-semibold">COD</span>
            <span className="border border-white/20 rounded px-1.5 py-0.5 bg-white/5 font-semibold">UPI</span>
            <span className="border border-white/20 rounded px-1.5 py-0.5 bg-white/5 font-semibold">RAZORPAY</span>
            <span className="border border-white/20 rounded px-1.5 py-0.5 bg-white/5 font-semibold">CARDS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
