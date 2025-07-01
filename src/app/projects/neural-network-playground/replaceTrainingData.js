// Script to replace the synthetic training data with your collected handwriting data
const fs = require('fs');
const path = require('path');

function replaceTrainingData(datasetFile) {
  try {
    // Read your collected data
    const rawData = fs.readFileSync(datasetFile, 'utf8');
    const samples = JSON.parse(rawData);
    
    console.log(`Loading ${samples.length} samples from ${datasetFile}...`);
    
    // Group by digit
    const digitSamples = {
      1: samples.filter(s => s.label === 1),
      2: samples.filter(s => s.label === 2),
      3: samples.filter(s => s.label === 3)
    };
    
    console.log(`Digit 1: ${digitSamples[1].length} samples`);
    console.log(`Digit 2: ${digitSamples[2].length} samples`);
    console.log(`Digit 3: ${digitSamples[3].length} samples`);
    
    // Read the current NeuralNetwork.ts file
    const neuralNetworkPath = './NeuralNetwork.ts';
    let content = fs.readFileSync(neuralNetworkPath, 'utf8');
    
    // Generate the new handwriting data generation code
    let newHandwritingCode = `  handwriting: {
    generateData(): TrainingData[] {
      const data: TrainingData[] = [];
      
      // Real handwriting data collected from user drawings
      // Generated on ${new Date().toISOString()}
      
`;

    // Add each digit's samples
    for (let digit = 1; digit <= 3; digit++) {
      const target = digit === 1 ? '[1, 0, 0]' : digit === 2 ? '[0, 1, 0]' : '[0, 0, 1]';
      
      newHandwritingCode += `      // Digit ${digit} samples (${digitSamples[digit].length} total)\n`;
      
      digitSamples[digit].forEach(sample => {
        newHandwritingCode += `      data.push({\n`;
        newHandwritingCode += `        input: [${sample.pixels.join(', ')}],\n`;
        newHandwritingCode += `        target: ${target}\n`;
        newHandwritingCode += `      });\n`;
      });
      
      if (digit < 3) {
        newHandwritingCode += '\n';
      }
    }
    
    newHandwritingCode += `      
      return data;
    },
    evaluate(x: number, y: number): number {
      // This function is not used for handwriting recognition
      // Handwriting uses the network directly for classification
      return 0;
    }
  }`;

    // Replace the handwriting section
    const handwritingRegex = /handwriting:\s*{[\s\S]*?evaluate\([^}]*\)\s*{\s*[^}]*\s*}\s*}/;
    
    if (handwritingRegex.test(content)) {
      content = content.replace(handwritingRegex, newHandwritingCode);
      
      // Write the updated file
      fs.writeFileSync(neuralNetworkPath, content);
      console.log(`✅ Successfully updated ${neuralNetworkPath} with your handwriting data!`);
      console.log(`📊 Total samples: ${samples.length}`);
      
      // Create a backup
      const backupPath = `./NeuralNetwork.backup.${Date.now()}.ts`;
      fs.writeFileSync(backupPath, content);
      console.log(`💾 Backup created: ${backupPath}`);
      
    } else {
      console.error('❌ Could not find handwriting section in NeuralNetwork.ts');
    }
    
  } catch (error) {
    console.error('❌ Error replacing training data:', error);
  }
}

// Usage
if (require.main === module) {
  const datasetFile = process.argv[2] || 'handwriting-training-data.json';
  
  if (!fs.existsSync(datasetFile)) {
    console.error(`❌ Dataset file not found: ${datasetFile}`);
    console.log('📝 Instructions:');
    console.log('1. Go to the handwriting demo in your browser');
    console.log('2. Draw several examples of digits 1, 2, and 3');
    console.log('3. Use "Save as X" buttons to collect samples');
    console.log('4. Click "Download Dataset" to get the JSON file');
    console.log('5. Run this script: node replaceTrainingData.js your-dataset.json');
    process.exit(1);
  }
  
  console.log(`🚀 Replacing training data with ${datasetFile}...`);
  replaceTrainingData(datasetFile);
}

module.exports = { replaceTrainingData };