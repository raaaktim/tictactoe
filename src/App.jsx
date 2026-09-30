import React from 'react';
import { LiquidWallpaper } from './components/LiquidWallpaper';
import { GridSizeSelector } from './components/GridSizeSelector';
import { SegmentedControl } from './components/SegmentedControl';
import { ScoreBoard } from './components/ScoreBoard';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { WinnerModal } from './components/WinnerModal';
import { useIOSAudio } from './hooks/useIOSAudio';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Sparkles } from 'lucide-react';

export default function App() {
  const {
    isMuted,
    toggleMute,
    playTap,
    playMarkX,
    playMarkO,
    playWin,
    playTie
  } = useIOSAudio();

  const {
    gridSize,
    changeGridSize,
    board,
    isXNext,
    gameMode,
    aiDifficulty,
    setAiDifficulty,
    switchMode,
    isAiThinking,
    scores,
    winnerInfo,
    winningMoves,
    makeMove,
    resetGame,
    resetScores
  } = useTicTacToe({
    onPlayMove: (mark) => {
      if (mark === 'X') {
        playMarkX();
      } else {
        playMarkO();
      }
    },
    onWin: () => {
      playWin();
    },
    onTie: () => {
      playTie();
    }
  });

  const handleCellClick = (index) => {
    makeMove(index);
  };

  const is4x4 = gridSize === 4;

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-5 sm:py-7 overflow-hidden select-none">
      {/* Dynamic iOS Liquid Mesh Background */}
      <LiquidWallpaper />

      {/* iOS App Navigation / Title Bar */}
      <header className="flex flex-col items-center text-center mt-1 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-ios-cyan animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90">
            Liquid Glass • {gridSize}×{gridSize} Section
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
          {gridSize}×{gridSize} Tic-Tac-Toe
        </h1>
        <p className="text-xs text-white/60 font-medium mt-0.5">
          Connect 4 in a row to win • {gridSize * gridSize} Fluid Glass Tiles
        </p>
      </header>

      {/* Main Game Interface */}
      <main 
        className={`w-full flex flex-col items-center justify-center my-auto z-10 transition-all duration-300 ${
          is4x4 ? 'max-w-sm sm:max-w-md' : 'max-w-md sm:max-w-xl'
        }`}
      >
        {/* Section 1: Board Size Selector (4x4 vs 6x6) */}
        <GridSizeSelector
          gridSize={gridSize}
          onGridSizeChange={changeGridSize}
          onTap={playTap}
        />

        {/* Section 2: Game Mode Selector (2-Player vs AI) */}
        <div className="mb-2 w-full flex justify-center">
          <SegmentedControl
            gameMode={gameMode}
            onModeChange={switchMode}
            aiDifficulty={aiDifficulty}
            onAiDifficultyChange={setAiDifficulty}
            onTap={playTap}
          />
        </div>

        {/* Score & Turn Board */}
        <ScoreBoard
          scores={scores}
          gridSize={gridSize}
          isXNext={isXNext}
          gameMode={gameMode}
          isAiThinking={isAiThinking}
          winnerInfo={winnerInfo}
        />

        {/* Liquid Glass Board (4x4 or 6x6) */}
        <GameBoard
          board={board}
          gridSize={gridSize}
          onCellClick={handleCellClick}
          winningMoves={winningMoves}
          disabled={Boolean(winnerInfo) || isAiThinking}
          hoverMark={isXNext ? 'X' : 'O'}
        />

        {/* Controls (Restart, Mute, Clear) */}
        <Controls
          onResetGame={resetGame}
          onResetScores={resetScores}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onTap={playTap}
        />
      </main>

      {/* iOS Vision Modal for Game End */}
      <WinnerModal
        winnerInfo={winnerInfo}
        gameMode={gameMode}
        onPlayAgain={resetGame}
        onTap={playTap}
      />

      {/* Footer Info */}
      <footer className="mt-3 text-center z-10">
        <span className="text-[11px] font-medium text-white/40 tracking-wider">
          Dual Section Architecture • iOS Frosted Glass & Dynamic Physics
        </span>
      </footer>
    </div>
  );
}
