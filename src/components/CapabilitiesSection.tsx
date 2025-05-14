import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Layers, Palette, Smartphone, Zap, Globe } from "lucide-react";

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  progressValue: number;
}

const CapabilityCard = ({
  icon,
  title,
  description,
  progressValue = 85,
}: CapabilityCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="h-full bg-background border-2 hover:border-primary/50 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <Progress value={progressValue} className="w-24" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {[
              "Custom Solutions",
              "Modern Technologies",
              "Responsive Design",
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CapabilitiesSection = () => {
  const capabilities = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      description:
        "Custom websites built with modern frameworks and technologies",
      progressValue: 95,
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android",
      progressValue: 90,
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description:
        "User-centered design with intuitive interfaces and experiences",
      progressValue: 85,
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from database to frontend interfaces",
      progressValue: 92,
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "E-Commerce",
      description:
        "Online stores with secure payment processing and inventory management",
      progressValue: 88,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimization",
      description:
        "Speed up your existing applications and improve user experience",
      progressValue: 93,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-background" id="capabilities">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with creative problem-solving to
            deliver exceptional digital solutions for businesses of all sizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={index}
              icon={capability.icon}
              title={capability.title}
              description={capability.description}
              progressValue={capability.progressValue}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="text-xl font-semibold mb-2">
              Need a custom solution?
            </h3>
            <p className="text-muted-foreground mb-4">
              Let's discuss how we can help bring your ideas to life.
            </p>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
