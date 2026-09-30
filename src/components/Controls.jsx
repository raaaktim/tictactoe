import React from 'react';
import { RotateCcw, Volume2, VolumeX, Trash2 } from 'lucide-react';

export function Controls({
  onResetGame,
  onResetScores,
  isMuted,
  onToggleMute,
  onTap
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-2 w-full max-w-sm">
      {/* Reset Current Match Button */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onResetGame();
        }}
        title="Restart Round"
        className="ios-glass-pill py-2.5 px-4 rounded-full flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        <RotateCcw className="w-3.5 h-3.5 text-ios-cyan" />
        <span>Restart</span>
      </button>

      {/* Audio Mute/Unmute Toggle */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onToggleMute();
        }}
        title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        className="ios-glass-pill p-2.5 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer hover:bg-white/15"
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
        className="ios-glass-pill py-2.5 px-4 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-ios-red/90 transition-all active:scale-95 cursor-pointer hover:bg-white/15"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Reset Scores</span>
      </button>
    </div>
  );
}
