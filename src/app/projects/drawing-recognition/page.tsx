"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { LoaderCircle, SendHorizontal, Trash2, X, Palette } from "lucide-react";
import Link from "next/link";
import { Content, GoogleGenAI, Modality } from "@google/genai";
import { cn } from "@/lib/utils";

function parseError(error: string) {
  const regex = /{"error":(.*)}/gm;
  const m = regex.exec(error);
  try {
    const e = m ? m[1] : error;
    const err = JSON.parse(e);
    return err.message || error;
  } catch {
    return error;
  }
}

export default function DrawingRecognitionPage() {
  // Add slider styles to match design system
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      border: 2px solid #404040;
      transition: all 0.2s ease;
    }
    .slider::-webkit-slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      border: 2px solid #404040;
      transition: all 0.2s ease;
    }
    .slider::-moz-range-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
  `;

  /* ----------------------------- State & Refs ----------------------------- */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customApiKey] = useState("");

  /* --------------------------- Environment Keys --------------------------- */
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

  // Initialize AI client
  const ai = new GoogleGenAI({ apiKey: customApiKey || GOOGLE_API_KEY });

  /* ------------------------------- Canvas FX ------------------------------ */
  // Load background image when generatedImage changes
  useEffect(() => {
    if (generatedImage && canvasRef.current) {
      const img = new window.Image();
      img.onload = () => {
        backgroundImageRef.current = img;
        drawImageToCanvas();
      };
      img.src = generatedImage;
    }
  }, [generatedImage]);

  // Initialize canvas with white background when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas();
    }
  }, []);

  // Add touch event prevention
  useEffect(() => {
    const preventTouchDefault = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("touchstart", preventTouchDefault, { passive: false });
      canvas.addEventListener("touchmove", preventTouchDefault, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("touchstart", preventTouchDefault);
        canvas.removeEventListener("touchmove", preventTouchDefault);
      }
    };
  }, [isDrawing]);

  // Initialize canvas with white background
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 960;
    canvas.height = 540;

    // Fill canvas with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Draw the background image to the canvas
  const drawImageToCanvas = () => {
    if (!canvasRef.current || !backgroundImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with white background first
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
  };

  // Get the correct coordinates based on canvas scaling
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);

    // Prevent default behavior for touch events
    if ("touches" in e) {
      e.preventDefault();
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    // Prevent default behavior for touch events
    if ("touches" in e) {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill with white instead of just clearing
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setGeneratedImage(null);
    backgroundImageRef.current = null;
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPenColor(e.target.value);
  };

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canvasRef.current) return;

    setIsLoading(true);

    try {
      // Get the drawing as base64 data
      const canvas = canvasRef.current;

      // Create a temporary canvas to add white background
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      // Fill with white background
      tempCtx.fillStyle = "#FFFFFF";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the original canvas content on top of the white background
      tempCtx.drawImage(canvas, 0, 0);

      const drawingData = tempCanvas.toDataURL("image/png").split(",")[1];

      let contents: Content[] = [
        {
          role: "USER",
          parts: [{ text: prompt }],
        },
      ];

      if (drawingData) {
        contents = [
          {
            role: "USER",
            parts: [{ inlineData: { data: drawingData, mimeType: "image/png" } }],
          },
          {
            role: "USER",
            parts: [{ text: `${prompt}. Keep the same minimal line doodle style.` }],
          },
        ];
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      const data = {
        success: true,
        message: "",
        imageData: null as string | null,
        error: undefined,
      };

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            data.message = part.text;
          } else if (part.inlineData?.data) {
            data.imageData = part.inlineData.data;
          }
        }
      }

      if (data.success && data.imageData) {
        const imageUrl = `data:image/png;base64,${data.imageData}`;
        setGeneratedImage(imageUrl);
      } else {
        console.error("Failed to generate image:", data.error);
        setErrorMessage("Failed to generate image. Please try again.");
        setShowErrorModal(true);
      }
    } catch (err) {
      console.error("Error submitting drawing:", err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  /* --------------------------------- JSX ---------------------------------- */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-8"
          >
            <Link
              href="/projects"
              className={cn(
                "inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200",
                "transition-colors duration-200 mb-6",
                "hover:translate-x-[-2px]"
              )}
            >
              <IconArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              AI Co-Drawing
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
              Draw on the canvas and let AI transform and enhance your artwork with intelligent suggestions.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 pb-16">
            {/* Canvas Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-neutral-900 border border-neutral-800",
                "shadow-xl",
                "p-6"
              )}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Canvas</h2>
                <p className="text-sm text-neutral-400">
                  Draw your ideas and watch AI bring them to life
                </p>
              </div>
              
              <div className={cn(
                "relative bg-white rounded-xl overflow-hidden",
                "shadow-inner border border-neutral-200"
              )}>
                <canvas
                  ref={canvasRef}
                  width={960}
                  height={540}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] cursor-crosshair touch-none"
                />
              </div>
            </motion.div>

            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Drawing Tools Card */}
              <div className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-neutral-900 border border-neutral-800",
                "shadow-lg p-6"
              )}>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Drawing Tools
                </h3>
                
                <div className="space-y-6">
                  {/* Brush Size */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-neutral-300">
                      Brush Size
                      <span className="ml-2 px-2 py-0.5 bg-neutral-800 rounded text-xs font-mono">
                        {brushSize}px
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className={cn(
                        "w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider",
                        "focus:outline-none focus:ring-2 focus:ring-white/20"
                      )}
                    />
                  </div>
                  
                  {/* Pen Color */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-neutral-300">
                      Pen Color
                    </label>
                    <button
                      onClick={openColorPicker}
                      className={cn(
                        "w-full h-12 rounded-lg border-2 border-neutral-700",
                        "hover:border-neutral-600 transition-colors duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-white/20",
                        "relative overflow-hidden"
                      )}
                      style={{ backgroundColor: penColor }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
                    </button>
                    <input
                      ref={colorInputRef}
                      type="color"
                      value={penColor}
                      onChange={handleColorChange}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Clear Button */}
                  <button
                    onClick={clearCanvas}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg font-medium",
                      "border border-neutral-700 text-neutral-300",
                      "hover:bg-neutral-800 hover:text-white hover:border-neutral-600",
                      "active:scale-[0.98]",
                      "transition-all duration-200",
                      "flex items-center justify-center gap-2"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Canvas
                  </button>
                </div>
              </div>

              {/* AI Enhancement Card */}
              <div className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-gradient-to-br from-neutral-900 to-neutral-900/80",
                "border border-neutral-800",
                "shadow-lg p-6"
              )}>
                <h3 className="text-lg font-semibold text-white mb-6">
                  AI Enhancement
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-neutral-300">
                      Enhancement Prompt
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe how you want to enhance your drawing..."
                      className={cn(
                        "w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg",
                        "text-white text-sm resize-none",
                        "placeholder:text-neutral-500",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600",
                        "transition-all duration-200"
                      )}
                      rows={4}
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg font-medium",
                      "bg-white text-black",
                      "hover:bg-neutral-100 active:scale-[0.98]",
                      "disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed",
                      "transition-all duration-200",
                      "flex items-center justify-center gap-2",
                      "shadow-lg hover:shadow-xl"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <SendHorizontal className="w-4 h-4" />
                        Enhance Drawing
                      </>
                    )}
                  </button>
                </div>
              </div>


            </motion.div>
          </div>
        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl",
                "max-w-md w-full p-6"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Generation Failed
                </h3>
                <button
                  onClick={closeErrorModal}
                  className={cn(
                    "text-neutral-400 hover:text-white transition-colors duration-200",
                    "p-1 rounded-lg hover:bg-neutral-800"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                {parseError(errorMessage)}
              </p>
              <button
                onClick={closeErrorModal}
                className={cn(
                  "w-full px-4 py-3 bg-white text-black rounded-lg font-medium",
                  "hover:bg-neutral-100 active:scale-[0.98]",
                  "transition-all duration-200"
                )}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
} 