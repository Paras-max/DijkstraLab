import React, { useState } from 'react';
import type {
  RoadNetworkData,
  OptimizationMode,
  StoreEvaluationResult,
} from '../../types/store';

interface RoadNetworkCanvasProps {
  roadNetwork: RoadNetworkData;
  customerNodeId: string;
  onSelectCustomerNode: (nodeId: string) => void;
  selectedStoreResult: StoreEvaluationResult | null;
  activePathNodes: string[];
  allStoreEvaluations: StoreEvaluationResult[];
  optimizationMode: OptimizationMode;
}

export const RoadNetworkCanvas: React.FC<RoadNetworkCanvasProps> = ({
  roadNetwork,
  customerNodeId,
  onSelectCustomerNode,
  selectedStoreResult,
  activePathNodes,
  allStoreEvaluations,
  optimizationMode,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const nodeMap = new Map(roadNetwork.nodes.map((n) => [n.id, n]));
  const pathNodeSet = new Set(activePathNodes);

  // Set of edge IDs that form part of the highlighted shortest route
  const pathEdgeIds = new Set<string>();
  if (activePathNodes.length > 1) {
    for (let i = 0; i < activePathNodes.length - 1; i++) {
      const u = activePathNodes[i];
      const v = activePathNodes[i + 1];
      const edge = roadNetwork.edges.find(
        (e) => (e.source === u && e.target === v) || (e.source === v && e.target === u)
      );
      if (edge) {
        pathEdgeIds.add(edge.id);
      }
    }
  }

  // Quick lookup for store status
  const storeEvaluationMap = new Map<string, StoreEvaluationResult>();
  for (const ev of allStoreEvaluations) {
    storeEvaluationMap.set(ev.store.nodeId, ev);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl select-none flex flex-col">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/90 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Customer Pin:{' '}
            <strong className="text-emerald-300 font-mono font-bold">{customerNodeId}</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            Active Delivery Route:{' '}
            <strong className="text-yellow-300 font-mono">
              {activePathNodes.length > 0 ? activePathNodes.join(' → ') : 'None'}
            </strong>
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Showing Edge Weights:{' '}
          <strong className="text-cyan-300 font-mono">
            {optimizationMode === 'DISTANCE' ? 'Distance (km)' : 'Travel Time (mins)'}
          </strong>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto bg-[#080d1a]">
        <svg
          viewBox="0 0 850 510"
          className="w-full h-auto min-w-[700px] max-h-[540px] cursor-pointer"
        >
          <defs>
            {/* Subtle Grid */}
            <pattern id="road-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(51, 65, 85, 0.15)"
                strokeWidth="0.8"
              />
            </pattern>

            {/* Path Glow Filter */}
            <filter id="delivery-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="850" height="510" fill="#080d1a" />
          <rect width="850" height="510" fill="url(#road-grid)" />

          {/* 1. EDGES LAYER */}
          <g className="roads-layer">
            {roadNetwork.edges.map((edge) => {
              const u = nodeMap.get(edge.source);
              const v = nodeMap.get(edge.target);
              if (!u || !v) return null;

              const isPathEdge = pathEdgeIds.has(edge.id);

              const midX = (u.x + v.x) / 2;
              const midY = (u.y + v.y) / 2;

              // Perpendicular offset for label badge
              const dx = v.x - u.x;
              const dy = v.y - u.y;
              const length = Math.sqrt(dx * dx + dy * dy) || 1;
              const normX = -dy / length;
              const normY = dx / length;
              const labelX = midX + normX * 11;
              const labelY = midY + normY * 11;

              const displayWeight =
                optimizationMode === 'DISTANCE' ? `${edge.distanceKm} km` : `${edge.travelTimeMins} m`;

              return (
                <g key={edge.id}>
                  {/* Road Line */}
                  <line
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    stroke={isPathEdge ? '#facc15' : '#334155'}
                    strokeWidth={isPathEdge ? 5 : 2}
                    strokeDasharray={isPathEdge ? '8,4' : undefined}
                    strokeLinecap="round"
                    filter={isPathEdge ? 'url(#delivery-glow)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Edge Weight Pill */}
                  <g transform={`translate(${labelX}, ${labelY})`}>
                    <rect
                      x="-18"
                      y="-9"
                      width="36"
                      height="18"
                      rx="4"
                      fill={isPathEdge ? '#422006' : '#0f172a'}
                      stroke={isPathEdge ? '#eab308' : '#334155'}
                      strokeWidth={isPathEdge ? 1.5 : 1}
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isPathEdge ? '#fef08a' : '#94a3b8'}
                      fontSize="9.5"
                      fontWeight="600"
                      fontFamily="monospace"
                    >
                      {displayWeight}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* 2. NODES LAYER */}
          <g className="nodes-layer">
            {roadNetwork.nodes.map((node) => {
              const isCustomer = node.id === customerNodeId;
              const isDarkStore = node.nodeType === 'dark_store';
              const isInPath = pathNodeSet.has(node.id);
              const storeEval = isDarkStore ? storeEvaluationMap.get(node.id) : undefined;
              const isSelectedStore =
                isDarkStore && selectedStoreResult?.store.nodeId === node.id;
              const isEligibleStore = storeEval?.isEligible;

              // Node color scheme
              let circleFill = '#1e293b';
              let circleStroke = '#475569';
              let radius = 17;

              if (isCustomer) {
                circleFill = '#059669'; // Emerald
                circleStroke = '#34d399';
                radius = 21;
              } else if (isSelectedStore) {
                circleFill = '#eab308'; // Bright Gold
                circleStroke = '#fef08a';
                radius = 23;
              } else if (isDarkStore && isEligibleStore) {
                circleFill = '#0284c7'; // Blue/Cyan store
                circleStroke = '#38bdf8';
                radius = 20;
              } else if (isDarkStore && !isEligibleStore) {
                circleFill = '#881337'; // Muted dark red for ineligible
                circleStroke = '#f43f5e';
                radius = 19;
              } else if (isInPath) {
                circleFill = '#854d0e'; // Warm gold path step
                circleStroke = '#facc15';
                radius = 18;
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => onSelectCustomerNode(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className="cursor-pointer group"
                >
                  {/* Halo rings */}
                  {(isCustomer || isSelectedStore) && (
                    <circle
                      r={radius + 8}
                      fill="none"
                      stroke={isCustomer ? '#10b981' : '#facc15'}
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r={radius}
                    fill={circleFill}
                    stroke={circleStroke}
                    strokeWidth={isCustomer || isSelectedStore ? 3 : 2}
                    className="transition-all duration-200 group-hover:scale-110"
                    style={{
                      filter:
                        isCustomer || isSelectedStore
                          ? 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.5))'
                          : undefined,
                    }}
                  />

                  {/* Label Text */}
                  <text
                    x="0"
                    y="4.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isDarkStore ? '11' : '10'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>

                  {/* Area / Store Label Badge below node */}
                  <g transform={`translate(0, ${radius + 14})`}>
                    <rect
                      x="-38"
                      y="-8"
                      width="76"
                      height="16"
                      rx="3.5"
                      fill="#020617"
                      stroke={isSelectedStore ? '#facc15' : isCustomer ? '#10b981' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isSelectedStore ? '#fef08a' : isCustomer ? '#a7f3d0' : '#94a3b8'}
                      fontSize="8.5"
                      fontWeight="600"
                    >
                      {node.id} {isDarkStore ? '(DS)' : ''}
                    </text>
                  </g>

                  {/* Top Pin Badges */}
                  {isCustomer && (
                    <g transform="translate(13, -13)">
                      <circle r="7" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                      <text x="0" y="2.5" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                        YOU
                      </text>
                    </g>
                  )}

                  {isSelectedStore && (
                    <g transform="translate(14, -14)">
                      <circle r="8" fill="#eab308" stroke="#713f12" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="bold">
                        ★
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredNodeId && (
          <div className="absolute top-3 right-4 z-20 bg-slate-900/95 border border-slate-700 p-2.5 rounded-xl shadow-2xl text-xs text-slate-200 pointer-events-none max-w-xs">
            {(() => {
              const node = nodeMap.get(hoveredNodeId);
              if (!node) return null;
              const isDarkStore = node.nodeType === 'dark_store';
              const storeEval = isDarkStore ? storeEvaluationMap.get(node.id) : undefined;

              return (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                    <strong className="text-white font-mono font-bold">{node.name}</strong>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {node.nodeType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Area: <span className="text-slate-300">{node.areaName}</span>
                  </div>
                  {isDarkStore && storeEval && (
                    <div className="text-[11px] mt-1 pt-1 border-t border-slate-800 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span>Fulfillment Status:</span>
                        <span
                          className={`font-semibold ${
                            storeEval.isEligible ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {storeEval.isEligible ? 'Eligible (In Stock)' : 'Out of Stock'}
                        </span>
                      </div>
                      {storeEval.isEligible && storeEval.shortestPathNodes.length > 0 && (
                        <div>
                          Dijkstra Route: {storeEval.totalDistanceKm} km ({storeEval.totalTravelTimeMins} mins)
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-[10px] text-cyan-400/90 mt-0.5">
                    Click node to set as Customer Location
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Color Legend Footer */}
      <div className="border-t border-slate-800/80 bg-slate-950 px-4 py-2.5 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-400"></span>
            <span>Customer Location (Source)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300"></span>
            <span className="font-semibold text-yellow-300">Selected Optimal Dark Store</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-600 border border-sky-400"></span>
            <span>Eligible Dark Store</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-800 border border-rose-500"></span>
            <span className="text-rose-300">Ineligible Store (Stock Shortage)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-600"></span>
            <span>City Junction / Zone</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-yellow-400"></span>
            <span className="font-semibold text-yellow-300">Dijkstra Shortest Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};

