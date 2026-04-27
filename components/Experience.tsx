"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Briefcase, MapPin, Mail, ArrowRight, FileText } from "lucide-react";

const jobs = [
  {
    role: "Robotics & Project Showcase Specialist",
    dates: "Dec 2025 – Present",
    company: "UIU Robotics",
    location: "United International University · On-site",
    bullets: [
      "Lead hardware engineering for national-level competitions including Robo Soccer, Robo Race, and Project Showcasing.",
      "Architecting and maintaining robust backend systems for club-wide software projects, ensuring code-to-hardware synergy.",
      "Implementing low-latency communication protocols for ESP32-based systems to maximize response times."
    ],
    isActive: true
  },
  {
    role: "Hardware Consultant",
    dates: "Jan 2026 – Present",
    company: "HyperLine Robotics",
    location: "Bucharest, Romania · Remote",
    bullets: [
      "Re-engineered the PCB chassis motherboard for the LFR (Line Following Robot) series.",
      "Optimized component positioning and routing to maximize output stability during high-speed maneuvers.",
      "Collaborated on physical chassis durability and circuit integrity for national engineering fests."
    ],
    isActive: false
  },
  {
    role: "Campus Promotion Ambassador",
    dates: "Jan 2026 – Present",
    company: "EasyEDA",
    location: "Global / Campus · Remote",
    bullets: [
      "Advocating for professional-grade PCB design standards (EasyEDA Pro) within the academic community.",
      "Facilitating knowledge sharing for the Certified Teacher Program to bridge theory and practical implementation.",
      "Providing student access to industry-standard tools for graduation projects and hardware innovation."
    ],
    isActive: false
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
    layoutEffect: false
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="py-[80px] md:py-[160px] px-6 bg-[#0A0A0A] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne text-[clamp(32px,7vw,80px)] font-normal text-white leading-tight mb-8 text-center"
          >
            Professional <span className="bg-white text-black px-5 py-1 rounded-sm font-bold inline-block transform -translate-y-2">Experience</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="font-inter text-[11px] text-white/50 uppercase tracking-[0.2em] font-bold">
              MY CAREER JOURNEY
            </span>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef} style={{ position: "relative" }}>
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-white/5" />

          <motion.div
            className="absolute left-0 md:left-8 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-cyan-400 origin-top shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            style={{ scaleY }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {jobs.map((job, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative pl-10 md:pl-28 group">
                <div className="absolute left-[-6px] md:left-[26px] top-12 w-[13px] h-[13px] rounded-full bg-[#0A0A0A] border-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-500 z-10" />

                <div className="p-6 md:p-10 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 backdrop-blur-md relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/50 transition-all duration-700" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white transition-all duration-500">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2.5 rounded-full w-fit border border-white/5">
                      <Calendar size={14} />
                      <span className="text-sm font-semibold tracking-wide uppercase">{job.dates}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm mb-10 pb-8 border-b border-white/[0.05]">
                    <div className="flex items-center gap-3 text-white/80 font-medium text-base">
                      <Briefcase size={18} className="text-indigo-400/80" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-3 text-white/50 text-base">
                      <MapPin size={18} className="text-emerald-400/80" />
                      {job.location}
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-4 text-white/60 group-hover:text-white/70 transition-colors duration-300">
                        <span className="text-white/20 mt-1.5 flex-shrink-0 text-xs group-hover:text-accent transition-colors duration-500">▹</span>
                        <p className="leading-relaxed font-medium">{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
