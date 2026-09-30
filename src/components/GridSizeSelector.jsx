import React from 'react';
import { Grid2X2, Grid3X3, Layers } from 'lucide-react';

export function GridSizeSelector({ gridSize, onGridSizeChange, onTap }) {
  return (
    <div className="relative flex p-1 rounded-2xl ios-glass-pill w-full max-w-xs backdrop-blur-2xl mb-2">
      {/* Animated Sliding Glass Thumb Indicator */}
      <div 
        className="absolute top-1 bottom-1 rounded-xl bg-white/25 shadow-md backdrop-blur-md border border-white/35 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          left: gridSize === 4 ? '4px' : '50%',
          width: 'calc(50% - 4px)',
        }}
      />

      {/* 4x4 Section Button */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onGridSizeChange(4);
        }}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold tracking-tight transition-colors duration-200 cursor-pointer ${
          gridSize === 4 ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
        }`}
      >
        <Grid2X2 className="w-3.5 h-3.5 text-ios-cyan" />
        <span>4 × 4 Section</span>
      </button>

      {/* 6x6 Section Button */}
      <button
        onClick={() => {
          if (onTap) onTap();
          onGridSizeChange(6);
        }}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold tracking-tight transition-colors duration-200 cursor-pointer ${
          gridSize === 6 ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
        }`}
      >
        <Grid3X3 className="w-3.5 h-3.5 text-ios-purple" />
        <span>6 × 6 Section</span>
      </button>
    </div>
  );
}
