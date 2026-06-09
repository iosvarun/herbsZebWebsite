"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds to invite action, then hide after 5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    const phoneNumber = "919458823560";
    const text = encodeURIComponent("Hello HerbsZen! I'm visiting your website and would like to consult with an Ayurvedic specialist about your products.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="mr-3 bg-white text-slate-800 text-xs py-2 px-4 rounded-xl shadow-lg border border-slate-100 font-medium flex items-center gap-2 max-w-[200px]"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Consult our Ayurvedic Experts!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 ml-1 text-sm font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full shadow-2xl shadow-emerald-950/35 flex items-center justify-center transition-colors group cursor-pointer focus:outline-none bg-transparent"
        aria-label="Contact HerbsZen on WhatsApp"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-500 opacity-45 animate-ping -z-10" />

        {/* WhatsApp Icon Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/images/whatsapp_icon.png"
            alt="WhatsApp Support"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.button>
    </div>
  );
};
