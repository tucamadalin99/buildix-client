"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  BugPlay,
  Code,
  LayoutTemplate,
  Recycle,
  Rocket,
  SearchCheck,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
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
    icon: <SearchCheck className="h-5 w-5" />,
    title: "Discovery & Planning",
    description:
      "We meet to understand your goals, audience, and requirements. We define the site structure and create a roadmap.",
  },
  {
    id: 2,
    side: "right",
    icon: <LayoutTemplate className="h-5 w-5" />,
    title: "Wireframes & Design",
    description:
      "We sketch layouts, design the UI/UX, and review visual mockups until you're confident in the direction.",
  },
  {
    id: 3,
    side: "left",
    icon: <Code className="h-5 w-5" />,
    title: "Development",
    description:
      "We build the site with clean, modern code — mobile-first, SEO-ready, and lightning fast.",
  },
  {
    id: 4,
    side: "right",
    icon: <BugPlay className="h-5 w-5" />,
    title: "Testing & Feedback",
    description:
      "We review functionality, fix bugs, test responsiveness, and gather final feedback before going live.",
  },
  {
    id: 5,
    side: "left",
    icon: <Rocket className="h-5 w-5" />,
    title: "Launch & Handoff",
    description:
      "We deploy your site, ensure it runs smoothly, and provide you with access, training, or documentation.",
  },
  {
    id: 6,
    side: "right",
    icon: <Recycle className="h-5 w-5" />,
    title: "Maintenance",
    description:
      "We will regularly keep the software up to date, ensuring seamless functionality across the time-frame.",
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
              {icon || <Code className="h-5 w-5" />}
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
  const blue = useAnimation();
  const green = useAnimation();

  useEffect(() => {
    blue.set({ opacity: 0.6, scale: 1 });
    green.set({ opacity: 0.6, scale: 1 });

    let toggle = true;
    const loop = async () => {
      while (true) {
        if (toggle) {
          blue.start({
            scale: [1, 1.05, 1],
            opacity: 0.6,
            transition: { duration: 2, ease: "easeInOut" },
          });
          green.start({
            scale: 1,
            opacity: 0.6,
            transition: { duration: 2 },
          });
        } else {
          green.start({
            scale: [1, 1.05, 1],
            opacity: 0.6,
            transition: { duration: 2, ease: "easeInOut" },
          });
          blue.start({
            scale: 1,
            opacity: 0.6,
            transition: { duration: 2 },
          });
        }
        toggle = !toggle;
        await new Promise((res) => setTimeout(res, 2000));
      }
    };

    loop();
  }, []);
  return (
    <section
      className="relative py-20 px-4 md:px-8 bg-background overflow-hidden"
      id="how-works"
    >
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the steps that we'll follow together in our collaboration
          process.
        </p>
      </motion.div>

      <div className="relative flex flex-col items-center w-full py-16">
        {/* Animated blobs */}
        <motion.div
          className="absolute top-[1440px] right-[25%] max-lg:top-0 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:right-auto w-[240px] h-[240px] rounded-full bg-gradient-to-br from-green-400/50 to-emerald-500/50 blur-[100px] saturate-150 contrast-125 z-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={blue}
        />

        <motion.div
          className="absolute top-[36px] left-[25%] max-lg:top-[200px] max-lg:left-1/2 max-lg:-translate-x-1/2 w-[240px] h-[240px] rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-[100px] saturate-150 contrast-1 z-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={green}
        />

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
              className={`relative flex flex-row max-lg:flex-col items-center justify-between w-full px-4`}
            >
              {item.side === "left" ? (
                <div className="w-1/2 max-lg:w-full flex justify-end max-lg:justify-center pr-8 max-lg:pr-0">
                  <StepCard
                    id={item.id}
                    icon={item?.icon}
                    side={item.side}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ) : (
                <div className="w-1/2" />
              )}

              <div className="w-4 h-4 rounded-full bg-primary border-4 border-white z-10 shadow-md" />

              {item.side === "right" ? (
                <div className="w-1/2 max-lg:w-full flex justify-start max-lg:justify-center pl-8 max-lg:pl-0">
                  <StepCard
                    id={item.id}
                    icon={item?.icon}
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
