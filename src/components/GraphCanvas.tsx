import React, { useRef, useState, useCallback } from 'react';
import type { GraphData, NodeVisualState, EdgeVisualState } from '../types/graph';

interface GraphCanvasProps {
  graph: GraphData;
  sourceId: string;
  destinationId: string;
  nodeStates: Record<string, NodeVisualState>;
  edgeStates: Record<string, EdgeVisualState>;
  currentDistances: Record<string, number>;
  onSelectSource: (id: string) => void;
  onSelectDestination: (id: string) => void;
  onUpdateNodePosition: (id: string, x: number, y: number) => void;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  graph,
  sourceId,
  destinationId,
  nodeStates,
  edgeStates,
  currentDistances,
  onSelectSource,
  onSelectDestination,
  onUpdateNodePosition,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [contextMenuNode, setContextMenuNode] = useState<{ id: string; x: number; y: number } | null>(null);

  // SVG coordinate transformation
  const getSVGCoordinates = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 800 / rect.width;
    const scaleY = 500 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContextMenuNode(null);
    setDraggingNodeId(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNodeId) return;
    const { x, y } = getSVGCoordinates(e);
    // Constrain within viewBox bounds with margin
    const boundedX = Math.max(40, Math.min(760, x));
    const boundedY = Math.max(40, Math.min(460, y));
    onUpdateNodePosition(draggingNodeId, boundedX, boundedY);
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      setDraggingNodeId(null);
    }
  };

  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (contextMenuNode?.id === nodeId) {
      setContextMenuNode(null);
    } else {
      const rect = (e.target as Element).getBoundingClientRect();
      setContextMenuNode({ id: nodeId, x: rect.left + 20, y: rect.top - 10 });
    }
  };

  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

  // Node styling helper
  const getNodeColor = (_id: string, state?: NodeVisualState) => {
    if (state === 'path') {
      return { fill: '#facc15', stroke: '#ca8a04', text: '#000000', glow: 'rgba(250, 204, 21, 0.4)' }; // Yellow
    }
    if (state === 'current') {
      return { fill: '#fb923c', stroke: '#ea580c', text: '#ffffff', glow: 'rgba(251, 146, 60, 0.5)' }; // Orange
    }
    if (state === 'relaxed') {
      return { fill: '#22d3ee', stroke: '#0891b2', text: '#082f49', glow: 'rgba(34, 211, 238, 0.4)' }; // Cyan
    }
    if (state === 'visited') {
      return { fill: '#a855f7', stroke: '#7e22ce', text: '#ffffff', glow: 'rgba(168, 85, 247, 0.3)' }; // Muted purple
    }
    // Default Unvisited
    return { fill: '#3b82f6', stroke: '#1d4ed8', text: '#ffffff', glow: 'rgba(59, 130, 246, 0.25)' }; // Blue
  };

  // Edge styling helper
  const getEdgeStyle = (state?: EdgeVisualState) => {
    if (state === 'path') {
      return { stroke: '#ef4444', strokeWidth: 4.5, strokeDasharray: undefined, glow: 'rgba(239, 68, 68, 0.6)' }; // Red
    }
    if (state === 'examining') {
      return { stroke: '#fb923c', strokeWidth: 3.5, strokeDasharray: '6,4', glow: 'rgba(251, 146, 60, 0.5)' }; // Orange dashed
    }
    if (state === 'relaxed') {
      return { stroke: '#22d3ee', strokeWidth: 3.5, strokeDasharray: undefined, glow: 'rgba(34, 211, 238, 0.5)' }; // Cyan
    }
    // Default edge
    return { stroke: '#64748b', strokeWidth: 2, strokeDasharray: undefined, glow: 'transparent' }; // Grey
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800 shadow-2xl select-none">
      {/* Visual Canvas Sub-Header & Quick Hint */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
          Src: <strong className="text-emerald-300 font-mono text-sm">{sourceId}</strong>
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
          Dst: <strong className="text-rose-300 font-mono text-sm">{destinationId}</strong>
        </span>
        <span className="hidden sm:inline text-slate-500 text-[11px] ml-2">
          (Click node to reassign · Drag to rearrange)
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 800 500"
        className="w-full h-auto max-h-[560px] cursor-crosshair touch-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => setContextMenuNode(null)}
      >
        <defs>
          {/* Subtle Technical Grid Background */}
          <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(51, 65, 85, 0.18)" strokeWidth="0.8" />
          </pattern>

          {/* Glow Filters */}
          <filter id="glow-path" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Background */}
        <rect width="800" height="500" fill="#090d16" />
        <rect width="800" height="500" fill="url(#graph-grid)" />

        {/* EDGES LAYER */}
        <g className="edges-layer">
          {graph.edges.map((edge) => {
            const sourceNode = nodeMap.get(edge.source);
            const targetNode = nodeMap.get(edge.target);
            if (!sourceNode || !targetNode) return null;

            const edgeState = edgeStates[edge.id] || 'default';
            const style = getEdgeStyle(edgeState);

            // Calculate midpoint for weight badge
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;

            // Offset label slightly perpendicular to edge line so line doesn't strike right through weight text
            const dx = targetNode.x - sourceNode.x;
            const dy = targetNode.y - sourceNode.y;
            const length = Math.sqrt(dx * dx + dy * dy) || 1;
            const normX = -dy / length;
            const normY = dx / length;
            const offsetDist = 10;
            const labelX = midX + normX * offsetDist;
            const labelY = midY + normY * offsetDist;

            return (
              <g key={edge.id} className="transition-all duration-300">
                {/* Edge line */}
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.strokeDasharray}
                  strokeLinecap="round"
                  filter={edgeState === 'path' ? 'url(#glow-path)' : undefined}
                />

                {/* Weight badge shield and text */}
                <g transform={`translate(${labelX}, ${labelY})`}>
                  <rect
                    x="-14"
                    y="-10"
                    width="28"
                    height="20"
                    rx="5"
                    fill={edgeState === 'path' ? '#450a0a' : '#0f172a'}
                    stroke={edgeState === 'path' ? '#ef4444' : '#334155'}
                    strokeWidth={edgeState === 'path' ? '1.5' : '1'}
                    className="shadow-md"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill={edgeState === 'path' ? '#fca5a5' : '#cbd5e1'}
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {edge.weight}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* NODES LAYER */}
        <g className="nodes-layer">
          {graph.nodes.map((node) => {
            const state = nodeStates[node.id] || 'unvisited';
            const colors = getNodeColor(node.id, state);
            const isSource = node.id === sourceId;
            const isDestination = node.id === destinationId;
            const distVal = currentDistances[node.id];
            const distDisplay = distVal === Infinity ? '∞' : distVal !== undefined ? distVal : '—';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                onClick={(e) => handleNodeClick(node.id, e)}
              >
                {/* Outer halo / glow for active states */}
                {(state === 'current' || state === 'path' || isSource || isDestination) && (
                  <circle
                    r="32"
                    fill="none"
                    stroke={colors.fill}
                    strokeWidth="2"
                    opacity="0.4"
                    className={state === 'current' ? 'animate-ping' : ''}
                  />
                )}

                {/* Special Source / Destination outer rings */}
                {isSource && (
                  <circle
                    r="27"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="4,3"
                    className="animate-spin-slow"
                  />
                )}
                {isDestination && (
                  <circle
                    r="27"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="4,3"
                    className="animate-spin-slow"
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  r="21"
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth="2.5"
                  className="transition-all duration-200 group-hover:scale-105"
                  style={{
                    filter: `drop-shadow(0 4px 10px ${colors.glow})`,
                  }}
                />

                {/* Node Label Text */}
                <text
                  x="0"
                  y="5.5"
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {node.label}
                </text>

                {/* Tentative Distance Badge below node */}
                <g transform="translate(0, 34)">
                  <rect
                    x="-18"
                    y="-9"
                    width="36"
                    height="18"
                    rx="4"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="monospace"
                  >
                    {`d: ${distDisplay}`}
                  </text>
                </g>

                {/* Small indicator badge for SRC/DST */}
                {isSource && (
                  <g transform="translate(14, -14)">
                    <circle r="7" fill="#10b981" stroke="#064e3b" strokeWidth="1.5" />
                    <text x="0" y="2.5" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">S</text>
                  </g>
                )}
                {isDestination && (
                  <g transform="translate(14, -14)">
                    <circle r="7" fill="#f43f5e" stroke="#881337" strokeWidth="1.5" />
                    <text x="0" y="2.5" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">D</text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Node Context Popover */}
      {contextMenuNode && (
        <div
          className="absolute z-30 bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-2xl flex flex-col gap-1.5 text-xs text-slate-200"
          style={{
            left: `${Math.min(contextMenuNode.x - 20, 600)}px`,
            top: `${Math.max(contextMenuNode.y - 40, 10)}px`,
          }}
        >
          <div className="font-semibold text-slate-400 border-b border-slate-800 pb-1 mb-1">
            Node {contextMenuNode.id} Action
          </div>
          <button
            onClick={() => {
              onSelectSource(contextMenuNode.id);
              setContextMenuNode(null);
            }}
            className="px-2.5 py-1 text-left rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Set as Source
          </button>
          <button
            onClick={() => {
              onSelectDestination(contextMenuNode.id);
              setContextMenuNode(null);
            }}
            className="px-2.5 py-1 text-left rounded bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Set as Destination
          </button>
        </div>
      )}

      {/* Color Legend Footer */}
      <div className="border-t border-slate-800/80 bg-slate-950/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3b82f6] border border-blue-400"></span>
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#fb923c] border border-orange-400"></span>
            <span>Current / Examined</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#22d3ee] border border-cyan-400"></span>
            <span>Relaxed / Tentative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#a855f7] border border-purple-400"></span>
            <span>Visited / Finalized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#facc15] border border-yellow-500"></span>
            <span className="font-semibold text-yellow-300">Shortest Path Node</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-slate-500"></span>
            <span className="text-slate-400">Default Edge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-red-500"></span>
            <span className="font-semibold text-red-400">Shortest Path Edge</span>
          </div>
        </div>
      </div>
    </div>
  );
};
