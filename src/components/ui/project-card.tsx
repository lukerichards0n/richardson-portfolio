"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

type ProjectCard = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
  demoUrl?: string;
  docsUrl?: string;
};

interface ProjectCardProps {
  card: ProjectCard;
  index: number;
}

export const ProjectCard = ({ card, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-3xl bg-neutral-900 md:h-[40rem] md:w-96"
    >
      {/* Background Image */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />
        
        {/* Content Overlay */}
        <div className="relative z-30 flex h-full flex-col justify-between p-6">
          {/* Top Content */}
          <div>
            <p className="text-left font-sans text-sm font-medium text-white/80 md:text-base">
              {card.category}
            </p>
            <h3 className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white md:text-3xl [text-wrap:balance]">
              {card.title}
            </h3>
          </div>
          
          {/* Bottom Buttons */}
          <div className="flex gap-3">
            {card.demoUrl && (
              <a
                href={card.demoUrl}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors text-sm"
              >
                Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M5 12h14l-2 7H7l-2-7z" />
                </svg>
              </a>
            )}
            {card.docsUrl && (
              <a
                href={card.docsUrl}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors text-sm"
              >
                Docs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 