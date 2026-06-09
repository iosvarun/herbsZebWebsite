"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Phone, Mail, ShoppingBag, Menu, X, Search, Sparkles } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Bar - Dark Forest Green */}
      <div className="bg-[#113E21] text-white py-2 px-4 text-xs font-medium border-b border-white/5 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone className="w-3 h-3" /> +91 94588 23560
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <Mail className="w-3 h-3" /> herbszen007@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide bg-[#3B7A57]/60 px-2.5 py-0.5 rounded-full text-[10px] uppercase">
              Free Delivery
            </span>
            <span className="opacity-90">✓ Ayurvedic Formulations ✓ Made in India</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#113E21] flex items-center justify-center bg-white shadow-sm transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#113E21]" fill="currentColor">
                <path d="M50 15 C52 22 46 26 42 22 C38 18 45 12 50 15 Z" className="fill-[#3B7A57]" />
                <path d="M58 18 C62 24 57 28 53 25 C49 22 54 15 58 18 Z" className="fill-[#8FA89B]" />
                <text x="50" y="55" fontFamily="'Cormorant Garamond', serif" fontSize="15" fontWeight="bold" fontStyle="italic" textAnchor="middle" className="fill-[#113E21]">Herbs</text>
                <text x="50" y="70" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="1.5" className="fill-[#3B7A57]">ZEN</text>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg font-black tracking-wide text-[#113E21] leading-none">
                HERBSZEN
              </span>
              <span className="text-[9px] text-[#8FA89B] tracking-[0.18em] uppercase font-bold mt-0.5">
                Health & Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-[#1E293B]">
            <Link href="/" className="hover:text-[#113E21] transition-colors relative group py-1">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#113E21] transition-all group-hover:w-full" />
            </Link>
            <Link href="/#products" className="hover:text-[#113E21] transition-colors relative group py-1">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#113E21] transition-all group-hover:w-full" />
            </Link>
            <Link href="/#about" className="hover:text-[#113E21] transition-colors relative group py-1">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#113E21] transition-all group-hover:w-full" />
            </Link>
            <Link href="/blog" className="hover:text-[#113E21] transition-colors relative group py-1">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#113E21] transition-all group-hover:w-full" />
            </Link>
            <Link href="/#contact" className="hover:text-[#113E21] transition-colors relative group py-1">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#113E21] transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Action Utilities */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1E293B] hover:text-[#113E21] rounded-full hover:bg-slate-50 transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quiz Trigger Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:flex items-center gap-1.5 bg-[#8FA89B]/10 hover:bg-[#8FA89B]/20 text-[#113E21] font-semibold text-xs py-2.5 px-4 rounded-full border border-[#8FA89B]/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3B7A57]" />
              <span>Wellness Quiz</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#113E21] hover:bg-[#1a5632] text-white rounded-full transition-colors shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-[#3B7A57] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E293B] hover:text-[#113E21] rounded-full hover:bg-slate-50 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full bg-white border-t border-slate-100 overflow-hidden shadow-inner absolute top-full left-0 z-30"
            >
              <div className="p-5 flex flex-col gap-4 font-medium text-slate-800 text-sm">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#113E21] p-2 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#113E21] p-2 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Products
                </Link>
                <Link
                  href="/#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#113E21] p-2 hover:bg-slate-50 rounded-lg transition-all"
                >
                  About Story
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#113E21] p-2 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Blog & Articles
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#113E21] p-2 hover:bg-slate-50 rounded-lg transition-all"
                >
                  Contact Info
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuiz();
                  }}
                  className="flex items-center justify-center gap-2 bg-[#113E21] text-white font-bold py-3 rounded-full text-xs shadow-md mt-2"
                >
                  <Sparkles className="w-4 h-4 text-[#8FA89B]" />
                  Take Ayurvedic Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Shopping Cart Drawer */}
      <CartDrawer />

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#113E21]/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="w-full max-w-xl text-center space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">Search HerbsZen</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Pain X, Moringa, Dandruff, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-slate-800 py-4 px-6 rounded-full text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#8FA89B]/40 font-medium"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchOpen(false);
                      window.location.href = `/#products?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    window.location.href = `/#products?search=${encodeURIComponent(searchQuery)}`;
                  }}
                  className="absolute right-2 top-2 bg-[#113E21] hover:bg-[#1a5632] text-white p-3 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/60">Press Enter or click search to search our featured products</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
