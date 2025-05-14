import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

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
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform:
                        hoveredProject === project.id
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  />
                </div>
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
    title: "Financial Dashboard",
    description:
      "Interactive dashboard with real-time data visualization and predictive analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["dashboard", "data", "analytics"],
    link: "#",
  },
  {
    id: "3",
    title: "Healthcare Mobile App",
    description:
      "Patient-centered mobile application for appointment scheduling and health monitoring.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tags: ["mobile", "healthcare", "app"],
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
  {
    id: "6",
    title: "Smart Home Control App",
    description:
      "IoT application for managing connected home devices with automation capabilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-bb4237b98681?w=800&q=80",
    tags: ["iot", "mobile", "app"],
    link: "#",
  },
];

export default ProjectsShowcase;
