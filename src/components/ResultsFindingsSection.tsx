import React from 'react';
import { CheckCircle2, ShieldCheck, Layers, MousePointer, AlertCircle, FileCheck } from 'lucide-react';

export const ResultsFindingsSection: React.FC = () => {
  return (
    <section id="results" className="py-20 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400 mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            Empirical Results &amp; Verification
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Results, Findings &amp; Validation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Summary of implementation validation, algorithm correctness testing, interactive capabilities, and identified technical limitations.
          </p>
        </div>

        {/* 5 Result Finding Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 1. Functional Validation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">1. Functional Validation</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                The core algorithm executes accurately in pure client-side JavaScript/TypeScript. The binary min-heap reliably extracts minimum tentative distances in <code className="text-cyan-300 font-mono">O(log V)</code> time, maintaining heap invariance across all insertions and extractions.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Correct shortest-path sequence in source-to-dest order.</li>
                <li>Exact path weight calculated as edge sum.</li>
                <li>Stale priority-queue entries ignored safely.</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
              Status: Verified Client Implementation
            </div>
          </div>

          {/* 2. Correctness Testing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">2. Correctness Testing</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Validated against 10 comprehensive automated unit test fixtures covering edge cases:
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Direct routes vs intermediate multi-hop paths.</li>
                <li>Graphs with cycles and dense mesh alternatives.</li>
                <li>Source equal to destination (cost = 0).</li>
                <li>Disconnected destination components (∞ weight).</li>
                <li>Rejection of invalid negative edge weights.</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
              Suite: 10 / 10 Passing Vitest Cases
            </div>
          </div>

          {/* 3. Graph Visualization */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">3. Graph Visualization</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Provides discrete visual feedback of algorithm state machines:
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Real-time color legend distinguishing unvisited, examined, relaxed, visited, and final shortest-path nodes.</li>
                <li>Pill labels offset perpendicularly to prevent edge text clipping.</li>
                <li>Animated glowing highlights on optimal path edges (red) and path nodes (yellow).</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400">
              Engine: Responsive SVG Canvas
            </div>
          </div>

          {/* 4. User Interaction */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center mb-4">
                <MousePointer className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">4. User Interaction</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Rich interactive capabilities enabling students and researchers to experiment with graph topologies:
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>Drag-and-drop node positioning with coordinate persistence.</li>
                <li>Source and destination re-assignment via one-click context menus.</li>
                <li>Step-by-step playback with forward, backward, pause, and speed adjustment (0.5x, 1x, 2x).</li>
                <li>Custom edge addition, weight editing, and deletion modal.</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-indigo-400">
              Controls: Interactive &amp; Replayable
            </div>
          </div>

          {/* 5. Identified Limitations */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">5. Technical Limitations</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Honest characterization of scope boundaries:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Negative Edge Weights:</strong>
                  Dijkstra's greedy paradigm inherently fails if negative weights exist. Bellman-Ford is needed for negative cost graphs.
                </div>
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Static Topology Assumption:</strong>
                  Weights are fixed per execution run. Real-world traffic fluctuations require dynamic re-weighting recalculation.
                </div>
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Local Browser Timing:</strong>
                  Execution time reflects local client JavaScript runtime (~0.1ms for small graphs) rather than large-scale server benchmarks.
                </div>
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Uninformed Omnidirectional Search:</strong>
                  Explores outwards in circular wavefronts, unlike A* which uses directional heuristics to prune non-target branches.
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
              Scope: Academic Pedagogical Simulator
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
