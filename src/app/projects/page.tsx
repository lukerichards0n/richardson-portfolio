"use client";
import React, { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { motion } from "motion/react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

export default function ProjectsPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projectsData = [
    {
      category: "AI/ML • Simulation",
      title: "Neural Network Playground",
      src: "/neural.png",
      demoUrl: "/projects/neural-network-playground",
      docsUrl: "/projects/neural-network-playground/docs",
    },
    {
      category: "AI/ML • Interactive",
      title: "Drawing Recognition App",
      src: "/drawing.png",
      demoUrl: "#", // placeholder
    },
    {
      category: "Physics • Interactive",
      title: "Particle Simulator",
      src: "/particle.png",
      demoUrl: "#", // placeholder
    },
    {
      category: "Game",
      title: "Tetris",
      src: "/tetris.png",
      demoUrl: "#", // placeholder
    },
  ];

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-neutral-300">
            A curated collection of my technical projects and demonstrations
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pb-16"
      >
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-200 mb-8">
            Explore My Work
          </h2>
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-scroll [scrollbar-width:none] scroll-smooth pb-4"
              onScroll={checkScrollability}
            >
              {projectsData.map((card, index) => (
                <div key={card.src} className="flex-shrink-0">
                  <ProjectCard card={card} index={index} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
              </button>
              <button
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Additional Info */}
      <section className="pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-lg text-neutral-300">
            Each project represents a unique challenge and learning opportunity. 
            Click on any project card to explore technical details, implementation approaches, and live demos.
          </p>
        </motion.div>
      </section>
    </div>
  );
} 