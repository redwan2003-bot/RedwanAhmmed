"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, FileText } from "lucide-react";

interface NavbarProps {
  isLoaded: boolean;
}

const navLinks = [
  "Services", "Work", "About", "Experience", "Testimonials", "Contact"
];

export default function Navbar({ isLoaded }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observers = new Map();
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
      rootMargin: "-20% 0px -60% 0px"
    });

    navLinks.forEach((link) => {
      const id = link.toLowerCase();
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.set(id, element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hero is 500vh, we hide it as we transition into the next sections
      // 450vh is a good point where the last hero text has faded and the canvas is ending
      setIsVisible(window.scrollY < window.innerHeight * 4.5);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-[1000] px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference bg-transparent"
      >
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-syne text-[22px] font-[800] text-white tracking-[-0.04em] uppercase">
            Redwan_Ahmmed
          </span>
          <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform duration-300" />
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center">
          {navLinks.map((item, i) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <Link
                key={item}
                href={`#${id}`}
                className={`relative px-5 py-2 font-inter text-[13px] font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
              >

                {item}
              </Link>
            );
          })}
        </div>

        {/* Right: Resume / Socials */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-white text-black font-inter text-[13px] font-bold rounded-full overflow-hidden transition-transform active:scale-95"
          >
            <FileText size={16} className="relative z-10 group-hover:text-white transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Resume</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/redwan2003-bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/redwanahmmed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.div
            animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-white origin-center"
          />
          <motion.div
            animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-white origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-[#0A0A0A] flex flex-col p-12 justify-center"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((item, i) => {
                const id = item.toLowerCase();
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                  >
                    <Link
                      href={`#${id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-syne text-[56px] font-[800] text-white hover:text-accent transition-colors leading-none"
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-24 pt-12 border-t border-white/10"
            >
              <div className="text-white/40 font-inter text-sm mb-4 uppercase tracking-widest">Get in touch</div>
              <a href="mailto:reah30244@gmail.com" className="font-syne text-2xl text-white underline decoration-accent underline-offset-8">
                reah30244@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
