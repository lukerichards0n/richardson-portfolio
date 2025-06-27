"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconSettings } from "@tabler/icons-react";
import {
    Sparkles,
    Pause,
    Play,
    RotateCcw,
    Activity,
    X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    opacity: number;
    life: number;
}

interface Settings {
    particleSize: number;
    particleColor: string;
    particleSpeed: number;
    particleDensity: number;
    connectionThreshold: number;
    lineOpacity: number;
    backgroundColor: string;
    gravityStrength: number;
    mouseAttraction: number;
    particleGlow: boolean;
    trailEffect: boolean;
}

export default function ParticleSimulatorPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | undefined>(undefined);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const [particles, setParticles] = useState<Particle[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [fps, setFps] = useState(0);

    const defaultSettings: Settings = {
        particleSize: 10,
        particleColor: "#0ea5e9",
        particleSpeed: 1.5,
        particleDensity: 5,
        connectionThreshold: 150,
        lineOpacity: 0.2,
        backgroundColor: "#000000",
        gravityStrength: 0.05,
        mouseAttraction: 0.001,
        particleGlow: false,
        trailEffect: false
    };

    const [settings, setSettings] = useState<Settings>(defaultSettings);

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    // Particle creation function
    const createParticle = useCallback((x: number, y: number): Particle => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * settings.particleSpeed;

        return {
            x,
            y,
            size: Math.random() * settings.particleSize + 1,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            color: settings.particleColor,
            opacity: 1,
            life: 1
        };
    }, [settings.particleSize, settings.particleSpeed, settings.particleColor]);

    // Create initial particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const initialParticles: Particle[] = [];
        for (let i = 0; i < 500; i++) {
            initialParticles.push(createParticle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
        setParticles(initialParticles);
    }, [createParticle]);

    // Handle mouse movement
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || isPaused) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mousePositionRef.current = { x, y };

        // Create particles at mouse position
        const newParticles: Particle[] = [];
        for (let i = 0; i < settings.particleDensity; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            newParticles.push(createParticle(x + offsetX, y + offsetY));
        }

        setParticles(prev => [...prev, ...newParticles].slice(-500)); // Limit max particles
    }, [isPaused, settings.particleDensity, createParticle]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let lastTime = performance.now();
        let frameCount = 0;
        let fpsTime = 0;

        const animate = (currentTime: number) => {
            if (isPaused) {
                animationIdRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Ensure proper canvas state
            ctx.globalCompositeOperation = 'source-over';

            // Calculate FPS
            frameCount++;
            fpsTime += deltaTime;
            if (fpsTime >= 1000) {
                setFps(Math.round(frameCount * 1000 / fpsTime));
                frameCount = 0;
                fpsTime = 0;
            }

            // Clear canvas with trail effect
            if (settings.trailEffect) {
                ctx.fillStyle = `${settings.backgroundColor}33`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = settings.backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Update and draw particles
            setParticles(prevParticles => {
                const updatedParticles = prevParticles.filter(particle => {
                    // Update particle physics
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    particle.speedY += settings.gravityStrength;

                    // Mouse attraction
                    if (settings.mouseAttraction > 0) {
                        const dx = mousePositionRef.current.x - particle.x;
                        const dy = mousePositionRef.current.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > 0) {
                            particle.speedX += (dx / distance) * settings.mouseAttraction;
                            particle.speedY += (dy / distance) * settings.mouseAttraction;
                        }
                    }

                    // Bounce off walls
                    if (particle.x < 0 || particle.x > canvas.width) {
                        particle.speedX *= -0.8;
                        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                    }
                    if (particle.y < 0 || particle.y > canvas.height) {
                        particle.speedY *= -0.8;
                        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                    }

                    // Age particle
                    particle.life -= 0.002;
                    particle.opacity = particle.life;
                    if (particle.size > 0.5) particle.size -= 0.005;

                    return particle.life > 0 && particle.size > 0.5;
                });

                // Draw connections
                ctx.strokeStyle = `rgba(${parseInt(settings.particleColor.slice(1, 3), 16)}, ${parseInt(settings.particleColor.slice(3, 5), 16)}, ${parseInt(settings.particleColor.slice(5, 7), 16)}, ${settings.lineOpacity})`;
                ctx.lineWidth = 1;

                for (let i = 0; i < updatedParticles.length; i++) {
                    for (let j = i + 1; j < updatedParticles.length; j++) {
                        const dx = updatedParticles[i].x - updatedParticles[j].x;
                        const dy = updatedParticles[i].y - updatedParticles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < settings.connectionThreshold) {
                            const opacity = (1 - distance / settings.connectionThreshold) * settings.lineOpacity;
                            ctx.strokeStyle = `rgba(${parseInt(settings.particleColor.slice(1, 3), 16)}, ${parseInt(settings.particleColor.slice(3, 5), 16)}, ${parseInt(settings.particleColor.slice(5, 7), 16)}, ${opacity})`;
                            ctx.beginPath();
                            ctx.moveTo(updatedParticles[i].x, updatedParticles[i].y);
                            ctx.lineTo(updatedParticles[j].x, updatedParticles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                // Draw particles
                updatedParticles.forEach(particle => {
                    // Convert hex color to RGB
                    const r = parseInt(particle.color.slice(1, 3), 16);
                    const g = parseInt(particle.color.slice(3, 5), 16);
                    const b = parseInt(particle.color.slice(5, 7), 16);

                    // Glow effect
                    if (settings.particleGlow) {
                        const gradient = ctx.createRadialGradient(
                            particle.x, particle.y, 0,
                            particle.x, particle.y, particle.size * 3
                        );
                        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.opacity})`);
                        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                        ctx.fillStyle = gradient;
                        ctx.beginPath();
                        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    // Main particle
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                return updatedParticles;
            });

            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isPaused, settings]);

    const handleReset = () => {
        setSettings(defaultSettings);
        setParticles([]);
    };

    const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            {/* Full-screen Canvas */}
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 cursor-crosshair"
            />

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
                <div className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/projects"
                            className={cn(
                                "inline-flex items-center gap-2 text-neutral-400 hover:text-white",
                                "transition-colors duration-200 mb-6 pointer-events-auto"
                            )}
                        >
                            <IconArrowLeft className="w-5 h-5" />
                            Back to Projects
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                            Particle Cloud
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
                            Interactive particle physics simulation with dynamic connections
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Control Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-8 left-8 flex items-center gap-4 z-10"
            >
                <button
                    onClick={() => setShowControls(!showControls)}
                    className={cn(
                        "px-4 py-2.5 rounded-3xl font-medium",
                        "bg-neutral-900/90 backdrop-blur-sm text-white",
                        "border border-neutral-800 hover:bg-neutral-800",
                        "transition-all duration-200 flex items-center gap-2"
                    )}
                >
                    <IconSettings className="w-4 h-4" />
                    Settings
                </button>

                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={cn(
                        "p-2.5 rounded-3xl",
                        "bg-neutral-900/90 backdrop-blur-sm text-white",
                        "border border-neutral-800 hover:bg-neutral-800",
                        "transition-all duration-200"
                    )}
                >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>

                <button
                    onClick={handleReset}
                    className={cn(
                        "p-2.5 rounded-3xl",
                        "bg-neutral-900/90 backdrop-blur-sm text-white",
                        "border border-neutral-800 hover:bg-neutral-800",
                        "transition-all duration-200"
                    )}
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-8 right-8 z-10"
            >
                <div className="bg-neutral-900/90 backdrop-blur-sm rounded-3xl px-4 py-3 border border-neutral-800">
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-neutral-400" />
                            <span className="text-white font-mono">{fps} FPS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-neutral-400" />
                            <span className="text-white font-mono">{particles.length}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Settings Panel */}
            <AnimatePresence>
                {showControls && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowControls(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: -400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -400, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-neutral-900 border-r border-neutral-800 z-30 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-semibold text-white">Settings</h2>
                                    <button
                                        onClick={() => setShowControls(false)}
                                        className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {/* Particle Size */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Particle Size</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {settings.particleSize.toFixed(1)}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            step="0.1"
                                            value={settings.particleSize}
                                            onChange={(e) => updateSetting("particleSize", parseFloat(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Particle Color */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-3">
                                            Particle Color
                                        </label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {["#0ea5e9", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateSetting("particleColor", color)}
                                                    className={cn(
                                                        "w-full h-10 rounded-lg transition-all",
                                                        settings.particleColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900" : ""
                                                    )}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                        <input
                                            type="color"
                                            value={settings.particleColor}
                                            onChange={(e) => updateSetting("particleColor", e.target.value)}
                                            className="mt-3 w-full h-10 rounded-lg cursor-pointer bg-neutral-800 border border-neutral-700"
                                        />
                                    </div>

                                    {/* Particle Speed */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Particle Speed</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {settings.particleSpeed.toFixed(1)}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="5"
                                            step="0.1"
                                            value={settings.particleSpeed}
                                            onChange={(e) => updateSetting("particleSpeed", parseFloat(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Particle Density */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Particle Density</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {settings.particleDensity}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            step="1"
                                            value={settings.particleDensity}
                                            onChange={(e) => updateSetting("particleDensity", parseInt(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Connection Distance */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Connection Distance</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {settings.connectionThreshold}px
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="50"
                                            max="300"
                                            step="10"
                                            value={settings.connectionThreshold}
                                            onChange={(e) => updateSetting("connectionThreshold", parseInt(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Line Opacity */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Line Opacity</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {(settings.lineOpacity * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={settings.lineOpacity}
                                            onChange={(e) => updateSetting("lineOpacity", parseFloat(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Gravity Strength */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Gravity</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {(settings.gravityStrength * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="0.5"
                                            step="0.01"
                                            value={settings.gravityStrength}
                                            onChange={(e) => updateSetting("gravityStrength", parseFloat(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Mouse Attraction */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-neutral-300">Mouse Attraction</label>
                                            <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400">
                                                {(settings.mouseAttraction * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="0.01"
                                            step="0.0001"
                                            value={settings.mouseAttraction}
                                            onChange={(e) => updateSetting("mouseAttraction", parseFloat(e.target.value))}
                                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Toggle Options */}
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-medium text-neutral-300">Particle Glow</span>
                                            <button
                                                onClick={() => updateSetting("particleGlow", !settings.particleGlow)}
                                                className={cn(
                                                    "w-12 h-6 rounded-full transition-colors relative",
                                                    settings.particleGlow ? "bg-blue-500" : "bg-neutral-700"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                                                    settings.particleGlow ? "translate-x-6" : "translate-x-0.5"
                                                )} />
                                            </button>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-medium text-neutral-300">Trail Effect</span>
                                            <button
                                                onClick={() => updateSetting("trailEffect", !settings.trailEffect)}
                                                className={cn(
                                                    "w-12 h-6 rounded-full transition-colors relative",
                                                    settings.trailEffect ? "bg-blue-500" : "bg-neutral-700"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                                                    settings.trailEffect ? "translate-x-6" : "translate-x-0.5"
                                                )} />
                                            </button>
                                        </label>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        onClick={handleReset}
                                        className={cn(
                                            "w-full px-4 py-3 rounded-lg font-medium",
                                            "bg-white text-black hover:bg-neutral-100",
                                            "transition-all duration-200"
                                        )}
                                    >
                                        Reset to Defaults
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}