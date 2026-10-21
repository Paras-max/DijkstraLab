import React, { useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, ChevronRight, ListOrdered } from 'lucide-react';
import type { AlgorithmStep } from '../types/graph';

interface AlgorithmLogProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onJumpToStep: (index: number) => void;
}

export const AlgorithmLog: React.FC<AlgorithmLogProps> = ({
  steps,
  currentStepIndex,
  onJumpToStep,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to active log entry
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('.log-active-item');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentStepIndex]);

  const getStepBadgeColor = (type: AlgorithmStep['type']) => {
    switch (type) {
      case 'INIT':
        return 'bg-blue-900/60 text-blue-300 border-blue-700';
      case 'EXTRACT_MIN':
        return 'bg-orange-900/60 text-orange-300 border-orange-700';
      case 'EXAMINE_EDGE':
        return 'bg-amber-900/40 text-amber-300 border-amber-800';
      case 'RELAX_EDGE':
        return 'bg-cyan-900/60 text-cyan-300 border-cyan-700 font-bold';
      case 'SKIP_EDGE':
        return 'bg-slate-800/80 text-slate-400 border-slate-700';
      case 'VISIT_NODE':
        return 'bg-purple-900/60 text-purple-300 border-purple-700';
      case 'RECONSTRUCT_PATH':
        return 'bg-yellow-900/60 text-yellow-300 border-yellow-700';
      case 'COMPLETE':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-700 font-bold';
      case 'NO_PATH':
        return 'bg-rose-900/60 text-rose-300 border-rose-700 font-bold';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Execution Event Log</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          {steps.length > 0 ? `${steps.length} discrete events recorded` : 'Idle'}
        </span>
      </div>

      {steps.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs flex flex-col items-center justify-center">
          <ListOrdered className="w-6 h-6 text-slate-600 mb-1" />
          <span>No execution events yet. Run the visualizer to view step-by-step logs.</span>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1 text-xs font-mono scrollbar-thin"
        >
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;

            return (
              <div
                key={`step-log-${step.stepNumber}-${idx}`}
                onClick={() => onJumpToStep(idx)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'log-active-item bg-slate-800/95 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/30'
                    : isPassed
                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40'
                    : 'bg-slate-950/20 border-slate-900 text-slate-500 hover:bg-slate-900/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-bold">
                      #{step.stepNumber}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold border ${getStepBadgeColor(
                        step.type
                      )}`}
                    >
                      {step.type.replace('_', ' ')}
                    </span>
                    {step.currentNodeId && (
                      <span className="text-slate-300 text-[11px]">
                        Node: <strong className="text-white">{step.currentNodeId}</strong>
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <span className="flex items-center gap-1 text-cyan-400 font-sans font-bold text-[10px]">
                      <ChevronRight className="w-3 h-3" /> ACTIVE STEP
                    </span>
                  )}
                  {isPassed && (
                    <CheckCircle2 className="w-3 h-3 text-slate-600" />
                  )}
                </div>

                <p className="text-[11px] leading-relaxed text-slate-300 font-sans mt-0.5">
                  {step.description}
                </p>

                {/* Priority Queue Snapshot at this step */}
                {step.pqSnapshot && step.pqSnapshot.length > 0 && (
                  <div className="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                    <span className="text-slate-500 font-semibold font-sans">Min-Heap PQ:</span>
                    {step.pqSnapshot.slice(0, 5).map((pqItem, qIdx) => (
                      <span
                        key={`pq-${pqItem.nodeId}-${qIdx}`}
                        className="px-1 py-0.2 rounded bg-slate-900 border border-slate-700/80 text-cyan-300 font-mono"
                      >
                        {pqItem.nodeId}:{pqItem.distance}
                      </span>
                    ))}
                    {step.pqSnapshot.length > 5 && (
                      <span className="text-slate-500 text-[9px]">
                        +{step.pqSnapshot.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
