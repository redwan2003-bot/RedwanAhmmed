"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BASE_PATH } from "@/lib/utils";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
  link: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Robo-Soccer System",
    image: "/projects/robo-soccer.jpeg",
    category: "Robotic Systems",
    year: "2025",
    description: "High-torque competition hardware",
    link: "#",
  },
  {
    title: "LFR Motherboard",
    image: "/projects/lfr-motherboard.png",
    category: "PCB Design",
    year: "2024",
    description: "High-speed circuit optimization",
    link: "https://u.easyeda.com/account/user/projects/index/detail?project=21e142ba891447498fb8916465393517&listType=all",
  },
  {
    title: "EasyEDA Initiative",
    image: "/projects/easyeda-initiative.jpeg",
    category: "Standards Advocacy",
    year: "2024",
    description: "Professional PCB education",
    link: "https://www.linkedin.com/posts/redwanahmmed_iot-internetofthings-backenddevelopment-ugcPost-7451949636237307904-obNA",
  },
  {
    title: "UIU Robotics Backend",
    image: "/projects/uiu-robotics-backend.png",
    category: "Backend Architecture",
    year: "2024",
    description: "Scalable club infrastructure",
    link: "https://robotics.uiu.ac.bd/",
  },
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.08, // Increased for snappier, ultra-smooth responsive snaps
  MAX_VELOCITY: 150,
  SNAP_DURATION: 600,
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const DEFAULT_CARD_HEIGHT = 240;

