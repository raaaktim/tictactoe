import React, { useEffect, useRef } from 'react';

/**
 * LiquidWallpaper - Mobile-Optimized Apple iOS Dynamic Wallpaper.
 * Uses lightweight radial gradients and direct CSS transform updates,
 * eliminating continuous React re-renders and heavy SVG turbulence filters.
 */
export function LiquidWallpaper() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Only listen to mouse parallax on desktop with mouse pointer
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const x = ((e.clientX / window.innerWidth) - 0.5) * 20;
          const y = ((e.clientY / window.innerHeight) - 0.5) * 20;
          bgRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#060813]">
      <div 
        ref={bgRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] transition-transform duration-700 ease-out will-change-transform"
      >
        {/* Soft High-Performance Ambient Radial Orbs */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-35"
          style={{
            top: '0%',
            left: '0%',
            background: 'radial-gradient(circle, rgba(0,122,255,0.45) 0%, rgba(88,86,214,0.2) 50%, transparent 75%)',
          }}
        />

        <div 
          className="absolute w-[550px] h-[550px] rounded-full opacity-30"
          style={{
            bottom: '5%',
            right: '0%',
            background: 'radial-gradient(circle, rgba(255,45,85,0.4) 0%, rgba(175,82,222,0.2) 50%, transparent 75%)',
          }}
        />

        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            top: '40%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(0,199,190,0.35) 0%, rgba(48,176,199,0.15) 50%, transparent 75%)',
          }}
        />

        <div 
          className="absolute w-[420px] h-[420px] rounded-full opacity-25"
          style={{
            top: '25%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(255,149,0,0.3) 0%, rgba(255,59,48,0.15) 50%, transparent 75%)',
          }}
        />
      </div>
    </div>
  );
}
