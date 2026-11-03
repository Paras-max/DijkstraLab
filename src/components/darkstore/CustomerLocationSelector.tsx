import React from 'react';
import { MapPin, Navigation, Compass, Clock, Ruler } from 'lucide-react';
import type { RoadNode, OptimizationMode } from '../../types/store';

interface CustomerLocationSelectorProps {
  nodes: RoadNode[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  optimizationMode: OptimizationMode;
  onChangeMode: (mode: OptimizationMode) => void;
}

export const CustomerLocationSelector: React.FC<CustomerLocationSelectorProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  optimizationMode,
  onChangeMode,
}) => {
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Group nodes into Customer Zones / Junctions vs Dark Stores
  const customerNodes = nodes.filter((n) => n.nodeType !== 'dark_store');
  const darkStoreNodes = nodes.filter((n) => n.nodeType === 'dark_store');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Customer Delivery Location & Mode
            </h2>
            <p className="text-xs text-slate-400">
              Select where the order should be delivered. Dijkstra computes shortest path from here.
            </p>
          </div>
        </div>

        {/* Selected Location Pill */}
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-cyan-800/60 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-slate-400">Active Location:</span>
          <strong className="text-cyan-300 font-mono font-semibold">
            {selectedNode ? selectedNode.name : selectedNodeId}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Customer Location Dropdown */}
        <div className="md:col-span-7 flex flex-col gap-1.5">
          <label htmlFor="customer-location-select" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            Select Customer Node / Address:
          </label>
          <select
            id="customer-location-select"
            value={selectedNodeId}
            onChange={(e) => onSelectNode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
          >
            <optgroup label="🏠 Residential Zones & Major Commercial Nodes">
              {customerNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  [{node.id}] {node.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="🏬 Dark Store Locations (Test Hub-to-Hub)">
              {darkStoreNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  [{node.id}] {node.name}
                </option>
              ))}
            </optgroup>
          </select>
          <span className="text-[11px] text-slate-500 italic">
            Tip: You can also click directly on any node circle on the road network map below!
          </span>
        </div>

        {/* Optimization Mode Switcher */}
        <div className="md:col-span-5 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Dijkstra Optimization Objective:
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onChangeMode('DISTANCE')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                optimizationMode === 'DISTANCE'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" /> Shortest Distance (km)
            </button>
            <button
              onClick={() => onChangeMode('TIME')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                optimizationMode === 'TIME'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Minimum Time (mins)
            </button>
          </div>
          <span className="text-[11px] text-slate-500">
            {optimizationMode === 'DISTANCE'
              ? 'Edge weights = road distance in km.'
              : 'Edge weights = estimated transit time in mins.'}
          </span>
        </div>
      </div>
    </div>
  );
};

