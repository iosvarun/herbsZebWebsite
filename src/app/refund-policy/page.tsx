"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { ChevronRight } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">Refund & Cancellation</span>
        </div>

        <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h1 className="font-serif text-3xl font-extrabold text-[#113E21] border-b border-slate-100 pb-4">
            Refund & Cancellation Policy
          </h1>

          <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
            <p className="text-slate-400 italic">Last Updated: June 9, 2026</p>

            <h3 className="font-serif text-base font-bold text-[#113E21]">1. Cancellations</h3>
            <p>
              You can cancel your order at any time before it is dispatched by writing to us at **herbszen007@gmail.com** or calling **+91 94588 23560**. Once dispatched, orders cannot be cancelled.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">2. Damaged or Defective Deliveries</h3>
            <p>
              We offer a **7-day free replacement policy** for items that arrive damaged or defective during transit. To report a damaged product:
              * Contact our support desk within 48 hours of delivery.
              * Email a photo or video of the packaging and damage to **herbszen007@gmail.com**.
              * We will immediately dispatch a fresh replacement free of charge.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">3. Refund Processing</h3>
            <p>
              For successful cancellations (before dispatch), refunds are processed to your original payment method.
              * **UPI / Card**: Reversals appear in your account within 5-7 business days.
              * **Cash on Delivery**: Not applicable (payments are only collected upon physical delivery).
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
