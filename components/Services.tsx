"use client";
import { motion } from "framer-motion";
import TitleReveal from "./TitleReveal";
import { Cpu, Bot, Server, BookOpen } from "lucide-react";

const services = [
  {
    num: "01",
    icon: <Cpu className="w-8 h-8 text-indigo-400" />,
    title: "IoT & Embedded Systems",
    desc: "Architecting robust IoT solutions using ESP32 and C++. Specialized in low-latency communication protocols and hardware-software synergy."
  },
  {
    num: "02",
    icon: <Bot className="w-8 h-8 text-emerald-400" />,
    title: "Robotics Hardware",
    desc: "Designing professional PCB chassis and high-torque robotic systems. Expert in circuit integrity and mechanical durability for competition-grade hardware."
  },
  {
    num: "03",
    icon: <Server className="w-8 h-8 text-amber-400" />,
    title: "Backend Engineering",
    desc: "Developing scalable backend backbones using modern logic and optimized databases to power complex, data-intensive applications."
  },
  {
    num: "04",
    icon: <BookOpen className="w-8 h-8 text-rose-400" />,
    title: "Technical Research",
    desc: "Certified by Wiley Researcher Academy in drafting technical articles and findings that meet global editorial and research standards."
  }
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="services" className="py-[80px] md:py-[160px] px-6 bg-[#0A0A0A] relative z-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center mb-16 md:mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-syne text-[clamp(40px,10vw,120px)] font-medium text-white leading-[1.1] tracking-[-0.03em] mb-8">
              What I <span className="bg-accent text-black px-4 py-0.5 md:px-5 md:py-1 rounded-sm font-bold inline-block transform -translate-y-1 shadow-[0_0_20px_rgba(239,255,0,0.4)]">Do</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            <span className="font-inter text-[11px] text-white/50 uppercase tracking-[0.2em] font-semibold">
              Core Capabilities
            </span>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 md:p-[48px_40px] bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 h-full cursor-pointer"
            >
              {/* Spotlight Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3" />

              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                {service.icon}
              </div>

              <div className="relative z-10">
                <div className="font-inter text-[12px] text-[#888] mb-[24px]">
                  {service.num}
                </div>
                <h3 className="font-syne text-[28px] font-[700] text-white mb-6">
                  {service.title}
                </h3>
                <p className="font-inter text-[15px] text-[#888] leading-[1.7]">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
