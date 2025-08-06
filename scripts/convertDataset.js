// This is a Node.js script to convert your collected handwriting data
// into the format needed for NeuralNetwork.ts

const fs = require('fs');

// Function to convert your collected data to the training data format
function convertHandwritingDataset(inputFile, outputFile) {
  try {
    // Read the collected data
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const samples = JSON.parse(rawData);
    
    console.log(`Processing ${samples.length} samples...`);
    
    // Group samples by digit
    const digitSamples = {
      1: samples.filter(s => s.label === 1),
      2: samples.filter(s => s.label === 2),
      3: samples.filter(s => s.label === 3)
    };
    
    console.log(`Digit 1: ${digitSamples[1].length} samples`);
    console.log(`Digit 2: ${digitSamples[2].length} samples`);
    console.log(`Digit 3: ${digitSamples[3].length} samples`);
    
    // Generate the TypeScript code
    let tsCode = `// Auto-generated training data from collected handwriting samples
// Generated on ${new Date().toISOString()}

export const HandwritingTrainingData = {
  generateData(): Array<{input: number[], target: number[]}> {
    const data: Array<{input: number[], target: number[]}> = [];
    
`;

    // Add samples for each digit
    for (let digit = 1; digit <= 3; digit++) {
      tsCode += `    // Digit ${digit} samples (${digitSamples[digit].length} total)\n`;
      
      digitSamples[digit].forEach((sample, index) => {
        const target = digit === 1 ? '[1, 0, 0]' : digit === 2 ? '[0, 1, 0]' : '[0, 0, 1]';
        
        tsCode += `    data.push({\n`;
        tsCode += `      input: [${sample.pixels.join(', ')}],\n`;
        tsCode += `      target: ${target}\n`;
        tsCode += `    });\n`;
        
        if (index < digitSamples[digit].length - 1) {
          tsCode += '\n';
        }
      });
      
      if (digit < 3) {
        tsCode += '\n';
      }
    }
    
    tsCode += `
    return data;
  }
};
`;

    // Write the TypeScript file
    fs.writeFileSync(outputFile, tsCode);
    console.log(`Generated ${outputFile} with ${samples.length} training samples!`);
    
    // Also generate a summary
    const summary = {
      totalSamples: samples.length,
      digitCounts: {
        digit1: digitSamples[1].length,
        digit2: digitSamples[2].length,
        digit3: digitSamples[3].length
      },
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(outputFile.replace('.ts', '-summary.json'), JSON.stringify(summary, null, 2));
    console.log('Summary written to', outputFile.replace('.ts', '-summary.json'));
    
  } catch (error) {
    console.error('Error converting dataset:', error);
  }
}

// Usage example
if (require.main === module) {
  const inputFile = process.argv[2] || 'handwriting-training-data.json';
  const outputFile = process.argv[3] || 'HandwritingTrainingData.ts';
  
  console.log(`Converting ${inputFile} to ${outputFile}...`);
  convertHandwritingDataset(inputFile, outputFile);
}

module.exports = { convertHandwritingDataset };