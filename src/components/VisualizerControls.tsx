import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Shuffle, Sparkles, Sliders, Settings2 } from 'lucide-react';
import type { GraphData } from '../types/graph';

interface VisualizerControlsProps {
  graph: GraphData;
  sourceId: string;
  destinationId: string;
  onSelectSource: (id: string) => void;
  onSelectDestination: (id: string) => void;
  onRunInstant: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onReset: () => void;
  onGenerateRandom: () => void;
  onResetToDefault: () => void;
  onOpenEditor: () => void;
  isPlaying: boolean;
  currentStepIndex: number;
  totalSteps: number;
  playbackSpeed: number;
  onChangeSpeed: (speedMs: number) => void;
  isComplete: boolean;
}

export const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  graph,
  sourceId,
  destinationId,
  onSelectSource,
  onSelectDestination,
  onRunInstant,
  onPlay,
  onPause,
  onNextStep,
  onPrevStep,
  onReset,
  onGenerateRandom,
  onResetToDefault,
  onOpenEditor,
  isPlaying,
  currentStepIndex,
  totalSteps,
  playbackSpeed,
  onChangeSpeed,
  isComplete,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-4">
      {/* Top Bar: Node Selectors, Primary Action Buttons, Graph Generator */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Source & Destination Pickers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <label htmlFor="source-select" className="text-xs font-medium text-slate-300">
              Source:
            </label>
            <select
              id="source-select"
              value={sourceId}
              onChange={(e) => onSelectSource(e.target.value)}
              className="bg-slate-900 text-emerald-400 font-bold text-sm rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-emerald-500"
            >
              {graph.nodes.map((n) => (
                <option key={`src-${n.id}`} value={n.id}>
                  Node {n.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <label htmlFor="dest-select" className="text-xs font-medium text-slate-300">
              Destination:
            </label>
            <select
              id="dest-select"
              value={destinationId}
              onChange={(e) => onSelectDestination(e.target.value)}
              className="bg-slate-900 text-rose-400 font-bold text-sm rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:border-rose-500"
            >
              {graph.nodes.map((n) => (
                <option key={`dst-${n.id}`} value={n.id}>
                  Node {n.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Execution Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRunInstant}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-lg shadow-indigo-950/50 transition-all active:scale-95"
            title="Calculate and display final optimal shortest path immediately"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Find Shortest Path
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-700 transition-all active:scale-95"
            title="Reset algorithm state without clearing graph"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            Reset State
          </button>
        </div>
      </div>

      {/* Second Bar: Step-by-Step Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow transition-all"
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow transition-all"
            >
              <Play className="w-4 h-4 fill-white" /> {currentStepIndex > 0 && !isComplete ? 'Resume' : 'Start Steps'}
            </button>
          )}

          <button
            onClick={onPrevStep}
            disabled={currentStepIndex <= 0}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
            title="Step backward"
          >
            <SkipBack className="w-3.5 h-3.5" /> Prev
          </button>

          <button
            onClick={onNextStep}
            disabled={totalSteps > 0 && currentStepIndex >= totalSteps - 1}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
            title="Step forward"
          >
            Next <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Step Progress Counter */}
          <div className="text-xs font-mono text-slate-400 px-2">
            Step: <span className="text-cyan-400 font-bold">{currentStepIndex >= 0 ? currentStepIndex + 1 : 0}</span>
            {totalSteps > 0 && <span className="text-slate-600"> / {totalSteps}</span>}
          </div>
        </div>

        {/* Speed Controls & Graph Management */}
        <div className="flex items-center gap-3">
          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-400">Speed:</span>
            {[
              { label: '0.5x', ms: 1400 },
              { label: '1x', ms: 800 },
              { label: '2x', ms: 350 },
            ].map((spd) => (
              <button
                key={spd.label}
                onClick={() => onChangeSpeed(spd.ms)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-all ${
                  playbackSpeed === spd.ms
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>

          {/* Random Graph & Default Graph */}
          <button
            onClick={onGenerateRandom}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
            title="Generate a new connected random graph"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            Random Graph
          </button>

          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
            title="Reset to the reference 7-node graph (A-G)"
          >
            Default (A–G)
          </button>

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 text-xs px-3 py-1.5 rounded-lg border border-cyan-800/60 transition-all"
            title="Add or remove edges and edit weights"
          >
            <Settings2 className="w-3.5 h-3.5" />
            Edit Graph
          </button>
        </div>
      </div>

      {/* Compact Technical State Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/60">
        <div className="flex items-center gap-4">
          <span>
            Vertices (V): <strong className="text-slate-200 font-mono">{graph.nodes.length}</strong>
          </span>
          <span>
            Edges (E): <strong className="text-slate-200 font-mono">{graph.edges.length}</strong>
          </span>
          <span>
            Graph Type: <strong className="text-slate-200">Weighted, Undirected</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Priority Queue:</span>
          <span className="text-cyan-400 font-mono font-medium">Binary Min-Heap</span>
          <span className="text-slate-600">|</span>
          <span>Execution:</span>
          <span className="text-emerald-400 font-mono">Local Browser (Client-side)</span>
        </div>
      </div>
    </div>
  );
};
