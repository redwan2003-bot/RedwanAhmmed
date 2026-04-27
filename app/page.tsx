"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GlobalEffects from "@/components/GlobalEffects";

const Services = dynamic(() => import("@/components/Services"));
const TechMarquee = dynamic(() => import("@/components/TechMarquee"));
const Work = dynamic(() => import("@/components/Work"));
const About = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-accent selection:text-[#0A0A0A] relative">
      <GlobalEffects />
      <Preloader onComplete={() => setIsLoaded(true)} />
      <Navbar isLoaded={isLoaded} />
      
      <Hero isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Services />
          <TechMarquee />
          <Work />
          <About />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
