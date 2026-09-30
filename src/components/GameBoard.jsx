import React, { useRef, useState } from 'react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Subtle 3D iOS Vision Glass Parallax Tilt
  const handleMouseMove = (e) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
        className={`ios-glass-card relative overflow-hidden backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 ${
          is4x4 ? 'p-3.5 sm:p-4' : 'p-3 sm:p-4'
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
