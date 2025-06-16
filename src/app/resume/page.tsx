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
            Electrical Engineer • Co-founder • Innovator • Problem Solver
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
                <h4 className="text-lg font-semibold text-white">Co-founder</h4>
                <p className="text-neutral-300">Sunlab Digital</p>
                <p className="text-sm text-neutral-500 mb-2">2024 - Present</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Founded integrated hardware and software development company specializing in end-to-end product solutions</li>
                  <li>Established comprehensive service offerings including PCB design, firmware development, AI engineering, and growth marketing</li>
                  <li>Developed innovative solutions across multiple industries including smart parking systems, project management platforms, and vehicle safety devices</li>
                  <li>Built company culture focused on transparency, clear timelines, and responsive client communications</li>
                </ul>
              </div>

              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Independent Design Consultant</h4>
                <p className="text-sm text-neutral-500 mb-2">2022 - 2024</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Fostered strong client relationships for consumer and commercial product development</li>
                  <li>Designed and integrated motion control systems, firmware, and UI/UX elements</li>
                  <li>Delivered comprehensive documentation and fully functional projects from conception to delivery</li>
                  <li>Built solid reputation leading to increased contract acquisition and eventual company formation</li>
                </ul>
              </div>

              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Design Engineer Assistant</h4>
                <p className="text-neutral-300">Robert C. Byrd Institute</p>
                <p className="text-sm text-neutral-500 mb-2">2018 - 2022</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Led design and testing of 10+ projects in medical, consumer, and commercial fields</li>
                  <li>Collaborated with clients to create innovative products utilizing CAD, programming, PCB design, and rapid manufacturing</li>
                  <li>Performed maintenance on laser cutters, 3D printers, and injection molding machines</li>
                  <li>Managed client relationships, fostering strong partnerships and achieving high customer satisfaction</li>
                </ul>
              </div>

              <div className="border-l-2 border-neutral-700 pl-6">
                <h4 className="text-lg font-semibold text-white">Research and Design Assistant</h4>
                <p className="text-neutral-300">Marshall University Research Corp.</p>
                <p className="text-sm text-neutral-500 mb-2">2019 - 2020</p>
                <ul className="list-disc list-inside text-neutral-300 space-y-1">
                  <li>Collaborated with team of chemists to develop microfluidic electrophoresis continual DNA separator</li>
                  <li>Led R&D efforts to enhance efficiency of DNA separation mechanisms</li>
                  <li>Ensured manufacturability and scalability for successful commercialization</li>
                  <li>Conducted DNA, RNA, and protein extraction using gel electrophoresis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Hardware & Electronics</h4>
                <p className="text-neutral-300 text-sm">PCB Design, Circuit Analysis, Embedded Systems, FPGA, Microcontrollers, Motion Control Systems, Prototyping</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Software Development</h4>
                <p className="text-neutral-300 text-sm">C/C++, Python, MATLAB, JavaScript, React.js, Firmware Development, Web Development, Mobile Apps</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">AI & Machine Learning</h4>
                <p className="text-neutral-300 text-sm">Neural Networks, Computer Vision, Natural Language Processing, Deep Learning, AI Integration</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Design & Manufacturing</h4>
                <p className="text-neutral-300 text-sm">CAD, 3D Modeling, Rapid Prototyping, 3D Printing, CNC Machining, UI/UX Design</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Cloud & Infrastructure</h4>
                <p className="text-neutral-300 text-sm">AWS, Heroku, Database Management, API Development, System Integration</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Digital Marketing</h4>
                <p className="text-neutral-300 text-sm">SEO, Growth Marketing, Analytics, Content Strategy, Campaign Management</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">Key Projects</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white">AI System for Smart Parking (2023)</h4>
                <p className="text-neutral-300 text-sm">Intelligent parking space detection system using computer vision and Raspberry Pi, with real-time web interface</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Automated Motion Control System (2024)</h4>
                <p className="text-neutral-300 text-sm">Custom hardware and software solution for construction fabrication with CAD integration and intuitive user interface</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Custom Project Management Platform (2024)</h4>
                <p className="text-neutral-300 text-sm">React.js platform with intelligent routing algorithms, AWS hosting, and Auth0 integration for field technician operations</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Patented Vehicle Safety Device (2022)</h4>
                <p className="text-neutral-300 text-sm">Connected lock box system to prevent drunk driving, combining hardware engineering with software connectivity</p>
              </div>
              <div>
                <h4 className="font-medium text-white">Neural Network Playground</h4>
                <p className="text-neutral-300 text-sm">Interactive machine learning visualization tool with real-time training capabilities</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Additional Information</h3>
            <p className="text-neutral-300">
              Entrepreneur and engineering leader with a passion for solving real-world problems through innovative solutions. 
              Experienced in building integrated hardware-software companies, managing end-to-end product development, and fostering 
              transparent client relationships. Founded Sunlab Digital to deliver engineering excellence with measurable results 
              across multiple industries including AI, automotive, construction, and digital marketing.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 