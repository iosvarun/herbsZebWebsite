"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { ChevronRight, CreditCard, ShieldCheck, MapPin, Truck, AlertCircle, CheckCircle2, RotateCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, cartMrpTotal, cartTotalSavings, clearCart } = useCart();

  // Form Fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI" | "CARD" | "NET_BANKING">("COD");

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"idle" | "processing" | "success">("idle");
  const [orderId, setOrderId] = useState("");

  // Auto-fill state and city based on pin (standard premium feature in India)
  useEffect(() => {
    if (pincode.length === 6) {
      // Simple mock pincode lookup
      if (pincode.startsWith("11")) {
        setCity("New Delhi");
        setState("Delhi");
      } else if (pincode.startsWith("40")) {
        setCity("Mumbai");
        setState("Maharashtra");
      } else if (pincode.startsWith("56")) {
        setCity("Bangalore");
        setState("Karnataka");
      } else if (pincode.startsWith("20")) {
        setCity("Noida");
        setState("Uttar Pradesh");
      } else {
        setCity("Gautam Buddha Nagar");
        setState("Uttar Pradesh");
      }
    }
  }, [pincode]);

  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Deep validation of mobile number: exactly 10 digits
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    const mockOrderId = `HZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(mockOrderId);

    // If COD, bypass payment overlay and go straight to success
    if (paymentMethod === "COD") {
      setTimeout(async () => {
        try {
          // Post order to API
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: mockOrderId,
              name,
              mobile,
              email,
              address,
              landmark,
              pincode,
              state,
              city,
              paymentMethod,
              amount: cartSubtotal,
              items: cartItems.map((item) => ({
                id: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.unitPrice
              }))
            })
          });
        } catch (e) {
          console.error("Order submission API error", e);
        }

        setIsSubmitting(false);
        setPaymentStep("success");
        triggerConfetti();
        clearCart();
      }, 1500);
    } else {
      // Show payment simulator overlay
      setPaymentStep("processing");
      setTimeout(async () => {
        try {
          // Post order to API
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: mockOrderId,
              name,
              mobile,
              email,
              address,
              landmark,
              pincode,
              state,
              city,
              paymentMethod,
              amount: cartSubtotal,
              items: cartItems.map((item) => ({
                id: item.product.id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.unitPrice
              }))
            })
          });
        } catch (e) {
          console.error("Order submission API error", e);
        }

        setIsSubmitting(false);
        setPaymentStep("success");
        triggerConfetti();
        clearCart();
      }, 3500); // Simulate network latency and card authorization
    }
  };

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar onOpenQuiz={() => {}} />
        <div className="flex-1 max-w-lg w-full mx-auto px-4 py-16 flex flex-col justify-center items-center">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6 w-full relative overflow-hidden">
            {/* Green top bar decor */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#3B7A57]" />

            <div className="w-16 h-16 bg-[#3B7A57]/10 rounded-full flex items-center justify-center text-[#3B7A57] mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#113E21]">Order Placed Successfully!</h2>
              <p className="text-slate-500 text-xs md:text-sm">
                Thank you for choosing HerbsZen. Your order has been registered and is being prepared for dispatch.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Order Number:</span>
                <span className="font-bold text-slate-800">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Recipient Name:</span>
                <span className="font-bold text-slate-800">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Contact Mobile:</span>
                <span className="font-bold text-slate-800">{mobile}</span>
              </div>
              {landmark && (
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Landmark:</span>
                  <span className="font-bold text-slate-800">{landmark}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Payment Mode:</span>
                <span className="font-bold text-[#3B7A57]">{paymentMethod}</span>
              </div>
            </div>

            <div className="text-xs text-[#8FA89B] font-bold">
              ✓ Shipping Details & Tracking Code will be sent to {email}
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="w-full bg-[#113E21] hover:bg-[#1a5632] text-white py-3.5 px-8 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">Checkout</span>
        </div>

        <h1 className="font-serif text-3xl font-extrabold text-[#113E21]">Secure Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-slate-100 p-12 rounded-3xl shadow-md text-center max-w-md mx-auto space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#113E21]">Your cart is empty</h3>
            <p className="text-sm text-slate-500">Add some products first before navigating to checkout.</p>
            <Link href="/" className="bg-[#113E21] hover:bg-[#1a5632] text-white py-3.5 px-8 rounded-full text-xs font-bold shadow-md inline-block">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left - Customer Details & Payment (Form) */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
              
              {/* Delivery Address Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#3B7A57]" />
                  <span>Delivery Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Full Name <span className="text-red-500 font-sans">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="First & Last Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Mobile Number <span className="text-red-500 font-sans">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setMobile(val);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Email Address <span className="text-red-500 font-sans">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Street Address <span className="text-red-500 font-sans">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="Flat/House No., Apartment, Village/Area"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Standard Landmark
                      </label>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">(Optional)</span>
                    </div>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="E.g., Near Apollo Hospital, Opp. City Mall"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Pincode <span className="text-red-500 font-sans">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setPincode(val);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      placeholder="6 digit PIN code"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        City <span className="text-red-500 font-sans">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        State <span className="text-red-500 font-sans">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#3B7A57]" />
                  <span>Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "COD", title: "Cash on Delivery", desc: "Pay with Cash or UPI on delivery" },
                    { id: "UPI", title: "Instant UPI (BHIM/GPay/PhonePe)", desc: "Simulate secure mobile payment" },
                    { id: "CARD", title: "Credit or Debit Card", desc: "Secure transaction validation" },
                    { id: "NET_BANKING", title: "Razorpay (All Indian Banks)", desc: "Secure Razorpay pop-up simulator" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`text-left p-4 rounded-2xl border text-xs font-semibold transition-all flex flex-col justify-between cursor-pointer ${
                        paymentMethod === method.id
                          ? "border-[#113E21] bg-[#8FA89B]/10 text-[#113E21]"
                          : "border-slate-200 hover:border-[#8FA89B] hover:bg-slate-50/50 text-slate-700"
                      }`}
                    >
                      <span className="font-bold text-sm">{method.title}</span>
                      <span className="text-[10px] text-slate-400 mt-1 font-medium">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#113E21] hover:bg-[#1a5632] disabled:bg-slate-300 text-white py-4 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <span>Place Order - ₹{cartSubtotal.toFixed(2)}</span>
                )}
              </button>
            </form>

            {/* Right - Order Summary Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">Order Summary</h3>

                {/* Items List */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center text-xs">
                      <div className="relative w-11 h-11 border border-slate-100 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-[#113E21]">₹{item.totalPrice.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                {/* Pricing Details */}
                <div className="text-xs space-y-2">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Total MRP</span>
                    <span className="line-through">₹{cartMrpTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl">
                    <span>Multi-buy Savings</span>
                    <span>- ₹{cartTotalSavings.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Delivery Charge</span>
                    <span className="text-[#3B7A57] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>GST (Tax)</span>
                    <span className="text-slate-400 font-bold">Inclusive</span>
                  </div>
                  <hr className="border-slate-100 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-sm font-bold text-[#113E21]">Grand Total</span>
                    <span className="text-lg font-black text-[#113E21]">
                      ₹{cartSubtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2 text-[10px] text-slate-400 leading-normal font-medium">
                  <Truck className="w-4 h-4 text-[#3B7A57] flex-shrink-0 mt-0.5" />
                  <span>Dispatched with premium courier partners (Delhivery / BlueDart). Delivered in 3-5 days.</span>
                </div>
              </div>

              {/* Secure Trust indicators */}
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#3B7A57]" />
                <span>SSL Encrypted Checkout • Razorpay Certified</span>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />

      {/* SECURE PAYMENT SIMULATOR MODAL (Wow Factor) */}
      {paymentStep === "processing" && (
        <div className="fixed inset-0 z-50 bg-[#113E21]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
            {/* Razorpay Brand mock header */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-sans font-extrabold text-blue-600 tracking-tight text-sm">Razorpay</span>
                <span className="text-[10px] bg-slate-200 text-slate-500 py-0.5 px-1.5 rounded font-bold uppercase">Secure</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider">HZ-GATEWAY-109</span>
            </div>

            <div className="py-4 space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-[#113E21] animate-spin mx-auto" />
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-bold text-[#113E21]">Authorizing Transaction</h3>
                <p className="text-xs text-slate-400">Communicating with your banking client to validate funds...</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant:</span>
                <span className="font-bold text-slate-800">HERBSZEN PRIVATE LIMITED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Charge:</span>
                <span className="font-bold text-slate-800">₹{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Mode:</span>
                <span className="font-bold text-blue-600">{paymentMethod}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium">
              Do not refresh this page, close this modal or press back. Doing so may result in double charging.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
