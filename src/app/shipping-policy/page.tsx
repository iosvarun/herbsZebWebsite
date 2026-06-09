"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { ChevronRight } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">Shipping Policy</span>
        </div>

        <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h1 className="font-serif text-3xl font-extrabold text-[#113E21] border-b border-slate-100 pb-4">
            Shipping Policy
          </h1>

          <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
            <p className="text-slate-400 italic">Last Updated: June 9, 2026</p>
            
            <h3 className="font-serif text-base font-bold text-[#113E21]">1. Shipping Locations</h3>
            <p>
              We ship to all states and pin codes across India. We partner with India’s leading logistics providers (including Delhivery, BlueDart, and Speed Post) to assure secure and fast transit.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">2. Shipping Fees</h3>
            <p>
              We offer **FREE shipping** on all orders, regardless of order value or quantity, to provide a premium direct-to-consumer (D2C) experience.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">3. Dispatch & Delivery Timelines</h3>
            <p>
              * **Processing Time**: Orders are processed and handed over to logistics partners within 24 hours of placement.
              * **Delivery Time**: Deliveries usually arrive in:
                - Metro Cities: 2 to 4 business days.
                - Rest of India: 4 to 6 business days.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">4. Order Tracking</h3>
            <p>
              Once your package is dispatched, we will send a confirmation email containing a tracking link and SMS details. You can track your shipment’s status in real-time.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
