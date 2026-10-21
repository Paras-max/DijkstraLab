import React from 'react';
import { Network, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Project Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Network className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm">
                Dijkstra's Algorithm Visualization
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md mb-3">
              An Integrated Study on Dijkstra's Algorithm and Its Modern Adaptations for Network Optimisation. Academic project developed for Analysis of Algorithms (AOA).
            </p>
            <div className="text-[11px] text-slate-500">
              Department of Electronics and Computer Science<br />
              Vidyalankar Institute of Technology (VIT), Wadala, Mumbai
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'visualizer', label: 'Interactive Visualizer' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'complexity', label: 'Complexity Analysis' },
                { id: 'algorithms', label: 'Algorithm Comparison' },
                { id: 'research', label: 'Research & Literature' },
                { id: 'adaptations', label: 'Modern Adaptations' },
                { id: 'applications', label: 'Applications' },
                { id: 'team', label: 'Project Team' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Team */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Project Team (Div A)
            </h4>
            <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <li>Shubhan Telang (23108A0003)</li>
              <li>Aditya Pradhan (23108A0010)</li>
              <li>Arnav Kadam (23108A0012)</li>
              <li>Manvith Shetty (23108A0019)</li>
            </ul>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500">Guide:</span>{' '}
              <strong className="text-slate-300">Dr. Akshatha Bhat</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} VIT Mumbai · Analysis of Algorithms (AOA) Academic Project. Client-side browser execution.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
