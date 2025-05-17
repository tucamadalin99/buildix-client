"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langMenuOpen]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between lg:grid lg:grid-cols-3 lg:items-center lg:justify-between">
        {/* Desktop Navigation (left) */}
        <nav className="hidden lg:flex items-center space-x-8 col-span-1 justify-start">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 font-semibold md:font-bold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 flex justify-center lg:col-span-1">
          <Link href="/" className="text-2xl font-bold text-foreground lg:font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent-start))] to-[hsl(var(--accent-end))]">
              Buildix
            </span>
          </Link>
        </div>

        {/* Theme Toggle, i18n (right on desktop), and Globe on mobile */}
        <div className="hidden lg:flex items-center justify-end space-x-4 lg:col-span-1">
          {/* i18n world icon with dropdown */}
          <div className="relative" ref={langMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Change language"
              onClick={() => setLangMenuOpen((open) => !open)}
            >
              <Globe className="h-6 w-6 text-foreground dark:text-indigo-300" />
            </Button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-background border border-border rounded shadow-lg z-50">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-accent"
                  // onClick={() => setLanguage('ro')}
                >
                  RO
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-accent"
                  // onClick={() => setLanguage('en')}
                >
                  EN
                </button>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button (mobile only) */}
        <div className="flex items-center lg:hidden space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden"
          style={{ top: '64px' }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (item.href === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Globe and Theme Toggle inside mobile menu */}
            <div className="flex items-center justify-end space-x-4 mt-6">
              <div className="relative" ref={langMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Change language"
                  onClick={() => setLangMenuOpen((open) => !open)}
                >
                  <Globe className="h-6 w-6 text-foreground dark:text-indigo-300" />
                </Button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-background border border-border rounded shadow-lg z-50">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-accent"
                      // onClick={() => setLanguage('ro')}
                    >
                      RO
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-accent"
                      // onClick={() => setLanguage('en')}
                    >
                      EN
                    </button>
                  </div>
                )}
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
} 