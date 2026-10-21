import React, { useState } from 'react';
import { GitCompare, Check, X, ShieldAlert } from 'lucide-react';
import { comparisonAlgorithms } from '../data/algorithmComparisonData';

export const AlgorithmComparison: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('dijkstra');

  return (
    <section id="algorithms" className="py-20 border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-semibold text-cyan-400 mb-3">
            <GitCompare className="w-3.5 h-3.5" />
            Comparative Paradigm Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comparison of Shortest-Path Algorithms
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Evaluation of classical and modern shortest-path techniques. Understand why no single algorithm is universally optimal across all graph topologies.
          </p>
        </div>

        {/* Responsive Master Comparison Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl mb-12 overflow-hidden">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Comprehensive Algorithm Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                  <th className="py-3 px-3.5">Algorithm</th>
                  <th className="py-3 px-3.5">Paradigm Type</th>
                  <th className="py-3 px-3.5">Time Complexity</th>
                  <th className="py-3 px-3.5">Space</th>
                  <th className="py-3 px-3.5">Negative Weights</th>
                  <th className="py-3 px-3.5">Primary Target Domain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {comparisonAlgorithms.map((algo) => {
                  const isSelected = selectedAlgoId === algo.id;
                  return (
                    <tr
                      key={algo.id}
                      onClick={() => setSelectedAlgoId(algo.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-600/15 border-l-4 border-l-cyan-400'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3.5 px-3.5 font-bold text-white font-sans">
                        <div className="flex flex-col">
                          <span className="text-sm text-cyan-300">{algo.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {algo.creatorOrOrigin}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3.5 text-slate-300 font-medium">
                        {algo.type}
                      </td>
                      <td className="py-3.5 px-3.5 font-mono text-cyan-300 font-bold">
                        {algo.timeComplexity}
                      </td>
                      <td className="py-3.5 px-3.5 font-mono text-slate-300">
                        {algo.spaceComplexity}
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                            algo.negativeWeights.includes('Supported')
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                              : algo.negativeWeights.includes('Unweighted')
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {algo.negativeWeights.includes('Supported') ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <X className="w-3 h-3 text-rose-400" />
                          )}
                          {algo.negativeWeights}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-slate-300 max-w-xs text-[11px] leading-relaxed">
                        {algo.optimalFor}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800/60 text-right">
            Click on any row to inspect deep-dive trade-offs below.
          </div>
        </div>

        {/* Selected Algorithm Deep Dive Card */}
        {(() => {
          const active = comparisonAlgorithms.find((a) => a.id === selectedAlgoId) || comparisonAlgorithms[0];
          return (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    Deep Dive Architecture
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">{active.name}</h3>
                  <p className="text-xs text-slate-400">{active.summary}</p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Runtime</span>
                  <span className="text-sm font-mono font-bold text-cyan-300">{active.timeComplexity}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                    <Check className="w-4 h-4" /> Core Advantages &amp; Strengths
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {active.keyStrengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
                    <ShieldAlert className="w-4 h-4" /> Practical Trade-Offs &amp; Limitations
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {active.keyLimitations.map((lim, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">✕</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
