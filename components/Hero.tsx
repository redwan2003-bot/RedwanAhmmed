"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { useImageSequence } from "@/lib/useImageSequence";

export default function Hero({ isLoaded }: { isLoaded?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const { canvasRef } = useImageSequence(121, containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer 1 Parallax (Initial Text)
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const layer1Y = useTransform(scrollYProgress, [0, 0.12], [0, -80]);

  // Layer 2 Parallax (Digital Experiences)
  const layer2Opacity = useTransform(scrollYProgress, [0.25, 0.38, 0.52], [0, 1, 0]);
  const layer2Y = useTransform(scrollYProgress, [0.25, 0.38, 0.52], [80, 0, -80]);

  // Layer 3 Parallax (Bridging Design)
  const layer3Opacity = useTransform(scrollYProgress, [0.65, 0.78, 0.92], [0, 1, 0]);
  const layer3Y = useTransform(scrollYProgress, [0.65, 0.78, 0.92], [80, 0, -80]);

  const ease = [0.76, 0, 0.24, 1];

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#0A0A0A]" style={{ position: "relative" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Scrollytelling Canvas Sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 mix-blend-screen" />

        {/* Layer 1: Redwan. Creative Engineer */}
        <motion.div
          style={{ opacity: isLoaded ? layer1Opacity : 0, y: layer1Y }}
          className="relative z-10 flex flex-col items-center text-center w-full px-6"
        >
          <h1
            className="font-syne font-[800] text-white/30 leading-[0.9] tracking-[-0.03em] m-0"
            style={{ fontSize: "clamp(60px, 10vw, 140px)" }}
          >
            Redwan.
          </h1>
          <h2 className="font-inter text-[14px] md:text-[16px] text-white/15 uppercase tracking-[0.3em] mt-4">
            Creative Engineer
          </h2>
        </motion.div>

        {/* Layer 2: I build digital experiences. (Left Aligned) */}
        <motion.div
          style={{ opacity: layer2Opacity, y: layer2Y }}
          className="absolute inset-0 z-10 flex flex-col items-start justify-center text-left w-full px-6 md:px-24"
        >
          <h2
            className="font-syne font-[800] text-white leading-[1.1] tracking-[-0.03em] max-w-2xl"
            style={{ fontSize: "clamp(32px, 6vw, 90px)" }}
          >
            Building robust <br /><span className="text-accent">backbones & IoT solutions.</span>
          </h2>
        </motion.div>

        {/* Layer 3: Bridging design and engineering. (Right Aligned) */}
        <motion.div
          style={{ opacity: layer3Opacity, y: layer3Y }}
          className="absolute inset-0 z-10 flex flex-col items-end justify-center text-right w-full px-6 md:px-24"
        >
          <h2
            className="font-syne font-[800] text-white leading-[1.1] tracking-[-0.03em] max-w-2xl"
            style={{ fontSize: "clamp(32px, 6vw, 90px)" }}
          >
            Bridging software logic <br /><span className="text-accent">& hardware engineering.</span>
          </h2>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
          style={{ opacity: layer1Opacity }}
        >
          {/* Animated Mouse Icon */}
          <div className="w-[26px] h-[44px] rounded-full border border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{
                y: [0, 18, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            />
          </div>
          <span className="font-inter text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
