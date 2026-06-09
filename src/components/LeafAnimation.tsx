"use client";

import React, { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  r: number; // radius/size
  d: number; // density/speed modifier
  a: number; // angle
  aSpeed: number; // angular speed
  color: string;
}

export const LeafAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Green shades matching the brand (dark forest, sage, leaf green)
    const colors = [
      "rgba(17, 62, 33, 0.12)",   // brand-forest
      "rgba(143, 168, 155, 0.2)",  // brand-sage
      "rgba(59, 122, 87, 0.15)",   // brand-leaf
    ];

    const maxLeaves = 22; // Keep it subtle and high performance
    const leaves: Leaf[] = [];

    // Initialize leaves
    for (let i = 0; i < maxLeaves; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 14 + 8, // size between 8px and 22px
        d: Math.random() * 0.8 + 0.3, // speed factor
        a: Math.random() * Math.PI * 2, // angle
        aSpeed: (Math.random() - 0.5) * 0.02, // rotation speed
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawLeaf = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillStyle = color;

      // Draw an organic leaf shape using bezier curves
      context.beginPath();
      context.moveTo(0, -size);
      // Left side of leaf
      context.bezierCurveTo(-size / 1.5, -size / 2, -size / 1.5, size / 2, 0, size);
      // Right side of leaf
      context.bezierCurveTo(size / 1.5, size / 2, size / 1.5, -size / 2, 0, -size);
      context.fill();

      // Draw leaf vein
      context.strokeStyle = "rgba(255, 255, 255, 0.15)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, -size);
      context.lineTo(0, size);
      context.stroke();

      context.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < maxLeaves; i++) {
        const leaf = leaves[i];

        // Move leaf down and diagonally
        leaf.y += leaf.d * 0.85;
        leaf.x += Math.sin(leaf.y / 30) * 0.4 + 0.1;
        leaf.a += leaf.aSpeed;

        // Draw the leaf
        drawLeaf(ctx, leaf.x, leaf.y, leaf.r, leaf.a, leaf.color);

        // Recycle leaf to the top if it goes off screen
        if (leaf.y > height + 20 || leaf.x > width + 20 || leaf.x < -20) {
          leaves[i] = {
            x: Math.random() * width,
            y: -20,
            r: Math.random() * 14 + 8,
            d: Math.random() * 0.8 + 0.3,
            a: Math.random() * Math.PI * 2,
            aSpeed: (Math.random() - 0.5) * 0.02,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
        }
      }

      animationId = requestAnimationFrame(update);
    };

    update();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};
