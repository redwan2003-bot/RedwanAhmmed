"use client";
import dynamic from "next/dynamic";
import { Trophy, Award, Medal } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const WorkSlider = dynamic(() => import("./WorkSlider"), { ssr: false });

const awards = [
  {
    title: "IAAC Bronze Honor",
    issuer: "Int'l Astronomy & Astrophysics Competition",
    year: "2021, 2023",
    icon: <Medal className="w-6 h-6 text-amber-400" />,
    color: "amber",
  },
  {
    title: "National Finalist (Top 5)",
    issuer: "KUET Bitfest 2025",
    year: "Feb 2025",
    icon: <Trophy className="w-6 h-6 text-blue-400" />,
    color: "blue",
  },
  {
    title: "Global Finalist",
    issuer: "Int'l Asteroid Search Campaign (IASC)",
    year: "2019, 2020",
    icon: <Award className="w-6 h-6 text-emerald-400" />,
    color: "emerald",
  },
];

export default function Work() {
  return (
    <>
      {/* ── Section heading (above the slider) ── */}
      <div id="work" className="pt-[80px] md:pt-[140px] pb-10 px-6 bg-transparent relative z-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-syne text-[clamp(32px,8vw,90px)] font-normal text-white leading-[1.2] tracking-[-0.03em]">
              Selected{" "}
              <span className="bg-accent text-black px-4 py-0.5 md:px-4 md:py-0.5 rounded-sm font-bold inline-block transform md:-translate-y-1 shadow-[0_0_20px_rgba(239,255,0,0.4)]">
                Work
              </span>
            </h2>
          </RevealOnScroll>
        </div>
      </div>

      {/* ── Full-screen parallax slider ── */}
      <section className="relative z-20">
        <WorkSlider />
      </section>

      {/* ── Awards & Recognition ── */}
      <section className="py-[80px] md:py-[160px] px-6 bg-transparent relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left: Title */}
            <div className="lg:w-1/3">
              <RevealOnScroll>
                <h2 className="font-syne text-[clamp(30px,5vw,64px)] font-normal text-white leading-[1.1] mb-6">
                  Awards &<br />
                  <span className="bg-accent text-black px-4 py-0.5 rounded-sm font-bold inline-block transform -translate-y-1 shadow-[0_0_20px_rgba(239,255,0,0.4)]">
                    Recognition
                  </span>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="font-inter text-[#888] text-lg max-w-[320px] leading-relaxed">
                  Honors received for engineering excellence and scientific research.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right: Award cards */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <div className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-current blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                      {award.icon}
                    </div>
                    <h3 className="font-syne text-[18px] font-bold text-white mb-6 leading-tight">
                      {award.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="font-inter text-[10px] text-[#555] uppercase tracking-[0.2em] font-bold leading-relaxed">
                        Issued by {award.issuer}
                        {award.year && (
                          <>
                            <br />
                            {award.year}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
