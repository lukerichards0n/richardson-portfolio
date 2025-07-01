"use client";

import { useEffect, useRef } from "react";
import { NeuralNetwork, Problems } from "./NeuralNetwork";

interface HandwritingResultsCanvasProps {
  network: NeuralNetwork | null;
  className?: string;
}

export default function HandwritingResultsCanvas({ 
  network, 
  className
}: HandwritingResultsCanvasProps) {
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
      
      // Get training data
      const trainingData = Problems.handwriting.generateData();
      
      // Calculate grid layout
      const samplesPerClass = 5; // Show 5 examples per digit
      const digitSize = 40;
      const margin = 20;
      const spacing = 10;
      
      const totalWidth = samplesPerClass * (digitSize + spacing) - spacing;
      const totalHeight = 3 * (digitSize + spacing + 30) - spacing; // 3 digits + labels
      
      const startX = (rect.width - totalWidth) / 2;
      const startY = (rect.height - totalHeight) / 2;
      
      // Draw examples for each digit
      for (let digit = 0; digit < 3; digit++) {
        const digitData = trainingData.filter(data => data.target[digit] === 1);
        
        // Draw digit label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        const labelY = startY + digit * (digitSize + spacing + 30);
        ctx.fillText(`Digit ${digit + 1}`, startX - 40, labelY + digitSize / 2);
        
        // Draw sample images
        for (let sample = 0; sample < Math.min(samplesPerClass, digitData.length); sample++) {
          const data = digitData[sample];
          const x = startX + sample * (digitSize + spacing);
          const y = labelY;
          
          // Draw the digit image
          for (let py = 0; py < 28; py++) {
            for (let px = 0; px < 28; px++) {
              const pixelValue = data.input[py * 28 + px];
              if (pixelValue > 0.1) {
                ctx.fillStyle = `rgba(255, 255, 255, ${pixelValue})`;
                const drawX = x + (px / 28) * digitSize;
                const drawY = y + (py / 28) * digitSize;
                const pixelSize = digitSize / 28;
                ctx.fillRect(drawX, drawY, pixelSize + 1, pixelSize + 1);
              }
            }
          }
          
          // Get network prediction for this sample
          const output = network.forward(data.input, 'tanh').activations.slice(-1)[0];
          const predictedClass = output.indexOf(Math.max(...output));
          const confidence = Math.max(...output);
          
          // Draw prediction result
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          
          if (predictedClass === digit) {
            ctx.fillStyle = '#22c55e'; // green for correct
            ctx.fillText('✓', x + digitSize / 2, y + digitSize + 15);
          } else {
            ctx.fillStyle = '#ef4444'; // red for incorrect
            ctx.fillText('✗', x + digitSize / 2, y + digitSize + 15);
          }
          
          // Draw confidence
          ctx.fillStyle = '#737373';
          ctx.fillText(`${(confidence * 100).toFixed(0)}%`, x + digitSize / 2, y + digitSize + 25);
          
          // Draw border
          ctx.strokeStyle = predictedClass === digit ? '#22c55e' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(x - 1, y - 1, digitSize + 2, digitSize + 2);
        }
      }
      
      // Draw legend
      ctx.fillStyle = '#737373';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      
      const legendY = rect.height - 60;
      
      // Correct prediction legend
      ctx.fillStyle = '#22c55e';
      ctx.fillText('✓', 20, legendY);
      ctx.fillStyle = '#737373';
      ctx.fillText('Correct Prediction', 35, legendY);
      
      // Incorrect prediction legend
      ctx.fillStyle = '#ef4444';
      ctx.fillText('✗', 20, legendY + 20);
      ctx.fillStyle = '#737373';
      ctx.fillText('Incorrect Prediction', 35, legendY + 20);
      
      // Show overall accuracy
      let correct = 0;
      let total = 0;
      
      trainingData.forEach(data => {
        const output = network.forward(data.input, 'tanh').activations.slice(-1)[0];
        const predictedClass = output.indexOf(Math.max(...output));
        const actualClass = data.target.indexOf(Math.max(...data.target));
        
        if (predictedClass === actualClass) correct++;
        total++;
      });
      
      const accuracy = (correct / total * 100).toFixed(1);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Training Accuracy: ${accuracy}%`, rect.width - 20, 30);
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