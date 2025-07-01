"use client";

import { IconInfoCircle, IconPlayerPlay, IconPlayerPause, IconRefresh } from "@tabler/icons-react";

interface SettingsPanelProps {
  problemType: string;
  setProblemType: (type: string) => void;
  hiddenLayers: number;
  setHiddenLayers: (layers: number) => void;
  neuronsPerLayer: number;
  setNeuronsPerLayer: (neurons: number) => void;
  learningRate: number;
  setLearningRate: (rate: number) => void;
  activationFunction: string;
  setActivationFunction: (func: string) => void;
  isTraining: boolean;
  onStartTraining: () => void;
  onReset: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export default function SettingsPanel({
  problemType,
  setProblemType,
  hiddenLayers,
  setHiddenLayers,
  neuronsPerLayer,
  setNeuronsPerLayer,
  learningRate,
  setLearningRate,
  activationFunction,
  setActivationFunction,
  isTraining,
  onStartTraining,
  onReset,
  isPaused,
  onTogglePause,
}: SettingsPanelProps) {
  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">Settings</h2>
      
      {/* Network Architecture */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Network Architecture</h3>
        
        <div>
          <label className="block text-sm text-neutral-300 mb-2">
            Problem Type
            <span className="inline-flex items-center ml-1 group relative">
              <IconInfoCircle className="w-4 h-4 text-neutral-500" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Choose the type of problem for the neural network to solve
              </span>
            </span>
          </label>
          <select
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 transition-colors"
          >
            <option value="handwriting">Handwriting Recognition</option>
            <option value="spiral">Spiral Classification</option>
            <option value="circle">Circle Classification</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">
            Hidden Layers
            <span className="inline-flex items-center ml-1 group relative">
              <IconInfoCircle className="w-4 h-4 text-neutral-500" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Number of layers between input and output
              </span>
            </span>
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={hiddenLayers}
            onChange={(e) => setHiddenLayers(parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">
            Neurons per Layer
            <span className="inline-flex items-center ml-1 group relative">
              <IconInfoCircle className="w-4 h-4 text-neutral-500" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Number of neurons in each hidden layer
              </span>
            </span>
          </label>
          <input
            type="number"
            min="2"
            max="32"
            value={neuronsPerLayer}
            onChange={(e) => setNeuronsPerLayer(parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 transition-colors"
          />
        </div>
      </div>

      {/* Training Parameters */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Training Parameters</h3>
        
        <div>
          <label className="block text-sm text-neutral-300 mb-2">
            Learning Rate
            <span className="inline-flex items-center ml-1 group relative">
              <IconInfoCircle className="w-4 h-4 text-neutral-500" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Speed of learning (smaller = more stable but slower)
              </span>
            </span>
          </label>
          <input
            type="number"
            min="0.001"
            max="1"
            step="0.001"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">
            Activation Function
            <span className="inline-flex items-center ml-1 group relative">
              <IconInfoCircle className="w-4 h-4 text-neutral-500" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-neutral-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Function used to determine neuron activation
              </span>
            </span>
          </label>
          <select
            value={activationFunction}
            onChange={(e) => setActivationFunction(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 transition-colors"
          >
            <option value="tanh">Tanh</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="relu">ReLU</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3 pt-4">
        <h3 className="text-lg font-medium text-white">Controls</h3>
        
        <button
          onClick={onStartTraining}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
        >
          {isTraining ? (
            <>
              <IconPlayerPause className="w-5 h-5" />
              Stop Training
            </>
          ) : (
            <>
              <IconPlayerPlay className="w-5 h-5" />
              Start Training
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
        >
          <IconRefresh className="w-5 h-5" />
          Reset Network
        </button>

        {isTraining && (
          <button
            onClick={onTogglePause}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
          >
            {isPaused ? (
              <>
                <IconPlayerPlay className="w-5 h-5" />
                Resume
              </>
            ) : (
              <>
                <IconPlayerPause className="w-5 h-5" />
                Pause
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
} 