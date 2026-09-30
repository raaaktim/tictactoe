import React from 'react';
import { RotateCcw, Volume2, VolumeX, Trash2, BookOpen } from 'lucide-react';

export function Controls({
  onResetGame,
  onResetScores,
  isMuted,
  onToggleMute,
  onOpenRules,
  onTap
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 w-full max-w-sm">
      {/* Reset Current Match Button */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onResetGame();
        }}
        title="Restart Round"
        className="ios-glass-pill py-2 px-3 sm:px-4 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        <RotateCcw className="w-3.5 h-3.5 text-ios-cyan" />
        <span>Restart</span>
      </button>

      {/* Rules & Guide Button */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onOpenRules();
        }}
        title="How to Play & Rules"
        className="ios-glass-pill py-2 px-3 rounded-full flex items-center gap-1.5 text-xs font-semibold text-ios-yellow/90 hover:text-ios-yellow transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        <BookOpen className="w-3.5 h-3.5 text-ios-yellow" />
        <span>Rules</span>
      </button>

      {/* Audio Mute/Unmute Toggle */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onToggleMute();
        }}
        title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        className="ios-glass-pill p-2 sm:p-2.5 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white/50" />
        ) : (
          <Volume2 className="w-4 h-4 text-ios-mint" />
        )}
      </button>

      {/* Clear Score History */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onResetScores();
        }}
        title="Reset All Scores"
        className="ios-glass-pill py-2 px-3 rounded-full flex items-center gap-1 text-xs font-semibold text-white/60 hover:text-ios-red/90 transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
}
