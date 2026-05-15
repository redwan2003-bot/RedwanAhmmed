"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);
  const dotsRef = useRef<Dot[]>([]);
  const gridDims = useRef({ cols: 0, rows: 0 });

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hidden on hero section initially. Fades in as the hero ends (500vh).
  // Now set to max opacity (1.0) for sections after the hero.
  const opacity = useTransform(scrollY, [vh * 4.5, vh * 5], [0, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    const gridSize = 65;
    const repulsionRadius = 350;
    const repulsionStrength = 35;
    const springStiffness = 0.04;
    const damping = 0.88;

    const initDots = () => {
      dotsRef.current = [];
      // Calculate columns and rows including padding
      const cols = Math.ceil(w / gridSize) + 3;
      const rows = Math.ceil(h / gridSize) + 3;
      gridDims.current = { cols, rows };
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i - 1) * gridSize;
          const y = (j - 1) * gridSize;
          dotsRef.current.push({
            x, y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    initDots();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const drawLine = (p1: Dot, p2: Dot) => {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const dx = midX - mouse.x;
      const dy = midY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const baseAlpha = 0.05;
      let alpha = baseAlpha;
      let strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`;

      if (dist < repulsionRadius) {
        const ratio = 1 - dist / repulsionRadius;
        const powerRatio = Math.pow(ratio, 2.5);
        alpha = baseAlpha + powerRatio * 0.25;
        // Use the lime-yellow color #E8FF00
        strokeStyle = `rgba(232, 255, 0, ${alpha})`;
        ctx.lineWidth = 0.5 + powerRatio * 1.5;
      } else {
        ctx.lineWidth = 0.5;
      }

      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update dots with spring physics and mouse repulsion
      dotsRef.current.forEach(dot => {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionRadius) {
          const force = (1 - dist / repulsionRadius) * repulsionStrength;
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * force * 0.15;
          dot.vy += Math.sin(angle) * force * 0.15;
        }

        // Spring back to original grid position
        const fx = (dot.originX - dot.x) * springStiffness;
        const fy = (dot.originY - dot.y) * springStiffness;
        
        dot.vx = (dot.vx + fx) * damping;
        dot.vy = (dot.vy + fy) * damping;
        dot.x += dot.vx;
        dot.y += dot.vy;
      });

      const { cols, rows } = gridDims.current;

      // Draw lines and dots
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j;
          const dot = dotsRef.current[idx];
          if (!dot) continue;

          // Connect to right neighbor
          if (i < cols - 1) {
            const nextDot = dotsRef.current[idx + rows];
            if (nextDot) drawLine(dot, nextDot);
          }
          // Connect to bottom neighbor
          if (j < rows - 1) {
            const nextDot = dotsRef.current[idx + 1];
            if (nextDot) drawLine(dot, nextDot);
          }
          
          // Draw dot highlights at intersections
          const dX = dot.x - mouse.x;
          const dY = dot.y - mouse.y;
          const distMouse = Math.sqrt(dX * dX + dY * dY);
          
          if (distMouse < repulsionRadius) {
            const ratio = 1 - distMouse / repulsionRadius;
            const powerRatio = Math.pow(ratio, 2);
            ctx.fillStyle = `rgba(232, 255, 0, ${powerRatio * 0.7})`;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 1.2 + powerRatio * 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [vh]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};

export default InteractiveGrid;
