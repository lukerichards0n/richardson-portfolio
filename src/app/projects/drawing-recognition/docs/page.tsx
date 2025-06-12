"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";

export default function DrawingRecognitionDocs() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/projects/drawing-recognition"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to AI Co-Drawing
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-neutral-300">
            A comprehensive guide to AI-powered collaborative drawing and the implementation behind this interactive tool
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Table of Contents</h2>
          <ul className="space-y-2 text-neutral-300">
            <li><a href="#overview" className="hover:text-white transition-colors">1. Project Overview</a></li>
            <li><a href="#ai-integration" className="hover:text-white transition-colors">2. AI Integration</a></li>
            <li><a href="#canvas-system" className="hover:text-white transition-colors">3. Canvas Drawing System</a></li>
            <li><a href="#implementation" className="hover:text-white transition-colors">4. Implementation Details</a></li>
            <li><a href="#user-interface" className="hover:text-white transition-colors">5. User Interface</a></li>
            <li><a href="#api-integration" className="hover:text-white transition-colors">6. API Integration</a></li>
          </ul>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Project Overview */}
          <motion.section
            id="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">1. Project Overview</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                The AI Co-Drawing application is an interactive collaborative drawing tool that combines human creativity 
                with artificial intelligence. Built with React and powered by Google&apos;s Gemini 2.0 Flash model, it allows 
                users to create drawings and have them enhanced, transformed, or evolved through AI assistance.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Core Features</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Interactive Canvas:</strong> High-resolution drawing surface with touch and mouse support</li>
                <li><strong>AI Enhancement:</strong> Transform drawings using natural language prompts</li>
                <li><strong>Iterative Creation:</strong> Build upon AI-generated images with additional drawing</li>
                <li><strong>Real-time Processing:</strong> Live drawing with immediate visual feedback</li>
                <li><strong>Multi-modal AI:</strong> Combines image understanding with text generation capabilities</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Workflow</h3>
              <ol className="list-decimal list-inside text-neutral-300 space-y-2">
                <li>User draws on the canvas using customizable brush tools</li>
                <li>User provides a text prompt describing desired enhancements</li>
                <li>AI analyzes the drawing and prompt to generate an enhanced version</li>
                <li>Generated image becomes the new canvas background</li>
                <li>User can continue drawing on top of the AI-generated content</li>
                <li>Process repeats for iterative collaborative creation</li>
              </ol>
            </div>
          </motion.section>

          {/* AI Integration */}
          <motion.section
            id="ai-integration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">2. AI Integration</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Gemini 2.0 Flash Model</h3>
              <p className="text-neutral-300 mb-6">
                The application uses Google&apos;s latest Gemini 2.0 Flash model with native image generation capabilities. 
                This model can understand both visual input (drawings) and textual instructions to create coherent, 
                contextual enhancements.
              </p>
              
              <div className="bg-neutral-900 rounded-lg p-6 my-6">
                <h4 className="text-white font-semibold mb-4">Model Configuration</h4>
                <ul className="text-neutral-300 space-y-2 text-sm">
                  <li><code>Model:</code> gemini-2.0-flash-preview-image-generation</li>
                  <li><code>Input Modalities:</code> Text + Image</li>
                  <li><code>Output Modalities:</code> Text + Image</li>
                  <li><code>Max Resolution:</code> 1024x1024 pixels</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Multi-modal Processing</h3>
              <p className="text-neutral-300 mb-6">
                The AI system processes two types of input simultaneously:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="AI Request Structure"
                highlightLines={[2, 7]}
                code={`let contents: Content[] = [
  {
    role: "USER",
    parts: [{ inlineData: { data: drawingData, mimeType: "image/png" } }],
  },
  {
    role: "USER", 
    parts: [{ text: \`\${prompt}. Keep the same minimal line doodle style.\` }],
  },
];

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-preview-image-generation",
  contents,
  config: {
    responseModalities: [Modality.TEXT, Modality.IMAGE],
  },
});`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Style Preservation</h3>
              <p className="text-neutral-300">
                To maintain visual consistency, the AI is instructed to &quot;keep the same minimal line doodle style&quot; 
                ensuring that enhancements feel like natural extensions of the original drawing rather than complete replacements.
              </p>
            </div>
          </motion.section>

          {/* Canvas System */}
          <motion.section
            id="canvas-system"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">3. Canvas Drawing System</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Canvas Architecture</h3>
              <p className="text-neutral-300 mb-6">
                The drawing system uses HTML5 Canvas with a multi-layer approach for optimal performance and functionality.
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Canvas Initialization"
                highlightLines={[6, 7, 10, 11]}
                code={`const initializeCanvas = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Set high-resolution canvas size
  canvas.width = 960;
  canvas.height = 540;

  // Fill canvas with white background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Coordinate System</h3>
              <p className="text-neutral-300 mb-6">
                The canvas uses a sophisticated coordinate mapping system to handle different screen sizes and device pixel ratios:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Coordinate Mapping"
                highlightLines={[5, 6, 8, 14, 15]}
                code={`const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
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
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Drawing Engine</h3>
              <p className="text-neutral-300 mb-6">
                The drawing engine supports smooth line rendering with configurable brush properties:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Drawing Implementation"
                highlightLines={[9, 10, 11]}
                code={`const draw = (e: React.MouseEvent | React.TouchEvent) => {
  if (!isDrawing) return;

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
};`}
              />
            </div>
          </motion.section>

          {/* Implementation Details */}
          <motion.section
            id="implementation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">4. Implementation Details</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">State Management</h3>
              <p className="text-neutral-300 mb-6">
                The application uses React hooks for comprehensive state management:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="State Structure"
                highlightLines={[2, 3, 5, 6]}
                code={`// Drawing State
const [isDrawing, setIsDrawing] = useState(false);
const [penColor, setPenColor] = useState("#000000");
const [brushSize, setBrushSize] = useState(5);

// AI Generation State
const [prompt, setPrompt] = useState("");
const [generatedImage, setGeneratedImage] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

// Error Handling
const [showErrorModal, setShowErrorModal] = useState(false);
const [errorMessage, setErrorMessage] = useState("");`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Background Image System</h3>
              <p className="text-neutral-300 mb-6">
                AI-generated images are seamlessly integrated as canvas backgrounds for iterative drawing:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Background Integration"
                highlightLines={[3, 4, 5, 12]}
                code={`useEffect(() => {
  if (generatedImage && canvasRef.current) {
    const img = new window.Image();
    img.onload = () => {
      backgroundImageRef.current = img;
      drawImageToCanvas();
    };
    img.src = generatedImage;
  }
}, [generatedImage]);

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
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Touch Support</h3>
              <p className="text-neutral-300 mb-6">
                Comprehensive touch support for mobile devices with gesture prevention:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Touch Event Handling"
                highlightLines={[2, 8, 9]}
                code={`useEffect(() => {
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
}, [isDrawing]);`}
              />
            </div>
          </motion.section>

          {/* User Interface */}
          <motion.section
            id="user-interface"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">5. User Interface</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Design System</h3>
              <p className="text-neutral-300 mb-6">
                The interface follows a consistent design system with dark theme and neutral colors:
              </p>
              
              <div className="bg-neutral-900 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-4">Color Palette</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-black rounded border border-neutral-700"></div>
                    <span className="text-neutral-300">Background: #000000</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-neutral-900 rounded border border-neutral-700"></div>
                    <span className="text-neutral-300">Cards: #171717</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-neutral-800 rounded border border-neutral-700"></div>
                    <span className="text-neutral-300">Controls: #262626</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-white rounded border border-neutral-700"></div>
                    <span className="text-neutral-300">Primary: #FFFFFF</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Component Structure</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Canvas Area:</strong> Primary drawing surface with full touch/mouse support</li>
                <li><strong>Settings Panel:</strong> Tool controls and AI configuration options</li>
                <li><strong>Drawing Tools:</strong> Brush size, color picker, and canvas management</li>
                <li><strong>AI Enhancement:</strong> Prompt input and generation controls</li>
                <li><strong>Error Modal:</strong> User-friendly error handling and display</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Responsive Design</h3>
              <p className="text-neutral-300 mb-6">
                The interface adapts to different screen sizes using Tailwind CSS breakpoints:
              </p>
              
              <CodeBlock
                language="tsx"
                filename="Responsive Layout"
                highlightLines={[2, 8]}
                code={`{/* Responsive grid layout */}
<div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
  {/* Canvas takes full width on mobile, left side on desktop */}
  <motion.div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
    <canvas 
      className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-white cursor-crosshair touch-none"
    />
  </motion.div>
  
  {/* Settings panel stacks below on mobile, right side on desktop */}
  <motion.div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
    {/* Settings content */}
  </motion.div>
</div>`}
              />
            </div>
          </motion.section>

          {/* API Integration */}
          <motion.section
            id="api-integration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">6. API Integration</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Environment Configuration</h3>
              <p className="text-neutral-300 mb-6">
                The application requires proper environment setup for API access:
              </p>
              
              <CodeBlock
                language="bash"
                filename=".env.local"
                code={`# Google Generative AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Error Handling</h3>
              <p className="text-neutral-300 mb-6">
                Comprehensive error handling with user-friendly feedback:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Error Management"
                highlightLines={[1, 10, 16]}
                code={`function parseError(error: string) {
  const regex = /{"error":(.*)}/gm;
  const m = regex.exec(error);
  try {
    const e = m ? m[1] : error;
    const err = JSON.parse(e);
    return err.message || error;
  } catch (e) {
    return error;
  }
}

// In the main component
} catch (error: any) {
  console.error("Error submitting drawing:", error);
  setErrorMessage(error.message || "An unexpected error occurred.");
  setShowErrorModal(true);
} finally {
  setIsLoading(false);
}`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Performance Considerations</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Image Compression:</strong> Canvas exports optimized PNG data for API transmission</li>
                <li><strong>Async Processing:</strong> Non-blocking AI generation with loading states</li>
                <li><strong>Memory Management:</strong> Proper cleanup of canvas contexts and event listeners</li>
                <li><strong>Error Recovery:</strong> Graceful handling of API failures with retry options</li>
                <li><strong>Client-side Rendering:</strong> All drawing operations run locally for immediate feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Security</h3>
              <p className="text-neutral-300">
                API keys are handled securely through environment variables with the <code>NEXT_PUBLIC_</code> prefix 
                for client-side access. The application includes input validation and sanitization to prevent 
                malicious prompts or canvas manipulations.
              </p>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 mb-8 text-center"
        >
          <p className="text-neutral-400">
            This documentation covers the technical implementation of the AI Co-Drawing application. 
            For questions about usage or to contribute improvements, explore the source code or reach out directly.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 