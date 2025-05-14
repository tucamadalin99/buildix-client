import React from "react";
import HeroSection from "./HeroSection";
import ProjectsShowcase from "./ProjectsShowcase";
import CapabilitiesSection from "./CapabilitiesSection";
import ContactForm from "./ContactForm";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background scroll-smooth">
      <Header transparent={false} />
      <HeroSection onCTAClick={scrollToProjects} />
      <ProjectsShowcase />
      <CapabilitiesSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
