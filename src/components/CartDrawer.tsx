"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartMrpTotal,
    cartTotalSavings
  } = useCart();

  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  const handleShopNow = () => {
    setIsCartOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById("products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#products";
    }
  };

  if (!isCartOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 flex justify-end"
    >
      {/* Slide-out Panel */}
      <div
        ref={drawerRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in relative"
        style={{
          animation: "slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#113E21]" />
            <h2 className="font-serif text-lg font-bold text-[#113E21]">
              Your HerbsZen Cart ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-[#8FA89B]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#113E21]">Your cart is empty</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[260px]">
                Add our premium Ayurvedic solutions to start your wellness journey.
              </p>
              <button
                onClick={handleShopNow}
                className="mt-6 bg-[#113E21] hover:bg-[#1a5632] text-white py-3 px-6 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-100 bg-white flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-sans text-sm font-bold text-slate-800 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 p-0.5 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block mt-0.5">
                      {item.product.category}
                    </span>
                    {item.product.id === "pain-x-oil" && (
                      <span className="inline-block bg-[#3B7A57]/10 text-[#3B7A57] text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                        {item.quantity === 1 ? "30% Off" : item.quantity === 2 ? "35% Off" : "40% Off!"}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls & Price */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-slate-200 rounded-full bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 px-2.5 text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 px-2.5 text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-[#113E21]">
                        ₹{item.totalPrice.toFixed(2)}
                      </div>
                      {item.product.mrp * item.quantity > item.totalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          ₹{(item.product.mrp * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Total MRP</span>
                <span className="line-through">₹{cartMrpTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-600 font-bold bg-[#3B7A57]/10 p-2 px-3 rounded-lg">
                <span>You Save</span>
                <span>- ₹{cartTotalSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Delivery Charges</span>
                <span className="text-[#3B7A57] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>GST (Tax)</span>
                <span className="text-slate-400 font-medium">Inclusive</span>
              </div>
              <hr className="border-slate-200 my-1" />
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#113E21]">Grand Total</span>
                <span className="text-xl font-extrabold text-[#113E21]">
                  ₹{cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-[#113E21] hover:bg-[#1a5632] text-white py-4 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Secure 256-bit SSL encrypted connection. GST invoice will be sent.
            </p>
          </div>
        )}
      </div>

      {/* Slide animation helper styles */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
