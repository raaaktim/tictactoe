import React from 'react';
import { User, Bot, Loader2 } from 'lucide-react';

export function ScoreBoard({
  scores,
  gridSize = 4,
  isXNext,
  gameMode,
  isAiThinking,
  winnerInfo
}) {
  const isXTurn = isXNext && !winnerInfo;
  const isOTurn = !isXNext && !winnerInfo;
  const is4x4 = gridSize === 4;

  return (
    <div 
      className={`w-full grid grid-cols-3 gap-2.5 sm:gap-3.5 my-2 transition-all duration-300 ${
        is4x4 ? 'max-w-sm sm:max-w-md' : 'max-w-md sm:max-w-xl'
      }`}
    >
      {/* Player X Glass Card */}
      <div 
        className={`relative p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isXTurn
            ? 'ios-glass-card border-ios-blue/50 ring-2 ring-ios-blue/40 shadow-[0_0_25px_rgba(0,122,255,0.25)] scale-[1.02]'
            : 'bg-white/[0.04] border border-white/10 opacity-75'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-ios-blue shadow-[0_0_8px_#007AFF]" />
            <span className="text-[11px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider">
              Player X
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-ios-blue drop-shadow">
            {scores.x}
          </span>
          <span className="text-[10px] text-ios-blue/90 font-medium mt-0.5">
            {isXTurn ? 'Playing...' : 'Wins'}
          </span>
        </div>
      </div>

      {/* Center Ties / Game Status Pill */}
      <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-1">
          <span className="text-[9px] sm:text-[10px] font-bold text-ios-cyan/90 uppercase tracking-widest bg-ios-cyan/15 px-1.5 py-0.2 rounded-full border border-ios-cyan/30">
            {gridSize}×{gridSize}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-widest">
            Draws
          </span>
        </div>
        <span className="text-xl sm:text-2xl font-bold text-white/80 mt-0.5">
          {scores.ties}
        </span>
        
        {/* Dynamic Turn Badge */}
        <div className="mt-1 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/15 flex items-center gap-1">
          {isAiThinking ? (
            <>
              <Loader2 className="w-2.5 h-2.5 text-ios-pink animate-spin" />
              <span className="text-[9px] font-medium text-ios-pink/90">AI...</span>
            </>
          ) : (
            <span className="text-[9px] font-semibold text-white/70 tracking-tight">
              {winnerInfo ? 'Round Over' : `Turn: ${isXNext ? 'X' : 'O'}`}
            </span>
          )}
        </div>
      </div>

      {/* Player O / AI Glass Card */}
      <div 
        className={`relative p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          isOTurn
            ? 'ios-glass-card border-ios-pink/50 ring-2 ring-ios-pink/40 shadow-[0_0_25px_rgba(255,45,85,0.25)] scale-[1.02]'
            : 'bg-white/[0.04] border border-white/10 opacity-75'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-ios-pink shadow-[0_0_8px_#FF2D55]" />
            <span className="text-[11px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-1">
              {gameMode === 'ai' ? 'Liquid AI' : 'Player O'}
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-ios-pink drop-shadow">
            {scores.o}
          </span>
          <span className="text-[10px] text-ios-pink/90 font-medium mt-0.5">
            {isOTurn ? (isAiThinking ? 'Thinking...' : 'Playing...') : 'Wins'}
          </span>
        </div>
      </div>
    </div>
  );
}
