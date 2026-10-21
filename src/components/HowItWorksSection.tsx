import React, { useState } from 'react';
import { BookOpen, Lightbulb, ArrowRight, ShieldAlert } from 'lucide-react';
import { graphTheoryConcepts, corePrinciples, verifiableWalkthrough } from '../data/educationalData';

export const HowItWorksSection: React.FC = () => {
  const [activePrincipleStep, setActivePrincipleStep] = useState<number>(1);
  const [activeWalkthroughIndex, setActiveWalkthroughIndex] = useState<number>(0);

  return (
    <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-xs font-semibold text-cyan-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Theoretical Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the Algorithm Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Understand the graph theoretical mechanics, greedy invariant, edge relaxation proofs, and mathematical step trace.
          </p>
        </div>

        {/* 1. Graph Theory Core Concepts */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Graph Theory Fundamentals
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {graphTheoryConcepts.map((concept) => (
              <div
                key={concept.term}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-cyan-300 font-mono mb-1.5">
                    {concept.term}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {concept.definition}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                  <strong>Role:</strong> {concept.significance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Six Core Principles */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
            The 6 Core Algorithmic Principles
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Principle Selectors */}
            <div className="flex flex-col gap-2">
              {corePrinciples.map((principle) => {
                const isActive = activePrincipleStep === principle.step;
                return (
                  <button
                    key={principle.step}
                    onClick={() => setActivePrincipleStep(principle.step)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/40'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center font-mono ${
                          isActive ? 'bg-white text-blue-700' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {principle.step}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm">{principle.title}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Principle Detail Card */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              {(() => {
                const p = corePrinciples.find((item) => item.step === activePrincipleStep)!;
                return (
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        Principle #{p.step} of 6
                      </span>
                      {p.formula && (
                        <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-800">
                          {p.formula}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3">{p.title}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {p.description}
                    </p>

                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 text-xs block mb-1 font-sans">
                          Greedy Invariant Intuition:
                        </strong>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {p.greedyIntuition}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 text-xs text-slate-500 mt-6">
                <span>Dijkstra's Invariant: Finalized distances remain immutable and strictly optimal.</span>
                <span className="font-mono text-cyan-400">Step {activePrincipleStep} / 6</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mathematically Verifiable 4-Node Walkthrough */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                Mathematically Verifiable Walkthrough
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {verifiableWalkthrough.graphDescription}
              </p>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {verifiableWalkthrough.steps.map((st, i) => (
                <button
                  key={`wt-btn-${st.step}`}
                  onClick={() => setActiveWalkthroughIndex(i)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                    activeWalkthroughIndex === i
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Step {st.step}
                </button>
              ))}
            </div>
          </div>

          {/* Step Detail Table & Explanation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden">
            {(() => {
              const currentStep = verifiableWalkthrough.steps[activeWalkthroughIndex];
              return (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        Trace Phase: Step {currentStep.step}
                      </span>
                      <h4 className="text-base font-bold text-white">{currentStep.action}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400">Extracted Node:</span>
                      <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-300 font-mono font-bold border border-slate-800">
                        {currentStep.extractedNode}
                      </span>
                    </div>
                  </div>

                  {/* Math Grid for tentative distances */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['A', 'B', 'C', 'D'].map((nodeLetter) => {
                      const dist = (currentStep.tentativeDistances as Record<string, string>)[nodeLetter];
                      const prev = (currentStep.predecessors as Record<string, string>)[nodeLetter];
                      const isVisited = currentStep.visitedSet.includes(nodeLetter);

                      return (
                        <div
                          key={`wt-box-${nodeLetter}`}
                          className={`p-3 rounded-xl border flex flex-col justify-between ${
                            isVisited
                              ? 'bg-purple-950/20 border-purple-800/40 text-purple-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm font-mono text-white">
                              Node {nodeLetter}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-sans uppercase ${
                                isVisited
                                  ? 'bg-purple-900/60 text-purple-300'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isVisited ? 'Finalized' : 'Tentative'}
                            </span>
                          </div>
                          <div className="font-mono text-xs mt-2 flex items-center justify-between">
                            <span className="text-slate-400">dist:</span>
                            <span className="font-bold text-cyan-300 text-sm">{dist}</span>
                          </div>
                          <div className="font-mono text-xs flex items-center justify-between mt-1">
                            <span className="text-slate-400">prev:</span>
                            <span className="text-slate-200">{prev}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* PQ State & Explanation */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <strong className="text-slate-200">Priority Queue contents:</strong>
                      {currentStep.pqState.length > 0 ? (
                        <div className="flex items-center gap-1.5 flex-wrap font-mono">
                          {currentStep.pqState.map((pqEntry, idx) => (
                            <span
                              key={`pq-walk-${idx}`}
                              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs"
                            >
                              {pqEntry}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono">Empty (Terminated)</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {currentStep.explanation}
                    </p>
                  </div>
                </div>
              );
            })()}

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-emerald-400 font-medium">
              💡 {verifiableWalkthrough.conclusion}
            </div>
          </div>
        </div>

        {/* 4. Critical Limitation: Negative Edge Weights */}
        <div className="bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-900/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-900/40 border border-rose-700 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Fundamental Limitation: Non-Negative Edge Weight Requirement
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Dijkstra's algorithm relies on the <strong>Greedy Choice Property</strong>: once a node is extracted from the priority queue and marked visited, its distance is assumed to be forever optimal. This assumption holds strictly true <em>only</em> when all edge weights are non-negative (w(u, v) ≥ 0).
              </p>
              <div className="bg-slate-950/80 border border-rose-900/40 p-4 rounded-xl text-xs text-slate-400 space-y-2">
                <p>
                  <strong className="text-rose-300">Why it fails:</strong> If a graph contains a negative edge (e.g. -5), a previously finalized node could have its distance improved later by taking a path through the negative edge. Because Dijkstra never re-evaluates finalized nodes, it will fail to discover this shorter path and return an incorrect result.
                </p>
                <p>
                  <strong className="text-rose-300">Negative Cycles:</strong> If a directed graph has a cycle whose total weight is negative, an algorithm could loop infinitely to reduce the distance to -∞. Dijkstra cannot detect negative cycles; for this, the <strong>Bellman–Ford Algorithm</strong> (complexity O(V·E)) must be used instead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
