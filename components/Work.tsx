"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Trophy, Award, Medal } from "lucide-react";

const projects = [
  { 
    title: "LFR Motherboard", 
    category: "PCB Design & Hardware Optimization", 
    description: "Re-engineered PCB chassis motherboard for Line Following Robots, optimizing routing for high-speed stability.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    title: "UIU Robotics Backend", 
    category: "Scalable Logic & System Arch", 
    description: "Architecting robust backend systems for club-wide software projects, ensuring seamless code-to-hardware integration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    title: "Robo-Soccer System", 
    category: "High-Torque Robotic Systems", 
    description: "Lead hardware engineering for national competitions, focusing on circuit integrity and mechanical durability.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    title: "EasyEDA Initiative", 
    category: "PCB Design Standards Advocacy", 
    description: "Promoting professional-grade PCB design standards (EasyEDA Pro) within the academic and maker community.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" 
  }
];

const awards = [
  {
    title: "IAAC Bronze Honor",
    issuer: "Int'l Astronomy & Astrophysics Competition",
    year: "2021, 2023",
    icon: <Medal className="w-6 h-6 text-amber-400" />,
    color: "amber"
  },
  {
    title: "National Finalist (Top 5)",
    issuer: "KUET Bitfest 2025",
    year: "Feb 2025",
    icon: <Trophy className="w-6 h-6 text-blue-400" />,
    color: "blue"
  },
  {
    title: "Global Finalist",
    issuer: "Int'l Asteroid Search Campaign (IASC)",
    year: "2019, 2020",
    icon: <Award className="w-6 h-6 text-emerald-400" />,
    color: "emerald"
  }
];

export default function Work() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const awardsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const awardItem = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="work" className="py-[80px] md:py-[160px] px-6 bg-[#0A0A0A] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne text-[clamp(32px,8vw,90px)] font-normal text-white leading-[1.1] tracking-[-0.03em]"
          >
            Selected <span className="bg-white text-black px-4 py-0.5 rounded-sm font-bold inline-block transform -translate-y-1">Work</span>
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="group relative flex flex-col gap-6 p-6 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-500 will-change-transform hover:-translate-y-2 cursor-pointer h-full"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/50">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  unoptimized
                  className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex-1 pr-4">
                  <h3 className="font-syne text-[24px] font-[700] text-white group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="font-inter text-[12px] text-white/40 uppercase tracking-wider mt-1 font-bold">{project.category}</p>
                  <p className="font-inter text-[14px] text-[#888] leading-relaxed mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-accent group-hover:border-accent group-hover:text-[#0A0A0A] transition-all text-white self-start mt-1">
                  <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards Subsection */}
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Title & Info */}
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-syne text-[clamp(30px,5vw,64px)] font-normal text-white leading-[1.1] mb-6"
            >
              Awards & <br />
              <span className="bg-white text-black px-4 py-0.5 rounded-sm font-bold inline-block transform -translate-y-1">Recognition</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-inter text-[#888] text-lg max-w-[320px] leading-relaxed"
            >
              Honors received for engineering excellence and scientific research.
            </motion.p>
          </div>

          {/* Right Side: Award Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center h-full"
              >
                {/* Icon with Glow */}
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <div className={`absolute inset-0 bg-current blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`} />
                  {award.icon}
                </div>
                
                <h3 className="font-syne text-[18px] font-bold text-white mb-6 leading-tight">
                  {award.title}
                </h3>
                
                <div className="mt-auto">
                  <div className="font-inter text-[10px] text-[#555] uppercase tracking-[0.2em] font-bold leading-relaxed">
                    Issued by {award.issuer}
                    {award.year && <><br />{award.year}</>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
