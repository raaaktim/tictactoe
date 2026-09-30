import React, { useState, useRef, memo } from 'react';

export const GameCell = memo(function GameCell({
  index,
  gridSize = 4,
  value,
  isWinning,
  onClick,
  disabled,
  hoverMark
}) {
  const [hasRipple, setHasRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cellRef = useRef(null);

  const handleClick = (e) => {
    if (disabled || value) return;

    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setRipplePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setHasRipple(true);
      setTimeout(() => setHasRipple(false), 550);
    }

    onClick(index);
  };

  const is4x4 = gridSize === 4;
  const borderRadius = is4x4 ? '18px' : '13px';
  const strokeWidth = is4x4 ? 13 : 11;

  return (
    <button
      ref={cellRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || Boolean(value)}
      aria-label={`Cell ${index + 1}: ${value || 'empty'}`}
      style={{ borderRadius }}
      className={`ios-glass-cell aspect-square w-full flex items-center justify-center relative select-none cursor-pointer focus:outline-none ${
        isWinning ? 'cell-winning' : ''
      }`}
    >
      {/* Specular Diagonal Glass Glare */}
      <div 
        style={{ borderRadius }}
        className="specular-glare absolute inset-0 opacity-70" 
      />

      {/* Fluid Dynamic Ripple */}
      {hasRipple && (
        <span
          className="liquid-ripple"
          style={{
            left: ripplePos.x,
            top: ripplePos.y,
            width: '32px',
            height: '32px',
            marginLeft: '-16px',
            marginTop: '-16px',
          }}
        />
      )}

      {/* Cell Content: X Mark */}
      {value === 'X' && (
        <div className="relative w-3/5 h-3/5 flex items-center justify-center animate-bubble">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,122,255,0.7)]">
            <line
              x1="22"
              y1="22"
              x2="78"
              y2="78"
              stroke="#007AFF"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
            />
            <line
              x1="78"
              y1="22"
              x2="22"
              y2="78"
              stroke="#60A5FA"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
              style={{ animationDelay: '0.06s' }}
            />
          </svg>
        </div>
      )}

      {/* Cell Content: O Mark */}
      {value === 'O' && (
        <div className="relative w-3/5 h-3/5 flex items-center justify-center animate-bubble">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,45,85,0.7)]">
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="#FF2D55"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
            />
          </svg>
        </div>
      )}

      {/* Ghost Hover Mark (desktop only) */}
      {!value && isHovered && !disabled && (
        <div className="opacity-20 transition-opacity duration-150 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
          {hoverMark === 'X' ? (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-ios-blue stroke-[9] stroke-linecap-round">
              <line x1="25" y1="25" x2="75" y2="75" />
              <line x1="75" y1="25" x2="25" y2="75" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-ios-pink stroke-[9]">
              <circle cx="50" cy="50" r="26" fill="none" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
});
