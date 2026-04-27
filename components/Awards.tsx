"use client";

export default function Awards() {
  return (
    <section className="py-24 px-6 bg-background relative z-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <h2 className="text-4xl md:text-5xl font-syne font-bold uppercase w-full md:w-1/3">Recognitions</h2>
        
        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Awwwards", count: "3x" },
            { name: "FWA", count: "1x" },
            { name: "CSSDA", count: "5x" },
            { name: "Webby", count: "Nominee" }
          ].map((award, i) => (
            <div key={i} className="text-center p-6 glass-dark rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="text-3xl font-bold font-syne text-accent mb-2">{award.count}</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{award.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
