import React from 'react';
import { Users, UserCheck, Award } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Shubhan Telang',
      rollNo: '23108A0003',
      role: 'Algorithm Implementation & Binary Min-Heap Architecture',
    },
    {
      name: 'Aditya Pradhan',
      rollNo: '23108A0010',
      role: 'Interactive Graph Renderer & Step-by-Step Visualization',
    },
    {
      name: 'Arnav Kadam',
      rollNo: '23108A0012',
      role: 'Algorithm Analysis, Complexity & Literature Synthesis',
    },
    {
      name: 'Manvith Shetty',
      rollNo: '23108A0019',
      role: 'Comparative Study, Modern Adaptations & UI/UX Design',
    },
  ];

  return (
    <section id="team" className="py-20 border-t border-slate-800/80 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-xs font-semibold text-cyan-400 mb-3">
            <Users className="w-3.5 h-3.5" />
            Academic Contributors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Team &amp; Institutional Supervision
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Department of Electronics &amp; Computer Science, Vidyalankar Institute of Technology (VIT).
          </p>
        </div>

        {/* Faculty Guide Card */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/60 shadow-xl flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-950 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Subject Teacher &amp; Mentor
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Dr. Akshatha Bhat</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Subject: <strong>Analysis of Algorithms (AOA)</strong> · Semester V · Division A
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Author of <em>"An Integrated Study on Dijkstra's Algorithm and Its Modern Adaptations for Network Optimisation"</em> (2024).
            </p>
          </div>
        </div>

        {/* 4 Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.rollNo}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-cyan-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">{member.name}</h4>
                <div className="font-mono text-xs text-cyan-400 font-semibold mb-3">
                  {member.rollNo}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.role}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                ECS · VIT Mumbai
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
