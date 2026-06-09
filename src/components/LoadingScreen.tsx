"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 1.8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 bg-[#FFFFFF] z-50 flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Elegant glowing leaf background pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute w-48 h-48 bg-[#8FA89B]/10 rounded-full blur-2xl"
            />

            {/* Premium Logo Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-[#113E21] flex items-center justify-center bg-white shadow-xl shadow-emerald-950/5"
            >
              {/* SVG representation of the HerbsZen circular logo from the letterhead */}
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#113E21]"
                fill="currentColor"
              >
                {/* Decorative leaves */}
                <path
                  d="M50 15 C52 22 46 26 42 22 C38 18 45 12 50 15 Z"
                  className="fill-[#3B7A57] opacity-80"
                />
                <path
                  d="M58 18 C62 24 57 28 53 25 C49 22 54 15 58 18 Z"
                  className="fill-[#8FA89B]"
                />
                <path
                  d="M66 23 C70 28 67 33 63 30 C59 27 62 20 66 23 Z"
                  className="fill-[#3B7A57]"
                />
                
                {/* Logo Text "HerbsZen" */}
                <text
                  x="50"
                  y="55"
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="15"
                  fontWeight="bold"
                  fontStyle="italic"
                  textAnchor="middle"
                  letterSpacing="-0.5"
                  className="fill-[#113E21]"
                >
                  Herbs
                </text>
                <text
                  x="50"
                  y="70"
                  fontFamily="'Inter', sans-serif"
                  fontSize="12"
                  fontWeight="800"
                  textAnchor="middle"
                  letterSpacing="1.5"
                  className="fill-[#3B7A57]"
                >
                  ZEN
                </text>
              </svg>
            </motion.div>

            {/* Brand details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <h1 className="font-serif text-[#113E21] text-lg md:text-xl font-bold tracking-wide">
                HERBSZEN
              </h1>
              <p className="text-xs text-[#8FA89B] tracking-[0.25em] uppercase font-sans mt-1">
                Nature's Wisdom • Modern Wellness
              </p>
            </motion.div>

            {/* Small Premium Loading Bar */}
            <div className="w-28 h-[2px] bg-[#8FA89B]/20 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#113E21] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
