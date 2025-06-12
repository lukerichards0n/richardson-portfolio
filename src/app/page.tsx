"use client";
import { motion } from "motion/react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GlowingEffect } from "@/components/ui/glowing-effect";

import { Timeline } from "@/components/ui/timeline";
import Footer from "@/components/ui/footer";
import { IconArrowRight, IconDevices, IconCode, IconCpu, IconRocket, IconBolt, IconCloud, IconDatabase } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const services = [
    {
      icon: <IconDevices className="h-8 w-8" />,
      title: "PCB Design & Prototyping",
      description: "Custom circuit board design and rapid prototyping for your electronic products"
    },
    {
      icon: <IconCode className="h-8 w-8" />,
      title: "Firmware Development",
      description: "Embedded systems programming and firmware solutions for microcontrollers"
    },
    {
      icon: <IconCpu className="h-8 w-8" />,
      title: "System Integration",
      description: "Complete hardware-software integration and motion control systems"
    },
    {
      icon: <IconRocket className="h-8 w-8" />,
      title: "Product Development",
      description: "End-to-end product development from concept to manufacturing"
    }
  ];

  const featuredProjects = [
    {
      title: "Neural Network Playground",
      category: "AI/ML",
      description: "Interactive visualization of neural networks with real-time training",
      link: "/projects"
    },
    {
      title: "Motion Control Systems",
      category: "Embedded",
      description: "Custom firmware for industrial motion control applications",
      link: "/projects"
    },
    {
      title: "DNA Separator",
      category: "Research",
      description: "Microfluidic electrophoresis system for DNA separation",
      link: "/projects"
    }
  ];

  const testimonials = [
    {
      quote: "Luke's expertise in embedded systems and PCB design helped us bring our product to market 3 months ahead of schedule. His attention to detail and problem-solving skills are exceptional.",
      name: "Sarah Johnson",
      title: "CTO, TechStartup Inc.",
    },
    {
      quote: "Working with Luke was a game-changer for our project. His ability to integrate complex hardware and software systems while maintaining reliability was impressive.",
      name: "Michael Chen",
      title: "Engineering Manager, Robotics Co.",
    },
    {
      quote: "Luke delivered a motion control system that exceeded our expectations. His deep understanding of both theoretical concepts and practical implementation made the difference.",
      name: "Emily Rodriguez",
      title: "Lead Engineer, Automation Systems",
    },
    {
      quote: "The custom firmware solution Luke developed for our IoT device was elegant and efficient. He has a rare combination of hardware and software expertise.",
      name: "David Park",
      title: "Product Manager, Connected Devices",
    },
  ];

  const bentoItems = [
    {
      title: "PCB Design Excellence",
      description: "From schematic capture to layout optimization, delivering production-ready designs",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconDevices className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Embedded Systems",
      description: "Firmware development for microcontrollers and real-time systems",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconCpu className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Motion Control",
      description: "Advanced control systems for precision motion and automation",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconBolt className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "IoT Solutions",
      description: "Connected device development with cloud integration capabilities",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconCloud className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Signal Processing",
      description: "Digital signal processing and data acquisition systems",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconDatabase className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Rapid Prototyping",
      description: "Quick iteration from concept to working prototype",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>,
      icon: <IconRocket className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const timelineData = [
    {
      title: "2019 - 2020",
      content: (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
            Research and Design Assistant, Marshall University Research Corp.
          </h3>
          <p className="mb-4 text-sm md:text-base text-neutral-300">
            Collaborated with a team of chemists to develop a microfluidic, electrophoresis, continual DNA separator.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Led R&D efforts to enhance efficiency of DNA separation mechanisms</li>
            <li>Ensured manufacturability and scalability for successful commercialization</li>
            <li>Conducted DNA, RNA, and protein extraction using gel electrophoresis</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2018 - 2022",
      content: (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
            Design Engineer Assistant, Robert C. Byrd Institute
          </h3>
          <p className="mb-4 text-sm md:text-base text-neutral-300">
            Collaborated with clients to create innovative products from the ground up, utilizing skills in CAD, programming, PCB design, and rapid manufacturing.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Led the design and testing of more than 10 projects in medical, consumer, and commercial fields</li>
            <li>Performed maintenance on laser cutters, 3D printers, and injection molding machines</li>
            <li>Managed client relationships, fostering strong partnerships and achieving high customer satisfaction</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2022 - Current",
      content: (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
            Independent Design Consultant
          </h3>
          <p className="mb-4 text-sm md:text-base text-neutral-300">
            Fostered strong relationships with clients, resulting in a solid reputation and increased contract acquisition for both consumer and commercial product development.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Spearheaded the design, development, and integration of motion control systems, firmware, and UI/UX elements</li>
            <li>Produced comprehensive documentation and delivered fully functional projects to clients</li>
            <li>Worked with various projects from conception to final delivery</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <HeroHighlight>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-center lg:text-left"
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug">
                <div className="mb-2">Hello, I&apos;m Luke Richardson</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl md:text-3xl lg:text-4xl">I&apos;m</span>
                  <div className="relative w-[240px] md:w-[420px] lg:w-[500px] h-[2.5rem] md:h-[4rem] lg:h-[5rem]">
                    <div className="absolute inset-0 flex items-center justify-start">
                      <ContainerTextFlip 
                        words={["an Electrical Engineer", "a PCB Designer", "a Firmware Developer", "a Problem Solver"]}
                        className="text-xl md:text-3xl lg:text-4xl"
                      />
                    </div>
                  </div>
                </div>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-6 max-w-2xl">
                Ready to innovate and solve real-world challenges
              </p>
              <div className="flex gap-4 justify-center lg:justify-start mt-8">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="dark:bg-white bg-white text-black flex items-center space-x-2 px-6 py-3 font-medium"
                  as={Link}
                  href="/projects"
                >
                  View My Work
                  <IconArrowRight className="h-4 w-4" />
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="dark:bg-black bg-neutral-100 text-neutral-700 dark:text-white flex items-center space-x-2 px-6 py-3 font-medium"
                  as={Link}
                  href="/contact"
                >
                  Get In Touch
                </HoverBorderGradient>
              </div>
            </motion.div>
            
            {/* Photo Card */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
                delay: 0.3,
              }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm">
                <div className="glass-picture-card">
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-picture-content">
                    <div className="relative w-full h-full">
                      <Image
                        src="/me.png"
                        alt="Luke Richardson"
                        fill
                        className="object-contain object-bottom"
                        style={{ 
                          objectPosition: 'center bottom',
                          paddingLeft: '20px',
                          paddingRight: '20px',
                        }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </HeroHighlight>

      {/* About Section */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Engineering Solutions That Make a Difference
          </h2>
          <p className="text-lg text-neutral-300 text-center leading-relaxed mb-6">
            I am a highly motivated and detail-oriented electrical engineer with a strong passion for solving real-world problems through innovative solutions. 
            My experience spans a range of projects and clients, showcasing my ability to apply technical knowledge in practical settings.
          </p>
          <p className="text-lg text-neutral-300 text-center leading-relaxed mb-8">
            Beyond my technical abilities, I am a strong communicator and team player. 
            I believe that collaboration is key to achieving innovative solutions, and I am always eager to learn from others and share my own insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <p className="text-neutral-400">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <p className="text-neutral-400">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-neutral-400">Client Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData} />
        </motion.div>
      </section>

      {/* Services Section with Glowing Effect */}
      <section className="py-20 px-4 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            What I Can Do For You
          </h2>
          <p className="text-lg text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
            From concept to completion, I provide comprehensive engineering solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-full rounded-xl border border-neutral-800 bg-neutral-900 p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative h-full rounded-xl bg-neutral-900 p-6 transition-colors">
                    <div className="text-white mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-neutral-300 text-sm">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects with Glowing Effect */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
            A selection of my recent work showcasing diverse technical challenges
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={project.link}>
                  <div className="relative h-full rounded-xl border border-neutral-800 bg-neutral-900 p-2 hover:transform hover:scale-[1.02] transition-all">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <div className="relative h-full rounded-xl bg-neutral-900 p-6">
                      <div className="text-sm text-neutral-500 mb-2">{project.category}</div>
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neutral-200">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-sm">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors"
            >
              View All Projects
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            What Clients Say
          </h2>
          <p className="text-lg text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
            Trusted by companies to deliver exceptional engineering solutions
          </p>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new opportunities and challenging projects. 
            Let&apos;s work together to bring your ideas to life.
          </p>
          <div className="flex gap-4 justify-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="dark:bg-white bg-white text-black flex items-center space-x-2 px-6 py-3 font-medium"
              as={Link}
              href="/contact"
            >
              Let&apos;s Work Together
              <IconArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="dark:bg-black bg-neutral-900 text-white flex items-center space-x-2 px-6 py-3 font-medium"
              as={Link}
              href="/resume"
            >
              View Resume
            </HoverBorderGradient>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* SVG FILTER DEFINITION */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
