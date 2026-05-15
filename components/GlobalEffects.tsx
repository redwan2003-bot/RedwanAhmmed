"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import InteractiveGrid from "./InteractiveGrid";

export default function GlobalEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <InteractiveGrid />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-emerald-500 to-sky-500 origin-left z-[1000] shadow-[0_0_10px_rgba(129,140,248,0.8)]"
        style={{ scaleX }}
      />

      {/* Global Grain/Noise Overlay */}
      <div 
        className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-screen w-full opacity-40 mix-blend-screen">
        <motion.div 
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] max-w-[600px] max-h-[600px] rounded-full bg-indigo-500/10 blur-[130px]"
        />
        <motion.div 
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/10 blur-[140px]"
        />
      </div>
    </>
  );
}
