"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useImageSequence(frameCount: number, containerRef?: React.RefObject<HTMLElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const scrollConfig = containerRef ? { target: containerRef, offset: ["start start", "end end"] as any, layoutEffect: false } : undefined;
  const { scrollYProgress } = useScroll(scrollConfig);
  
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Draw function to fit canvas
    const drawImage = (img: HTMLImageElement) => {
      // clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scale to cover
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    if (images[0].complete) {
      drawImage(images[0]);
    } else {
      images[0].onload = () => drawImage(images[0]);
    }

    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.min(Math.max(Math.round(latest), 0), frameCount - 1);
      if (images[index] && images[index].complete) {
        drawImage(images[index]);
      }
    });

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const index = Math.min(Math.max(Math.round(frameIndex.get()), 0), frameCount - 1);
      if (images[index] && images[index].complete) {
        drawImage(images[index]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex, frameCount]);

  return { canvasRef, scrollYProgress };
}
