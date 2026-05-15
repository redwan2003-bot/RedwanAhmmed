import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, FileText } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
  }
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? reducedItemVariants : itemVariants;

  return (
    <section id="contact" className="py-[120px] md:py-[200px] text-center bg-transparent relative z-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.h2
          variants={childVariants}
          className="font-syne text-[clamp(40px,10vw,90px)] font-normal text-white leading-[1.1] mb-10 md:mb-12"
        >
          Let&apos;s Work <span className="bg-accent text-black px-4 py-0.5 md:px-6 md:py-1 rounded-sm font-bold inline-block transform md:-translate-y-2 shadow-[0_0_20px_rgba(239,255,0,0.4)]">Together</span>
        </motion.h2>

        <motion.p
          variants={childVariants}
          className="font-inter text-[15px] md:text-[18px] text-[#888] max-w-4xl mx-auto leading-relaxed mb-16 md:mb-20 text-center"
        >
          Currently open to senior/lead full-stack roles in UAE or India. Whether you have an enterprise project or a creative vision to bring to life, I&apos;d love to hear from you.
        </motion.p>

        <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center mb-10 md:mb-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=reah30244@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white text-[#0A0A0A] px-10 py-5 rounded-full font-inter text-[14px] font-bold hover:bg-accent transition-all duration-500 group"
          >
            <Mail size={18} />
            SEND A MESSAGE
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 text-white px-10 py-5 rounded-full font-inter text-[14px] font-bold hover:bg-white/10 transition-all duration-500"
          >
            <FileText size={18} />
            DOWNLOAD CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