export default function WorkSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIndexRef = React.useRef(0);
  const lastTransitionTime = React.useRef(0);

  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0,
    cardHeight: DEFAULT_CARD_HEIGHT,
  });

  React.useEffect(() => {
    const updateCardHeight = () => {
      state.current.cardHeight = window.innerWidth <= 768 ? 320 : 240;
    };
    updateCardHeight();
    window.addEventListener("resize", updateCardHeight);
    return () => window.removeEventListener("resize", updateCardHeight);
  }, []);

  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const thumbRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoLeftRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRightRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number,
    scale = 1.15
  ) => {
    if (!img) return;
    if (!img.dataset.parallaxCurrent) img.dataset.parallaxCurrent = "0";
    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.15;
    current = lerp(current, target, 0.08);
    if (Math.abs(current - target) > 0.01) {
      img.style.transform = `translateY(${current}px) scale(${scale})`;
      img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updateSnap = () => {
    const s = state.current;
    const progress = Math.min(
      (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
      1
    );
    const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) s.isSnapping = false;
  };

  const snapToProject = () => {
    const s = state.current;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = clamp(-current * s.projectHeight, -(PROJECT_DATA.length - 1) * s.projectHeight, 0);
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.targetY, target };
  };

  const updatePositions = () => {
    const s = state.current;
    if (s.projectHeight === 0) return;
    const cardY = (s.currentY * s.cardHeight) / s.projectHeight;

    // Full-screen background elements
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      
      // Dynamic fade out on transition
      const dist = Math.abs(y);
      const opacity = clamp(1.2 - dist / s.projectHeight, 0, 1);
      el.style.opacity = opacity.toString();

      // Ambient background image parallax
      const img = el.querySelector(".project-bg-image");
      if (img) {
        updateParallax(img as HTMLImageElement, s.currentY, index, s.projectHeight, 1.15);
      }
    });

    // Center thumbnails (no internal image zoom or shift, for crisp complete fit)
    thumbRef.current.forEach((el, index) => {
      const y = index * s.cardHeight + cardY;
      el.style.transform = `translateY(${y}px)`;
    });

    // Left info panel
    infoLeftRef.current.forEach((el, index) => {
      const y = index * s.cardHeight + cardY;
      el.style.transform = `translateY(${y}px)`;
    });

    // Right info panel
    infoRightRef.current.forEach((el, index) => {
      const y = index * s.cardHeight + cardY;
      el.style.transform = `translateY(${y}px)`;
    });
  };

  const animate = () => {
    const s = state.current;
    const now = Date.now();
    if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
      const snapPoint = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }
    if (s.isSnapping) updateSnap();
    if (!s.isDragging) {
      s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    }
    updatePositions();
  };

  const animationLoop = () => {
    animate();
    const s = state.current;
    if (s.projectHeight > 0) {
      const currentIndex = clamp(
        Math.round(-s.currentY / s.projectHeight),
        0,
        PROJECT_DATA.length - 1
      );
      if (currentIndex !== activeIndexRef.current) {
        activeIndexRef.current = currentIndex;
        setActiveIndex(currentIndex);
      }
    }
    requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    state.current.projectHeight = window.innerHeight;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenisRoot = (window as any).__lenis;

    const onWheel = (e: WheelEvent) => {
      const s = state.current;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // ── Release scroll hijacking at slide boundaries ──
      // At last project scrolling down further -> release scroll to allow scrolling to next section
      if (isScrollingDown && s.targetY <= -(PROJECT_DATA.length - 1) * s.projectHeight) {
        lenisRoot?.start();
        return;
      }
      // At first project scrolling up further -> release scroll to allow scrolling to previous section
      if (isScrollingUp && s.targetY >= 0) {
        lenisRoot?.start();
        return;
      }

      // Inside slider: intercept and lock page scroll, execute smooth kinetic scroll
      e.preventDefault();
      e.stopPropagation();
      lenisRoot?.stop();

      s.isSnapping = false;
      s.lastScrollTime = Date.now();

      // Smooth kinetic continuous scrolling
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      
      s.targetY = clamp(
        s.targetY - delta,
        -(PROJECT_DATA.length - 1) * s.projectHeight,
        0
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      
      const deltaY = e.touches[0].clientY - s.dragStart.y;
      const isSwipingUp = deltaY < 0; // equivalent to scrolling down
      const isSwipingDown = deltaY > 0; // equivalent to scrolling up

      // Page boundary release checks for touch swipe
      if (isSwipingUp && activeIndexRef.current === PROJECT_DATA.length - 1) {
        return;
      }
      if (isSwipingDown && activeIndexRef.current === 0) {
        return;
      }

      e.preventDefault();
      s.targetY = clamp(s.dragStart.scrollY + deltaY * 1.2, -(PROJECT_DATA.length - 1) * s.projectHeight, 0);
      s.lastScrollTime = Date.now();
    };

    const onTouchEnd = () => {
      state.current.isDragging = false;
      lenisRoot?.start();
      snapToProject();
    };

    const onResize = () => {
      state.current.projectHeight = window.innerHeight;
      const s = state.current;
      s.targetY = -activeIndexRef.current * s.projectHeight;
      s.currentY = s.targetY;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", onWheel, { passive: false });
      container.addEventListener("touchstart", onTouchStart, { passive: false });
      container.addEventListener("touchmove", onTouchMove, { passive: false });
      container.addEventListener("touchend", onTouchEnd);
      container.addEventListener("mouseenter", () => {
        // Only stop lenis if we aren't at the boundaries
        if (activeIndexRef.current > 0 && activeIndexRef.current < PROJECT_DATA.length - 1) {
          lenisRoot?.stop();
        }
      });
      container.addEventListener("mouseleave", () => lenisRoot?.start());
    }
    window.addEventListener("resize", onResize);
    onResize();
    requestRef.current = requestAnimationFrame(animationLoop);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (!e.isIntersecting) lenisRoot?.start(); });
    });
    if (container) observer.observe(container);

    return () => {
      if (container) {
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove);
        container.removeEventListener("touchend", onTouchEnd);
        observer.unobserve(container);
      }
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lenisRoot?.start();
    };
  }, []);

  return (
    <div className="parallax-container" ref={containerRef}>
      {/* Background Slides */}
      <ul className="project-list">
        {PROJECT_DATA.map((data, i) => {
          return (
            <div
              key={i}
              className="project"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el);
                else projectsRef.current.delete(i);
              }}
            >
              {/* Single clean background image (auto-responsive perfect fit) */}
              <div className="absolute inset-0 bg-black">
                <Image
                  src={`${BASE_PATH}${data.image}`}
                  alt={data.title}
                  fill
                  unoptimized
                  className="project-bg-image object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-black/45 z-[1]" />
              </div>
            </div>
          );
        })}
      </ul>

      {/* ── Center white info card ── */}
      <div className="slider-card">
        {/* LEFT panel: number, category, description */}
        <div className="slider-card-left">
          {PROJECT_DATA.map((data, i) => {
            const num = (i + 1).toString().padStart(2, "0");
            return (
              <div
                key={i}
                className="slider-card-info"
                ref={(el) => {
                  if (el) infoLeftRef.current.set(i, el);
                  else infoLeftRef.current.delete(i);
                }}
              >
                <p className="slider-text-muted">{num}</p>
                <p className="slider-text">{data.category}</p>
                <p className="slider-text">{data.description}</p>
              </div>
            );
          })}
        </div>

        {/* CENTER: thumbnail */}
        <div className="slider-card-thumb">
          {PROJECT_DATA.map((data, i) => {
            return (
              <div
                key={i}
                className="slider-thumb-item"
                ref={(el) => {
                  if (el) thumbRef.current.set(i, el);
                  else thumbRef.current.delete(i);
                }}
              >
                <Image
                  src={`${BASE_PATH}${data.image}`}
                  alt={data.title}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT panel: title, year, and a clean project link button */}
        <div className="slider-card-right">
          {PROJECT_DATA.map((data, i) => {
            return (
              <div
                key={i}
                className="slider-card-info slider-card-info--right"
                ref={(el) => {
                  if (el) infoRightRef.current.set(i, el);
                  else infoRightRef.current.delete(i);
                }}
              >
                <p className="slider-text">{data.title}</p>
                <p className="slider-text-year">{data.year}</p>
                
                {data.link && data.link !== "#" ? (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slider-link-btn"
                  >
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-white/10 text-black/40 rounded-full font-inter text-[10px] font-bold uppercase tracking-wider select-none">
                    Private Repo
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
