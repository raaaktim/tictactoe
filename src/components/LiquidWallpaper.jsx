import React, { useEffect, useState } from 'react';

/**
 * LiquidWallpaper - Apple iOS-inspired dynamic fluid mesh wallpaper.
 * Multi-layer blurred fluid orbs that morph and respond with subtle parallax.
 */
export function LiquidWallpaper() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 ... 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#060813]">
      {/* Ambient Deep Mesh Lighting */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 transition-transform duration-1000 ease-out"
        style={{
          top: '-15%',
          left: '-10%',
          background: 'radial-gradient(circle, #007AFF 0%, #5856D6 70%, transparent 100%)',
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`
        }}
      />

      <div 
        className="absolute w-[580px] h-[580px] rounded-full blur-[150px] opacity-35 transition-transform duration-1000 ease-out"
        style={{
          bottom: '-12%',
          right: '-8%',
          background: 'radial-gradient(circle, #FF2D55 0%, #AF52DE 65%, transparent 100%)',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`
        }}
      />

      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[130px] opacity-30 transition-transform duration-1000 ease-out"
        style={{
          top: '35%',
          right: '25%',
          background: 'radial-gradient(circle, #00C7BE 0%, #30B0C7 75%, transparent 100%)',
          transform: `translate(${mousePos.y * 20}px, ${mousePos.x * -20}px)`
        }}
      />

      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 transition-transform duration-1000 ease-out"
        style={{
          bottom: '20%',
          left: '15%',
          background: 'radial-gradient(circle, #FF9500 0%, #FF3B30 80%, transparent 100%)',
          transform: `translate(${mousePos.x * -18}px, ${mousePos.y * 18}px)`
        }}
      />

      {/* Floating Animated Fluid Blobs */}
      <div className="absolute top-[20%] left-[30%] w-72 h-72 rounded-full bg-gradient-to-tr from-ios-indigo/20 to-ios-blue/30 blur-[90px] animate-orb-float-1" />
      <div className="absolute bottom-[30%] right-[20%] w-80 h-80 rounded-full bg-gradient-to-br from-ios-pink/20 to-ios-purple/25 blur-[100px] animate-orb-float-2" />
      <div className="absolute top-[50%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-ios-cyan/25 to-ios-mint/20 blur-[85px] animate-orb-float-3" />

      {/* Subtle Apple-style noise grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
