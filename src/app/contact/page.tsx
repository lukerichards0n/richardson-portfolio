"use client";
import React, { useState } from "react";
import { IconMail, IconPhone, IconSend } from "@tabler/icons-react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-neutral-300">
            Take your project to the next level
          </p>
        </motion.div>
      </section>

      {/* Contact Information & Form */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Let&apos;s Work Together</h2>
            <p className="text-neutral-300 mb-8 leading-relaxed">
              I am passionate about collaborating on innovative projects and using my electrical engineering skills to solve real-world challenges. 
              Whether you have a specific project in mind or just want to explore potential opportunities, I am excited to connect with you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                  <IconMail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Email</p>
                  <p className="text-white">hello@lukerichardson.co</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                  <IconPhone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Phone</p>
                  <p className="text-white">+1 304 552 6452</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800">
              <h3 className="font-semibold mb-3 text-white">What I Can Help With:</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2 text-sm">
                <li>Electrical system design and analysis</li>
                <li>Embedded systems and firmware development</li>
                <li>PCB design and prototyping</li>
                <li>Product development consulting</li>
                <li>Motion control systems</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800"
          >
            <h2 className="text-2xl font-semibold mb-6">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg focus:border-white focus:outline-none transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg focus:border-white focus:outline-none transition-colors text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-neutral-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg focus:border-white focus:outline-none transition-colors text-white"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg focus:border-white focus:outline-none transition-colors text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <IconSend className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-neutral-900 rounded-2xl p-12 border border-neutral-800"
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
          <p className="text-neutral-300 mb-8">
            Let&apos;s discuss how we can work together to achieve your goals. 
            I look forward to hearing from you!
          </p>
          <a 
            href="mailto:hello@lukerichardson.co" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            <IconMail className="h-5 w-5" />
            Send Me An Email
          </a>
        </motion.div>
      </section>
    </div>
  );
} 