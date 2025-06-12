"use client";
import React, { useState } from "react";
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/" className="text-black dark:text-white hover:opacity-[0.9]">
          Home
        </Link>
        
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Neural Network"
              href="/projects"
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
              description="Interactive neural network visualization built with JavaScript"
            />
            <ProductItem
              title="AI Co-Drawing"
              href="/projects"
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
              description="AI-powered drawing collaboration tool"
            />
            <ProductItem
              title="Particle Simulator"
              href="/projects"
              src="https://images.unsplash.com/photo-1634729108541-516d16ddceec?w=400&h=300&fit=crop"
              description="Physics-based particle simulation system"
            />
            <ProductItem
              title="Tetris Game"
              href="/projects"
              src="https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400&h=300&fit=crop"
              description="Classic Tetris game implementation"
            />
          </div>
        </MenuItem>
        
        <Link href="/resume" className="text-black dark:text-white hover:opacity-[0.9]">
          Resume
        </Link>
        
        <Link href="/contact" className="text-black dark:text-white hover:opacity-[0.9]">
          Contact
        </Link>
      </Menu>
    </div>
  );
} 