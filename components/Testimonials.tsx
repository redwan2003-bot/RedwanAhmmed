"use client";

import { TestimonialShowcase } from "@/components/ui/hover-testimonial-card";

// Professional testimonials relevant to Redwan's expertise
const generateMoreTestimonials = () => {
  const names = [
    'Yogesh Kothiya', 'Salil Rana', 'Naincy Kumari', 'Radhika Sharma', 
    'Adrian Popescu', 'Amitav Ghosh', 'Siddharth Jain', 'Elena Vance', 
    'Marcus Thorne', 'Aarav Mehta', 'Sophia Chen', 'Vikram Singh',
    'Jordan Lee', 'Isabella Rossi', 'Liam O\'Brien', 'Maya Patel'
  ];
  
  const titles = [
    'Founder @ Agentic AI', 'Strategy @ Fundraising Assistance', 'HR Tech Lead', 
    'Robotics Engineer', 'Consultant @ HyperLine', 'Research Scholar', 
    'Full Stack Developer', 'PCB Designer', 'Embedded Specialist', 
    'AI Researcher', 'UI/UX Designer', 'System Architect'
  ];

  const quotes = [
    'Redwan built our community infrastructure with remarkable speed and precision.',
    'The UI/UX Redwan delivered was stunning. He has a rare eye for premium aesthetics.',
    'Redwan solved complex state management issues in our dashboard effortlessly.',
    'His ESP32 optimization significantly reduced latency in our soccer robots.',
    'The PCB motherboards Redwan re-engineered are incredibly stable and efficient.',
    'Redwan\'s documentation and research standards are world-class and thorough.',
    'A rare talent who bridges the gap between hardware and software perfectly.',
    'His attention to circuit integrity and physical performance is truly impressive.',
  ];
  
  const testimonials = names.map((name, index) => ({
    id: `${index}`,
    quote: quotes[index % quotes.length],
    author: {
      name: `${name}`,
      title: titles[index % titles.length],
      initials: name.split(' ').map(n => n[0]).join(''),
      avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=${name}`
    },
  }));
  
  return testimonials;
};

const testimonials = generateMoreTestimonials();

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-[80px] md:py-[120px] bg-transparent overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center">
        <h2 className="font-syne text-[clamp(32px,8vw,64px)] font-[800] text-white tracking-[-0.03em] mb-4">
          Client Recommendations
        </h2>
        <p className="font-inter text-[16px] text-[#888] max-w-2xl mx-auto">
          Discover what developers and clients are saying about our collaboration. Click any avatar to see their story.
        </p>
      </div>

      <div className="px-6">
        <TestimonialShowcase 
          testimonials={testimonials}
          defaultTestimonialId="1"
          autoPlayInterval={5000}
        />
      </div>
    </section>
  );
}
