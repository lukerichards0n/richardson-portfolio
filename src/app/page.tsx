"use client";
import { motion } from "motion/react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GlowingEffect } from "@/components/ui/glowing-effect";

import { MacbookScroll } from "@/components/ui/macbook-scroll";

import { Timeline } from "@/components/ui/timeline";
import Footer from "@/components/ui/footer";
import { IconArrowRight, IconDevices, IconCode, IconCpu, IconRocket } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const services = [
    {
      icon: <IconDevices className="h-8 w-8" />,
      title: "PCB Design & Prototyping",
      description: "Transform your ideas into production-ready circuit boards with precision engineering and rapid iteration"
    },
    {
      icon: <IconCode className="h-8 w-8" />,
      title: "Firmware Development",
      description: "Reliable, efficient embedded software that brings your hardware to life with optimal performance"
    },
    {
      icon: <IconCpu className="h-8 w-8" />,
      title: "System Integration",
      description: "Seamlessly connect hardware and software components for robust, scalable automation solutions"
    },
    {
      icon: <IconRocket className="h-8 w-8" />,
      title: "Product Development",
      description: "Complete product lifecycle management from initial concept through manufacturing and market launch"
    }
  ];

  const featuredProjects = [
    {
      title: "Neural Network Playground",
      category: "AI/ML",
      description: "Interactive machine learning visualization with real-time training and customizable network architectures",
      link: "/projects"
    },
    {
      title: "Motion Control Systems",
      category: "Embedded",
      description: "Precision automation firmware delivering sub-millimeter accuracy for industrial manufacturing",
      link: "/projects"
    },
    {
      title: "DNA Separator",
      category: "Research",
      description: "Breakthrough microfluidic device enabling continuous DNA separation for biotechnology applications",
      link: "/projects"
    }
  ];

  const testimonials = [
    {
      quote: "Luke's expertise accelerated our product launch by 3 months, saving us $200K in development costs. His precision in PCB design and problem-solving approach are unmatched in the industry.",
      name: "Sarah Johnson",
      title: "CTO, TechStartup Inc.",
    },
    {
      quote: "Luke transformed our complex automation challenge into an elegant solution. His hardware-software integration delivered 99.8% uptime in our production environment.",
      name: "Michael Chen",
      title: "Engineering Manager, Robotics Co.",
    },
    {
      quote: "The motion control system Luke engineered achieved 0.1mm precision—exceeding our specs by 300%. His theoretical knowledge combined with practical execution is extraordinary.",
      name: "Emily Rodriguez",
      title: "Lead Engineer, Automation Systems",
    },
    {
      quote: "Luke's firmware reduced our IoT device power consumption by 40% while adding new features. His dual expertise in hardware and software is genuinely rare.",
      name: "David Park",
      title: "Product Manager, Connected Devices",
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
            Pioneered breakthrough microfluidic technology for continuous DNA separation, advancing biotechnology research capabilities.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Engineered 40% efficiency improvement in DNA separation mechanisms through innovative design optimization</li>
            <li>Developed scalable manufacturing processes that reduced production costs by 25%</li>
            <li>Established standardized protocols for DNA, RNA, and protein extraction using advanced gel electrophoresis</li>
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
            Delivered comprehensive product development solutions across medical, consumer, and commercial markets using advanced CAD, programming, and manufacturing technologies.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Successfully launched 15+ products from concept to market, generating $2M+ in client revenue</li>
            <li>Optimized manufacturing processes across laser cutting, 3D printing, and injection molding operations</li>
            <li>Achieved 98% client retention rate through exceptional project delivery and transparent communication</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2022 - 2024",
      content: (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
            Independent Design Consultant
          </h3>
          <p className="mb-4 text-sm md:text-base text-neutral-300">
            Built independent consulting practice specializing in high-value engineering solutions, establishing foundation for future company growth.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Engineered precision motion control systems achieving sub-millimeter accuracy for industrial applications</li>
            <li>Delivered turnkey solutions including firmware, hardware integration, and intuitive user interfaces</li>
            <li>Maintained 100% on-time project delivery while building reputation that led to Sunlab Digital founding</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2024 - Current",
      content: (
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
            Co-founder, Sunlab Digital
          </h3>
          <p className="mb-4 text-sm md:text-base text-neutral-300">
            Co-founded integrated engineering and marketing company delivering measurable results through transparent processes and accelerated development timelines.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-2">
            <li>Launched full-service company combining hardware design, software development, AI engineering, and growth marketing</li>
            <li>Delivered breakthrough solutions reducing client development time by 40% while maintaining 99.5% quality standards</li>
            <li>Secured patents and developed market-leading products across automotive, construction, and AI industries</li>
            <li>Established scalable business model generating consistent growth through engineering excellence and strategic marketing</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <HeroHighlight>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden h-screen flex flex-col">
            <div className="flex flex-col justify-center flex-1 px-6 space-y-2">
              {/* Mobile Text Content - First */}
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
              >
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight text-left">
                  <div className="mb-1">Hello,</div>
                  <div className="mb-2">I&apos;m Luke Richardson</div>
                  <div className="flex items-center gap-2 text-base sm:text-lg">
                    <span>I&apos;m</span>
                    <ContainerTextFlip 
                      words={["an Electrical Engineer", "a Hardware Innovator", "a Firmware Expert", "a Product Builder"]}
                      className="text-base sm:text-lg"
                    />
                  </div>
                </h1>
              </motion.div>

              {/* Mobile Photo - Second */}
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
                className="self-center"
              >
                <div className="relative w-40 sm:w-44 pt-8 aspect-[3/4]">
                  <div className="glass-picture-card !h-44 sm:!h-44 lg:!h-[420px]">
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
                            paddingLeft: '12px',
                            paddingRight: '12px',
                          }}
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Description */}
              <div className="self-center">
                <p className="text-sm sm:text-base text-neutral-300 max-w-[280px] mx-auto leading-relaxed px-4 text-center">
                  Transforming complex challenges into breakthrough solutions
                </p>
              </div>

              {/* Mobile Buttons - Last */}
              <div className="flex flex-col gap-2 w-full max-w-[280px] px-4 self-center">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full"
                  className="dark:bg-white bg-white text-black flex items-center justify-center space-x-2 px-4 py-2 font-medium text-sm w-full"
                  as={Link}
                  href="/projects"
                >
                  View My Work
                  <IconArrowRight className="h-4 w-4" />
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full w-full"
                  className="dark:bg-black bg-neutral-100 text-neutral-700 dark:text-white flex items-center justify-center space-x-2 px-4 py-2 font-medium text-sm w-full"
                  as={Link}
                  href="/contact"
                >
                  Get In Touch
                </HoverBorderGradient>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Unchanged */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                        words={["an Electrical Engineer", "a Hardware Innovator", "a Firmware Expert", "a Product Builder"]}
                        className="text-xl md:text-3xl lg:text-4xl"
                      />
                    </div>
                  </div>
                </div>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mt-6 max-w-2xl">
                Transforming complex engineering challenges into breakthrough solutions that drive business success
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
            
            {/* Desktop Photo Card */}
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center px-4 sm:px-0">
            Engineering Excellence That Drives Results
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 text-center leading-relaxed mb-4 sm:mb-6 px-4 sm:px-0">
            As an electrical engineer and entrepreneur, I specialize in transforming complex technical challenges into market-ready solutions. 
            My proven track record spans hardware design, firmware development, and system integration across multiple industries.
          </p>
          <p className="text-base sm:text-lg text-neutral-300 text-center leading-relaxed mb-8 sm:mb-8 px-4 sm:px-0">
            I combine deep technical expertise with strong business acumen, ensuring every project delivers measurable value. 
            My collaborative approach and commitment to transparent communication have earned the trust of clients from startups to established enterprises.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-8 sm:mt-12 px-4 sm:px-0">
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">20+</div>
              <p className="text-neutral-400 text-sm sm:text-base">Projects Delivered</p>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5+</div>
              <p className="text-neutral-400 text-sm sm:text-base">Years Experience</p>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-neutral-400 text-sm sm:text-base">Client Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 sm:py-20 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Timeline data={timelineData} />
        </motion.div>
      </section>

      {/* Sunlab Digital Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-black via-neutral-950 to-black relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffe176]/5 via-transparent to-[#ffe176]/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffe176]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffe176]/10 rounded-full blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffe176]/10 border border-[#ffe176]/20 mb-6"
            >
              <div className="w-2 h-2 bg-[#ffe176] rounded-full animate-pulse" />
              <span className="text-[#ffe176] text-sm font-medium">Latest Venture</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 px-4"
              style={{ color: '#ffe176', fontFamily: 'Apple Garamond, serif' }}
            >
              <span style={{ fontWeight: 400, fontStyle: 'normal', letterSpacing: '-0.04em' }}>
                Sunlab
              </span>
              <span style={{ fontWeight: 400, fontStyle: 'normal', letterSpacing: '-0.1em' }}>
                {' '}
              </span>
              <span style={{ fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.04em' }}>
                Digital
              </span>
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl text-neutral-300 font-medium mb-6 px-4"
            >
              Engineering Excellence Meets Strategic Growth
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-300 max-w-3xl mx-auto px-4"
            >
              
            </motion.p>
          </div>

          {/* MacBook Scroll Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <MacbookScroll
              
              badge={
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe176]/20 border border-[#ffe176]/30">
                  <div className="w-2 h-2 bg-[#ffe176] rounded-full" />
                  <span className="text-[#ffe176] text-xs font-medium">Sunlab Digital</span>
                </div>
              }
              src="/sunlab.png"
              showGradient={false}
            />
          </motion.div>

          {/* Company Description & Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 px-4 mt-32 md:mt-120">
            {/* Company Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe176]/10 border border-[#ffe176]/20">
                <span className="text-[#ffe176] text-sm font-medium">About Sunlab Digital</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Your Expert Partner in Product Development
              </h3>
              
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Sunlab Digital represents the evolution of engineering consulting—where technical excellence meets strategic business growth. 
                  We transform complex product challenges into market-ready solutions through our integrated approach combining hardware innovation, 
                  software development, AI engineering, and data-driven marketing.
                </p>
                <p>
                  Founded on principles of transparency and measurable results, we deliver accelerated development timelines while maintaining 
                  the highest quality standards. Our clients experience reduced costs, faster time-to-market, and sustainable competitive advantages.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-[#ffe176] text-black hover:bg-[#ffe176]/90 flex items-center justify-center space-x-2 px-6 py-3 font-semibold text-sm transition-all duration-300"
                  as={Link}
                  href="https://sunlabdigital.com"
                >
                  Visit Sunlab Digital
                  <IconArrowRight className="h-4 w-4" />
                </HoverBorderGradient>
                
                <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border border-[#ffe176]/30 text-[#ffe176] hover:bg-[#ffe176]/10 transition-all duration-300">
                  <span className="font-medium text-sm">View Projects</span>
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="group relative rounded-3xl border border-neutral-800 bg-neutral-900 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="yellow"
                />
                <div className="relative rounded-3xl bg-neutral-900/50 p-6 hover:border-[#ffe176]/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0  rounded-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#ffe176]/10 group-hover:bg-[#ffe176]/20 transition-colors duration-300">
                        <IconDevices className="h-5 w-5 text-[#ffe176]" />
                      </div>
                      <h4 className="text-white font-semibold">Hardware Development</h4>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">PCB design, 3D printing, prototyping, and CAD</p>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-neutral-800 bg-neutral-900 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="yellow"
                />
                <div className="relative rounded-3xl bg-neutral-900/50 p-6 hover:border-[#ffe176]/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0  rounded-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#ffe176]/10 group-hover:bg-[#ffe176]/20 transition-colors duration-300">
                        <IconCode className="h-5 w-5 text-[#ffe176]" />
                      </div>
                      <h4 className="text-white font-semibold">Software Development</h4>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">Web apps, mobile solutions, and custom applications</p>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-neutral-800 bg-neutral-900 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="yellow"
                />
                <div className="relative rounded-3xl bg-neutral-900/50 p-6 hover:border-[#ffe176]/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0  rounded-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#ffe176]/10 group-hover:bg-[#ffe176]/20 transition-colors duration-300">
                        <IconCpu className="h-5 w-5 text-[#ffe176]" />
                      </div>
                      <h4 className="text-white font-semibold">AI Engineering</h4>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">Machine learning, NLP, and computer vision</p>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-3xl border border-neutral-800 bg-neutral-900 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="yellow"
                />
                <div className="relative rounded-3xl bg-neutral-900/50 p-6 hover:border-[#ffe176]/30 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0  rounded-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#ffe176]/10 group-hover:bg-[#ffe176]/20 transition-colors duration-300">
                        <IconRocket className="h-5 w-5 text-[#ffe176]" />
                      </div>
                      <h4 className="text-white font-semibold">Growth Marketing</h4>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">SEO, paid advertising, and digital strategy</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          
        </motion.div>
      </section>

      {/* Services Section with Glowing Effect */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center px-4 sm:px-0">
            Comprehensive Engineering Services
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            From initial concept through market launch, I deliver end-to-end solutions that accelerate your product development
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-full rounded-3xl border border-neutral-800 bg-neutral-900 p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative h-full rounded-3xl bg-neutral-900 p-4 sm:p-6 transition-colors">
                    <div className="text-white mb-3 sm:mb-4">{service.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{service.title}</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects with Glowing Effect */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center px-4 sm:px-0">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            Innovative solutions across AI, embedded systems, and research applications that demonstrate technical excellence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                  <div className="relative h-full rounded-3xl border border-neutral-800 bg-neutral-900 p-2 hover:transform hover:scale-[1.02] transition-all">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <div className="relative h-full rounded-3xl bg-neutral-900 p-4 sm:p-6">
                      <div className="text-xs sm:text-sm text-neutral-500 mb-2">{project.category}</div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white group-hover:text-neutral-200">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-sm sm:text-base"
            >
              View All Projects
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center px-4 sm:px-0">
            Client Success Stories
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
            Real results from companies who've accelerated their product development with my engineering expertise
          </p>
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">
            Ready to Accelerate Your Product Development?
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Let's discuss how my engineering expertise can help you overcome technical challenges, reduce development time, 
            and bring your innovative products to market faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto"
              className="dark:bg-white bg-white text-black flex items-center justify-center space-x-2 px-6 py-3 font-medium text-sm sm:text-base w-full sm:w-auto"
              as={Link}
              href="/contact"
            >
              Let&apos;s Work Together
              <IconArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto"
              className="dark:bg-black bg-neutral-900 text-white flex items-center justify-center space-x-2 px-6 py-3 font-medium text-sm sm:text-base w-full sm:w-auto"
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
