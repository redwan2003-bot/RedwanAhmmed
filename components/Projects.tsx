"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-commerce Redesign",
    category: "Web Development",
    year: "2023",
    color: "bg-blue-500/20"
  },
  {
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    year: "2023",
    color: "bg-purple-500/20"
  },
  {
    title: "Portfolio Template",
    category: "Creative Coding",
    year: "2024",
    color: "bg-orange-500/20"
  },
  {
    title: "Web3 NFT Platform",
    category: "Fullstack",
    year: "2024",
    color: "bg-emerald-500/20"
  }
];

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 bg-background relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-syne font-bold mb-16 uppercase">Selected Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group glass-dark rounded-3xl p-8 h-[400px] flex flex-col justify-between relative overflow-hidden ${project.color} hover:bg-white/10 transition-colors duration-500 cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start relative z-10">
                <span className="px-4 py-1 rounded-full border border-white/20 text-sm">{project.category}</span>
                <span className="text-white/50">{project.year}</span>
              </div>
              
              <div className="relative z-10 flex justify-between items-end">
                <h3 className="text-3xl font-syne font-bold group-hover:translate-x-4 transition-transform duration-500">{project.title}</h3>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-500">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
