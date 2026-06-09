"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Quiz } from "@/components/Quiz";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LeafAnimation } from "@/components/LeafAnimation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  Headphones,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Clock
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingInquiry, setIsSendingInquiry] = useState(false);

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Deep validation of mobile number: exactly 10 digits
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(contactMobile)) {
      alert("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
      return;
    }

    setIsSendingInquiry(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          mobile: contactMobile,
          email: contactEmail,
          message: contactMessage
        })
      });
      const result = await res.json();
      if (result.success) {
        alert(result.message || "Thank you! Your message has been received.");
        setContactName("");
        setContactMobile("");
        setContactEmail("");
        setContactMessage("");
      } else {
        alert(result.error || "Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      alert("Network error sending inquiry. Please try again.");
    } finally {
      setIsSendingInquiry(false);
    }
  };

  // Extract search query from URL on mount/hashchange
  useEffect(() => {
    const checkSearchQuery = () => {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("search");
      if (query) {
        setSearchFilter(query.toLowerCase());
        const element = document.getElementById("products");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    
    checkSearchQuery();
    window.addEventListener("hashchange", checkSearchQuery);
    return () => window.removeEventListener("hashchange", checkSearchQuery);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter) ||
      p.category.toLowerCase().includes(searchFilter) ||
      p.shortDescription.toLowerCase().includes(searchFilter)
  );

  return (
    <>
      {/* Brand Intro Loader */}
      <LoadingScreen />

      {/* Floating Leaves Anim */}
      <LeafAnimation />

      {/* WhatsApp Help Chat */}
      <WhatsAppButton />

      {/* Header */}
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      <main className="flex-1 bg-white relative z-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#113E21]/5 via-white to-[#8FA89B]/10 py-16 md:py-24 border-b border-slate-50">
          {/* Faint watermark bubble decoration in background */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#8FA89B]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-[#3B7A57]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#113E21]/10 text-[#113E21] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#3B7A57]" />
                <span>100% Pure, Clinically Proven Ayurveda</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-[#113E21] leading-tight md:leading-none">
                  Heal Naturally with <br className="hidden md:inline" />
                  <span className="text-[#3B7A57] font-semibold italic">HerbsZen</span>
                </h1>
                <p className="text-slate-600 text-sm md:text-base max-w-xl leading-relaxed">
                  Premium Ayurvedic solutions meticulously formulated for Pain Relief, Kidney Health, Hair Care, Digestive Wellness, and Daily Superfood Nutrition. Pure wisdom for modern lifestyles.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById("products");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#113E21] hover:bg-[#1a5632] text-white font-bold py-4 px-8 rounded-full text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer"
                >
                  <span>Shop Premium Range</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="bg-white hover:bg-slate-50 text-[#113E21] font-bold py-4 px-8 rounded-full text-sm tracking-wide border border-slate-200 transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Find Your Formula</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-slate-500 font-sans text-xs font-bold tracking-wide">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#3B7A57] flex-shrink-0" />
                  <span>Ayurvedic Formulas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#3B7A57] flex-shrink-0" />
                  <span>Natural Actives</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#3B7A57] flex-shrink-0" />
                  <span>Quality Tested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#3B7A57] flex-shrink-0" />
                  <span>Made in India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#3B7A57] flex-shrink-0" />
                  <span>Free Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Product Showcase (NeuHerbs Inspired) */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative">
              {/* Decorative circle glow behind bottle */}
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-[#3B7A57]/20 to-[#8FA89B]/30 blur-3xl -z-10 animate-pulse" />

              {/* Product Bottle Showcase */}
              <div className="md:col-span-7 flex justify-center relative">
                {/* Floating Mint Leaf 1 */}
                <div className="absolute top-0 right-4 w-8 h-8 opacity-75 animate-bounce" style={{ animationDuration: "3s" }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#3B7A57]" fill="currentColor">
                    <path d="M50 15 C52 22 46 26 42 22 C38 18 45 12 50 15 Z" />
                  </svg>
                </div>
                
                {/* Floating Leaf 2 */}
                <div className="absolute bottom-6 left-2 w-10 h-10 opacity-60 animate-pulse" style={{ animationDuration: "4s" }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#8FA89B]" fill="currentColor">
                    <path d="M58 18 C62 24 57 28 53 25 C49 22 54 15 58 18 Z" />
                  </svg>
                </div>

                {/* Glassmorphic platform for bottle */}
                <div className="relative w-64 h-80 rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md shadow-2xl p-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8FA89B]/5 to-[#113E21]/10 -z-10" />
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/products/pain-x-oil.jpg"
                      alt="HerbsZen Flagship Formulation"
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Clinically Proven Stats Panel (Right Column) */}
              <div className="md:col-span-5 space-y-4">
                {/* Stat 1 */}
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/30 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-black text-rose-500 flex items-center gap-0.5 justify-end">
                      85% <span className="text-base font-bold">↓</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joint Pain</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <p className="text-[10px] text-slate-500 font-semibold leading-snug">Reduced pain & joint stiffness in trials</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/30 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-black text-emerald-600 flex items-center gap-0.5 justify-end">
                      3x <span className="text-base font-bold">↑</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobility</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <p className="text-[10px] text-slate-500 font-semibold leading-snug">Better joint flexibility & movement</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/30 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-black text-[#113E21] flex items-center gap-0.5 justify-end">
                      100%
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Natural</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <p className="text-[10px] text-slate-500 font-semibold leading-snug">Zero heavy metals or toxic additives</p>
                </div>

                {/* Mini Doctor Consultation / Expert Badge */}
                <div className="bg-[#113E21] text-white p-3 rounded-2xl shadow-lg border border-[#113E21] flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-slate-100 flex-shrink-0">
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                    <svg className="w-full h-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-[9px] leading-tight">
                    <div className="font-bold text-[#8FA89B] uppercase tracking-wider">Ask our BAMS Doctor</div>
                    <button
                      onClick={() => setIsQuizOpen(true)}
                      className="text-white hover:text-[#8FA89B] font-semibold underline text-left mt-0.5 block cursor-pointer"
                    >
                      Consult now for free &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT HERBSZEN */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="/images/about/brand-story.jpg"
                  alt="Ayurvedic herbs preparation"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Overlay Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 max-w-[200px]">
                <div className="p-3 bg-[#113E21] text-white rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">GMP Certified</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Strict quality & safety compliance</p>
                </div>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em] block">
                Our Heritage & Promise
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
                Bridging Vedic Wisdom with Modern Quality Science
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  <strong>HERBSZEN PRIVATE LIMITED</strong> is committed to bringing the therapeutic healing power of Ayurveda into modern lifestyles through carefully formulated wellness products. We believe that true health lies in aligning our biological cycles with nature's wisdom.
                </p>
                <p>
                  Our research team filters classical Ayurvedic texts to extract targeted solutions for joint lubrication, scalp repair, stone removal, digestion, and daily vigor. Instead of relying on raw ground herbs, we extract the active pharmaceutical alkaloids, standardizing dosage for predictable, high-potency results.
                </p>
                <p>
                  Every batch of HerbsZen undergoes rigorous heavy metal testing, microbiological checks, and shelf-stability validation, ensuring you receive zero chemicals, zero toxins, and 100% natural, life-changing wellness.
                </p>
              </div>

              {/* USP Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-5 h-5 text-[#3B7A57] mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Standardized Extracts</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Up to 10x higher potency than raw powder</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-5 h-5 text-[#3B7A57] mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Zero Heavy Metals</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Validated safe for continuous consumption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section id="products" className="py-20 bg-slate-50/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em]">
                Nature's Apothecary
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
                Shop HerbsZen Formulations
              </h2>
              <p className="text-sm text-slate-500">
                Direct-from-source premium remedies. Free delivery on all orders. Select a product to view dynamic multi-buy offers.
              </p>
            </div>

            {searchFilter && (
              <div className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl max-w-md mx-auto">
                <span className="text-xs text-slate-500 font-medium">
                  Showing results for: <strong className="text-[#113E21]">"{searchFilter}"</strong>
                </span>
                <button
                  onClick={() => {
                    setSearchFilter("");
                    window.history.replaceState({}, "", "/");
                  }}
                  className="text-xs text-[#3B7A57] font-bold"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
                
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 z-10 bg-[#3B7A57] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {product.id === "pain-x-oil" ? "Save Up To 40%" : `${discount}% OFF`}
                      </div>
                    )}

                    {/* Image Area */}
                    <div className="relative h-64 w-full bg-slate-50 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                          <span>{product.category}</span>
                          {product.courseDuration && (
                            <span className="bg-[#8FA89B]/10 text-[#113E21] px-2 py-0.5 rounded-md text-[10px]">
                              {product.courseDuration}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#113E21]">
                          {product.name}
                        </h3>

                        {/* Rating block */}
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 fill-current ${
                                  i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500 font-bold ml-1">
                            {product.rating} ({product.reviewsCount} reviews)
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Pricing and CTAs */}
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-[#113E21]">
                            ₹{product.price.toFixed(2)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{product.mrp.toFixed(2)}
                            </span>
                          )}
                          <span className="text-[10px] text-emerald-600 font-bold ml-auto bg-emerald-50 px-2 py-0.5 rounded">
                            Free Delivery
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="text-center border border-slate-200 hover:border-[#8FA89B] text-slate-700 font-bold py-3.5 rounded-full text-xs tracking-wide transition-all hover:bg-slate-50/50"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="bg-[#113E21] hover:bg-[#1a5632] text-white font-bold py-3.5 rounded-full text-xs tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CLINICAL BEFORE/AFTER RESULTS (Wow Factor) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em] block">
                Visible Scalp Cleansing
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
                Dr. Dandruff Serum: <br />
                Real Scalp Transformations
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ayurveda provides biological balance. In clinical test panels, 94% of users using **Dr. Dandruff Serum** reported a complete resolution of dry flaking skin and scalp itchiness in 7 days.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#3B7A57]/10 flex items-center justify-center text-[#3B7A57] font-bold text-sm">
                    94%
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Scalp Flakes Cleared</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Controls Malassezia yeast population</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#3B7A57]/10 flex items-center justify-center text-[#3B7A57] font-bold text-sm">
                    3 Days
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Itch Relief</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Soothing Tea Tree + Camphor relief</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Link
                  href="/products/dr-dandruff-serum"
                  className="inline-flex items-center gap-2 text-[#3B7A57] hover:text-[#113E21] text-sm font-bold tracking-wide transition-all"
                >
                  <span>Explore Dr. Dandruff Serum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right slider visual */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage="/images/reviews/dandruff-before.jpg"
                afterImage="/images/reviews/dandruff-after.jpg"
                beforeLabel="Before Treatment"
                afterLabel="After 7 Days"
              />
              <p className="text-center text-[10px] text-slate-400 font-semibold mt-3 uppercase tracking-wider">
                ← Drag Slider to Compare Scalp Transformation →
              </p>
            </div>
          </div>
        </section>

        {/* MOCK REVIEWS SECTION */}
        <section className="py-20 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em]">
                Verified Customer Feedback
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
                Real Results From Verified Buyers
              </h2>
              <p className="text-sm text-slate-500">
                Thousands of clients trust HerbsZen for daily comfort, pain-free movement, and hair strength.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sanjay Dutta",
                  location: "Kolkata",
                  rating: 5,
                  comment: "I had painful bleeding piles. Piles X Oil gave me relief in just 3 days. The pain and bleeding have stopped completely. It provides immediate cooling relief.",
                  product: "Piles X Oil"
                },
                {
                  name: "Anil Goel",
                  location: "Noida",
                  rating: 5,
                  comment: "I had a 6mm kidney stone. Used Stone X Capsule for two weeks, and during an ultrasound check, it was completely gone! Extremely thankful for this product.",
                  product: "Stone X Capsule"
                },
                {
                  name: "Ramesh Sharma",
                  location: "Delhi",
                  rating: 5,
                  comment: "I have been suffering from chronic knee pain for 3 years. Pain X Oil works wonders! I feel immediate relief within 10 minutes of massaging it. Highly recommended.",
                  product: "Pain X Oil"
                }
              ].map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{rev.name}</h4>
                      <p className="text-[10px] text-slate-400">{rev.location}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#3B7A57] bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                      {rev.product}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST GRID */}
        <section className="py-16 bg-[#113E21] text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">100% Natural</h4>
              <p className="text-[10px] text-white/60">No synthetic colors or toxins</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">Ayurvedic Formula</h4>
              <p className="text-[10px] text-white/60">Strict scriptural purity</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">Quality Tested</h4>
              <p className="text-[10px] text-white/60">Batch-tested chromatography</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">Secure Payment</h4>
              <p className="text-[10px] text-white/60">Razorpay Encrypted</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">Fast Shipping</h4>
              <p className="text-[10px] text-white/60">Dispatched in 24 hours</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#8FA89B]">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-sm">Customer Support</h4>
              <p className="text-[10px] text-white/60">Direct WhatsApp support</p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em] block">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
                HERBSZEN PRIVATE LIMITED
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Have questions about specific formulations or need help with bulk ordering? Reach out to our customer support desk or consult our wellness expert.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#113E21]/5 text-[#113E21] rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Registered Address</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[280px] leading-relaxed">
                      F.No-01 Hansraj Apartment, UGF, Vill Sarfabad, Sector-73, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201301, India.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#113E21]/5 text-[#113E21] rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Phone Hotline</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      +91 94588 23560
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#113E21]/5 text-[#113E21] rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Email Address</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      herbszen007@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map & Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#113E21]">Send us a message</h3>
              
              <form
                onSubmit={handleSendInquiry}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Your Name <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    disabled={isSendingInquiry}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Mobile Number <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactMobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setContactMobile(val);
                    }}
                    disabled={isSendingInquiry}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Email Address <span className="text-red-500 font-sans">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    disabled={isSendingInquiry}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                    placeholder="name@email.com"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Your Message <span className="text-red-500 font-sans">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    disabled={isSendingInquiry}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                    placeholder="Tell us about your health concern..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSendingInquiry}
                  className="sm:col-span-2 bg-[#113E21] hover:bg-[#1a5632] disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl text-xs tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSendingInquiry ? "Sending Inquiry..." : "Send Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Wellness Quiz Modal */}
      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
