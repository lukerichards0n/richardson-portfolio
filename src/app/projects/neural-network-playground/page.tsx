"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import NetworkCanvas from "./NetworkCanvas";
import ResultsCanvas from "./ResultsCanvas";
import SettingsPanel from "./SettingsPanel";
import Legend from "./Legend";
import { NeuralNetwork, Problems } from "./NeuralNetwork";

type ProblemType = "circle" | "spiral";

export default function NeuralNetworkPlayground() {
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
  const epochRef = useRef(0);

  const problemDescriptions: Record<ProblemType, string> = {
    circle: "Learning to identify points inside a circle. Points inside the circle belong to Class 1, while points outside belong to Class 0.",
    spiral: "Learning to separate two interleaving spiral patterns. Each spiral represents a different class in this challenging non-linear classification problem."
  };

  // Only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      initializeNetwork();
    }
  }, [hiddenLayers, neuronsPerLayer, isClient]);

  useEffect(() => {
    epochRef.current = epoch;
  }, [epoch]);

  const initializeNetwork = () => {
    const layers = [2, ...Array(hiddenLayers).fill(neuronsPerLayer), 1];
    setNetwork(new NeuralNetwork(layers));
    setEpoch(0);
    setError(0);
    setAccuracy(0);
  };

  const trainStep = () => {
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
  };

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

  const handleStartTraining = () => {
    setIsTraining(!isTraining);
  };

  const handleReset = () => {
    setIsTraining(false);
    initializeNetwork();
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (!network || isTraining) return;
    
    const target = [Problems[problemType].evaluate(x, y)];
    network.backpropagate([x, y], target, learningRate, activationFunction);
  };

  return (
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
            Neural Network Playground
          </h1>
          <p className="text-lg text-neutral-300">
            Visualize and understand how neural networks learn to solve classification problems
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SettingsPanel
              problemType={problemType}
              setProblemType={(type: string) => setProblemType(type as ProblemType)}
              hiddenLayers={hiddenLayers}
              setHiddenLayers={setHiddenLayers}
              neuronsPerLayer={neuronsPerLayer}
              setNeuronsPerLayer={setNeuronsPerLayer}
              learningRate={learningRate}
              setLearningRate={setLearningRate}
              activationFunction={activationFunction}
              setActivationFunction={setActivationFunction}
              isTraining={isTraining}
              onStartTraining={handleStartTraining}
              onReset={handleReset}
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
            />
          </motion.div>

          {/* Visualization Area */}
          <div className="space-y-6">
            {/* Stats and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Epoch</div>
                    <div className="text-2xl font-bold text-white">{epoch}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Error</div>
                    <div className="text-2xl font-bold text-white">{error.toFixed(3)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Accuracy</div>
                    <div className="text-2xl font-bold text-white">{accuracy.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-neutral-300">
                    {problemDescriptions[problemType]}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visualization Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Neural Network Structure</h2>
                <div className="relative h-[400px] bg-neutral-950 rounded-3xl overflow-hidden">
                  {isClient && (
                    <>
                      <NetworkCanvas
                        network={network}
                        className="absolute inset-0"
                      />
                      <Legend type="network" />
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Classification Results</h2>
                <div className="relative h-[400px] bg-neutral-950 rounded-3xl overflow-hidden">
                  {isClient && (
                    <>
                      <ResultsCanvas
                        network={network}
                        problemType={problemType}
                        className="absolute inset-0"
                        onCanvasClick={handleCanvasClick}
                      />
                      <Legend type="results" />
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 