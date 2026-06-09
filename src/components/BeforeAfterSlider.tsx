"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClass?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before HerbsZen",
  afterLabel = "7 Days After",
  heightClass = "h-[300px] md:h-[400px]"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    handleMove(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize ${heightClass}`}
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onMouseMove={(e) => {
        if (isDragging.current) handleMove(e.clientX);
      }}
      onTouchMove={(e) => {
        if (isDragging.current) handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt="Before treatment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Before Label */}
        <span className="absolute bottom-4 left-4 bg-[#113E21]/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wider uppercase">
          {beforeLabel}
        </span>
      </div>

      {/* After Image (Foreground, clipped based on slider position) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={afterImage}
          alt="After treatment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* After Label */}
        <span className="absolute bottom-4 right-4 bg-[#3B7A57]/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wider uppercase">
          {afterLabel}
        </span>
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[#113E21] hover:scale-105 active:scale-95 transition-transform">
          <svg
            className="w-5 h-5 text-[#113E21]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l-3 3m0 0l3 3m-3-3h14m-3-3l3 3m-3 3l3-3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
