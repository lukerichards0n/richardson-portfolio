"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { IconMail, IconBrandLinkedin, IconBrandGithub, IconPhone } from "@tabler/icons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:luke@example.com",
      icon: <IconMail className="h-5 w-5" />
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/lukerichardson",
      icon: <IconBrandLinkedin className="h-5 w-5" />
    },
    {
      name: "GitHub",
      href: "https://github.com/lukerichardson",
      icon: <IconBrandGithub className="h-5 w-5" />
    },
    {
      name: "Phone",
      href: "tel:+1234567890",
      icon: <IconPhone className="h-5 w-5" />
    }
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-black border-t border-neutral-800">
      <div className="absolute inset-0 w-full h-full bg-black z-30 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      <Boxes />
      
      <div className="relative z-40 max-w-7xl mx-auto px-4 py-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pointer-events-none"
        >
          {/* Brand Section */}
          <div className="space-y-4 pointer-events-none">
            <h3 className={cn("text-2xl font-bold text-white")}>
              Luke Richardson
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              Electrical Engineer specializing in PCB design, firmware development, 
              and innovative engineering solutions.
            </p>
            <div className="flex space-x-4 pointer-events-auto">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors pointer-events-auto"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pointer-events-none">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col items-start space-y-2 pointer-events-auto max-w-[50px]">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-300 hover:text-white transition-colors pointer-events-auto inline-block"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 pointer-events-none">
            <h4 className="text-lg font-semibold text-white">Let&apos;s Connect</h4>
            <p className="text-neutral-300">
              Ready to bring your next project to life? 
              I&apos;m always interested in discussing new opportunities and challenges.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors pointer-events-auto"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-neutral-800 pointer-events-none"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Luke Richardson. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}