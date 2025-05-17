"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import TechGrid from "./ui/tech-grid";

interface HeroSectionProps {
  onCTAClick?: () => void;
}

export default function HeroSection({
  onCTAClick = () => {},
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleSentence = `We build exceptional web experiences that elevate brands and engage users.`;

  const [typedLength, setTypedLength] = useState(0);
  const [hasGridBuilt, setHasGridBuilt] = useState(false);
  const { theme } = useTheme();

  const [showShapes, setShowShapes] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowShapes(true);
    }, 1000); // 1s delay

    return () => clearTimeout(timeout);
  }, []);

  // Mouse movement effect for shapes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const shapes = containerRef.current.querySelectorAll(".animated-shape");
      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const factor = (index + 1) * 10;
        element.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasGridBuilt(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typedLength < subtitleSentence.length) {
      const delay = 40 + Math.random() * 15;
      const timeout = setTimeout(() => {
        setTypedLength((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [typedLength, subtitleSentence]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden w-full min-h-[800px] bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <TechGrid />

      <div className="absolute inset-0">
        {/* Gradient blobs */}
        <motion.div
          className="animated-shape absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="animated-shape absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-l from-secondary/20 to-primary/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />
        <motion.div
          className="animated-shape absolute top-[40%] right-[25%] w-40 h-40 rounded-full bg-gradient-to-br from-[#A855F7]/30 to-[#7C3AED]/30 blur-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />

        {theme === "light" && showShapes && (
          <>
            {/* Shape 1 */}
            <motion.div
              className="absolute z-[1]"
              style={{ bottom: "15%", right: "10%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <motion.div
                className="w-16 h-16 border border-[#7C3AED]/50 rounded-md opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Shape 2 */}
            <motion.div
              className="absolute z-[1]"
              style={{ top: "12%", left: "8%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 border border-[#A855F7]/50 rounded-md opacity-70"
                animate={{ rotate: -360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Shape 3 */}
            <motion.div
              className="absolute z-[1]"
              style={{ top: "50%", left: "6%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="w-14 h-14 border border-[#A855F7]/50 rounded-full opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Building the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Future
          </span>{" "}
          of Web
        </motion.h1>

        <div className="relative mb-8 max-w-2xl mx-auto h-auto">
          <p className="text-lg font-mono sm:text-xl text-muted-foreground opacity-0 select-none">
            {subtitleSentence}
          </p>

          <motion.p
            className="absolute top-0 left-0 w-full text-lg font-mono sm:text-xl text-muted-foreground whitespace-pre-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={hasGridBuilt ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span>{subtitleSentence.slice(0, typedLength)}</span>
            {hasGridBuilt && (
              <motion.span
                className="inline-block animate-pulse"
                key="cursor"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            )}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 5.5 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium px-8 py-6"
            onClick={onCTAClick}
          >
            Explore Our Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
