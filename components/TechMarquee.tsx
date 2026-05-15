"use client";

const techList = [
  "ESP32", "C++", "PCB Design", "EasyEDA", "PSXLib", "FreeRTOS",
  "Arduino", "Node.js", "Express", "TypeScript", "React",
  "Next.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma", "Git"
];

// Split into two halves or distinct orders for row1 and row2
const row1 = techList;
const row2 = [...techList].reverse();

export default function TechMarquee() {
  return (
    <section className="py-[80px] md:py-[120px] bg-[#0A0A0A] border-y border-[rgba(255,255,255,0.06)] overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="font-inter text-[11px] text-[#888] uppercase tracking-[0.15em] mb-4">
          Technologies & Tools
        </div>
        <h2 className="font-syne text-[clamp(32px,8vw,64px)] font-[800] text-white tracking-[-0.03em]">
          My Arsenal
        </h2>
      </div>

      <div className="relative flex flex-col gap-6 w-[200%] md:w-[150%] lg:w-full max-w-[100vw] overflow-hidden">
        {/* Row 1 */}
        <div className="group flex w-full">
          <div className="flex w-[200%] shrink-0 animate-marquee gap-4 px-2 hover:[animation-play-state:paused]">
            {[...row1, ...row1].map((tech, i) => (
              <div 
                key={`r1-${i}`}
                className="flex items-center gap-3 border border-[rgba(255,255,255,0.1)] rounded-[999px] px-[24px] py-[10px] font-inter text-[15px] text-[#888] whitespace-nowrap bg-[rgba(255,255,255,0.02)] hover:bg-white/5 hover:text-white transition-all cursor-default"
              >
                <img 
                  src={`/icons/${tech.toLowerCase().replace(" ", "").replace(".", "")}.svg`} 
                  alt="" 
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="group flex w-full">
          <div className="flex w-[200%] shrink-0 animate-marquee-reverse gap-4 px-2 hover:[animation-play-state:paused]">
            {[...row2, ...row2].map((tech, i) => (
              <div 
                key={`r2-${i}`}
                className="flex items-center gap-3 border border-[rgba(255,255,255,0.1)] rounded-[999px] px-[24px] py-[10px] font-inter text-[15px] text-[#888] whitespace-nowrap bg-[rgba(255,255,255,0.02)] hover:bg-white/5 hover:text-white transition-all cursor-default"
              >
                <img 
                  src={`/icons/${tech.toLowerCase().replace(" ", "").replace(".", "")}.svg`} 
                  alt="" 
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
