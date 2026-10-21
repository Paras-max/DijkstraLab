import React from 'react';
import { Sparkles, BookOpen, GitFork, Cpu, Compass, Activity, ShieldCheck, GraduationCap } from 'lucide-react';

interface HeroProps {
  onExploreVisualizer: () => void;
  onLearnAlgorithm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreVisualizer, onLearnAlgorithm }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 overflow-hidden">
      {/* Decorative gradient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-violet-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Academic Context Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner text-xs text-slate-300">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">Vidyalankar Institute of Technology (VIT)</span>
            <span className="text-slate-500">·</span>
            <span>Dept. of Electronics &amp; Computer Science</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400 font-mono">AOA Sem V (Div A)</span>
          </div>
        </div>

        {/* Main Title & Hero Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Find the Shortest Path.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Understand the Algorithm.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            An interactive exploration of Dijkstra's Algorithm, graph theory, shortest-path optimization, and modern routing techniques.
          </p>

          {/* Functional Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={onExploreVisualizer}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <GitFork className="w-4 h-4 text-cyan-300" />
              Explore Visualizer
            </button>

            <button
              onClick={onLearnAlgorithm}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Learn the Algorithm
            </button>
          </div>
        </div>

        {/* Graphical Preview of a Weighted Graph with Highlighted Path */}
        <div className="relative max-w-3xl mx-auto mb-16 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-slate-200">Interactive Preview: A → C → F</span>
            </div>
            <span className="font-mono text-yellow-400 font-bold">Optimal Cost: 9</span>
          </div>

          <svg viewBox="0 0 600 200" className="w-full h-auto py-2">
            <defs>
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(51,65,85,0.15)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="600" height="200" fill="transparent" />
            <rect width="600" height="200" fill="url(#hero-grid)" />

            {/* Edges */}
            <line x1="100" y1="100" x2="250" y2="40" stroke="#475569" strokeWidth="2" />
            <line x1="100" y1="100" x2="250" y2="160" stroke="#ef4444" strokeWidth="4" />
            <line x1="250" y1="40" x2="400" y2="40" stroke="#475569" strokeWidth="2" />
            <line x1="250" y1="160" x2="400" y2="160" stroke="#475569" strokeWidth="2" />
            <line x1="250" y1="160" x2="500" y2="100" stroke="#ef4444" strokeWidth="4" />
            <line x1="400" y1="40" x2="500" y2="100" stroke="#475569" strokeWidth="2" />

            {/* Edge Weight Badges */}
            <g transform="translate(160, 60)">
              <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#0f172a" stroke="#334155" />
              <text x="0" y="3" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">6</text>
            </g>
            <g transform="translate(160, 140)">
              <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#450a0a" stroke="#ef4444" />
              <text x="0" y="3" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">3</text>
            </g>
            <g transform="translate(370, 140)">
              <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#450a0a" stroke="#ef4444" />
              <text x="0" y="3" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">6</text>
            </g>
            <g transform="translate(460, 60)">
              <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#0f172a" stroke="#334155" />
              <text x="0" y="3" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">7</text>
            </g>

            {/* Nodes */}
            {/* Node A (Source) */}
            <circle cx="100" cy="100" r="18" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
            <text x="100" y="105" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="13">A</text>

            {/* Node B */}
            <circle cx="250" cy="40" r="18" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
            <text x="250" y="45" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">B</text>

            {/* Node C (Path) */}
            <circle cx="250" cy="160" r="18" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
            <text x="250" y="165" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="13">C</text>

            {/* Node D */}
            <circle cx="400" cy="40" r="18" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
            <text x="400" y="45" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">D</text>

            {/* Node E */}
            <circle cx="400" cy="160" r="18" fill="#a855f7" stroke="#7e22ce" strokeWidth="2.5" />
            <text x="400" y="165" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">E</text>

            {/* Node F (Destination) */}
            <circle cx="500" cy="100" r="18" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
            <text x="500" y="105" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="13">F</text>
          </svg>
        </div>

        {/* 4 Feature Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Interactive Visualization</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Step-by-step playback with min-heap priority queue tracing, node relaxation, and real-time state logs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Algorithm Analysis</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Mathematical proofs of optimality, time &amp; space complexity trade-offs, and negative-weight limitations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Research &amp; Modern Adaptations</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Literature synthesis of 5 peer-reviewed papers (2017–2025), dynamic edge weighting, and AI-assisted routing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Real-World Applications</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              GPS road routing, telecommunications OSPF protocols, autonomous robot navigation, and industrial supply chains.
            </p>
          </div>
        </div>

        {/* Project Overview: Problem Statement, Motivation, Objectives */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Problem Statement
              </span>
              <h4 className="text-white font-semibold text-sm mb-2">The Shortest Path Challenge</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Finding the minimum-cost route between two points in a weighted network is a central problem in graph theory and network engineering. As networks expand, brute-force enumeration fails exponentially, necessitating greedy polynomial algorithms.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                Project Motivation
              </span>
              <h4 className="text-white font-semibold text-sm mb-2">Bridging Theory &amp; Practice</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abstract mathematical proofs often obscure the step-by-step mechanical intuition of edge relaxation. This project bridges theoretical computer science with visual pedagogical simulation and contemporary academic literature.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Core Objectives
              </span>
              <h4 className="text-white font-semibold text-sm mb-2">Synthesis &amp; Verification</h4>
              <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                <li>Implement binary min-heap Dijkstra in TypeScript.</li>
                <li>Visualize real algorithm events step-by-step.</li>
                <li>Compare 6 foundational shortest-path algorithms.</li>
                <li>Synthesize 5 contemporary research papers (2017–2025).</li>
              </ul>
            </div>
          </div>

          {/* Compact Technical Overview */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-300">Technical Specifications:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
              <span>Algorithm: <strong className="text-slate-200">Dijkstra's (Min-Heap)</strong></span>
              <span className="text-slate-700">|</span>
              <span>Graph: <strong className="text-slate-200">Weighted, Undirected</strong></span>
              <span className="text-slate-700">|</span>
              <span>Default Nodes: <strong className="text-slate-200">7 Nodes (A–G)</strong></span>
              <span className="text-slate-700">|</span>
              <span>Renderer: <strong className="text-slate-200">Interactive SVG Engine</strong></span>
              <span className="text-slate-700">|</span>
              <span>Execution: <strong className="text-emerald-400">Browser-based JavaScript</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
