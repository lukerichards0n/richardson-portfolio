"use client";
import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { motion } from "motion/react";

export default function ResumePage() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resume</h1>
          <p className="text-xl text-neutral-300 mb-8">
            Electrical Engineer • Innovator • Problem Solver
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors">
            <IconDownload className="h-5 w-5" />
            Download PDF
          </button>
        </motion.div>
      </section>

      {/* Resume Content */}
      <section className="pb-16 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-neutral-900 rounded-2xl p-8 md:p-12 border border-neutral-800"
        >
          {/* Contact Information */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-2">Luke Richardson</h2>
            <p className="text-neutral-300">hello@lukerichardson.co • +1 304 552 6452</p>
          </div>

          {/* Education */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Education</h3>
            <div className="border-l-2 border-neutral-700 pl-6">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white">Bachelor of Science in Electrical Engineering</h4>
                <p className="text-neutral-300">Cedarville University</p>
                <p className="text-sm text-neutral-500">Graduated 2024</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Professional Experience</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Independent Design Consultant</h4>
                <p className="text-sm text-neutral-500 mb-2">2022 - Present</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Foster strong client relationships for consumer and commercial product development</li>
                  <li>Design and integrate motion control systems, firmware, and UI/UX elements</li>
                  <li>Deliver comprehensive documentation and fully functional projects</li>
                </ul>
              </div>

              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Design Engineer Assistant</h4>
                <p className="text-neutral-300">Robert C. Byrd Institute</p>
                <p className="text-sm text-neutral-500 mb-2">2018 - 2022</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Led design and testing of 10+ projects in medical, consumer, and commercial fields</li>
                  <li>Utilized CAD, programming, PCB design, and rapid manufacturing</li>
                  <li>Maintained laser cutters, 3D printers, and injection molding machines</li>
                </ul>
              </div>

              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Research and Design Assistant</h4>
                <p className="text-neutral-300">Marshall University Research Corp.</p>
                <p className="text-sm text-neutral-500 mb-2">2019 - 2020</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Developed microfluidic electrophoresis DNA separator</li>
                  <li>Enhanced efficiency of DNA separation mechanisms</li>
                  <li>Conducted DNA, RNA, and protein extraction using gel electrophoresis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Hardware & Electronics</h4>
                <p className="text-neutral-300 text-sm">PCB Design, Circuit Analysis, Embedded Systems, FPGA, Microcontrollers</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Software Development</h4>
                <p className="text-neutral-300 text-sm">C/C++, Python, MATLAB, Firmware Development, UI/UX Design</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Design & Manufacturing</h4>
                <p className="text-neutral-300 text-sm">CAD, 3D Modeling, Rapid Prototyping, 3D Printing, CNC Machining</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Tools & Equipment</h4>
                <p className="text-neutral-300 text-sm">Oscilloscopes, Signal Generators, Multimeters, Laser Cutters</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Key Projects</h3>
            <ul className="list-disc list-inside text-neutral-300 space-y-2">
              <li>Neural Network Playground - Interactive ML visualization tool</li>
              <li>Drawing Recognition App - AI-powered drawing classifier</li>
              <li>Particle Physics Simulator - Real-time physics engine</li>
              <li>Motion Control Systems - Custom firmware for industrial applications</li>
            </ul>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Additional Information</h3>
            <p className="text-neutral-300">
              Strong communicator and team player with a passion for solving real-world problems through innovative solutions. 
              Experienced in client relations and project management from conception to delivery.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 