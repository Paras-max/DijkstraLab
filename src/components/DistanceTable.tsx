import React from 'react';
import type { GraphData, NodeVisualState } from '../types/graph';

interface DistanceTableProps {
  graph: GraphData;
  sourceId: string;
  distances: Record<string, number>;
  predecessors: Record<string, string | null>;
  nodeStates: Record<string, NodeVisualState>;
  finalPath?: string[];
}

export const DistanceTable: React.FC<DistanceTableProps> = ({
  graph,
  sourceId,
  distances,
  predecessors,
  nodeStates,
  finalPath = [],
}) => {
  const pathSet = new Set(finalPath);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider">
          Distance & Predecessor Table
        </h4>
        <span className="text-[11px] text-slate-500 font-mono">
          Source: <strong className="text-emerald-400">{sourceId}</strong>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-medium">
              <th className="py-2 px-2.5">Node</th>
              <th className="py-2 px-2.5">Distance</th>
              <th className="py-2 px-2.5">Predecessor</th>
              <th className="py-2 px-2.5">State</th>
              <th className="py-2 px-2.5 text-right">In Path</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {graph.nodes.map((node) => {
              const dist = distances[node.id];
              const prev = predecessors[node.id];
              const state = nodeStates[node.id] || 'unvisited';
              const isInPath = pathSet.has(node.id);

              return (
                <tr
                  key={`dist-row-${node.id}`}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    isInPath ? 'bg-yellow-500/10' : ''
                  }`}
                >
                  <td className="py-2 px-2.5 font-bold text-slate-200">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isInPath
                            ? 'bg-yellow-400'
                            : state === 'visited'
                            ? 'bg-purple-400'
                            : state === 'relaxed'
                            ? 'bg-cyan-400'
                            : state === 'current'
                            ? 'bg-orange-400'
                            : 'bg-blue-500'
                        }`}
                      ></span>
                      {node.label}
                    </span>
                  </td>
                  <td className="py-2 px-2.5">
                    {dist === Infinity ? (
                      <span className="text-slate-600 font-sans">∞ (Unreached)</span>
                    ) : (
                      <span className="text-cyan-300 font-bold">{dist}</span>
                    )}
                  </td>
                  <td className="py-2 px-2.5 text-slate-300">
                    {prev ? (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                        {prev}
                      </span>
                    ) : node.id === sourceId ? (
                      <span className="text-emerald-400 text-[11px] font-sans">Source Node</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-2 px-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-sans uppercase font-semibold ${
                        state === 'path'
                          ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-500/40'
                          : state === 'current'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : state === 'relaxed'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : state === 'visited'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {state}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 text-right font-sans">
                    {isInPath ? (
                      <span className="text-yellow-400 font-bold text-[11px]">✓ Yes</span>
                    ) : (
                      <span className="text-slate-600 text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
