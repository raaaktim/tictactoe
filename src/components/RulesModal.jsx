import React, { useState } from 'react';
import { BookOpen, X, CheckCircle2, Zap, Target, Lightbulb, Grid3X3, Grid2X2 } from 'lucide-react';

export function RulesModal({ isOpen, onClose, initialGridSize = 6, onTap }) {
  const [activeTab, setActiveTab] = useState(initialGridSize === 6 ? '6x6' : '4x4');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="w-full max-w-lg ios-glass-card p-5 sm:p-7 flex flex-col max-h-[90vh] overflow-y-auto shadow-[0_30px_80px_rgba(0,0,0,0.85)] border border-white/25 animate-bubble text-left"
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ios-cyan/20 border border-ios-cyan/40 flex items-center justify-center text-ios-cyan shadow-[0_0_15px_rgba(50,173,230,0.3)]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Rules & Strategy Guide
              </h2>
              <p className="text-[11px] text-white/50 font-medium">
                Master the mechanics of Liquid Glass Tic-Tac-Toe
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (onTap) onTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all active:scale-90 cursor-pointer"
            aria-label="Close Rules"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher for 6x6 vs 4x4 */}
        <div className="relative flex p-1 rounded-2xl ios-glass-pill w-full mb-4 backdrop-blur-xl">
          <div 
            className="absolute top-1 bottom-1 rounded-xl bg-white/20 shadow-md backdrop-blur-md border border-white/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              left: activeTab === '6x6' ? '4px' : '50%',
              width: 'calc(50% - 4px)',
            }}
          />

          <button
            onClick={() => {
              if (onTap) onTap();
              setActiveTab('6x6');
            }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === '6x6' ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5 text-ios-purple" />
            <span>6 × 6 Master Section</span>
          </button>

          <button
            onClick={() => {
              if (onTap) onTap();
              setActiveTab('4x4');
            }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === '4x4' ? 'text-white drop-shadow-sm' : 'text-white/60 hover:text-white/90'
            }`}
          >
            <Grid2X2 className="w-3.5 h-3.5 text-ios-cyan" />
            <span>4 × 4 Classic Section</span>
          </button>
        </div>

        {/* Tab 1: 6x6 Master Rules */}
        {activeTab === '6x6' ? (
          <div className="space-y-3.5 text-xs sm:text-sm text-white/80">
            {/* Core Objective */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Target className="w-4 h-4 text-ios-mint" />
                <span>Win Condition: Connect 4 in a Row</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Connect <strong className="text-white font-semibold">4 of your marks</strong> (horizontally, vertically, or diagonally) across the 36 tiles before your opponent does.
              </p>
            </div>

            {/* Why 4-in-a-row */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Zap className="w-4 h-4 text-ios-yellow" />
                <span>54 Intersecting Winning Lines</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-cyan text-base">18</div>
                  <div className="text-[10px] text-white/60 uppercase">Horizontal</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-pink text-base">18</div>
                  <div className="text-[10px] text-white/60 uppercase">Vertical</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-purple text-base">18</div>
                  <div className="text-[10px] text-white/60 uppercase">Diagonal</div>
                </div>
              </div>
              <p className="text-[11px] text-white/50 mt-2">
                Unlike traditional 3×3 which often ends in draws, 6×6 offers 54 distinct lines, making every game tactical and dynamic.
              </p>
            </div>

            {/* Pro Tactics */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Lightbulb className="w-4 h-4 text-ios-orange" />
                <span>Tactical Secrets & Tips</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/75 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ios-mint mt-0.5 shrink-0" />
                  <span><strong className="text-white">Open-Ended 3:</strong> Getting 3 marks with both sides empty guarantees victory on the next turn because your opponent can only block one side.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ios-mint mt-0.5 shrink-0" />
                  <span><strong className="text-white">Fork Double Threat:</strong> Position marks to form two separate 3-in-a-row threats simultaneously.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ios-mint mt-0.5 shrink-0" />
                  <span><strong className="text-white">Golden Center:</strong> The central 4 tiles intersect the highest density of diagonals and lines.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Tab 2: 4x4 Section Rules */
          <div className="space-y-3.5 text-xs sm:text-sm text-white/80">
            {/* Core Objective */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Target className="w-4 h-4 text-ios-cyan" />
                <span>Win Condition: Complete Full Line of 4</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Connect <strong className="text-white font-semibold">4 in a row</strong> from edge to edge across any row, column, or diagonal on the 16-tile grid.
              </p>
            </div>

            {/* Winning Lines */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10">
              <div className="flex items-center gap-2 font-bold text-white mb-1">
                <Zap className="w-4 h-4 text-ios-yellow" />
                <span>10 Winning Alignments</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-blue text-base">4</div>
                  <div className="text-[10px] text-white/60 uppercase">Full Rows</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-pink text-base">4</div>
                  <div className="text-[10px] text-white/60 uppercase">Full Columns</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="font-extrabold text-ios-purple text-base">2</div>
                  <div className="text-[10px] text-white/60 uppercase">Diagonals</div>
                </div>
              </div>
            </div>

            {/* Tactics */}
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Lightbulb className="w-4 h-4 text-ios-orange" />
                <span>4×4 Strategy</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/75 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ios-cyan mt-0.5 shrink-0" />
                  <span><strong className="text-white">Center Quad:</strong> Occupying the center 4 tiles creates diagonal and lateral leverage.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ios-cyan mt-0.5 shrink-0" />
                  <span><strong className="text-white">Fast Counter-Play:</strong> Block opponent 3-in-a-row threats immediately before they seal the 4th cell.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => {
            if (onTap) onTap();
            onClose();
          }}
          className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-ios-blue to-ios-indigo hover:from-ios-blue/90 hover:to-ios-indigo/90 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-ios-blue/30 border border-white/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <span>Got it, let's play!</span>
        </button>
      </div>
    </div>
  );
}
