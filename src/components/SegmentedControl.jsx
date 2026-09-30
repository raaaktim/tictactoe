import React from 'react';
import { Users, Bot, Sparkles, Brain } from 'lucide-react';

export function SegmentedControl({ 
  gameMode, 
  onModeChange, 
  aiDifficulty, 
  onAiDifficultyChange,
  onTap 
}) {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      {/* Primary Mode Picker */}
      <div className="relative flex p-1.5 rounded-full ios-glass-pill w-full backdrop-blur-2xl">
        {/* Animated Sliding Glass Pill Indicator */}
        <div 
          className="absolute top-1.5 bottom-1.5 rounded-full bg-white/20 shadow-md backdrop-blur-md border border-white/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            left: gameMode === 'local2p' ? '6px' : '50%',
            width: 'calc(50% - 6px)',
          }}
        />

        {/* Local 2-Player Button */}
        <button
          onClick={() => {
            if (onTap) onTap();
            onModeChange('local2p');
          }}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 ${
            gameMode === 'local2p' ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Users className="w-4 h-4 text-ios-blue" />
          <span>2-Player</span>
        </button>

        {/* Solo vs AI Button */}
        <button
          onClick={() => {
            if (onTap) onTap();
            onModeChange('ai');
          }}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-200 ${
            gameMode === 'ai' ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Bot className="w-4 h-4 text-ios-pink" />
          <span>vs AI</span>
        </button>
      </div>

      {/* AI Difficulty Sub-Selector (Visible when AI mode is active) */}
      {gameMode === 'ai' && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl animate-bubble">
          <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider pl-1">
            AI Level:
          </span>

          <button
            onClick={() => {
              if (onTap) onTap();
              onAiDifficultyChange('casual');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              aiDifficulty === 'casual'
                ? 'bg-ios-mint/25 text-ios-mint border border-ios-mint/40 shadow-sm'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Casual</span>
          </button>

          <button
            onClick={() => {
              if (onTap) onTap();
              onAiDifficultyChange('smart');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              aiDifficulty === 'smart'
                ? 'bg-ios-purple/25 text-ios-purple border border-ios-purple/40 shadow-sm'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Brain className="w-3 h-3" />
            <span>Smart</span>
          </button>
        </div>
      )}
    </div>
  );
}
