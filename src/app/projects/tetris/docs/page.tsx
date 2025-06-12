"use client";

import React from "react";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";

export default function TetrisDocs() {
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
            href="/projects/tetris"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to Tetris Game
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-neutral-300">
            A comprehensive guide to the Tetris game implementation with modern React and smooth animations
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
            <li><a href="#overview" className="hover:text-white transition-colors">1. Game Overview</a></li>
            <li><a href="#game-mechanics" className="hover:text-white transition-colors">2. Game Mechanics</a></li>
            <li><a href="#implementation" className="hover:text-white transition-colors">3. Implementation Details</a></li>
            <li><a href="#state-management" className="hover:text-white transition-colors">4. State Management</a></li>
            <li><a href="#rendering" className="hover:text-white transition-colors">5. Rendering System</a></li>
            <li><a href="#controls" className="hover:text-white transition-colors">6. Controls & Input</a></li>
          </ul>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Game Overview */}
          <motion.section
            id="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">1. Game Overview</h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 text-lg leading-relaxed">
                This Tetris implementation is built with React and features modern animations, smooth gameplay, 
                and a responsive design. The game follows classic Tetris rules with all seven standard tetrominoes 
                and includes features like ghost pieces, line clearing, and progressive difficulty.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-neutral-300 space-y-2">
                <li><strong>Seven Tetromino Shapes:</strong> I, O, T, L, J, S, and Z pieces</li>
                <li><strong>Ghost Piece:</strong> Preview where the current piece will land</li>
                <li><strong>Line Clearing:</strong> Complete horizontal lines are removed</li>
                <li><strong>Progressive Difficulty:</strong> Speed increases every 10 lines</li>
                <li><strong>Scoring System:</strong> Points for soft drop, hard drop, and line clears</li>
                <li><strong>Modern UI:</strong> Smooth animations and responsive design</li>
                <li><strong>Local Storage:</strong> High score persistence</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Scoring System</h3>
              <div className="bg-neutral-900 rounded-lg p-6 my-6">
                <ul className="text-neutral-300 space-y-2 text-sm">
                  <li><strong>Soft Drop:</strong> 1 point per cell</li>
                  <li><strong>Hard Drop:</strong> 2 points per cell</li>
                  <li><strong>Single Line:</strong> 40 × level</li>
                  <li><strong>Double Line:</strong> 100 × level</li>
                  <li><strong>Triple Line:</strong> 300 × level</li>
                  <li><strong>Tetris (4 lines):</strong> 1200 × level</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Game Mechanics */}
          <motion.section
            id="game-mechanics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">2. Game Mechanics</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Tetromino Pieces</h3>
              <p className="text-neutral-300 mb-6">
                The game includes all seven standard Tetris pieces, each with distinct shapes and rotation patterns:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Tetromino Definitions"
                highlightLines={[2, 3, 4]}
                code={`const SHAPES = [
  [[1, 1, 1, 1]], // I-piece (Cyan)
  [[1, 1], [1, 1]], // O-piece (Yellow)
  [[1, 1, 1], [0, 1, 0]], // T-piece (Purple)
  [[1, 1, 1], [1, 0, 0]], // L-piece (Orange)
  [[1, 1, 1], [0, 0, 1]], // J-piece (Blue)
  [[1, 1, 0], [0, 1, 1]], // S-piece (Green)
  [[0, 1, 1], [1, 1, 0]] // Z-piece (Red)
];`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Collision Detection</h3>
              <p className="text-neutral-300 mb-6">
                The collision system checks for boundary violations and overlaps with placed pieces:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Collision Detection"
                highlightLines={[5, 6, 7, 12, 13]}
                code={`const checkCollision = (piece, position, boardToCheck = board) => {
  if (!piece) return true;
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;
        
        // Check boundaries
        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }
        
        // Check overlap with existing pieces
        if (newY >= 0 && boardToCheck[newY][newX].value) {
          return true;
        }
      }
    }
  }
  return false;
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Line Clearing Algorithm</h3>
              <p className="text-neutral-300 mb-6">
                When lines are completed, they are removed and new empty lines are added at the top:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Line Clearing"
                highlightLines={[2, 8, 9, 10]}
                code={`// Check for completed lines
let completedLines = [];
newBoard.forEach((row, y) => {
  if (row.every(cell => cell.value)) {
    completedLines.push(y);
  }
});

// Remove completed lines
if (completedLines.length > 0) {
  completedLines.forEach(lineY => {
    newBoard.splice(lineY, 1);
    newBoard.unshift(Array(COLS).fill({ value: 0, color: null }));
  });
  
  // Calculate score
  const points = [0, 40, 100, 300, 1200][completedLines.length] * level;
  setScore(prev => prev + points);
}`}
              />
            </div>
          </motion.section>

          {/* Implementation Details */}
          <motion.section
            id="implementation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">3. Implementation Details</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Game Loop</h3>
              <p className="text-neutral-300 mb-6">
                The game uses setInterval to create a continuous game loop that drops pieces automatically:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Game Loop"
                highlightLines={[4, 5, 6, 7, 8]}
                code={`useEffect(() => {
  if (gameState !== 'playing') return;
  
  const gameLoop = setInterval(() => {
    if (!movePiece(0, 1)) {
      lockPiece();
    }
  }, dropIntervalRef.current);
  
  gameLoopRef.current = gameLoop;
  return () => clearInterval(gameLoop);
}, [gameState, movePiece, lockPiece, level]);`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Piece Movement</h3>
              <p className="text-neutral-300 mb-6">
                All piece movements go through collision detection before being applied:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Movement System"
                highlightLines={[4, 6, 7, 8]}
                code={`const movePiece = useCallback((dx, dy) => {
  if (!currentPiece || gameState !== 'playing') return false;
  
  const newPosition = { x: currentPosition.x + dx, y: currentPosition.y + dy };
  
  if (!checkCollision(currentPiece, newPosition)) {
    setCurrentPosition(newPosition);
    return true;
  }
  return false;
}, [currentPiece, currentPosition, checkCollision, gameState]);`}
              />
            </div>
          </motion.section>

          {/* State Management */}
          <motion.section
            id="state-management"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">4. State Management</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">React State Structure</h3>
              <p className="text-neutral-300 mb-6">
                The game manages multiple pieces of state using React hooks:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="State Variables"
                highlightLines={[2, 3, 7, 8]}
                code={`// Board and piece state
const [board, setBoard] = useState(initialBoard);
const [currentPiece, setCurrentPiece] = useState(null);
const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
const [nextPiece, setNextPiece] = useState(null);

// Game statistics
const [score, setScore] = useState(0);
const [level, setLevel] = useState(1);
const [lines, setLines] = useState(0);

// Game flow control
const [gameState, setGameState] = useState('ready');
const [highScore, setHighScore] = useState(0);`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">High Score Persistence</h3>
              <p className="text-neutral-300 mb-6">
                High scores are saved to localStorage for persistence across sessions:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="localStorage Integration"
                highlightLines={[2, 3, 8, 9]}
                code={`const [highScore, setHighScore] = useState(() => {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem('tetrisHighScore') || '0');
  }
  return 0;
});

