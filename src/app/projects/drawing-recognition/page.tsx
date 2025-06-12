"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { LoaderCircle, SendHorizontal, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Content, GoogleGenAI, Modality } from "@google/genai";

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
  // Add slider styles to match neural network playground
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
    }
    .slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      border: none;
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
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
            >
              <IconArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI Co-Drawing
            </h1>
            <p className="text-lg text-neutral-300">
              Draw on the canvas and let AI transform and enhance your artwork.
            </p>
          </motion.div>

                  {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          {/* Canvas Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Canvas</h2>
            <div className="relative bg-neutral-950 rounded-xl overflow-hidden">
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
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-white cursor-crosshair touch-none"
              />
            </div>
          </motion.div>

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-6"
          >
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              
              {/* Drawing Tools */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Drawing Tools</h3>
                
                {/* Brush Size */}
                <div className="setting">
                  <label className="block text-sm text-neutral-300 mb-2">
                    Brush Size: <span className="font-semibold">{brushSize}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Pen Color */}
                <div className="setting">
                  <label className="block text-sm text-neutral-300 mb-2">Pen Color</label>
                  <button
                    style={{ backgroundColor: penColor }}
                    onClick={openColorPicker}
                    className="w-full h-8 rounded-lg border border-neutral-700 cursor-pointer"
                  />
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={penColor}
                    onChange={handleColorChange}
                    className="hidden"
                  />
                </div>
                
                <div className="setting">
                  <button
                    onClick={clearCanvas}
                    className="w-full px-4 py-2 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Canvas
                  </button>
                </div>
              </div>

              {/* AI Generation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">AI Enhancement</h3>
                <div className="setting">
                  <label className="block text-sm text-neutral-300 mb-2">
                    Enhancement Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe how you want to enhance your drawing..."
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm resize-none focus:outline-none focus:border-neutral-600 transition-colors"
                    rows={3}
                  />
                </div>
                <div className="setting">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              {/* Generated Image Preview */}
            
            </motion.div>
          </div>
        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Generation Failed
                </h3>
                <button
                  onClick={closeErrorModal}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="font-medium text-neutral-300">
                {parseError(errorMessage)}
              </p>
              <div className="mt-4">
                <button
                  onClick={closeErrorModal}
                  className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 