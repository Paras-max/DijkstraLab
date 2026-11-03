import React from 'react';
import { Network, Activity, Truck } from 'lucide-react';

export type NavTab = 'visualizer' | 'darkstore';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => onSelectTab('visualizer')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Network className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight flex items-center gap-2">
              DijkstraLab
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-normal">
                v2.0
              </span>
            </span>
            <span className="text-[11px] text-slate-400">
              Interactive Shortest Path & Quick-Commerce Simulator
            </span>
          </div>
        </div>

        {/* Dual Mode Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onSelectTab('visualizer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'visualizer'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 ring-1 ring-blue-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Algorithm Visualizer</span>
          </button>

          <button
            onClick={() => onSelectTab('darkstore')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'darkstore'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50 ring-1 ring-emerald-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Smart Dark Store Finder</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-extrabold uppercase">
              New
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
