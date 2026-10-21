import React, { useState } from 'react';
import { BookOpen, Bookmark, Award } from 'lucide-react';
import { researchPapers } from '../data/researchData';

export const ResearchSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Classical Shortest-Path Algorithms',
    'Transportation & Road Networks',
    'Industrial Logistics',
    'Adjustable & Dynamic Weights',
    'AI-Assisted & Hybrid Methods',
  ];

  const filteredPapers =
    selectedCategory === 'ALL'
      ? researchPapers
      : researchPapers.filter((p) => p.category === selectedCategory);

  return (
    <section id="research" className="py-20 border-t border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-xs font-semibold text-purple-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Academic Literature Synthesis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research &amp; Literature Review
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Synthesizing five peer-reviewed studies (2017–2025) investigating Dijkstra's algorithm, adjustable link metrics, industrial logistics, and emerging AI adaptations.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-900/50 inline-block text-xs text-purple-200">
            <strong>Key Study:</strong> <em>"An Integrated Study on Dijkstra's Algorithm and Its Modern Adaptations for Network Optimisation"</em> — Dr. Akshatha Bhat (2024)
          </div>
        </div>

        {/* Academic Disambiguation Notice */}
        <div className="mb-10 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Academic Integrity &amp; Scope Distinction:</strong>
            <p className="mt-0.5 leading-relaxed">
              The claims, network topologies, and empirical metrics summarized in this review reflect findings reported in published external literature (2017–2025). The interactive simulator in Section 2 is an independent client-side educational implementation of Dijkstra's algorithm running in your browser.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'ALL' ? 'All Five Papers (2017–2025)' : cat}
            </button>
          ))}
        </div>

        {/* 1. Research Matrix Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12 overflow-hidden">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            Synthesis Research Matrix (2017–2025)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60">
                  <th className="py-3 px-3.5">Study Title &amp; Authors</th>
                  <th className="py-3 px-3.5">Year</th>
                  <th className="py-3 px-3.5">Publication Venue</th>
                  <th className="py-3 px-3.5">Classification</th>
                  <th className="py-3 px-3.5">Reported Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-3.5 font-medium text-white max-w-xs">
                      <div className="font-semibold text-slate-200">{paper.title}</div>
                      <div className="text-[11px] text-purple-300 mt-0.5">{paper.authors}</div>
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-cyan-400 font-bold">
                      {paper.year}
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-400 text-[11px]">
                      <em>{paper.journal}</em> {paper.volumeIssue ? `(${paper.volumeIssue})` : ''}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-800">
                        {paper.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-slate-300 text-xs leading-relaxed max-w-sm">
                      {paper.mainContribution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Formal Academic Citations List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-purple-400" />
            Formal References (APA 7th Format)
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Preserved directly from the project report literature survey without fabricated DOIs or artificial alterations.
          </p>

          <div className="space-y-4">
            {researchPapers.map((p, idx) => (
              <div
                key={`ref-item-${p.id}`}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-3"
              >
                <span className="font-mono font-bold text-purple-400 shrink-0">[{idx + 1}]</span>
                <div>
                  <p>{p.citationString}</p>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-4">
                    <span>
                      <strong>Thematic Focus:</strong> {p.researchFocus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
