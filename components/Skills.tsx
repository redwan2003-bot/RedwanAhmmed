"use client";
import { motion } from "framer-motion";

const skills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", 
  "Three.js", "WebGL", "Node.js", "GraphQL", "Creative Coding"
];

export default function Skills() {
  return (
    <section className="py-24 overflow-hidden bg-primary border-y border-white/10">
      <div className="relative flex whitespace-nowrap">
        <motion.div 
          className="flex space-x-16 px-8"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="text-4xl md:text-7xl font-syne font-bold text-transparent text-stroke uppercase">
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
