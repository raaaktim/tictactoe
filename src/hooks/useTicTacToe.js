import { useState, useEffect, useCallback } from 'react';
import { checkWinner, getAIMove } from '../utils/ai';

export function useTicTacToe({ onPlayMove, onWin, onTie }) {
  const [gridSize, setGridSize] = useState(() => {
    try {
      const saved = localStorage.getItem('ios_ttt_grid_size');
      return saved ? JSON.parse(saved) : 4;
    } catch {
      return 4;
    }
  });

  const [board, setBoard] = useState(() => Array(gridSize * gridSize).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Default to AI Smart as requested
  const [gameMode, setGameMode] = useState(() => {
    try {
      const saved = localStorage.getItem('ios_ttt_game_mode');
      return saved ? JSON.parse(saved) : 'ai';
    } catch {
      return 'ai';
    }
  });

  const [aiDifficulty, setAiDifficultyState] = useState(() => {
    try {
      const saved = localStorage.getItem('ios_ttt_ai_diff');
      return saved ? JSON.parse(saved) : 'smart';
    } catch {
      return 'smart';
    }
  });

  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Independent score persistence for 4x4 and 6x6
  const [scoresByGrid, setScoresByGrid] = useState(() => {
    try {
      const saved = localStorage.getItem('ios_ttt_scores_by_grid');
      return saved ? JSON.parse(saved) : {
        '4': { x: 0, o: 0, ties: 0 },
        '6': { x: 0, o: 0, ties: 0 }
      };
    } catch {
      return {
        '4': { x: 0, o: 0, ties: 0 },
        '6': { x: 0, o: 0, ties: 0 }
      };
    }
  });

  const [winnerInfo, setWinnerInfo] = useState(null);
  const [winningMoves, setWinningMoves] = useState([]);

  // Save scores
  useEffect(() => {
    try {
      localStorage.setItem('ios_ttt_scores_by_grid', JSON.stringify(scoresByGrid));
    } catch (e) {
      console.error(e);
    }
  }, [scoresByGrid]);

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem('ios_ttt_grid_size', JSON.stringify(gridSize));
      localStorage.setItem('ios_ttt_game_mode', JSON.stringify(gameMode));
      localStorage.setItem('ios_ttt_ai_diff', JSON.stringify(aiDifficulty));
    } catch (e) {
      console.error(e);
    }
  }, [gridSize, gameMode, aiDifficulty]);

  // Handle Game Completion
  const handleGameEnd = useCallback((result) => {
    setWinnerInfo(result);
    const key = String(gridSize);
    if (result.winner === 'TIE') {
      setScoresByGrid(prev => ({
        ...prev,
        [key]: { ...prev[key], ties: prev[key].ties + 1 }
      }));
      if (onTie) onTie();
    } else {
      setWinningMoves(result.line || []);
      const field = result.winner.toLowerCase();
      setScoresByGrid(prev => ({
        ...prev,
        [key]: { ...prev[key], [field]: prev[key][field] + 1 }
      }));
      if (onWin) onWin(result.winner);
    }
  }, [gridSize, onTie, onWin]);

  // Make a move
  const makeMove = useCallback((index) => {
    if (board[index] || winnerInfo || isAiThinking) return false;

    const currentMark = isXNext ? 'X' : 'O';
    const newBoard = [...board];
    newBoard[index] = currentMark;

    setBoard(newBoard);
    if (onPlayMove) onPlayMove(currentMark);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      handleGameEnd(winResult);
      return true;
    }

    setIsXNext(!isXNext);
    return true;
  }, [board, winnerInfo, isAiThinking, isXNext, onPlayMove, handleGameEnd]);

  // AI Turn trigger: optimized with micro-delay so mobile UI never hitches
  useEffect(() => {
    if (gameMode !== 'ai' || isXNext || winnerInfo) return;

    setIsAiThinking(true);
    const timer = setTimeout(() => {
      const aiChoice = getAIMove(board, 'O', aiDifficulty);
      if (aiChoice !== null) {
        const newBoard = [...board];
        newBoard[aiChoice] = 'O';
        setBoard(newBoard);
        if (onPlayMove) onPlayMove('O');

        const winResult = checkWinner(newBoard);
        if (winResult) {
          handleGameEnd(winResult);
        } else {
          setIsXNext(true);
        }
      }
      setIsAiThinking(false);
    }, 220);

    return () => clearTimeout(timer);
  }, [gameMode, isXNext, board, winnerInfo, aiDifficulty, onPlayMove, handleGameEnd]);

  // Reset current match
  const resetGame = useCallback(() => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
    setWinningMoves([]);
    setIsAiThinking(false);
  }, [gridSize]);

  // Switch Grid Size Section (4x4 or 6x6)
  const changeGridSize = useCallback((newSize) => {
    if (newSize === gridSize) return;
    setGridSize(newSize);
    setBoard(Array(newSize * newSize).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
    setWinningMoves([]);
    setIsAiThinking(false);
  }, [gridSize]);

  // Reset entire scoreboard for current grid size
  const resetScores = useCallback(() => {
    const key = String(gridSize);
    setScoresByGrid(prev => ({
      ...prev,
      [key]: { x: 0, o: 0, ties: 0 }
    }));
    resetGame();
  }, [gridSize, resetGame]);

  const switchMode = useCallback((mode) => {
    setGameMode(mode);
    resetGame();
  }, [resetGame]);

  const setAiDifficulty = useCallback((diff) => {
    setAiDifficultyState(diff);
  }, []);

  const currentScores = scoresByGrid[String(gridSize)] || { x: 0, o: 0, ties: 0 };

  return {
    gridSize,
    changeGridSize,
    board,
    isXNext,
    gameMode,
    aiDifficulty,
    setAiDifficulty,
    switchMode,
    isAiThinking,
    scores: currentScores,
    winnerInfo,
    winningMoves,
    makeMove,
    resetGame,
    resetScores
  };
}
