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

            {/* Premium Logo Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-20 md:w-80 md:h-24 flex items-center justify-center"
            >
              <img
                src="/images/logo.png"
                alt="HerbsZen Logo"
                className="object-contain w-full h-full"
              />
            </motion.div>

            {/* Brand details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-[#8FA89B] tracking-[0.25em] uppercase font-sans">
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
