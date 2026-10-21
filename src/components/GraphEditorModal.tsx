import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, AlertCircle } from 'lucide-react';
import type { GraphData } from '../types/graph';

interface GraphEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  graph: GraphData;
  onAddEdge: (source: string, target: string, weight: number) => { success: boolean; error?: string };
  onUpdateEdge: (edgeId: string, weight: number) => { success: boolean; error?: string };
  onRemoveEdge: (edgeId: string) => void;
}

export const GraphEditorModal: React.FC<GraphEditorModalProps> = ({
  isOpen,
  onClose,
  graph,
  onAddEdge,
  onUpdateEdge,
  onRemoveEdge,
}) => {
  const [sourceNode, setSourceNode] = useState<string>(graph.nodes[0]?.id || 'A');
  const [targetNode, setTargetNode] = useState<string>(graph.nodes[1]?.id || 'B');
  const [edgeWeight, setEdgeWeight] = useState<number>(5);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (edgeWeight <= 0) {
      setErrorMessage("Dijkstra's algorithm requires strictly positive edge weights (> 0).");
      return;
    }

    const res = onAddEdge(sourceNode, targetNode, edgeWeight);
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to add edge.');
    } else {
      setErrorMessage(null);
    }
  };

  const handleSaveEdit = (edgeId: string) => {
    setErrorMessage(null);
    if (editingWeight <= 0) {
      setErrorMessage('Edge weight must be a positive integer greater than zero.');
      return;
    }
    const res = onUpdateEdge(edgeId, editingWeight);
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to update edge.');
    } else {
      setEditingEdgeId(null);
      setErrorMessage(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h3 className="text-lg font-bold text-white">Graph Editor & Edge Manager</h3>
            <p className="text-xs text-slate-400">
              Add new links, update weights, or delete edges dynamically.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form: Add New Edge */}
          <form onSubmit={handleAdd} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add New Undirected Edge
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Source Node</label>
                <select
                  value={sourceNode}
                  onChange={(e) => setSourceNode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-cyan-500"
                >
                  {graph.nodes.map((n) => (
                    <option key={`opt-src-${n.id}`} value={n.id}>
                      Node {n.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Target Node</label>
                <select
                  value={targetNode}
                  onChange={(e) => setTargetNode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-cyan-500"
                >
                  {graph.nodes.map((n) => (
                    <option key={`opt-dst-${n.id}`} value={n.id}>
                      Node {n.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Edge Weight (&gt;0)</label>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={edgeWeight}
                  onChange={(e) => setEdgeWeight(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 self-end flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Edge
            </button>
          </form>

          {/* List of Existing Edges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Existing Edges ({graph.edges.length})
            </h4>

            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
              {graph.edges.map((edge) => (
                <div
                  key={edge.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-200">{edge.source}</span>
                    <span className="text-slate-500">↔</span>
                    <span className="font-bold text-slate-200">{edge.target}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {editingEdgeId === edge.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={editingWeight}
                          onChange={(e) => setEditingWeight(parseInt(e.target.value) || 1)}
                          className="w-16 bg-slate-900 border border-cyan-500 text-cyan-300 font-mono text-xs rounded px-1.5 py-0.5"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(edge.id)}
                          className="px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingEdgeId(null)}
                          className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="bg-slate-800 px-2 py-0.5 rounded font-mono text-cyan-400 font-bold">
                        w: {edge.weight}
                      </span>
                    )}

                    {editingEdgeId !== edge.id && (
                      <button
                        onClick={() => {
                          setEditingEdgeId(edge.id);
                          setEditingWeight(edge.weight);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Edit weight"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onRemoveEdge(edge.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove edge"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
          >
            Close & Return to Visualizer
          </button>
        </div>
      </div>
    </div>
  );
};
