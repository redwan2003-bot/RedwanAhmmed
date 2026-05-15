"use client";
import StackedCards from "./StackedCards";
import ImageSlideshow from "./ImageSlideshow";
import RevealOnScroll from "./RevealOnScroll";

const services = [
  {
    number: "01",
    title: "IoT & Embedded Systems",
    subtitle: "Architecting robust IoT solutions using ESP32 and C++. Specialized in low-latency communication protocols and hardware-software synergy.",
    tag: "Hardware"
  },
  {
    number: "02",
    title: "Robotics Hardware Specialist",
    subtitle: "Designing professional PCB chassis and high-torque robotic systems. Expert in circuit integrity and mechanical durability for competition-grade hardware.",
    tag: "Robotics"
  },
  {
    number: "03",
    title: "Backend Engineering",
    subtitle: "Developing scalable backend backbones using modern logic and optimized databases to power complex, data-intensive applications.",
    tag: "Software"
  },
  {
    number: "04",
    title: "Technical Research",
    subtitle: "Certified by Wiley Researcher Academy in drafting technical articles and findings that meet global editorial and research standards.",
    tag: "Research"
  }
];

const labSlides = [
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", alt: "Hardware Lab 1" },
  { src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200", alt: "Hardware Lab 2" },
  { src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200", alt: "Hardware Lab 3" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", alt: "Hardware Lab 4" },
];

export default function Services() {
  return (
    <section id="services" className="py-[80px] md:py-[160px] px-6 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center mb-16 md:mb-32 text-center">
          <RevealOnScroll>
            <h2 className="font-syne text-[clamp(40px,10vw,120px)] font-medium text-white leading-[1.2] tracking-[-0.03em] mb-8">
              What I <span className="bg-accent text-black px-4 py-0.5 md:px-5 md:py-1 rounded-sm font-bold inline-block transform md:-translate-y-1 shadow-[0_0_20px_rgba(239,255,0,0.4)]">Do</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="inline-flex items-center px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-inter text-[11px] text-white/50 uppercase tracking-[0.2em] font-semibold">
                Core Capabilities
              </span>
            </div>
          </RevealOnScroll>
        </div>

        {/* Stacked Cards Component */}
        <StackedCards cards={services} />

        {/* Lab Slideshow Section */}
        <div className="mt-32 md:mt-64">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="font-syne text-4xl md:text-6xl font-bold text-white mb-8">
                  Hardware <br /> 
                  <span className="text-white/40">Lab & R&D</span>
                </h2>
                <p className="font-inter text-lg text-[#888] leading-relaxed max-w-md">
                  A glimpse into the physical workspace where hardware components are tested, PCB designs are validated, and robotic systems come to life.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <ImageSlideshow slides={labSlides} aspectRatio="16/9" />
            </RevealOnScroll>
          </div>
        </div>

      </div>
    </section>
  );
}

