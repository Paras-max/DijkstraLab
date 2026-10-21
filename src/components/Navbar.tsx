import React from 'react';
import { Network } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 group cursor-default">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Network className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight flex items-center gap-2">
              DijkstraLab
            </span>
            <span className="text-[11px] text-slate-400">
              Shortest Path Algorithm Visualizer
            </span>
          </div>
        </div>

        {/* Sole Navigation Pill: Visualizer */}
        <nav className="flex items-center">
          <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Visualizer
          </span>
        </nav>
      </div>
    </header>
  );
};
