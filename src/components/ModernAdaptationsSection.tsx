import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, ShieldAlert } from 'lucide-react';
import { modernAdaptations } from '../data/modernAdaptationsData';

export const ModernAdaptationsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(modernAdaptations[0].id);

  return (
    <section id="adaptations" className="py-20 border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Frontier Graph Computing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Modern Adaptations &amp; Hybrid Paradigms
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            How modern computer scientists and engineers extend Dijkstra's classical foundations for dynamic, traffic-aware, heuristic, and AI-driven networks.
          </p>
        </div>

        {/* Disclaimer / Academic Note */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Research &amp; Future Scope Taxonomy:</strong>
            <p className="mt-0.5 leading-relaxed">
              These paradigms represent academic and industrial adaptations surveyed in modern literature. They are discussed here as research models and design patterns rather than active client-side neural nets.
            </p>
          </div>
        </div>

        {/* 2-Column Interactive Adaptation Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Adaptation List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {modernAdaptations.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans">{item.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.underlyingIdea}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card */}
          <div className="lg:col-span-7">
            {(() => {
              const active = modernAdaptations.find((m) => m.id === selectedId) || modernAdaptations[0];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 sticky top-24">
                  {/* Card Title & Header */}
                  <div className="pb-4 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                        {active.category} Adaptation
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-mono">
                        {active.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                  </div>

                  {/* Core Conceptual Sections */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <strong className="text-white text-xs block mb-1 font-sans">
                        Underlying Algorithmic Concept:
                      </strong>
                      <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                        {active.underlyingIdea}
                      </p>
                    </div>

                    <div>
                      <strong className="text-cyan-400 text-xs block mb-1 font-sans">
                        Mathematical Relation to Dijkstra's Shortest Path:
                      </strong>
                      <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                        {active.shortestPathRelation}
                      </p>
                    </div>
                  </div>

                  {/* Benefits & Limitations Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-900/40">
                      <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-4 h-4" /> Potential Benefits
                      </h5>
                      <ul className="space-y-1.5 text-slate-300">
                        {active.potentialBenefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-900/40">
                      <h5 className="font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                        <ShieldAlert className="w-4 h-4" /> Challenges &amp; Trade-Offs
                      </h5>
                      <ul className="space-y-1.5 text-slate-300">
                        {active.limitationsAndChallenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">·</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Practical Use Case */}
                  <div className="pt-4 border-t border-slate-800 text-xs flex items-start gap-2 text-slate-400">
                    <span className="font-bold text-white shrink-0">Industrial Benchmark:</span>
                    <span className="text-slate-300">{active.relevantUseCase}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
