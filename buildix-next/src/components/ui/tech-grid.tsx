

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";

const TechGrid = () => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  // Motion values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 150 });
  const translateX = useTransform(smoothX, [0, 1], ["-20px", "20px"]);
  const translateY = useTransform(smoothY, [0, 1], ["-20px", "20px"]);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Build-in animation with clip
  const [clipProgress, setClipProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1000; // Faster animation

    const animateClip = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setClipProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(animateClip);
    };

    const delayTimeout = setTimeout(() => {
      requestAnimationFrame(animateClip);
    }, 500); // Shorter delay

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(frame);
    };
  }, []);


  const backgroundStyle = useMemo(() => {
    const grid =
       `linear-gradient(to right, rgba(168, 85, 247,0.8) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(124, 58, 237,0.8) 1px, transparent 1px)`

    const size = isDark ? 400 : 300; 

    const spotlightMask = isDark
      ? `linear-gradient(to right, black ${clipProgress * 100}%, transparent ${
          clipProgress * 100
        }%),
       linear-gradient(to bottom, black 85%, transparent 100%)`
      : `radial-gradient(circle ${size}px at ${cursor.x}px ${cursor.y}px, black 0%, transparent 100%)`;

    return {
      backgroundImage: grid,
      backgroundSize: "40px 40px",
      WebkitMaskImage: spotlightMask,
      maskImage: spotlightMask,
      WebkitMaskComposite: "destination-in",
      maskComposite: "intersect",
      transition: "mask-image 0.1s ease, -webkit-mask-image 0.1s ease", // Faster transition
      opacity: 0.15,
    };
  }, [isDark, clipProgress, cursor]);

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        ...backgroundStyle,
        x: translateX,
        y: translateY,
      }}
      
    />
  );
};

export default TechGrid;
