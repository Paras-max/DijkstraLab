import React from 'react';
import { Navigation, Truck, Cpu, Bot, Share2 } from 'lucide-react';
import { applicationCards, type ApplicationCard } from '../data/applicationsData';

export const ApplicationsSection: React.FC = () => {

  const getIcon = (name: ApplicationCard['iconName']) => {
    switch (name) {
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-cyan-400" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Navigation className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="applications" className="py-20 border-t border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400 mb-3">
            <Share2 className="w-3.5 h-3.5" />
            Practical Implementations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real-World Applications of Dijkstra's Algorithm
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            From city road grids and global Internet fiber backbones to autonomous warehouse robots and industrial supply chains.
          </p>
        </div>

        {/* 5 Real World Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {applicationCards.map((app) => (
            <div
              key={app.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getIcon(app.iconName)}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    Industrial Domain
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{app.title}</h3>
                <p className="text-xs text-cyan-400 font-medium mb-3">{app.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {app.description}
                </p>

                {/* Graph Abstraction Box */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 text-[11px] space-y-1 font-mono mb-4">
                  <div className="text-slate-400">
                    <strong className="text-slate-300 font-sans">Vertices:</strong> {app.graphRepresentation.vertices}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-300 font-sans">Edges:</strong> {app.graphRepresentation.edges}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-300 font-sans">Weights:</strong> {app.graphRepresentation.weights}
                  </div>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-200">Practical Scenario:</strong> {app.practicalExample}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
