"use client";

const testimonials = [
  {
    name: "Yogesh Kothiya",
    role: "Agentic AI",
    date: "June 8, 2021",
    quote: "Redwan helped us build our community website and created a fantastic seamless experience. The results were stellar and delivered promptly.",
    link: "https://linkedin.com/in/yogesh"
  },
  {
    name: "Salil Rana",
    role: "Fundraising Assistance",
    date: "August 24, 2020",
    quote: "We got our UI/UX made on a tight deadline and Redwan absolutely crushed it. Highly recommend working with him for high-end web design.",
    link: "https://linkedin.com/in/salil"
  },
  {
    name: "Naincy Kumari",
    role: "Human Resources Management",
    date: "March 7, 2026",
    quote: "I had the opportunity to work with Redwan on a complex dashboard. His attention to detail and creative problem-solving skills are unmatched.",
    link: "https://linkedin.com/in/naincy"
  }
];

export default function Testimonials() {
  const row = testimonials;

  return (
    <section id="testimonials" className="py-[80px] md:py-[120px] bg-[#0A0A0A] overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16 text-center">
        <h2 className="font-syne text-[clamp(32px,8vw,64px)] font-[800] text-white tracking-[-0.03em] mb-4">
          Client Recommendations
        </h2>
        <div className="font-inter text-[16px] text-[#888]">
          What people say about me
        </div>
      </div>

      <div className="relative w-full mt-16">
        <div className="group flex w-full overflow-hidden"
             style={{
               maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
               WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
             }}
        >
          <div className="flex animate-marquee-test gap-6 px-4 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials].map((test, i) => (
              <div 
                key={i}
                className="relative w-[280px] sm:w-[350px] md:w-[420px] shrink-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-[40px] flex flex-col justify-between"
              >
                <div className="absolute top-4 left-8 font-syne text-[60px] md:text-[80px] text-white/[0.06] leading-none">
                  &quot;
                </div>
                
                <p className="font-inter text-[14px] md:text-[16px] text-[#ccc] leading-[1.8] mb-[32px] relative z-10">
                  {test.quote}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/[0.06]">
                  <a href={test.link} target="_blank" rel="noopener noreferrer" className="font-syne text-[18px] font-[700] text-white hover:text-accent transition-colors block mb-1">
                    {test.name}
                  </a>
                  <div className="font-inter text-[13px] text-[#888] mb-1">
                    {test.role}
                  </div>
                  <div className="font-inter text-[12px] text-[#555]">
                    {test.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-test {
          animation: marquee-test 40s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-test {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
