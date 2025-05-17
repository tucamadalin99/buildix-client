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
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const steps: IHowItWorks[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    description:
      "We meet to understand your goals, audience, and requirements. We define the site structure and create a roadmap.",
  },
  {
    id: 2,
    title: "Wireframes & Design",
    description:
      "We sketch layouts, design the UI/UX, and review visual mockups until you're confident in the direction.",
  },
  {
    id: 3,
    title: "Development",
    description:
      "We build the site with clean, modern code — mobile-first, SEO-ready, and lightning fast.",
  },
  {
    id: 4,
    title: "Testing & Feedback",
    description:
      "We review functionality, fix bugs, test responsiveness, and gather final feedback before going live.",
  },
  {
    id: 5,
    title: "Launch & Handoff",
    description:
      "We deploy your site, ensure it runs smoothly, and provide you with access, training, or documentation.",
  },
];

interface StepCardProps extends IHowItWorks {
  onNext?: () => void;
  isCurrent?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
}

const StepCard = ({
  icon,
  title,
  description,
  onNext,
  isCurrent,
  isCompleted,
  isLast,
}: StepCardProps) => {
  return (
    <motion.div
      id="howitworks"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`h-[264px] w-full bg-background border-2 rounded-xl transition-colors duration-500 ${
        isCompleted || isLast ? "border-primary/50" : "border-muted"
      }`}
    >
      <Card className="h-full border-0">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon || <Zap className="h-5 w-5" />}
            </div>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            {!isLast && isCurrent ? (
              <Button size="icon" variant="ghost" onClick={onNext}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            ) : (
              <div className="w-10 h-10 opacity-0 pointer-events-none" />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [renderedSteps, setRenderedSteps] = useState([0]);
  const [lineAnimatingFor, setLineAnimatingFor] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNextStep = () => {
    const current = currentStepIndex;
    if (current >= steps.length - 1) return;

    setCompletedSteps((prev) => [...prev, current]);

    setTimeout(() => {
      setLineAnimatingFor(current);

      setTimeout(() => {
        setRenderedSteps((prev) => [...prev, current + 1]);
        setCurrentStepIndex(current + 1);
        setLineAnimatingFor(null);
      }, 500);
    }, 500);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-background" id="how-works">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
          {steps.map((step, stepIndex) => {
            const isCurrent = stepIndex === currentStepIndex;
            const isCompleted = completedSteps.includes(stepIndex);
            const isLast = stepIndex === steps.length - 1;
            const isVisible = renderedSteps.includes(stepIndex);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <React.Fragment key={step.id}>
                  {isVisible ? (
                    <StepCard
                      id={step.id}
                      title={step.title}
                      description={step.description}
                      onNext={handleNextStep}
                      isCurrent={isCurrent}
                      isCompleted={isCompleted}
                      isLast={isLast}
                    />
                  ) : (
                    <div className="w-full h-[264px] bg-muted/10 border-2 border-muted rounded-xl animate-[shimmer_2s_linear_infinite]" />
                  )}
                </React.Fragment>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
