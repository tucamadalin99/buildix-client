"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import HoverScrollCard from "./ui/hover-scroll";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

interface ProjectsShowcaseProps {
  projects?: Project[];
}

const ProjectsShowcase = ({
  projects = defaultProjects,
}: ProjectsShowcaseProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  /**
   * For calculating image dynamic height for scroll effect
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded || !imageRef.current || !containerRef.current) return;

    const imageHeight = imageRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;
    const distance = imageHeight - containerHeight;

    setScrollDistance(distance > 0 ? -distance : 0); // negative because we scroll up
  }, [imageLoaded]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  const uniqueTags = [
    "all",
    ...new Set(projects.flatMap((project) => project.tags)),
  ];

  return (
    <section className="w-full py-20 bg-background" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Featured Projects
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our portfolio of innovative solutions we've built for
            clients across various industries.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {uniqueTags.map((tag) => (
            <Button
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(tag)}
              className="capitalize"
            >
              {tag}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="h-full overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                <HoverScrollCard imageUrl={project.imageUrl} />
                <CardContent className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <Badge
                        key={`${project.id}-${tag}`}
                        variant="secondary"
                        className="capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group flex items-center gap-2 hover:gap-3 transition-all"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce solution with advanced filtering and payment integration.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    tags: ["web", "e-commerce", "react"],
    link: "#",
  },
  {
    id: "2",
    title: "Buzau360",
    description:
      "Sleek & smooth customizable website for local news with a customized theme.",
    imageUrl: "featured/buzau360.png",
    tags: ["news", "web"],
    link: "#",
  },
  {
    id: "3",
    title: "Ramnic365",
    description:
      "Custom made news website featuring latest local news, and a portal of information for a town.",
    imageUrl: "featured/ramnic365.png",
    tags: ["news", "web"],
    link: "#",
  },
  {
    id: "4",
    title: "Real Estate Platform",
    description:
      "Property listing and management system with virtual tours and agent networking.",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    tags: ["web", "real estate", "react"],
    link: "#",
  },
  {
    id: "5",
    title: "Learning Management System",
    description:
      "Comprehensive platform for online education with interactive course materials.",
    imageUrl:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    tags: ["education", "web", "platform"],
    link: "#",
  },
];

export default ProjectsShowcase;
