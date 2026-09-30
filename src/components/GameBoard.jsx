import React, { useRef, useEffect } from 'react';
import { GameCell } from './GameCell';

export function GameBoard({
  board,
  gridSize = 4,
  onCellClick,
  winningMoves,
  disabled,
  hoverMark
}) {
  const boardRef = useRef(null);

  // High-performance 3D parallax without triggering React state re-renders
  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop || !boardRef.current) return;

    const el = boardRef.current;
    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        el.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const is4x4 = gridSize === 4;

  return (
    <div 
      className={`relative w-full transition-all duration-300 perspective-[1000px] my-2 ${
        is4x4 ? 'max-w-sm sm:max-w-md' : 'max-w-md sm:max-w-xl'
      }`}
    >
      {/* 3D Glass Housing */}
      <div
        ref={boardRef}
        style={{ transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1)' }}
        className={`ios-glass-card relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 ${
          is4x4 ? 'p-3 sm:p-4' : 'p-2.5 sm:p-3.5'
        }`}
      >
        {/* Ambient Glass Surface Specular Sheen */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12" />

        {/* Dynamic Grid: 4x4 or 6x6 */}
        <div 
          className={`grid relative z-10 transition-all duration-300 ${
            is4x4 
              ? 'grid-cols-4 gap-2 sm:gap-2.5' 
              : 'grid-cols-6 gap-1.5 sm:gap-2'
          }`}
        >
          {board.map((value, idx) => (
            <GameCell
              key={idx}
              index={idx}
              gridSize={gridSize}
              value={value}
              isWinning={winningMoves.includes(idx)}
              onClick={onCellClick}
              disabled={disabled}
              hoverMark={hoverMark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
