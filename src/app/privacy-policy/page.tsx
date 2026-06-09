"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">Privacy Policy</span>
        </div>

        <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h1 className="font-serif text-3xl font-extrabold text-[#113E21] border-b border-slate-100 pb-4">
            Privacy Policy
          </h1>

          <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
            <p className="text-slate-400 italic">Last Updated: June 9, 2026</p>
            <p>
              At **HERBSZEN PRIVATE LIMITED**, accessible from **HerbsZen.com**, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by HerbsZen and how we use it.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">1. Information We Collect</h3>
            <p>
              We collect personal information that you provide to us when placing an order or inquiring about our formulations. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              <li>Name and contact details (email, mobile number, shipping address).</li>
              <li>Order selections and transaction history.</li>
              <li>Voluntary responses to our Ayurvedic Wellness Quiz (used strictly to recommend suitable products).</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">2. How We Use Your Information</h3>
            <p>
              We use the collected details to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              <li>Process and ship your orders with courier partners.</li>
              <li>Provide invoice confirmations, GST tracking codes, and customer support.</li>
              <li>Improve and optimize our web browsing experiences.</li>
              <li>Prevent fraudulent transactions and secure payment channels.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">3. Payment Security</h3>
            <p>
              All payment transactions are handled through secure, PCI-compliant payment gateways like **Razorpay**. We do not store or process your credit card numbers, UPI PINs, or net banking passwords on our servers.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">4. Contact Information</h3>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at **herbszen007@gmail.com**.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
