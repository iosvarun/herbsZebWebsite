"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { ChevronRight } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold">Terms & Conditions</span>
        </div>

        <article className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h1 className="font-serif text-3xl font-extrabold text-[#113E21] border-b border-slate-100 pb-4">
            Terms & Conditions
          </h1>

          <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
            <p className="text-slate-400 italic">Last Updated: June 9, 2026</p>
            <p>
              Welcome to **HERBSZEN PRIVATE LIMITED**! These terms and conditions outline the rules and regulations for the use of HerbsZen's Website, located at **HerbsZen.com**.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">1. Use of Website</h3>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use HerbsZen.com if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">2. E-commerce Purchases</h3>
            <p>
              When placing an order on our store:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-4">
              <li>You agree to provide current, complete, and accurate purchase and account information.</li>
              <li>We reserve the right to refuse or cancel any order for reasons including product availability, pricing errors, or suspicion of fraudulent activity.</li>
              <li>Prices for our formulations are subject to change without notice.</li>
            </ul>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">3. Medical Disclaimer</h3>
            <p>
              The products and claims made about specific formulations on this website have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. The details provided here are for educational purposes only and should not replace consultation with a qualified medical practitioner.
            </p>

            <h3 className="font-serif text-base font-bold text-[#113E21] pt-2">4. Governing Law</h3>
            <p>
              These Terms shall be governed by and defined in accordance with the laws of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the courts of Noida, Uttar Pradesh, India.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
