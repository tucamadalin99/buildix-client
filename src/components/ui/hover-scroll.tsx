import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HoverScrollCard({ imageUrl }: { imageUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Measure image and container height once the image loads
  const handleImageLoad = () => {
    const imageHeight = imageRef.current?.offsetHeight || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;
    const distance = imageHeight - containerHeight;
    setScrollDistance(distance > 0 ? distance : 0);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full max-w-md overflow-hidden border rounded-lg aspect-video bg-black"
      ref={containerRef}
    >
      <motion.div
        className="absolute top-0 left-0 w-full"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.img
          ref={imageRef}
          src={imageUrl}
          alt="screenshot"
          onLoad={handleImageLoad}
          className="w-full"
          initial={{ y: 0 }}
          animate={{ y: hovered ? -scrollDistance : 0 }}
          transition={{
            duration: hovered ? 6 : 1.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
