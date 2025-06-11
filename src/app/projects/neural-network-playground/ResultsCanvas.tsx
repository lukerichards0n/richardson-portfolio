"use client";

import { useEffect, useRef } from "react";
import { NeuralNetwork, Problems } from "./NeuralNetwork";

interface ResultsCanvasProps {
  network: NeuralNetwork | null;
  problemType: string;
  className?: string;
  onCanvasClick?: (x: number, y: number) => void;
}

export default function ResultsCanvas({ 
  network, 
  problemType, 
  className,
  onCanvasClick 
}: ResultsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !network) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Get the actual size of the canvas
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set the actual dimensions
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the drawing context
      ctx.scale(dpr, dpr);
      
      // Clear the canvas
      ctx.fillStyle = '#0a0a0a'; // neutral-950
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Calculate the scale and offset
      const margin = 20;
      const size = Math.min(rect.width, rect.height) - (margin * 2);
      const offsetX = (rect.width - size) / 2;
      const offsetY = (rect.height - size) / 2;
      
      // Draw the decision boundary
      const resolution = 50;
      const step = size / resolution;
      
      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const x = (i / resolution) * 2 - 1;
          const y = (j / resolution) * 2 - 1;
          
          const output = network.forward([x, y], 'tanh').activations.slice(-1)[0][0];
          
          if (output > 0.5) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          } else {
            ctx.fillStyle = 'rgba(115, 115, 115, 0.2)';
          }
          
          ctx.fillRect(
            offsetX + i * step,
            offsetY + j * step,
            step + 1,
            step + 1
          );
        }
      }
      
      // Draw the training data
      const problem = Problems[problemType as keyof typeof Problems];
      if (!problem) return;
      
      const trainingData = problem.generateData();
      
      trainingData.forEach(({input, target}) => {
        const [x, y] = input;
        const screenX = offsetX + ((x + 1) / 2) * size;
        const screenY = offsetY + ((y + 1) / 2) * size;
        
        // Draw point glow
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, 8);
        if (target[0]) {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(115, 115, 115, 0.3)');
          gradient.addColorStop(1, 'rgba(115, 115, 115, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw point
        ctx.beginPath();
        ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
        ctx.fillStyle = target[0] ? '#ffffff' : '#737373';
        ctx.strokeStyle = target[0] ? '#737373' : '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
      });
      
      // Draw legend in top-right corner
      ctx.fillStyle = '#737373';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      
      // Class 1 legend
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(rect.width - 120, 20, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#737373';
      ctx.fillText('Class 1 (Output > 0.5)', rect.width - 20, 24);
      
      // Class 0 legend
      ctx.fillStyle = '#737373';
      ctx.beginPath();
      ctx.arc(rect.width - 120, 40, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Class 0 (Output ≤ 0.5)', rect.width - 20, 44);
    };

    const animate = () => {
      render();
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [network, problemType]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onCanvasClick) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    onCanvasClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onClick={handleClick}
      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
    />
  );
} 