// Save new high score
if (score > highScore) {
  setHighScore(score);
  localStorage.setItem('tetrisHighScore', score.toString());
}`}
              />
            </div>
          </motion.section>

          {/* Rendering System */}
          <motion.section
            id="rendering"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">5. Rendering System</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Block Rendering</h3>
              <p className="text-neutral-300 mb-6">
                Each block is rendered with absolute positioning and gradient colors:
              </p>
              
              <CodeBlock
                language="jsx"
                filename="Block Component"
                highlightLines={[3, 4, 5, 11, 12, 13, 14]}
                code={`<motion.div
  key={\`\${x}-\${y}\`}
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  className={cn(
    "absolute rounded-sm bg-gradient-to-br shadow-lg",
    "border border-white/20",
    cell.color
  )}
  style={{
    left: \`\${x * BLOCK_SIZE}px\`,
    top: \`\${y * BLOCK_SIZE}px\`,
    width: \`\${BLOCK_SIZE - 2}px\`,
    height: \`\${BLOCK_SIZE - 2}px\`,
  }}
/>`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Ghost Piece Rendering</h3>
              <p className="text-neutral-300 mb-6">
                The ghost piece shows where the current piece will land with reduced opacity:
              </p>
              
              <CodeBlock
                language="jsx"
                filename="Ghost Piece"
                highlightLines={[7, 8, 9, 10]}
                code={`{currentPiece && ghostPosition && gameState === 'playing' && (
  currentPiece.shape.map((row, y) =>
    row.map((value, x) => value ? (
      <div
        key={\`ghost-\${x}-\${y}\`}
        className="absolute rounded-sm border-2 border-white/20 opacity-20"
        style={{
          left: \`\${(ghostPosition.x + x) * BLOCK_SIZE}px\`,
          top: \`\${(ghostPosition.y + y) * BLOCK_SIZE}px\`,
          width: \`\${BLOCK_SIZE - 4}px\`,
          height: \`\${BLOCK_SIZE - 4}px\`,
        }}
      />
    ) : null)
  )
)}`}
              />
            </div>
          </motion.section>

          {/* Controls */}
          <motion.section
            id="controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">6. Controls & Input</h2>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-white mb-4">Keyboard Event Handling</h3>
              <p className="text-neutral-300 mb-6">
                The game listens for keyboard events and prevents default browser behavior:
              </p>
              
              <CodeBlock
                language="javascript"
                filename="Input Handler"
                highlightLines={[6, 10, 14, 18, 22]}
                code={`const handleKeyPress = (e) => {
  if (gameState !== 'playing') return;
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      movePiece(-1, 0);
      break;
    case 'ArrowRight':
      e.preventDefault();
      movePiece(1, 0);
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (movePiece(0, 1)) {
        setScore(prev => prev + 1);
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      rotatePiece();
      break;
    case ' ':
      e.preventDefault();
      hardDrop();
      break;
  }
};`}
              />

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">Control Mapping</h3>
              <div className="bg-neutral-900 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-4">Keyboard Controls</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-neutral-800 rounded text-xs">←</kbd>
                      <span className="text-neutral-300">Move Left</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-neutral-800 rounded text-xs">→</kbd>
                      <span className="text-neutral-300">Move Right</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-neutral-800 rounded text-xs">↓</kbd>
                      <span className="text-neutral-300">Soft Drop</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-neutral-800 rounded text-xs">↑</kbd>
                      <span className="text-neutral-300">Rotate</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-neutral-800 rounded text-xs">Space</kbd>
                      <span className="text-neutral-300">Hard Drop</span>
                    </div>
                  </div>
                </div>
              </div>
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
            This documentation covers the complete implementation of the Tetris game. 
            The source code demonstrates modern React patterns, state management, and game development concepts.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 