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
            Documentation
          </h1>
          <p className="text-xl text-neutral-300">
            A comprehensive guide to neural networks and the implementation behind this interactive playground
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
            <li><a href="#neural-networks-overview" className="hover:text-white transition-colors">1. Neural Networks Overview</a></li>
            <li><a href="#mathematical-foundation" className="hover:text-white transition-colors">2. Mathematical Foundation</a></li>
            <li><a href="#implementation-details" className="hover:text-white transition-colors">3. Implementation Details</a></li>
            <li><a href="#architecture" className="hover:text-white transition-colors">4. Project Architecture</a></li>
            <li><a href="#visualization" className="hover:text-white transition-colors">5. Visualization Components</a></li>
            <li><a href="#training-process" className="hover:text-white transition-colors">6. Training Process</a></li>
          </ul>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Neural Networks Overview */}
          <motion.section
            id="neural-networks-overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">1. Neural Networks Overview</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                Neural networks are computational models inspired by the human brain&apos;s structure and function. 
                They consist of interconnected nodes (neurons) organized in layers that process information 
                through weighted connections and activation functions.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Core Components</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Neurons:</strong> Basic processing units that receive inputs, apply weights, and produce outputs</li>
                <li><strong>Layers:</strong> Groups of neurons - input, hidden, and output layers</li>
                <li><strong>Weights:</strong> Learnable parameters that determine connection strength between neurons</li>
                <li><strong>Biases:</strong> Additional parameters that allow neurons to adjust their activation threshold</li>
                <li><strong>Activation Functions:</strong> Non-linear functions that introduce complexity to the model</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Learning Process</h3>
              <p className="text-neutral-300">
                Neural networks learn through <strong>backpropagation</strong>, a process where:
              </p>
              <ol className="list-decimal list-inside text-neutral-300 space-y-2 mt-4">
                <li>Input data flows forward through the network</li>
                <li>The network produces predictions</li>
                <li>Error is calculated by comparing predictions to actual targets</li>
                <li>Gradients are computed and propagated backward</li>
                <li>Weights and biases are updated to minimize error</li>
              </ol>
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
              <h3 className="text-xl font-semibold text-white mb-4">Forward Propagation</h3>
              <p className="text-neutral-300 mb-4">
                For a neuron in layer <InlineMath math="l" />, the activation is computed as:
              </p>
              
              <div className="bg-neutral-900 rounded-lg p-6 my-6">
                <BlockMath math="a^{(l)} = f(W^{(l)} \cdot a^{(l-1)} + b^{(l)})" />
              </div>
              
              <p className="text-neutral-300">Where:</p>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                <li><InlineMath math="a^{(l)}" /> is the activation of layer <InlineMath math="l" /></li>
                <li><InlineMath math="W^{(l)}" /> is the weight matrix connecting layers <InlineMath math="l-1" /> and <InlineMath math="l" /></li>
                <li><InlineMath math="b^{(l)}" /> is the bias vector for layer <InlineMath math="l" /></li>
                <li><InlineMath math="f" /> is the activation function</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Activation Functions</h3>
              <p className="text-neutral-300 mb-4">This playground supports three activation functions:</p>
              
              <div className="space-y-4">
                <div className="bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Sigmoid</h4>
                  <BlockMath math="\sigma(x) = \frac{1}{1 + e^{-x}}" />
                  <p className="text-neutral-400 text-sm mt-2">Output range: (0, 1)</p>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Tanh</h4>
                  <BlockMath math="\tanh(x) = \frac{e^{x} - e^{-x}}{e^{x} + e^{-x}}" />
                  <p className="text-neutral-400 text-sm mt-2">Output range: (-1, 1)</p>
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">ReLU</h4>
                  <BlockMath math="ReLU(x) = \max(0, x)" />
                  <p className="text-neutral-400 text-sm mt-2">Output range: [0, ∞)</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Backpropagation</h3>
              <p className="text-neutral-300 mb-4">
                The gradient of the loss function with respect to weights is computed using the chain rule:
              </p>
              
              <div className="bg-neutral-900 rounded-lg p-6 my-6">
                <BlockMath math="\frac{\partial L}{\partial W^{(l)}} = \frac{\partial L}{\partial a^{(l)}} \cdot \frac{\partial a^{(l)}}{\partial z^{(l)}} \cdot \frac{\partial z^{(l)}}{\partial W^{(l)}}" />
              </div>
              
              <p className="text-neutral-300">
                Where <InlineMath math="z^{(l)} = W^{(l)} \cdot a^{(l-1)} + b^{(l)}" /> is the pre-activation output.
              </p>
            </div>
          </motion.section>

          {/* Implementation Details */}
          <motion.section
            id="implementation-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">3. Implementation Details</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Neural Network Class Structure</h3>
              <p className="text-neutral-300 mb-6">
                The core neural network is implemented as a TypeScript class with methods for 
                forward propagation, backpropagation, and training.
              </p>
              
              <CodeBlock
                language="typescript"
                filename="NeuralNetwork.ts"
                highlightLines={[1, 2, 3, 8, 9]}
                code={`export class NeuralNetwork {
  layers: number[];
  weights: number[][][];
  biases: number[][];

  constructor(layers: number[]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];
    this.initializeNetwork();
  }

  initializeNetwork() {
    for (let i = 0; i < this.layers.length - 1; i++) {
      const layerWeights: number[][] = [];
      const layerBiases: number[] = [];

      for (let j = 0; j < this.layers[i + 1]; j++) {
        const neuronWeights: number[] = [];
        for (let k = 0; k < this.layers[i]; k++) {
          // Random initialization between -1 and 1
          neuronWeights.push(Math.random() * 2 - 1);
        }
        layerWeights.push(neuronWeights);
        layerBiases.push(Math.random() * 2 - 1);
      }

      this.weights.push(layerWeights);
      this.biases.push(layerBiases);
    }
  }
}`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Forward Propagation Implementation</h3>
              <p className="text-neutral-300 mb-6">
                The forward pass computes activations for each layer sequentially:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="NeuralNetwork.ts - Forward Pass"
                highlightLines={[3, 8, 12, 15]}
                code={`forward(input: number[], activationFunction: string = 'tanh') {
  let activation = input;
  const activations = [activation];
  const zs: number[][] = [];

  for (let i = 0; i < this.weights.length; i++) {
    const layerZ: number[] = [];
    const layerOutput: number[] = [];

    for (let j = 0; j < this.weights[i].length; j++) {
      // Compute weighted sum + bias
      let z = this.biases[i][j];
      for (let k = 0; k < this.weights[i][j].length; k++) {
        z += this.weights[i][j][k] * activation[k];
      }
      layerZ.push(z);
      // Apply activation function
      layerOutput.push(this.activate(z, activationFunction));
    }

    zs.push(layerZ);
    activation = layerOutput;
    activations.push(activation);
  }

  return { activations, zs };
}`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Backpropagation Algorithm</h3>
              <p className="text-neutral-300 mb-6">
                The backpropagation method implements gradient descent to update weights and biases:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="NeuralNetwork.ts - Backpropagation"
                highlightLines={[6, 12, 17, 25]}
                code={`backpropagate(input: number[], target: number[], learningRate: number, activationFunction: string): number {
  // Forward pass
  const { activations, zs } = this.forward(input, activationFunction);

  // Initialize gradient arrays
  const nabla_b = this.biases.map(layer => new Array(layer.length).fill(0));
  const nabla_w = this.weights.map(layer =>
    layer.map(neuron => new Array(neuron.length).fill(0))
  );

  // Compute output layer error
  const outputActivations = activations[activations.length - 1];
  const outputZs = zs[zs.length - 1];
  let delta = outputActivations.map((output, i) =>
    (output - target[i]) * this.activateDerivative(outputZs[i], activationFunction)
  );

  nabla_b[nabla_b.length - 1] = delta;

  // Backpropagate error through hidden layers
  for (let l = this.weights.length - 2; l >= 0; l--) {
    const z = zs[l];
    const sp = z.map(z => this.activateDerivative(z, activationFunction));
    const delta_next = delta;

    delta = new Array(this.weights[l].length).fill(0);
    for (let i = 0; i < delta.length; i++) {
      let sum = 0;
      for (let j = 0; j < delta_next.length; j++) {
        sum += this.weights[l + 1][j][i] * delta_next[j];
      }
      delta[i] = sum * sp[i];
    }

    nabla_b[l] = delta;
    
    // Compute weight gradients
    for (let j = 0; j < this.weights[l].length; j++) {
      for (let k = 0; k < this.weights[l][j].length; k++) {
        nabla_w[l][j][k] = delta[j] * activations[l][k];
      }
    }
  }

  // Update weights and biases
  for (let i = 0; i < this.weights.length; i++) {
    for (let j = 0; j < this.weights[i].length; j++) {
      for (let k = 0; k < this.weights[i][j].length; k++) {
        this.weights[i][j][k] -= learningRate * nabla_w[i][j][k];
      }
      this.biases[i][j] -= learningRate * nabla_b[i][j];
    }
  }

  return this.calculateError(outputActivations, target);
}`}
              />
            </div>
          </motion.section>

          {/* Project Architecture */}
          <motion.section
            id="architecture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">4. Project Architecture</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 mb-6">
                The project is structured using React components with clear separation of concerns:
              </p>
              
              <div className="bg-neutral-900 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-4">Component Structure</h4>
                <ul className="text-neutral-300 space-y-2">
                  <li><code>page.tsx</code> - Main component with state management</li>
                  <li><code>NeuralNetwork.ts</code> - Core neural network implementation</li>
                  <li><code>NetworkCanvas.tsx</code> - Network structure visualization</li>
                  <li><code>ResultsCanvas.tsx</code> - Classification results display</li>
                  <li><code>SettingsPanel.tsx</code> - Configuration controls</li>
                  <li><code>Legend.tsx</code> - Visual legends for canvases</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">State Management</h3>
              <p className="text-neutral-300 mb-6">
                The main component manages all application state using React hooks:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="page.tsx - State Management"
                highlightLines={[2, 3, 9, 13]}
                code={`export default function NeuralNetworkPlayground() {
  const [network, setNetwork] = useState<NeuralNetwork | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [error, setError] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [problemType, setProblemType] = useState<ProblemType>("spiral");
  const [hiddenLayers, setHiddenLayers] = useState(3);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState(8);
  const [learningRate, setLearningRate] = useState(0.03);
  const [activationFunction, setActivationFunction] = useState("tanh");
  const [isClient, setIsClient] = useState(false);
  
  const animationFrameRef = useRef<number | undefined>(undefined);
  
  // Training loop using requestAnimationFrame for smooth animation
  useEffect(() => {
    if (!isTraining || isPaused || !network || !isClient) return;

    const animate = () => {
      trainStep();
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTraining, isPaused, network, learningRate, activationFunction, problemType, isClient]);
}`}
              />
            </div>
          </motion.section>

          {/* Visualization */}
          <motion.section
            id="visualization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">5. Visualization Components</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Network Structure Canvas</h3>
              <p className="text-neutral-300 mb-6">
                The NetworkCanvas component visualizes the neural network structure with neurons and weighted connections:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="NetworkCanvas.tsx - Rendering Logic"
                highlightLines={[15, 25, 40]}
                code={`const render = () => {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  // Clear canvas
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, rect.width, rect.height);
  
  const margin = 40;
  const layerSpacing = (rect.width - margin * 2) / Math.max(1, network.layers.length - 1);
  
  // Draw connections with weight-based styling
  for (let i = 0; i < network.layers.length - 1; i++) {
    const layer1X = margin + layerSpacing * i;
    const layer2X = margin + layerSpacing * (i + 1);
    
    for (let j = 0; j < network.layers[i]; j++) {
      for (let k = 0; k < network.layers[i + 1]; k++) {
        const weight = network.weights[i][k][j];
        
        ctx.beginPath();
        const opacity = Math.min(Math.abs(weight), 1);
        if (weight > 0) {
          ctx.strokeStyle = \`rgba(255, 255, 255, \${opacity * 0.5})\`;
        } else {
          ctx.strokeStyle = \`rgba(115, 115, 115, \${opacity * 0.5})\`;
        }
        ctx.lineWidth = Math.min(Math.abs(weight) * 3, 4);
        ctx.moveTo(layer1X, neuron1Y);
        ctx.lineTo(layer2X, neuron2Y);
        ctx.stroke();
      }
    }
  }
  
  // Draw neurons with glow effects
  for (let i = 0; i < network.layers.length; i++) {
    // ... neuron rendering code
  }
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Classification Results Canvas</h3>
              <p className="text-neutral-300 mb-6">
                The ResultsCanvas shows the decision boundary and training data points:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="ResultsCanvas.tsx - Decision Boundary"
                highlightLines={[6, 11, 16]}
                code={`// Draw the decision boundary
const resolution = 50;
const step = size / resolution;

for (let i = 0; i < resolution; i++) {
  for (let j = 0; j < resolution; j++) {
    const x = (i / resolution) * 2 - 1;
    const y = (j / resolution) * 2 - 1;
    
    // Get network prediction for this point
    const output = network.forward([x, y], 'tanh').activations.slice(-1)[0][0];
    
    // Color based on prediction
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
}`}
              />
            </div>
          </motion.section>

          {/* Training Process */}
          <motion.section
            id="training-process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">6. Training Process</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Problem Types</h3>
              <p className="text-neutral-300 mb-6">
                The playground includes two classic classification problems:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-neutral-900 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-3">Circle Classification</h4>
                  <p className="text-neutral-300 mb-4">
                    Points inside a circle belong to Class 1, points outside belong to Class 0.
                  </p>
                  <CodeBlock
                    language="typescript"
                    filename="Problems.ts - Circle"
                    code={`circle: {
  generateData(): TrainingData[] {
    const data: TrainingData[] = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const target = x * x + y * y < 0.5 ? [1] : [0];
      data.push({ input: [x, y], target });
    }
    return data;
  }
}`}
                  />
                </div>
                
                <div className="bg-neutral-900 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-3">Spiral Classification</h4>
                  <p className="text-neutral-300 mb-4">
                    Two interleaving spirals represent different classes.
                  </p>
                  <CodeBlock
                    language="typescript"
                    filename="Problems.ts - Spiral"
                    code={`spiral: {
  generateData(): TrainingData[] {
    const data: TrainingData[] = [];
    const n = 100;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 2; j++) {
        const r = (i / n) * maxRadius;
        const theta = (i / n) * 4 * Math.PI + j * Math.PI;
        
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        
        data.push({
          input: [x, y],
          target: [j]
        });
      }
    }
    return data;
  }
}`}
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">Real-time Training Loop</h3>
              <p className="text-neutral-300 mb-6">
                Training occurs in real-time using requestAnimationFrame for smooth visualization:
              </p>
              
              <CodeBlock
                language="typescript"
                filename="page.tsx - Training Step"
                highlightLines={[6, 12, 18]}
                code={`const trainStep = () => {
  if (!network) return;
  
  const trainingData = Problems[problemType].generateData();
  let totalError = 0;
  let correctPredictions = 0;

  trainingData.forEach(({ input, target }) => {
    const error = network.backpropagate(input, target, learningRate, activationFunction);
    totalError += error;

    const output = network.forward(input, activationFunction).activations.slice(-1)[0][0];
    if (Math.round(output) === target[0]) {
      correctPredictions++;
    }
  });

  const newAccuracy = (correctPredictions / trainingData.length * 100);
  const avgError = totalError / trainingData.length;

  setEpoch(prev => prev + 1);
  setError(avgError);
  setAccuracy(newAccuracy);
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Performance Considerations</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Client-side rendering:</strong> All computations run in the browser for instant feedback</li>
                <li><strong>Efficient canvas updates:</strong> Double buffering and device pixel ratio handling</li>
                <li><strong>Optimized training loop:</strong> Batch processing of training data each frame</li>
                <li><strong>Memory management:</strong> Proper cleanup of animation frames and event listeners</li>
              </ul>
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
            This documentation provides a comprehensive overview of the neural network implementation. 
            For questions or contributions, feel free to explore the source code or reach out.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 