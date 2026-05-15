"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface CardData {
  number: string;
  title: string;
  subtitle: string;
  tag: string;
}

interface StackedCardsProps {
  cards: CardData[];
}

export default function StackedCards({ cards }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${cards.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl px-4 md:px-6 h-[450px] md:h-[600px] flex items-center justify-center">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              total={cards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
          
          {/* Progress Dots Removed */}
        </div>
      </div>
    </div>
  );
}

function Card({ 
  card, 
  index, 
  total, 
  scrollYProgress 
}: { 
  card: CardData; 
  index: number; 
  total: number; 
  scrollYProgress: any 
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  
  // Animation for "Incoming" and "Current" state
  // We want the card to animate in from index*step and animate out from (index+1)*step
  
  // Incoming: 0.88 -> 1 scale, 0 -> 1 opacity, 40px -> 0 translate
  // Outgoing: 1 -> 0.88 scale, 1 -> 0 opacity, 0 -> -24px translate, 0 -> 6px blur

  // We can simplify:
  // If progress < start: fully hidden (bottom state)
  // If progress is between start and end: active/animating
  // If progress > end: fully hidden (top state)

  // Actually, the user wants the cards to stack.
  // When card 0 is active, it's at scale 1.
  // When we scroll further, card 0 animates OUT (scale 0.88, blur 6px, etc) while card 1 animates IN.

  // Let's define the range for each card.
  // Each card's "active" period is [start, end].
  
  // Exit animations (when progress goes from start to end)
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
  const y = useTransform(scrollYProgress, [start, end], [0, -24]);
  const blur = useTransform(scrollYProgress, [start, end], [0, 6]);

  // Entrance animations for the NEXT card? 
  // The user says "The next card simultaneously animates in".
  // So for card `index`, it should start animating IN when `index-1` starts animating OUT.
  
  // If index > 0, it animates in during [(index-1)*step, index*step]
  const entranceStart = (index - 1) * step;
  const entranceEnd = index * step;

  const entranceScale = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0.88, 1]);
  const entranceOpacity = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0, 1]);
  const entranceY = useTransform(scrollYProgress, [entranceStart, entranceEnd], [40, 0]);

  // Combine them:
  // Card is visible from (index-1)*step to (index+1)*step
  // But wait, the first card doesn't have an entrance.
  
  const finalScale = useTransform(scrollYProgress, 
    [entranceStart, entranceEnd, start, end], 
    [0.88, 1, 1, 0.88]
  );
  const finalOpacity = useTransform(scrollYProgress, 
    [entranceStart, entranceEnd, start, end], 
    [0, 1, 1, 0]
  );
  const finalY = useTransform(scrollYProgress, 
    [entranceStart, entranceEnd, start, end], 
    [40, 0, 0, -24]
  );
  const finalBlur = useTransform(scrollYProgress, 
    [start, end], 
    [0, 6]
  );

  return (
    <motion.div
      style={{
        scale: index === 0 ? scale : finalScale,
        opacity: index === 0 ? opacity : finalOpacity,
        y: index === 0 ? y : finalY,
        filter: index === 0 ? useTransform(blur, (v) => `blur(${v}px)`) : useTransform(finalBlur, (v) => `blur(${v}px)`),
        zIndex: total - index,
      }}
      className="absolute inset-0 w-full h-full bg-[#0d0d0d] rounded-2xl border border-white/10 p-6 md:p-[36px] flex flex-col justify-between shadow-2xl"
    >
      <div className="flex flex-col">
        <span className="font-syne text-[10px] md:text-sm text-white/40 mb-2 md:mb-4">{card.number}</span>
        <h3 className="font-syne text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] max-w-md">
          {card.title}
        </h3>
        <p className="font-inter text-sm md:text-lg text-white/60 mt-3 md:mt-4 max-w-sm line-clamp-3 md:line-clamp-none">
          {card.subtitle}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/70">
          {card.tag}
        </span>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
          <ArrowUpRight size={20} className="md:w-6 md:h-6" />
        </div>
      </div>
    </motion.div>
  );
}

