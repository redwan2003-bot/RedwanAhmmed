"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  slides: Slide[];
  aspectRatio?: string;
  isEnabled?: boolean;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ImageSlideshow({ 
  slides, 
  aspectRatio = "4/5",
  isEnabled = true 
}: ImageSlideshowProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  const imageIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback((newDirection: number) => {
    if (!isEnabled || !isInView) return;
    setPage([page + newDirection, newDirection]);
  }, [page, isEnabled, isInView]);

  useEffect(() => {
    if (!isEnabled || !isInView) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Autoplay logic
    const interval = setInterval(() => {
      paginate(1);
    }, 2500);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [paginate, isEnabled, isInView]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 60 : -60,
      opacity: 0
    })
  };

  const transition = {
    x: { type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] },
    opacity: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-[16px] group focus:outline-none" 
      style={{ aspectRatio }}
      tabIndex={0}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Image
            src={slides[imageIndex].src}
            alt={slides[imageIndex].alt}
            fill
            className="object-cover pointer-events-none"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 z-10 font-inter text-xs font-bold text-white/50 tracking-widest">
        {(imageIndex + 1).toString().padStart(2, "0")} / {slides.length.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
