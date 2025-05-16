"use client";


import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactForm from "@/components/ContactForm";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectsShowcase />
      <CapabilitiesSection />
      <HowItWorksSection />
      <ContactForm />
    </main>
  );
}
