"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function NeuralNetworkDocs() {
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
            href="/projects/neural-network-playground"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to Neural Network Playground
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Building an Interactive Neural Network Playground
          </h1>
          <p className="text-xl text-neutral-300">
            How I built a real-time neural network visualization with handwriting recognition, 
            and the mathematical insights that emerged along the way
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
            <li><a href="#the-motivation" className="hover:text-white transition-colors">1. The Motivation</a></li>
            <li><a href="#mathematical-foundation" className="hover:text-white transition-colors">2. Mathematical Foundation</a></li>
            <li><a href="#classic-problems" className="hover:text-white transition-colors">3. Classic Problems: Circles and Spirals</a></li>
            <li><a href="#handwriting-recognition" className="hover:text-white transition-colors">4. Adding Handwriting Recognition</a></li>
            <li><a href="#real-time-visualization" className="hover:text-white transition-colors">5. Real-time Visualization Challenges</a></li>
            <li><a href="#implementation-insights" className="hover:text-white transition-colors">6. Implementation Insights</a></li>
            <li><a href="#lessons-learned" className="hover:text-white transition-colors">7. Lessons Learned</a></li>
          </ul>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* The Motivation */}
          <motion.section
            id="the-motivation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">1. The Motivation</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                I wanted to build something that would make neural networks intuitive rather than just 
                mathematically correct. Most explanations focus on equations without showing how networks 
                actually learn and adapt in practice.
              </p>
              
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">The Core Insight</h4>
                <p className="text-neutral-300">
                  Neural networks are dynamic systems that evolve and adapt. Seeing a network learn to 
                  distinguish between a circle and spiral, or recognize handwritten digits, demonstrates 
                  how complex behavior emerges from simple computational rules.
                </p>
              </div>

              <p className="text-neutral-300">
                This playground started with two classic problems that demonstrate non-linear classification. 
                As I built it, I realized I needed a more direct connection between human input and machine 
                learning. That&apos;s when I added handwriting recognition.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Why These Problems Matter</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Circle Classification:</strong> The simplest non-linear boundary, showing why we need hidden layers</li>
                <li><strong>Spiral Classification:</strong> A problem requiring complex, intertwined decision boundaries</li>
                <li><strong>Handwriting Recognition:</strong> Direct interaction between human input and machine learning</li>
              </ul>
            </div>
          </motion.section>

          {/* Mathematical Foundation */}
          <motion.section
            id="mathematical-foundation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">2. Mathematical Foundation</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                The mathematics behind neural networks is straightforward. At its core, we&apos;re doing 
                repeated matrix multiplications with non-linear transformations. The complexity emerges 
                from how these simple operations combine.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Forward Pass</h3>
              <p className="text-neutral-300 mb-4">
                Each layer transforms its input through a simple formula. For layer <InlineMath math="l" />:
              </p>
              
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-6">
                <BlockMath math="a^{(l)} = f(W^{(l)} \cdot a^{(l-1)} + b^{(l)})" />
              </div>
              
              <p className="text-neutral-300 mb-4">
                This simple operation, repeated across layers, can approximate any continuous function. 
                The activation function <InlineMath math="f" /> is crucial. Without it, we&apos;d just 
                have a linear transformation, regardless of how many layers we stack.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Activation Functions</h3>
              <p className="text-neutral-300 mb-4">
                I implemented three activation functions, each with different characteristics:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <h4 className="text-white font-semibold mb-2">Sigmoid</h4>
                  <BlockMath math="\sigma(x) = \frac{1}{1 + e^{-x}}" />
                  <p className="text-neutral-400 text-sm mt-2">
                    Smooth, bounded, but suffers from vanishing gradients. Great for understanding, 
                    less great for deep networks.
                  </p>
                </div>
                
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <h4 className="text-white font-semibold mb-2">Tanh</h4>
                  <BlockMath math="\tanh(x) = \frac{e^{x} - e^{-x}}{e^{x} + e^{-x}}" />
                  <p className="text-neutral-400 text-sm mt-2">
                    Zero-centered, which helps with convergence. My go-to choice for these problems.
                  </p>
                </div>
                
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
                  <h4 className="text-white font-semibold mb-2">ReLU</h4>
                  <BlockMath math="ReLU(x) = \max(0, x)" />
                  <p className="text-neutral-400 text-sm mt-2">
                    Simple, fast, and surprisingly effective. The workhorse of modern deep learning.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Backpropagation</h3>
              <p className="text-neutral-300 mb-4">
                Backpropagation is the chain rule applied systematically. The network learns by 
                computing how each weight contributes to the final error and adjusting accordingly.
              </p>
              
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-6">
                <BlockMath math="\frac{\partial L}{\partial W^{(l)}} = \frac{\partial L}{\partial a^{(l)}} \cdot \frac{\partial a^{(l)}}{\partial z^{(l)}} \cdot \frac{\partial z^{(l)}}{\partial W^{(l)}}" />
              </div>
              
              <p className="text-neutral-300">
                Each weight learns by computing how its change affects the final error. The error 
                signal propagates backward through the network, telling each parameter how to improve.
              </p>
            </div>
          </motion.section>

          {/* Classic Problems */}
          <motion.section
            id="classic-problems"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">3. Classic Problems: Circles and Spirals</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                I started with two problems that demonstrate why neural networks are necessary. 
                Linear classifiers fail on these, but neural networks can learn the complex decision boundaries.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Circle Problem</h3>
              <p className="text-neutral-300 mb-6">
                The circle problem is simple: classify points as inside or outside a circle. 
                This requires a curved decision boundary, which is impossible with linear models.
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Problems.ts - Circle Classification"
                highlightLines={[4, 5]}
                code={`circle: {
  generateData(): TrainingData[] {
    const data: TrainingData[] = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 2 - 1;  // Random point in [-1, 1]
      const y = Math.random() * 2 - 1;
      // The magic: classify based on distance from origin
      const target = x * x + y * y < 0.5 ? [1] : [0];
      data.push({ input: [x, y], target });
    }
    return data;
  }
}`}
              />

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">Why This Is Hard</h4>
                <p className="text-neutral-300">
                  A linear classifier can only draw straight lines. But the optimal decision boundary 
                  for this problem is a circle—a fundamentally curved shape. The network needs to learn 
                  that the relationship <InlineMath math="x^2 + y^2 < 0.5" /> defines the boundary.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Spiral Problem</h3>
              <p className="text-neutral-300 mb-6">
                The spiral problem is more challenging. Two spirals wind around each other, 
                creating a complex decision boundary that requires multiple hidden layers to learn.
              </p>
              
              <CodeBlock
                language="typescript"
                filename="Problems.ts - Spiral Classification"
                highlightLines={[7, 8, 9]}
                code={`spiral: {
  generateData(): TrainingData[] {
    const data: TrainingData[] = [];
    const n = 100;
    const maxRadius = 1;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 2; j++) {  // Two spirals
        const r = (i / n) * maxRadius;
        const theta = (i / n) * 4 * Math.PI + j * Math.PI;  // Offset by π
        
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        
        data.push({
          input: [x, y],
          target: [j]  // Spiral 0 or Spiral 1
        });
      }
    }
    return data;
  }
}`}
              />

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">Why This Is Difficult</h4>
                <p className="text-neutral-300">
                  The two classes are completely intertwined. There&apos;s no simple geometric shape 
                  that can separate them. The network must learn to recognize the spiral pattern itself, 
                  which requires sophisticated pattern recognition.
                </p>
              </div>

              <p className="text-neutral-300">
                Training on these problems shows how the decision boundary evolves from random noise 
                to the correct shape, sometimes oscillating before converging to the right pattern.
              </p>

            </div>
          </motion.section>

          {/* Handwriting Recognition */}
          <motion.section
            id="handwriting-recognition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">4. Adding Handwriting Recognition</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                The circle and spiral problems were useful for demonstrating concepts, but I wanted 
                something more interactive that would connect the mathematics to direct human input. 
                That&apos;s when I decided to add handwriting recognition.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">From 2D to 784D</h3>
              <p className="text-neutral-300 mb-6">
                Moving from 2-input problems to handwriting meant jumping from 2 dimensions to 784 
                (28×28 pixels). This is a qualitative change that brings new challenges like the 
                curse of dimensionality and much larger parameter spaces.
              </p>
              
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">The Architecture Decision</h4>
                <p className="text-neutral-300 mb-4">
                  For handwriting, I needed a network that could handle 784 inputs and output 3 classes 
                  (digits 1, 2, and 3). After experimentation, I settled on:
                </p>
                <ul className="text-neutral-300 space-y-1">
                  <li>• <strong>Input layer:</strong> 784 neurons (28×28 pixels)</li>
                  <li>• <strong>Hidden layers:</strong> 3 layers of 16 neurons each</li>
                  <li>• <strong>Output layer:</strong> 3 neurons (one per digit)</li>
                  <li>• <strong>Activation:</strong> Tanh for hidden layers, raw outputs for classification</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Interactive Canvas</h3>
              <p className="text-neutral-300 mb-6">
                Building the drawing canvas required capturing mouse and touch events, converting them 
                to a 28×28 pixel grid, and providing real-time feedback. I added anti-aliasing to make 
                the drawings look more natural and improve recognition accuracy.
              </p>

              <CodeBlock
                language="typescript"
                filename="HandwritingCanvas.tsx - Drawing Logic"
                highlightLines={[8, 9, 15]}
                code={`const drawPixel = (x: number, y: number, intensity: number = 1.0) => {
  const newPixels = [...pixels];
  const index = y * 28 + x;
  
  // Set the main pixel
  newPixels[index] = Math.min(1.0, newPixels[index] + intensity);
  
  // Add anti-aliasing to neighboring pixels
  const neighbors = [
    { dx: -1, dy: 0, factor: 0.3 },
    { dx: 1, dy: 0, factor: 0.3 },
    { dx: 0, dy: -1, factor: 0.3 },
    { dx: 0, dy: 1, factor: 0.3 },
    // Diagonal neighbors with less influence
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
}`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Real-time Prediction</h3>
              <p className="text-neutral-300 mb-6">
                The network predicts what you&apos;re drawing in real-time. Every stroke updates the 
                prediction, creating immediate feedback between human input and the machine learning model.
              </p>

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">The Training Data Challenge</h4>
                <p className="text-neutral-300">
                  I started with synthetic training data, but quickly realized that real handwriting 
                  is much more varied and messy. So I built a data collection system that lets users 
                  draw their own digits and contribute to the training set. The network learns from 
                  actual human handwriting, not idealized examples.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Real-time Visualization */}
          <motion.section
            id="real-time-visualization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">5. Real-time Visualization Challenges</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                Making neural network training visual and interactive presented unique challenges. 
                I needed to balance educational value with performance, creating something that was 
                both informative and smooth to interact with.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Performance Challenge</h3>
              <p className="text-neutral-300 mb-6">
                Running neural network training in the browser while maintaining 60fps visualization 
                required careful optimization. Every training step needs to update multiple canvases, 
                recalculate decision boundaries, and maintain responsive user interaction.
              </p>
              
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">The Animation Loop Strategy</h4>
                <p className="text-neutral-300">
                  I use <code>requestAnimationFrame</code> to create a smooth training loop. Each frame 
                  performs one training step, updates the visualizations, and schedules the next frame. 
                  This creates the illusion of continuous learning while keeping the browser responsive.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Canvas Rendering Optimization</h3>
              <p className="text-neutral-300 mb-6">
                Each visualization component uses HTML5 Canvas with careful attention to performance. 
                The key insight was to handle device pixel ratio properly and minimize unnecessary redraws.
              </p>

              <CodeBlock
                language="typescript"
                filename="NetworkCanvas.tsx - Optimized Rendering"
                highlightLines={[3, 4, 8]}
                code={`const render = () => {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  // Set actual canvas size accounting for device pixel ratio
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  // Clear with background color
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, rect.width, rect.height);
  
  // Draw connections with weight-based opacity
  for (let i = 0; i < network.layers.length - 1; i++) {
    for (let j = 0; j < network.layers[i]; j++) {
      for (let k = 0; k < network.layers[i + 1]; k++) {
        const weight = network.weights[i][k][j];
        const opacity = Math.min(Math.abs(weight), 1);
        
        ctx.strokeStyle = weight > 0 
          ? \`rgba(255, 255, 255, \${opacity * 0.5})\`
          : \`rgba(115, 115, 115, \${opacity * 0.5})\`;
        ctx.lineWidth = Math.min(Math.abs(weight) * 3, 4);
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
};`}
              />

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">The Decision Boundary Challenge</h4>
                <p className="text-neutral-300">
                  For the 2D problems, I render the decision boundary by sampling the network&apos;s 
                  output across a grid of points. This creates a beautiful visualization of how the 
                  network &quot;sees&quot; the input space, but it&apos;s computationally expensive. 
                  I had to find the right balance between resolution and performance.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Implementation Insights */}
          <motion.section
            id="implementation-insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">6. Implementation Insights</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                Building this playground taught me several important lessons about neural networks, 
                web performance, and the intersection of education and technology.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">The Value of Immediate Feedback</h3>
              <p className="text-neutral-300 mb-6">
                Immediate feedback significantly improves learning. When you can see the network&apos;s 
                decision boundary evolving in real-time, or watch your handwriting being recognized 
                as you draw, abstract concepts become concrete and understandable.
              </p>

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">TypeScript for Neural Networks</h4>
                <p className="text-neutral-300">
                  Implementing neural networks in TypeScript was surprisingly pleasant. The type system 
                  caught many bugs early, especially around matrix dimensions and data flow. The 
                  performance was adequate for educational purposes, though I wouldn&apos;t recommend 
                  it for production ML workloads.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Hyperparameter Sensitivity</h3>
              <p className="text-neutral-300 mb-6">
                Making the hyperparameters adjustable revealed how sensitive neural networks can be. 
                A learning rate that&apos;s too high causes wild oscillations. Too few neurons and the 
                network can&apos;t learn complex patterns. Too many and it overfits quickly.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                  <h4 className="text-white font-semibold mb-3">What Worked Well</h4>
                  <ul className="text-neutral-300 space-y-2 text-sm">
                    <li>• Learning rates between 0.01-0.1</li>
                    <li>• 3-4 hidden layers for handwriting</li>
                    <li>• Tanh activation for most problems</li>
                    <li>• Real training data vs synthetic</li>
                    <li>• Visual feedback during training</li>
                  </ul>
                </div>
                
                <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
                  <h4 className="text-white font-semibold mb-3">Common Pitfalls</h4>
                  <ul className="text-neutral-300 space-y-2 text-sm">
                    <li>• Learning rates &gt; 0.5 (chaos)</li>
                    <li>• Too few neurons (underfitting)</li>
                    <li>• Sigmoid in deep networks (vanishing gradients)</li>
                    <li>• Ignoring data preprocessing</li>
                    <li>• Training without validation</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Browser Performance Considerations</h3>
              <p className="text-neutral-300 mb-6">
                Running neural networks in the browser taught me about the delicate balance between 
                educational value and performance. Some key insights:
              </p>

              <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-8">
                <li><strong>Batch size matters:</strong> Processing 100 samples per frame keeps things smooth</li>
                <li><strong>Canvas optimization:</strong> Device pixel ratio handling prevents blurry visuals</li>
                <li><strong>Memory management:</strong> Proper cleanup of animation frames prevents leaks</li>
                <li><strong>State synchronization:</strong> React state updates need careful timing with canvas renders</li>
              </ul>
            </div>
          </motion.section>

          {/* Lessons Learned */}
          <motion.section
            id="lessons-learned"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">7. Lessons Learned</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                Building this neural network playground was both a technical challenge and a journey 
                of discovery. Here are the key insights that emerged from the process.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Interactive Learning</h3>
              <p className="text-neutral-300 mb-6">
                Interactive learning is more effective than passive reading. Seeing a decision boundary 
                evolve, or watching your handwriting get recognized in real-time, creates intuitive 
                understanding that equations alone cannot provide.
              </p>

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">Understanding Through Experience</h4>
                <p className="text-neutral-300">
                  When someone sees the spiral decision boundary form, or watches their handwritten 
                  digit get correctly classified, neural networks stop being mysterious black boxes 
                  and become understandable tools.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Technical Insights</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6">
                <li><strong>Visualization is expensive:</strong> Real-time neural network visualization requires careful performance optimization</li>
                <li><strong>Data quality matters more than quantity:</strong> 50 good handwriting samples beat 500 synthetic ones</li>
                <li><strong>Hyperparameters are sensitive:</strong> Small changes can mean the difference between learning and chaos</li>
                <li><strong>User experience drives learning:</strong> Smooth interactions are crucial for maintaining engagement</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Future Improvements</h3>
              <p className="text-neutral-300 mb-6">
                If I were to rebuild this, I&apos;d consider using WebGL for better performance, 
                implement more sophisticated data augmentation, and add support for convolutional 
                layers. The core insight that immediate visual feedback improves learning would 
                remain central to the design.
              </p>

              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 my-8">
                <h4 className="text-white font-semibold mb-3">Key Takeaway</h4>
                <p className="text-neutral-300">
                  The best educational tools let you experience concepts rather than just explaining them. 
                  Neural networks are about pattern recognition and learning from data. Making that process 
                  visible and interactive builds intuition that goes beyond memorizing formulas.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 mb-8"
        >
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Try It Yourself?</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Experience the neural network playground firsthand. Train networks on different problems, 
              draw your own digits, and watch the learning process unfold in real-time.
            </p>
            <Link
              href="/projects/neural-network-playground"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Launch Neural Network Playground
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8 mb-8 text-center"
        >
          <p className="text-neutral-400">
            Building this neural network playground was a journey of discovery, both technical and educational. 
            The intersection of mathematics, visualization, and human interaction continues to be an interesting 
            area to explore, and I hope this documentation provides useful insights.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 