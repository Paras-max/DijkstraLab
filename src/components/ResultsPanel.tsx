import React from 'react';
import { Route, Clock, Zap, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { DijkstraResult } from '../types/graph';

interface ResultsPanelProps {
  result: DijkstraResult | null;
  sourceId: string;
  destinationId: string;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, sourceId, destinationId }) => {
  if (!result) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center flex flex-col items-center justify-center min-h-[160px]">
        <Route className="w-10 h-10 text-slate-600 mb-2 animate-pulse" />
        <h4 className="text-slate-300 font-semibold text-sm">Visualizer Ready</h4>
        <p className="text-slate-500 text-xs mt-1 max-w-sm">
          Select source and destination nodes above, then click <strong className="text-slate-400">"Find Shortest Path"</strong> or <strong className="text-slate-400">"Start Steps"</strong> to execute Dijkstra's algorithm.
        </p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>Execution Notice: Disconnected Route</span>
        </div>
        <p className="text-rose-200/90 text-xs font-mono">
          {result.errorMessage || `No connected path exists between "${sourceId}" and "${destinationId}".`}
        </p>
        <div className="text-slate-400 text-xs mt-2">
          Dijkstra terminates gracefully when all reachable components have been evaluated. Remaining unreachable nodes retain infinite distance (∞).
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
      {/* Route Badge and Total Weight */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
            Shortest Optimal Path
          </span>
          <div className="flex items-center flex-wrap gap-1.5">
            {result.path.map((nodeId, idx) => (
              <React.Fragment key={`path-seq-${nodeId}-${idx}`}>
                <span className="px-2.5 py-1 rounded-md bg-yellow-400 text-slate-950 font-bold font-mono text-sm shadow-sm border border-yellow-300">
                  {nodeId}
                </span>
                {idx < result.path.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-yellow-500/80" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-yellow-500/40 px-4 py-2 rounded-lg text-right">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-yellow-400 block">
            Total Path Weight
          </span>
          <span className="text-2xl font-bold font-mono text-white">
            {result.totalWeight}
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Nodes Visited</span>
          </div>
          <span className="text-base font-bold font-mono text-purple-300">
            {result.nodesVisitedCount}
          </span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Edge Checks</span>
          </div>
          <span className="text-base font-bold font-mono text-cyan-300">
            {result.edgeExaminationsCount}
          </span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Route className="w-3.5 h-3.5 text-yellow-400" />
            <span>Path Hops</span>
          </div>
          <span className="text-base font-bold font-mono text-yellow-300">
            {Math.max(0, result.path.length - 1)} hops
          </span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exec Time</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold font-mono text-emerald-300">
              {result.executionTimeMs} ms
            </span>
            <span className="text-[9px] text-slate-500 font-sans leading-none mt-0.5">
              Local Browser Measurement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
