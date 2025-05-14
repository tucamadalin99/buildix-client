import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden rounded-full ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative h-6 w-6">
        {/* Sun icon */}
        <motion.div
          initial={{
            opacity: theme === "light" ? 1 : 0,
            y: theme === "light" ? 0 : -20,
          }}
          animate={{
            opacity: theme === "light" ? 1 : 0,
            y: theme === "light" ? 0 : -20,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="h-6 w-6 text-amber-500" />
        </motion.div>

        {/* Moon icon */}
        <motion.div
          initial={{
            opacity: theme === "dark" ? 1 : 0,
            y: theme === "dark" ? 0 : 20,
          }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            y: theme === "dark" ? 0 : 20,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="h-6 w-6 text-indigo-300" />
        </motion.div>
      </div>

      {/* Background animation */}
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1.5 : 0,
          opacity: theme === "dark" ? 0.8 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full bg-secondary-bg"
      />
    </Button>
  );
};

export default ThemeToggle;
