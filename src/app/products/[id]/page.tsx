"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useCart, getCartItemCalculations } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { Quiz } from "@/components/Quiz";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  ChevronRight,
  TrendingDown
} from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "ingredients" | "how-to" | "why">("benefits");
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  
  // Accordion for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const buyBtn = document.getElementById("main-buy-btn");
      if (buyBtn) {
        const rect = buyBtn.getBoundingClientRect();
        setShowStickyBtn(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#113E21]">Product Not Found</h2>
          <p className="text-slate-500 mt-2 text-sm">The formulation you are looking for does not exist or has been renamed.</p>
          <Link href="/" className="mt-6 bg-[#113E21] text-white py-3 px-8 rounded-full text-xs font-bold shadow-md">
            Go Back Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate pricing based on current quantity
  const pricing = getCartItemCalculations(product.id, quantity, product.price, product.mrp);
  const totalOriginalMrp = product.mrp * quantity;
  const savings = totalOriginalMrp - pricing.totalPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNowDirect = () => {
    addToCart(product, quantity);
    // Redirect direct to checkout
    window.location.href = "/checkout";
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16 relative z-20">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#113E21]">Products</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">{product.name}</span>
        </div>

        {/* Product Core Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          
          {/* Left Media Gallery (Zoom Effect) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-[300px] md:h-[480px] w-full rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 shadow-md group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* Right Product Options */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Title */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em]">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21] leading-tight">
                {product.name}
              </h1>
              
              {/* Star rating review badge */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {product.rating} ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-extrabold text-[#113E21]">
                  ₹{pricing.unitPrice.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-slate-500">per unit</span>
                {product.mrp > pricing.unitPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.mrp.toFixed(2)}
                  </span>
                )}
                
                <span className="ml-auto text-xs font-bold text-[#3B7A57] bg-[#3B7A57]/10 px-3 py-1 rounded-full">
                  {pricing.discountPercent}% OFF
                </span>
              </div>

              {product.id === "pain-x-oil" && (
                <div className="bg-[#3B7A57]/5 border border-[#3B7A57]/10 p-3 rounded-xl flex items-start gap-2.5">
                  <TrendingDown className="w-4 h-4 text-[#3B7A57] mt-0.5" />
                  <div className="text-[11px] text-[#113E21] leading-relaxed">
                    <strong className="font-bold">Multi-buy discount applied:</strong><br />
                    1 Bottle: 30% Off | 2 Bottles: 35% Off | 3+ Bottles: 40% Off!
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Dynamic Calculator */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
                
                <div className="flex items-center border border-slate-200 rounded-full bg-slate-50">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="p-2.5 px-4 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-slate-800 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 px-4 text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {product.courseDuration && (
                  <span className="text-xs text-slate-400 italic">
                    ({product.courseDuration} pack)
                  </span>
                )}
              </div>

              {/* Total calculations display */}
              {quantity > 1 && (
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between text-xs animate-fade-in">
                  <div className="space-y-0.5">
                    <div className="text-slate-500">Order Subtotal: <strong className="text-[#113E21] font-bold">₹{pricing.totalPrice.toFixed(2)}</strong></div>
                    <div className="text-[10px] text-slate-400">Original Price: <span className="line-through">₹{totalOriginalMrp.toFixed(2)}</span></div>
                  </div>
                  <div className="bg-[#3B7A57]/10 text-[#3B7A57] font-extrabold px-3 py-1.5 rounded-lg">
                    You Save ₹{savings.toFixed(2)}!
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                id="main-buy-btn"
                onClick={handleAddToCart}
                className="w-full bg-[#8FA89B]/10 hover:bg-[#8FA89B]/20 text-[#113E21] font-bold py-4 rounded-full text-sm tracking-wide transition-all border border-[#8FA89B]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNowDirect}
                className="w-full bg-[#113E21] hover:bg-[#1a5632] text-white font-bold py-4 rounded-full text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Delivery/Warranty info */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-bold tracking-wider uppercase pt-4 border-t border-slate-100">
              <div className="flex flex-col items-center gap-1 bg-slate-50 p-2.5 rounded-xl">
                <Truck className="w-5 h-5 text-[#3B7A57]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-slate-50 p-2.5 rounded-xl">
                <RotateCcw className="w-5 h-5 text-[#3B7A57]" />
                <span>7 Day Replacement</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-slate-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#3B7A57]" />
                <span>Tested Safe</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Info (Benefits, Ingredients, How to Use) */}
        <section className="bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-200/60 overflow-x-auto">
            {[
              { id: "benefits", label: "Benefits" },
              { id: "ingredients", label: "Ingredients" },
              { id: "how-to", label: "How To Use" },
              { id: "why", label: "Why Choose HerbsZen" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 md:px-8 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#113E21] text-[#113E21] bg-white"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 bg-white min-h-[220px]">
            {activeTab === "benefits" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">Key Therapeutic Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="text-[#3B7A57] font-bold mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">Standardized Botanical Composition</h3>
                <p className="text-xs text-slate-500 mb-2">We declare 100% of our ingredients. No hidden chemicals or mineral base.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-slate-800 text-sm">{ing.name}</span>
                          <span className="text-xs font-bold text-[#3B7A57]">{ing.quantity}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{ing.benefits}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "how-to" && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">Dosage & Application</h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {product.howToUse}
                </p>
                <div className="flex gap-2 text-[11px] text-slate-400 italic">
                  <span>*</span>
                  <span>Consistency is key in Ayurveda. We recommend continuing the course for at least 3-4 weeks for deep systemic healing.</span>
                </div>
              </div>
            )}

            {activeTab === "why" && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">The HerbsZen Quality Standard</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.whyChoose.map((point, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-slate-600">
                      <ShieldCheck className="w-5 h-5 text-[#3B7A57] flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* FAQs ACCORDION */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#113E21]">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {product.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-[#113E21] hover:bg-slate-50 transition-colors text-sm md:text-base cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === i && (
                  <div className="p-5 pt-0 border-t border-slate-100 text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="space-y-6">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif text-2xl font-bold text-[#113E21]">Verified Buyer Reviews</h3>
            <span className="text-xs text-slate-500 font-medium">Showing {product.reviews.length} reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1 text-[11px]">
                  <div>
                    <h5 className="font-bold text-slate-800">{rev.name}</h5>
                    <p className="text-slate-400">{rev.location}</p>
                  </div>
                  {rev.verified && (
                    <span className="text-[#3B7A57] font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px]">
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#113E21]">Related Formulations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <Link
                href={`/products/${p.id}`}
                key={p.id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {p.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#113E21]">
                      {p.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50">
                    <span className="text-sm font-extrabold text-[#113E21]">₹{p.price.toFixed(2)}</span>
                    <span className="text-[9px] font-bold text-[#3B7A57] uppercase">View Formula</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      {/* STICKY MOBILE BUY NOW BUTTON (Wow Factor) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 p-4 shadow-2xl transition-all duration-300 transform md:hidden ${
          showStickyBtn ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wide">Total Price</span>
            <span className="text-lg font-black text-[#113E21]">
              ₹{pricing.totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleBuyNowDirect}
            className="bg-[#113E21] hover:bg-[#1a5632] text-white font-bold py-3 px-8 rounded-full text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buy Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
