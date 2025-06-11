"use client";

import { useEffect, useRef } from "react";
import { NeuralNetwork } from "./NeuralNetwork";

interface NetworkCanvasProps {
  network: NeuralNetwork | null;
  className?: string;
}

export default function NetworkCanvas({ network, className }: NetworkCanvasProps) {
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
      
      const margin = 40;
      const layerSpacing = (rect.width - margin * 2) / Math.max(1, network.layers.length - 1);
      
      // Draw connections first
      for (let i = 0; i < network.layers.length - 1; i++) {
        const layer1X = margin + layerSpacing * i;
        const layer2X = margin + layerSpacing * (i + 1);
        
        for (let j = 0; j < network.layers[i]; j++) {
          const layer1Neurons = network.layers[i];
          const neuron1Y = layer1Neurons === 1 
            ? rect.height / 2 
            : margin + j * ((rect.height - margin * 2) / Math.max(1, layer1Neurons - 1));
          
          for (let k = 0; k < network.layers[i + 1]; k++) {
            const layer2Neurons = network.layers[i + 1];
            const neuron2Y = layer2Neurons === 1
              ? rect.height / 2
              : margin + k * ((rect.height - margin * 2) / Math.max(1, layer2Neurons - 1));
            
            const weight = network.weights[i][k][j];
            
            ctx.beginPath();
            const opacity = Math.min(Math.abs(weight), 1);
            if (weight > 0) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            } else {
              ctx.strokeStyle = `rgba(115, 115, 115, ${opacity * 0.5})`;
            }
            ctx.lineWidth = Math.min(Math.abs(weight) * 3, 4);
            ctx.moveTo(layer1X, neuron1Y);
            ctx.lineTo(layer2X, neuron2Y);
            ctx.stroke();
          }
        }
      }
      
      // Draw neurons
      for (let i = 0; i < network.layers.length; i++) {
        const layerX = margin + layerSpacing * i;
        const layerNeurons = network.layers[i];
        
        for (let j = 0; j < layerNeurons; j++) {
          const neuronY = layerNeurons === 1
            ? rect.height / 2
            : margin + j * ((rect.height - margin * 2) / Math.max(1, layerNeurons - 1));
          
          // Neuron glow
          const gradient = ctx.createRadialGradient(layerX, neuronY, 0, layerX, neuronY, 15);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(layerX, neuronY, 15, 0, Math.PI * 2);
          ctx.fill();
          
          // Neuron circle
          ctx.beginPath();
          ctx.arc(layerX, neuronY, 10, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = '#737373'; // neutral-500
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      
      // Draw labels
      ctx.fillStyle = '#737373';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      // Input layer label
      ctx.fillText('Input', margin, rect.height - 10);
      
      // Hidden layers label
      for (let i = 1; i < network.layers.length - 1; i++) {
        const x = margin + layerSpacing * i;
        ctx.fillText(`Hidden ${i}`, x, rect.height - 10);
      }
      
      // Output layer label
      const outputX = margin + layerSpacing * Math.max(0, network.layers.length - 1);
      ctx.fillText('Output', outputX, rect.height - 10);
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
  }, [network]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
} 