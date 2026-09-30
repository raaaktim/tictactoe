import React, { useState, useRef } from 'react';

export function GameCell({
  index,
  gridSize = 4,
  value,
  isWinning,
  onClick,
  disabled,
  hoverMark
}) {
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const cellRef = useRef(null);

  const handleClick = (e) => {
    if (disabled || value) return;

    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rippleId = Date.now();

      setRipples((prev) => [...prev, { id: rippleId, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 850);
    }

    onClick(index);
  };

  const is4x4 = gridSize === 4;
  const borderRadius = is4x4 ? '20px' : '14px';
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
      className={`ios-glass-cell aspect-square w-full flex items-center justify-center relative select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue ${
        isWinning ? 'cell-winning' : ''
      }`}
    >
      {/* Specular Diagonal Glass Glare */}
      <div 
        style={{ borderRadius }}
        className="specular-glare absolute inset-0 opacity-75" 
      />

      {/* Fluid Dynamic Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="liquid-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: '40px',
            height: '40px',
            marginLeft: '-20px',
            marginTop: '-20px',
          }}
        />
      ))}

      {/* Cell Content: X Mark */}
      {value === 'X' && (
        <div className="relative w-3/5 h-3/5 flex items-center justify-center animate-bubble">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-ios-blue/30 rounded-full blur-xl -z-10" />
          
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,122,255,0.7)]">
            <defs>
              <linearGradient id={`grad-x-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="60%" stopColor="#007AFF" />
                <stop offset="100%" stopColor="#0051C6" />
              </linearGradient>
            </defs>
            <line
              x1="22"
              y1="22"
              x2="78"
              y2="78"
              stroke={`url(#grad-x-${index})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
            />
            <line
              x1="78"
              y1="22"
              x2="22"
              y2="78"
              stroke={`url(#grad-x-${index})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
              style={{ animationDelay: '0.08s' }}
            />
          </svg>
        </div>
      )}

      {/* Cell Content: O Mark */}
      {value === 'O' && (
        <div className="relative w-3/5 h-3/5 flex items-center justify-center animate-bubble">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-ios-pink/30 rounded-full blur-xl -z-10" />

          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,45,85,0.7)]">
            <defs>
              <linearGradient id={`grad-o-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7A9A" />
                <stop offset="60%" stopColor="#FF2D55" />
                <stop offset="100%" stopColor="#D9002C" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke={`url(#grad-o-${index})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="animate-draw"
            />
          </svg>
        </div>
      )}

      {/* Ghost Hover Mark */}
      {!value && isHovered && !disabled && (
        <div className="opacity-25 transition-opacity duration-200 w-1/2 h-1/2 flex items-center justify-center pointer-events-none">
          {hoverMark === 'X' ? (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-ios-blue stroke-[10] stroke-linecap-round">
              <line x1="25" y1="25" x2="75" y2="75" />
              <line x1="75" y1="25" x2="25" y2="75" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-ios-pink stroke-[10]">
              <circle cx="50" cy="50" r="26" fill="none" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
}
