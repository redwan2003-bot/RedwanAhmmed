"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Offset by half of size to center them
  const ringX = useTransform(springX, val => val - 16);
  const ringY = useTransform(springY, val => val - 16);
  
  const dotX = useTransform(mouseX, val => val - 4);
  const dotY = useTransform(mouseY, val => val - 4);

  useEffect(() => {
    // Check if device is touch-capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          width: 32,
          height: 32,
          border: "1px solid rgba(255,255,255,0.4)",
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(239, 255, 0, 0.15)" : "rgba(239, 255, 0, 0)",
          borderColor: isHovering ? "rgba(239, 255, 0, 0)" : "rgba(255,255,255,0.4)"
        }}
        transition={{ scale: { duration: 0.2 }, backgroundColor: { duration: 0.2 } }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isClicked ? 0.5 : 1,
          boxShadow: isHovering ? "0 0 15px rgba(239, 255, 0, 0.8)" : "0 0 0px rgba(239, 255, 0, 0)"
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
