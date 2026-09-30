import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Sparkles, Meh } from 'lucide-react';

export function WinnerModal({
  winnerInfo,
  gameMode,
  onPlayAgain,
  onTap
}) {
  if (!winnerInfo) return null;

  const isTie = winnerInfo.winner === 'TIE';
  const winner = winnerInfo.winner;

  // Trigger Apple-style colorful liquid droplet confetti burst
  useEffect(() => {
    if (!isTie) {
      const colors = winner === 'X' 
        ? ['#007AFF', '#60A5FA', '#93C5FD', '#FFFFFF'] 
        : ['#FF2D55', '#FF7A9A', '#F472B6', '#FFFFFF'];

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
        shapes: ['circle']
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: colors,
          shapes: ['circle']
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: colors,
          shapes: ['circle']
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isTie, winner]);

  const getWinnerText = () => {
    if (isTie) return "It's a Tie!";
    if (gameMode === 'ai') {
      return winner === 'X' ? 'You Won!' : 'Liquid AI Won!';
    }
    return `Player ${winner} Wins!`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-sm ios-glass-card p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/25 animate-bubble"
      >
        {/* Glow Badge */}
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-xl border ${
            isTie
              ? 'bg-white/10 border-white/20 text-white/70'
              : winner === 'X'
              ? 'bg-ios-blue/20 border-ios-blue/40 text-ios-blue shadow-[0_0_30px_rgba(0,122,255,0.4)]'
              : 'bg-ios-pink/20 border-ios-pink/40 text-ios-pink shadow-[0_0_30px_rgba(255,45,85,0.4)]'
          }`}
        >
          {isTie ? (
            <Meh className="w-8 h-8" />
          ) : (
            <Trophy className="w-8 h-8 animate-bounce" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
          {getWinnerText()}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-white/60 mb-6 font-medium">
          {isTie
            ? 'A harmonious liquid stalemate.'
            : 'Outstanding moves! Ready for the next round?'}
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            if (onTap) onTap();
            onPlayAgain();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-ios-blue to-ios-indigo hover:from-ios-blue/90 hover:to-ios-indigo/90 text-white font-semibold text-sm sm:text-base shadow-lg shadow-ios-blue/30 border border-white/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}
