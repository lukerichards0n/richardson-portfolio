// Simple script to generate the training data code from your JSON file
const fs = require('fs');

// Read your handwriting data
const rawData = fs.readFileSync('handwriting-training-data.json', 'utf8');
const samples = JSON.parse(rawData);

console.log(`Processing ${samples.length} samples...`);

// Group by digit
const digitSamples = {
  1: samples.filter(s => s.label === 1),
  2: samples.filter(s => s.label === 2),
  3: samples.filter(s => s.label === 3)
};

console.log(`Digit 1: ${digitSamples[1].length} samples`);
console.log(`Digit 2: ${digitSamples[2].length} samples`);
console.log(`Digit 3: ${digitSamples[3].length} samples`);

// Generate the code
let code = `      // Real handwriting data collected from user drawings
      // Generated on ${new Date().toISOString()}
      
`;

// Add each digit's samples
for (let digit = 1; digit <= 3; digit++) {
  const target = digit === 1 ? '[1, 0, 0]' : digit === 2 ? '[0, 1, 0]' : '[0, 0, 1]';
  
  code += `      // Digit ${digit} samples (${digitSamples[digit].length} total)\n`;
  
  digitSamples[digit].forEach(sample => {
    code += `      data.push({ input: [${sample.pixels.join(', ')}], target: ${target} });\n`;
  });
  
  if (digit < 3) {
    code += '\n';
  }
}

// Write the generated code to a file
fs.writeFileSync('generated-training-data.txt', code);

console.log('\n✅ Generated training data code!');
console.log('📄 Code saved to: generated-training-data.txt');
console.log('\n📋 Next steps:');
console.log('1. Copy the content from generated-training-data.txt');
console.log('2. Open NeuralNetwork.ts');
console.log('3. Find the handwriting generateData() function');
console.log('4. Replace everything between the comments with the generated code');