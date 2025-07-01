"use client";

import { useEffect, useRef, useState } from "react";
import { NeuralNetwork } from "./NeuralNetwork";

interface HandwritingCanvasProps {
  network: NeuralNetwork | null;
  className?: string;
  onDigitDrawn?: (pixels: number[], prediction?: number[]) => void;
  onTrainingSample?: (pixels: number[], label: number) => void;
}

export default function HandwritingCanvas({ 
  network, 
  className,
  onDigitDrawn,
  onTrainingSample 
}: HandwritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixels, setPixels] = useState<number[]>(new Array(784).fill(0));
  const [prediction, setPrediction] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = 280 * dpr; // 28x28 grid scaled up 10x
    canvas.height = 280 * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 280, 280);
    
    // Draw grid lines (optional, for debugging)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 28; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 10, 0);
      ctx.lineTo(i * 10, 280);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * 10);
      ctx.lineTo(280, i * 10);
      ctx.stroke();
    }
    
    // Draw pixels
    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        const pixelValue = pixels[y * 28 + x];
        if (pixelValue > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${pixelValue})`;
          ctx.fillRect(x * 10, y * 10, 10, 10);
        }
      }
    }
  }, [pixels]);

  const getPixelCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / rect.width * 28);
    const y = Math.floor((clientY - rect.top) / rect.height * 28);
    
    if (x >= 0 && x < 28 && y >= 0 && y < 28) {
      return { x, y };
    }
    return null;
  };

  const drawPixel = (x: number, y: number, intensity: number = 1.0) => {
    const newPixels = [...pixels];
    const index = y * 28 + x;
    
    // Set the main pixel
    newPixels[index] = Math.min(1.0, newPixels[index] + intensity);
    
    // Add some anti-aliasing to neighboring pixels
    const neighbors = [
      { dx: -1, dy: 0, factor: 0.3 },
      { dx: 1, dy: 0, factor: 0.3 },
      { dx: 0, dy: -1, factor: 0.3 },
      { dx: 0, dy: 1, factor: 0.3 },
      { dx: -1, dy: -1, factor: 0.1 },
      { dx: 1, dy: -1, factor: 0.1 },
      { dx: -1, dy: 1, factor: 0.1 },
      { dx: 1, dy: 1, factor: 0.1 },
    ];
    
    neighbors.forEach(({ dx, dy, factor }) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 28 && ny >= 0 && ny < 28) {
        const nIndex = ny * 28 + nx;
        newPixels[nIndex] = Math.min(1.0, newPixels[nIndex] + intensity * factor);
      }
    });
    
    setPixels(newPixels);
    
    // Get prediction if network is available
    if (network) {
      const output = network.forward(newPixels, 'tanh').activations.slice(-1)[0];
      setPrediction(output);
      onDigitDrawn?.(newPixels, output);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const coords = getPixelCoordinates(e.clientX, e.clientY);
    if (coords) {
      drawPixel(coords.x, coords.y, 0.8);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const coords = getPixelCoordinates(e.clientX, e.clientY);
    if (coords) {
      drawPixel(coords.x, coords.y, 0.6);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const touch = e.touches[0];
    const coords = getPixelCoordinates(touch.clientX, touch.clientY);
    if (coords) {
      drawPixel(coords.x, coords.y, 0.8);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    const coords = getPixelCoordinates(touch.clientX, touch.clientY);
    if (coords) {
      drawPixel(coords.x, coords.y, 0.6);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPixels(new Array(784).fill(0));
    setPrediction([0, 0, 0]);
  };

  const addTrainingSample = (label: number) => {
    if (onTrainingSample && pixels.some(p => p > 0)) {
      onTrainingSample(pixels, label);
      clearCanvas();
    }
  };


  const maxPrediction = Math.max(...prediction);
  const predictedDigit = prediction.indexOf(maxPrediction) + 1;

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Draw a digit (1, 2, or 3)</h3>
          <button
            onClick={clearCanvas}
            className="px-4 py-2 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            Clear
          </button>
        </div>
        
        {/* Training buttons */}
        <div className="flex gap-2 justify-center flex-wrap">
          <span className="text-sm text-neutral-400 w-full text-center mb-2">Add as training data:</span>
          <button
            onClick={() => addTrainingSample(1)}
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pixels.some(p => p > 0)}
          >
            Label as 1
          </button>
          <button
            onClick={() => addTrainingSample(2)}
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pixels.some(p => p > 0)}
          >
            Label as 2
          </button>
          <button
            onClick={() => addTrainingSample(3)}
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!pixels.some(p => p > 0)}
          >
            Label as 3
          </button>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-neutral-700 rounded-lg cursor-crosshair bg-neutral-950"
            style={{ width: '280px', height: '280px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
        
        {network && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-300">Prediction:</h4>
            <div className="space-y-1">
              {prediction.map((prob, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400 w-8">
                    {index + 1}:
                  </span>
                  <div className="flex-1 bg-neutral-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-200 ${
                        index === predictedDigit - 1 ? 'bg-white' : 'bg-neutral-600'
                      }`}
                      style={{ width: `${Math.max(0, prob * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 w-12">
                    {(prob * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center pt-2">
              <span className="text-lg font-bold text-white">
                Predicted: {predictedDigit} 
                <span className="text-sm text-neutral-400 ml-2">
                  ({(maxPrediction * 100).toFixed(1)}% confidence)
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}