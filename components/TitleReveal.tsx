"use client";
import { motion } from "framer-motion";

interface TitleRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TitleReveal({ text, className = "", delay = 0 }: TitleRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 45,
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden inline-flex mr-[0.25em] py-2">
          <motion.span
            variants={child}
            className="inline-block origin-bottom"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
