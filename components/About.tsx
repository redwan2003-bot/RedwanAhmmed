"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCountUp } from "@/lib/useCountUp";

export default function About() {
  const yearsExp = useCountUp(4, 2);
  const awardsCount = useCountUp(7, 2);

  return (
    <section id="about" className="py-[80px] md:py-[120px] px-6 bg-[#0A0A0A] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-32 items-center">

        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
          <div className="relative inline-block w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square rounded-[48px] overflow-hidden border border-white/5"
            >
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
                alt="Retro Hardware Creative Workspace"
                fill
                className="object-cover grayscale brightness-75 contrast-125"
              />
            </motion.div>

            {/* Badge - Positioned to overlap the corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#111]/80 backdrop-blur-2xl border border-white/10 flex items-center justify-center group cursor-pointer z-10 shadow-2xl"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <span className="font-inter text-[12px] text-white/60 uppercase tracking-[0.6em] rotate-90 origin-center whitespace-nowrap font-bold">
                  Design
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne text-[clamp(36px,8vw,80px)] font-normal text-white leading-[1.2] tracking-[-0.03em] mb-8 md:mb-12"
          >
            About <span className="bg-accent text-black px-4 py-0.5 md:px-5 md:py-1 rounded-sm font-bold inline-block transform md:-translate-y-1 shadow-[0_0_20px_rgba(239,255,0,0.4)]">Me</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-[#888] font-inter text-[16px] md:text-[18px] leading-relaxed mb-16 max-w-[600px]"
          >
            <p>
              I am a Computer Engineering student at United International University, specializing as a Backend Developer and Robotics Hardware Specialist. I bridge the gap between sophisticated software logic and high-performance hardware engineering.
            </p>
            <p>
              Currently, I drive innovation at the UIU Robotics Club through a dual-impact role: architecting scalable backend systems and optimizing physical performance as a Hardware Specialist in R&D. My journey is defined by a commitment to precision, from optimizing PCB chassis motherboards to being appointed an EasyEDA Campus Promotion Ambassador.
            </p>
            <p>
              My technical expertise spans across building robust backbones and IoT solutions using ESP32, PSXLib, and C++, alongside professional PCB design and high-torque robotic systems. I don&apos;t just build systems; I advocate for the professional-grade tools that power them.
            </p>
            <p>
              Beyond engineering, I am a 2-time Bronze Honor recipient at the International Astronomy & Astrophysics Competition (IAAC) and a certified researcher by the Wiley Researcher Academy, ensuring all technical documentation meets global standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-16 md:gap-24"
          >
            <div className="flex flex-col">
              <div className="font-syne text-[48px] md:text-[64px] font-[800] text-white leading-none mb-2 md:mb-4">
                <span ref={yearsExp.ref}>{yearsExp.count}</span>+
              </div>
              <div className="font-inter text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold">
                Years Experience
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-syne text-[48px] md:text-[64px] font-[800] text-blue-500 leading-none mb-2 md:mb-4">
                <span ref={awardsCount.ref}>{awardsCount.count}</span>
              </div>
              <div className="font-inter text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold">
                Major Honors
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
