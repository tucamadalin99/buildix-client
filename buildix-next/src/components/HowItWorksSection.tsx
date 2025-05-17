"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "@/components/ui/button";

interface IHowItWorks {
  id: number;
  side: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const steps: IHowItWorks[] = [
  {
    id: 1,
    side: "left",
    title: "Discovery & Planning",
    description:
      "We meet to understand your goals, audience, and requirements. We define the site structure and create a roadmap.",
  },
  {
    id: 2,
    side: "right",
    title: "Wireframes & Design",
    description:
      "We sketch layouts, design the UI/UX, and review visual mockups until you're confident in the direction.",
  },
  {
    id: 3,
    side: "left",
    title: "Development",
    description:
      "We build the site with clean, modern code — mobile-first, SEO-ready, and lightning fast.",
  },
  {
    id: 4,
    side: "right",
    title: "Testing & Feedback",
    description:
      "We review functionality, fix bugs, test responsiveness, and gather final feedback before going live.",
  },
  {
    id: 5,
    side: "left",
    title: "Launch & Handoff",
    description:
      "We deploy your site, ensure it runs smoothly, and provide you with access, training, or documentation.",
  },
];

const StepCard = ({ id, side, icon, title, description }: IHowItWorks) => {
  return (
    <motion.div
      id="howitworks"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="h-full border-2">
        <CardHeader>
          <div
            className={`flex items-center ${
              side === "right" ? "justify-start" : "justify-end"
            } mb-2 max-lg:justify-center`}
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon || <Zap className="h-5 w-5" />}
            </div>
          </div>
          <CardTitle
            className={`title-xl ${
              side === "right" ? "text-start" : "text-end"
            } max-lg:text-center`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`title-xl ${
              side === "right" ? "text-start" : "text-end"
            } max-lg:text-center`}
          >
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background" id="how-works">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the steps that we'll follow together in our collaboration
          process.
        </p>
      </motion.div>
      <div className="relative flex flex-col items-center w-full py-16">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-muted-foreground/20 transform -translate-x-1/2 z-0" />

        <div className="space-y-24 w-full max-w-4xl z-10">
          {steps.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex max-lg:px-4 ${
                item.side === "left"
                  ? "max-lg:flex-col-reverse"
                  : "max-lg:flex-col"
              }  items-center justify-between w-full`}
            >
              {/* Left Card */}
              {item.side === "left" ? (
                <div className="w-1/2 max-md:w-full flex justify-end pr-8 max-lg:pr-0">
                  <StepCard
                    id={item.id}
                    side={item.side}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ) : (
                <div className="w-1/2" />
              )}

              {/* Node */}
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-white z-10 shadow-md" />

              {/* Right Card */}
              {item.side === "right" ? (
                <div className="w-1/2 max-md:w-full flex justify-start pl-8 max-lg:pl-0">
                  <StepCard
                    id={item.id}
                    side={item.side}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ) : (
                <div className="w-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
