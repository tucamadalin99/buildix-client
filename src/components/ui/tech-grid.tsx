import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "../ThemeProvider";

const TechGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Motion values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });
  const translateX = useTransform(smoothX, [0, 1], ["-10px", "10px"]);
  const translateY = useTransform(smoothY, [0, 1], ["-10px", "10px"]);

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

    if (!isDark) window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDark]);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1500;

    const animateClip = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setClipProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(animateClip);
    };

    const delayTimeout = setTimeout(() => {
      requestAnimationFrame(animateClip);
    }, 1000); // ⏱️ 1 second delay

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Static background style (not animated by Framer Motion)
  const backgroundStyle = useMemo(() => {
    const grid = isDark
      ? `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`
      : `linear-gradient(to right, #A855F7 1px, transparent 1px),
       linear-gradient(to bottom, #7C3AED 1px, transparent 1px)`;

    const size = 400; // radius of visible area around cursor in px

    const spotlightMask = isDark
      ? `linear-gradient(to right, black ${clipProgress * 100}%, transparent ${
          clipProgress * 100
        }%),
       linear-gradient(to bottom, black 85%, transparent 100%)`
      : `radial-gradient(circle ${size}px at ${cursor.x}px ${cursor.y}px, black 0%, transparent 100%)`;

    return {
      backgroundImage: grid,
      backgroundSize: "40px 40px",
      opacity: isDark ? 0.4 : 0.25,
      WebkitMaskImage: spotlightMask,
      maskImage: spotlightMask,
      WebkitMaskComposite: "destination-in",
      maskComposite: "intersect",
      transition: "mask-image 0.2s ease, -webkit-mask-image 0.2s ease",
    };
  }, [isDark, clipProgress, cursor]);

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        translateX,
        translateY,
        ...backgroundStyle,
      }}
    />
  );
};

export default TechGrid;
