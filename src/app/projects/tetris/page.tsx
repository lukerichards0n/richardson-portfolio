"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight, Space } from 'lucide-react';
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]] // Z
];

const PIECE_COLORS = [
  'from-cyan-400 to-blue-500',
  'from-yellow-400 to-amber-500',
  'from-purple-400 to-violet-500',
  'from-orange-400 to-red-500',
  'from-blue-400 to-indigo-500',
  'from-green-400 to-emerald-500',
  'from-red-400 to-pink-500'
];

interface Piece {
  shape: number[][];
  color: string;
  shapeIndex: number;
}

interface Position {
  x: number;
  y: number;
}

interface Cell {
  value: number;
  color: string | null;
}

export default function TetrisPage() {
  const [board, setBoard] = useState<Cell[][]>(() => 
    Array(ROWS).fill(null).map(() => Array(COLS).fill({ value: 0, color: null }))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameOver
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('tetrisHighScore') || '0');
    }
    return 0;
  });
  
  const gameLoopRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const dropIntervalRef = useRef(1000);

  const createPiece = useCallback(() => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[shapeIndex],
      color: PIECE_COLORS[shapeIndex],
      shapeIndex
    };
  }, []);

  const checkCollision = useCallback((piece: Piece | null, position: Position, boardToCheck: Cell[][] = board) => {
    if (!piece) return true;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = position.x + x;
          const newY = position.y + y;
          
          if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return true;
          }
          
          if (newY >= 0 && boardToCheck[newY][newX].value) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const lockPiece = useCallback((positionToLock: Position) => {
    if (!currentPiece) return;
    
    const newBoard = board.map(row => [...row]);
    
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value && positionToLock.y + y >= 0) {
          newBoard[positionToLock.y + y][positionToLock.x + x] = {
            value: 1,
            color: currentPiece.color
          };
        }
      });
    });
    
    const completedLines: number[] = [];
    newBoard.forEach((row, y) => {
      if (row.every(cell => cell.value)) {
        completedLines.push(y);
      }
    });
    
    if (completedLines.length > 0) {
      completedLines.forEach(lineY => {
        newBoard.splice(lineY, 1);
        newBoard.unshift(Array(COLS).fill({ value: 0, color: null }));
      });
      
      const points = [0, 40, 100, 300, 1200][completedLines.length] * level;
      setScore(prev => prev + points);
      setLines(prev => {
        const newLines = prev + completedLines.length;
        const newLevel = Math.floor(newLines / 10) + 1;
        setLevel(newLevel);
        dropIntervalRef.current = Math.max(100, 1000 - (newLevel - 1) * 100);
        return newLines;
      });
    }
    
    setBoard(newBoard);
    
    const newPiece = nextPiece;
    if (!newPiece) return;
    
    const newNext = createPiece();
    const newPosition = { 
      x: Math.floor(COLS / 2) - Math.ceil(newPiece.shape[0].length / 2), 
      y: 0 
    };
    
    if (checkCollision(newPiece, newPosition, newBoard)) {
      setGameState('gameOver');
      if (score > highScore) {
        setHighScore(score);
        if (typeof window !== 'undefined') {
          localStorage.setItem('tetrisHighScore', score.toString());
        }
      }
      return;
    }
    
    setCurrentPiece(newPiece);
    setNextPiece(newNext);
    setCurrentPosition(newPosition);
  }, [board, currentPiece, nextPiece, level, score, highScore, createPiece, checkCollision]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameState !== 'playing') return false;
    
    const newPosition = { x: currentPosition.x + dx, y: currentPosition.y + dy };
    
    if (!checkCollision(currentPiece, newPosition)) {
      setCurrentPosition(newPosition);
      return true;
    }
    return false;
  }, [currentPiece, currentPosition, checkCollision, gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const gameLoop = setInterval(() => {
      if (!movePiece(0, 1)) {
        lockPiece(currentPosition);
      }
    }, dropIntervalRef.current);
    
    gameLoopRef.current = gameLoop;
    return () => clearInterval(gameLoop);
  }, [gameState, movePiece, lockPiece, currentPosition]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameState !== 'playing') return;
    
    const finalPosition = { ...currentPosition };
    while (!checkCollision(currentPiece, { x: finalPosition.x, y: finalPosition.y + 1 })) {
      finalPosition.y++;
    }
    
    const dropDistance = finalPosition.y - currentPosition.y;
    setScore(prev => prev + dropDistance * 2);
    
    lockPiece(finalPosition);
  }, [currentPiece, currentPosition, gameState, checkCollision, lockPiece]);

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameState !== 'playing') return;
    
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    
    const rotatedPiece = { ...currentPiece, shape: rotated };
    
    if (!checkCollision(rotatedPiece, currentPosition)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, currentPosition, checkCollision, gameState]);

  const initGame = useCallback(() => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill({ value: 0, color: null })));
    setScore(0);
    setLevel(1);
    setLines(0);
    dropIntervalRef.current = 1000;
    
    const piece = createPiece();
    const nextPiece = createPiece();
    setCurrentPiece(piece);
    setNextPiece(nextPiece);
    setCurrentPosition({ 
      x: Math.floor(COLS / 2) - Math.ceil(piece.shape[0].length / 2), 
      y: 0 
    });
    setGameState('playing');
  }, [createPiece]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, movePiece, rotatePiece, hardDrop]);

  const getGhostPosition = useCallback(() => {
    if (!currentPiece) return null;
    
    let ghostY = currentPosition.y;
    while (!checkCollision(currentPiece, { x: currentPosition.x, y: ghostY + 1 })) {
      ghostY++;
    }
    return { x: currentPosition.x, y: ghostY };
  }, [currentPiece, currentPosition, checkCollision]);

  const ghostPosition = getGhostPosition();

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-12 pb-8"
        >
          <Link
            href="/projects"
            className={cn(
              "inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-200",
              "transition-colors duration-200 mb-6",
              "hover:translate-x-[-2px]"
            )}
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Tetris
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            Classic Tetris game with modern design and smooth animations. Use keyboard controls to play.
          </p>
        </motion.div>

        {/* Game Container */}
        <div className="pb-16 flex justify-center">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 w-full lg:w-[320px]"
            >
              {/* Next Piece */}
              <div className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-neutral-900",
                "border border-neutral-800/50",
                "shadow-xl p-6"
              )}>
                <h3 className="text-lg font-semibold text-white mb-4">Next Piece</h3>
                <div className="bg-black/30 rounded-3xl p-4 h-32 flex items-center justify-center border border-neutral-800/50 backdrop-blur-sm">
                  {nextPiece && (
                    <div className="relative" style={{ 
                      width: `${nextPiece.shape[0].length * 24}px`,
                      height: `${nextPiece.shape.length * 24}px` 
                    }}>
                      {nextPiece.shape.map((row, y) =>
                        row.map((value, x) => value ? (
                          <div
                            key={`next-${x}-${y}`}
                            className={cn(
                              "absolute rounded-sm bg-gradient-to-br",
                              "border border-white/30 shadow-md",
                              nextPiece.color
                            )}
                            style={{
                              left: `${x * 24}px`,
                              top: `${y * 24}px`,
                              width: '22px',
                              height: '22px',
                            }}
                          />
                        ) : null)
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats */}
              <div className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-neutral-900",
                "border border-neutral-800/50",
                "shadow-xl p-6"
              )}>
                <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Score</h4>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      {score}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">High Score</h4>
                    <p className="text-2xl font-semibold text-amber-500">{highScore}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Level</h4>
                    <p className="text-xl font-semibold text-white">{level}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Lines</h4>
                    <p className="text-xl font-semibold text-white">{lines}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Game Board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-neutral-900",
                "border border-neutral-800/50",
                "shadow-2xl"
              )}
            >
              <div className="p-6 pb-0">
                <h2 className="text-xl font-semibold text-white mb-1">Game Board</h2>
                <p className="text-sm text-neutral-400 mb-4">
                  Use arrow keys to move and rotate pieces
                </p>
              </div>
              
              <div className="px-6 pb-6">
                <div className="relative bg-black/50 rounded-2xl p-1 backdrop-blur-sm border border-neutral-800/50">
                  <div 
                    className="relative bg-neutral-950 rounded-3xl overflow-hidden"
                    style={{ 
                      width: `${COLS * BLOCK_SIZE}px`, 
                      height: `${ROWS * BLOCK_SIZE}px` 
                    }}
                  >
                    {/* Grid lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        <pattern id="grid" width={BLOCK_SIZE} height={BLOCK_SIZE} patternUnits="userSpaceOnUse">
                          <path 
                            d={`M ${BLOCK_SIZE} 0 L 0 0 0 ${BLOCK_SIZE}`} 
                            fill="none" 
                            stroke="rgba(255,255,255,0.03)" 
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    
                    {/* Board cells */}
                    {board.map((row, y) => 
                      row.map((cell, x) => cell.value ? (
                        <motion.div
                          key={`${x}-${y}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            "absolute rounded-sm bg-gradient-to-br shadow-lg",
                            "border border-white/20",
                            cell.color
                          )}
                          style={{
                            left: `${x * BLOCK_SIZE}px`,
                            top: `${y * BLOCK_SIZE}px`,
                            width: `${BLOCK_SIZE - 2}px`,
                            height: `${BLOCK_SIZE - 2}px`,
                          }}
                        />
                      ) : null)
                    )}
                    
                    {/* Ghost piece */}
                    {currentPiece && ghostPosition && gameState === 'playing' && (
                      currentPiece.shape.map((row, y) =>
                        row.map((value, x) => value ? (
                          <div
                            key={`ghost-${x}-${y}`}
                            className="absolute rounded-sm border-2 border-white/20 opacity-20"
                            style={{
                              left: `${(ghostPosition.x + x) * BLOCK_SIZE}px`,
                              top: `${(ghostPosition.y + y) * BLOCK_SIZE}px`,
                              width: `${BLOCK_SIZE - 4}px`,
                              height: `${BLOCK_SIZE - 4}px`,
                            }}
                          />
                        ) : null)
                      )
                    )}
                    
                    {/* Current piece */}
                    {currentPiece && gameState !== 'gameOver' && (
                      currentPiece.shape.map((row, y) =>
                        row.map((value, x) => value ? (
                          <motion.div
                            key={`current-${x}-${y}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={cn(
                              "absolute rounded-sm bg-gradient-to-br shadow-lg",
                              "border border-white/30",
                              currentPiece.color
                            )}
                            style={{
                              left: `${(currentPosition.x + x) * BLOCK_SIZE}px`,
                              top: `${(currentPosition.y + y) * BLOCK_SIZE}px`,
                              width: `${BLOCK_SIZE - 2}px`,
                              height: `${BLOCK_SIZE - 2}px`,
                            }}
                          />
                        ) : null)
                      )
                    )}
                    
                    {/* Game Over Overlay */}
                    <AnimatePresence>
                      {gameState === 'gameOver' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                        >
                          <div className="text-center">
                            <motion.h2
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="text-4xl font-bold mb-4 bg-white bg-clip-text text-transparent"
                            >
                              Game Over
                            </motion.h2>
                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-neutral-400 mb-6"
                            >
                              Final Score: {score}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Side Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 w-full lg:w-[320px]"
            >
              {/* Controls */}
              <div className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-neutral-900",
                "border border-neutral-800/50",
                "shadow-xl p-6"
              )}>
                <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/50 flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-neutral-300">Move Left</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/50 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-neutral-300">Move Right</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/50 flex items-center justify-center">
                      <ArrowDown className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-neutral-300">Soft Drop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/50 flex items-center justify-center">
                      <RotateCw className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-neutral-300">Rotate (↑)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/50 flex items-center justify-center">
                      <Space className="w-4 h-4 text-neutral-400" />
                    </div>
                    <span className="text-neutral-300">Hard Drop (Space)</span>
                  </div>
                </div>
              </div>

              {/* Game Control */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (gameState === 'ready' || gameState === 'gameOver') {
                    initGame();
                  } else if (gameState === 'playing') {
                    setGameState('paused');
                  } else if (gameState === 'paused') {
                    setGameState('playing');
                  }
                }}
                className={cn(
                  "relative px-6 py-3 rounded-2xl font-medium",
                  "bg-white text-black",
                  "hover:bg-neutral-100",
                  "transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                {gameState === 'ready' && (
                  <>
                    <Play className="w-5 h-5" />
                    Start Game
                  </>
                )}
                {gameState === 'playing' && (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                )}
                {gameState === 'paused' && (
                  <>
                    <Play className="w-5 h-5" />
                    Resume
                  </>
                )}
                {gameState === 'gameOver' && (
                  <>
                    <RotateCw className="w-5 h-5" />
                    Play Again
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 