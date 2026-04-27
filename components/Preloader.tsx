"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

// cubic-bezier(0.76, 0, 0.24, 1) roughly matched for the counter progress
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2200; // 2200ms

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(t);
      const currentProgress = Math.floor(easedProgress * 100);

      setProgress(currentProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Exit: after 100% + 300ms delay -> slide panels away
        setTimeout(() => {
          setIsDone(true);
          // Wait for 800ms exit animation to finish before notifying parent
          setTimeout(onComplete, 800);
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <div className="fixed inset-0 z-[9000] pointer-events-none flex flex-col items-center justify-center">
          {/* Top Panel */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom Panel */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A]"
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center w-full max-w-[450px] px-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-syne font-bold text-[clamp(64px,10vw,110px)] text-white mb-8 tracking-tighter">
              Redwan.
            </h1>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-white/5 mb-4 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <span className="font-inter text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">
                Loading Experience
              </span>
              <div className="flex items-center gap-0.5">
                <span className="font-syne font-bold text-[14px] text-white">
                  {progress}
                </span>
                <span className="font-syne font-bold text-[14px] text-accent">
                  %
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
