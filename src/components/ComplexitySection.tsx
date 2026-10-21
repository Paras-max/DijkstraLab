import React from 'react';
import { Cpu, Layers, HardDrive, Zap } from 'lucide-react';

export const ComplexitySection: React.FC = () => {
  return (
    <section id="complexity" className="py-20 border-t border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-xs font-semibold text-indigo-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Asymptotic Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Complexity &amp; Performance Analysis
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Formal mathematical derivation of time and space complexity across priority-queue architectures and graph representations.
          </p>
        </div>

        {/* Complexity Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Binary Min-Heap (Our Implementation) */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-800">
                  Current Engine
                </span>
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Binary Min-Heap + Adj List</h3>
              <div className="text-3xl font-extrabold font-mono text-cyan-300 my-3">
                O((V + E) log V)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optimal for sparse graphs where <code className="text-cyan-400">E ≪ V²</code> (such as metropolitan road networks and internet router topographies).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Space: <strong className="text-slate-200">O(V + E)</strong>
            </div>
          </div>

          {/* Card 2: Simple Unordered Array */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px] font-bold">
                  Baseline Linear Scan
                </span>
                <Layers className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Unordered Array + Matrix</h3>
              <div className="text-3xl font-extrabold font-mono text-amber-300 my-3">
                O(V²)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Faster on extremely dense graphs where <code className="text-amber-400">E ≈ V²</code> due to zero priority-queue pointer manipulation overhead.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Space: <strong className="text-slate-200">O(V²)</strong>
            </div>
          </div>

          {/* Card 3: Fibonacci Heap (Theoretical) */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-400 font-mono text-[11px] font-bold border border-purple-800">
                  Theoretical Bound
                </span>
                <HardDrive className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Fibonacci Heap</h3>
              <div className="text-3xl font-extrabold font-mono text-purple-300 my-3">
                O(E + V log V)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Achieves amortized <code className="text-purple-400">O(1)</code> decrease-key operations, but possesses massive constant factor overhead in practice.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Space: <strong className="text-slate-200">O(V + E)</strong>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Asymptotic Breakdown of Priority Queue Operations
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Implementation Structure</th>
                  <th className="py-3 px-4">Extract-Min Cost</th>
                  <th className="py-3 px-4">Relaxation / Insert Cost</th>
                  <th className="py-3 px-4">Total Time Complexity</th>
                  <th className="py-3 px-4">Recommended Graph Topology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-200 font-sans font-bold">Unordered Array</td>
                  <td className="py-3 px-4 text-amber-300">O(V)</td>
                  <td className="py-3 px-4 text-emerald-300">O(1)</td>
                  <td className="py-3 px-4 font-bold text-amber-300">O(V² + E) = O(V²)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Dense graphs (E ≈ V²)</td>
                </tr>
                <tr className="bg-cyan-950/20 hover:bg-cyan-950/30">
                  <td className="py-3 px-4 text-cyan-200 font-sans font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Binary Min-Heap (This App)
                  </td>
                  <td className="py-3 px-4 text-cyan-300">O(log V)</td>
                  <td className="py-3 px-4 text-cyan-300">O(log V)</td>
                  <td className="py-3 px-4 font-bold text-cyan-300">O((V + E) log V)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Sparse graphs (E ≪ V²), Roads, Networks</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-purple-200 font-sans font-bold">Fibonacci Heap</td>
                  <td className="py-3 px-4 text-purple-300">O(log V) (amortized)</td>
                  <td className="py-3 px-4 text-emerald-300">O(1) (amortized)</td>
                  <td className="py-3 px-4 font-bold text-purple-300">O(E + V log V)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Massive graphs in theoretical benchmarks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <strong className="text-white block mb-1">Definitions:</strong>
              <p className="text-slate-400 leading-relaxed font-mono">
                V = Total number of vertices (nodes) in graph G.<br />
                E = Total number of weighted edges connecting vertices in G.
              </p>
            </div>
            <div>
              <strong className="text-white block mb-1">Adjacency List vs Matrix Space Trade-Off:</strong>
              <p className="text-slate-400 leading-relaxed">
                Adjacency lists use <code className="text-cyan-400 font-mono">O(V + E)</code> memory, storing only existing links. An adjacency matrix requires a fixed <code className="text-amber-400 font-mono">O(V²)</code> 2D array, which wastes massive RAM on sparse road maps with millions of nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
