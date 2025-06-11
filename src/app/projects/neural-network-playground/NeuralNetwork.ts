export interface TrainingData {
  input: number[];
  target: number[];
}

export const Problems = {
  circle: {
    generateData(): TrainingData[] {
      const data: TrainingData[] = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const target = x * x + y * y < 0.5 ? [1] : [0];
        data.push({ input: [x, y], target });
      }
      return data;
    },
    evaluate(x: number, y: number): number {
      return (x * x + y * y < 0.5) ? 1 : 0;
    }
  },
  spiral: {
    generateData(): TrainingData[] {
      const data: TrainingData[] = [];
      const n = 100;
      const maxRadius = 1;
      
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
    },
    evaluate(x: number, y: number): number {
      const theta = Math.atan2(y, x);
      const normalizedTheta = theta + Math.PI;
      return (normalizedTheta % (2 * Math.PI) > Math.PI) ? 1 : 0;
    }
  }
};

export class NeuralNetwork {
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
          neuronWeights.push(Math.random() * 2 - 1);
        }
        layerWeights.push(neuronWeights);
        layerBiases.push(Math.random() * 2 - 1);
      }

      this.weights.push(layerWeights);
      this.biases.push(layerBiases);
    }
  }

  sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  relu(x: number): number {
    return Math.max(0, x);
  }

  tanh(x: number): number {
    return Math.tanh(x);
  }

  sigmoidDerivative(x: number): number {
    const s = this.sigmoid(x);
    return s * (1 - s);
  }

  reluDerivative(x: number): number {
    return x > 0 ? 1 : 0;
  }

  tanhDerivative(x: number): number {
    const t = this.tanh(x);
    return 1 - t * t;
  }

  activate(x: number, functionName: string): number {
    switch (functionName) {
      case 'relu': return this.relu(x);
      case 'tanh': return this.tanh(x);
      default: return this.sigmoid(x);
    }
  }

  activateDerivative(x: number, functionName: string): number {
    switch (functionName) {
      case 'relu': return this.reluDerivative(x);
      case 'tanh': return this.tanhDerivative(x);
      default: return this.sigmoidDerivative(x);
    }
  }

  forward(input: number[], activationFunction: string = 'tanh') {
    let activation = input;
    const activations = [activation];
    const zs: number[][] = [];

    for (let i = 0; i < this.weights.length; i++) {
      const layerZ: number[] = [];
      const layerOutput: number[] = [];

      for (let j = 0; j < this.weights[i].length; j++) {
        let z = this.biases[i][j];
        for (let k = 0; k < this.weights[i][j].length; k++) {
          z += this.weights[i][j][k] * activation[k];
        }
        layerZ.push(z);
        layerOutput.push(this.activate(z, activationFunction));
      }

      zs.push(layerZ);
      activation = layerOutput;
      activations.push(activation);
    }

    return { activations, zs };
  }

  backpropagate(input: number[], target: number[], learningRate: number, activationFunction: string): number {
    // Forward pass
    const { activations, zs } = this.forward(input, activationFunction);

    // Initialize nabla_b and nabla_w
    const nabla_b = this.biases.map(layer => new Array(layer.length).fill(0));
    const nabla_w = this.weights.map(layer =>
      layer.map(neuron => new Array(neuron.length).fill(0))
    );

    // Backward pass
    const outputActivations = activations[activations.length - 1];
    const outputZs = zs[zs.length - 1];
    let delta = outputActivations.map((output, i) =>
      (output - target[i]) * this.activateDerivative(outputZs[i], activationFunction)
    );

    nabla_b[nabla_b.length - 1] = delta;

    // Compute nabla_w for the last layer
    for (let j = 0; j < this.weights[this.weights.length - 1].length; j++) {
      for (let k = 0; k < this.weights[this.weights.length - 1][j].length; k++) {
        nabla_w[nabla_w.length - 1][j][k] = delta[j] * activations[activations.length - 2][k];
      }
    }

    // Hidden layers
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

    return this.calculateError(activations[activations.length - 1], target);
  }

  calculateError(output: number[], target: number[]): number {
    return output.reduce((sum, out, i) =>
      sum + Math.pow(out - target[i], 2), 0) / output.length;
  }
} 