import React from 'react';
import {
  Sparkles,
  Route,
  Clock,
  Ruler,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Store,
  Layers,
  ArrowRight,
} from 'lucide-react';
import type {
  DarkStoreOptimizationSummary,
  StoreEvaluationResult,
  OptimizationMode,
} from '../../types/store';

interface OptimizationResultsViewProps {
  summary: DarkStoreOptimizationSummary;
  selectedStoreResult: StoreEvaluationResult | null;
  onSelectStoreForPreview: (storeResult: StoreEvaluationResult) => void;
  onOpenStoreInventory: (storeId: string) => void;
  optimizationMode: OptimizationMode;
}

export const OptimizationResultsView: React.FC<OptimizationResultsViewProps> = ({
  summary,
  selectedStoreResult,
  onSelectStoreForPreview,
  onOpenStoreInventory,
  optimizationMode,
}) => {
  const { bestStore, eligibleStores, ineligibleStores, customerNodeName } = summary;

  // Active store being previewed (defaults to bestStore if none specifically clicked)
  const activeStore = selectedStoreResult || bestStore;

  return (
    <div className="flex flex-col gap-5">
      {/* 1. TOP RESULT CARD: OPTIMAL DARK STORE */}
      {bestStore ? (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-yellow-950/30 border border-yellow-500/50 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-yellow-500/30">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-yellow-400 text-slate-950 font-bold shadow-md">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-yellow-400 block">
                  Dijkstra Recommendation: Nearest Fulfilling Hub
                </span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  {bestStore.store.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Items in Stock
              </span>
              <button
                onClick={() => onOpenStoreInventory(bestStore.store.id)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors"
              >
                Inspect Inventory
              </button>
            </div>
          </div>

          {/* Metrics & Route Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <Ruler className="w-3.5 h-3.5 text-blue-400" /> Total Road Distance
              </span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {bestStore.totalDistanceKm} km
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Shortest Dijkstra path</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Estimated Delivery Transit
              </span>
              <span className="text-2xl font-bold font-mono text-emerald-300">
                ~{bestStore.totalTravelTimeMins} mins
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">Estimated demo transit time</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Optimization Basis
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {optimizationMode === 'DISTANCE' ? 'Minimum Road Distance' : 'Minimum Travel Time'}
              </span>
              <span className="text-[10px] text-yellow-400 mt-0.5">
                Evaluated against {eligibleStores.length} eligible stores
              </span>
            </div>
          </div>

          {/* Path Sequence Ribbon */}
          <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800/80 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Route className="w-4 h-4 text-yellow-400" /> Step-by-Step Shortest Path Sequence:
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                {bestStore.shortestPathNodes.length - 1} road segments
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-1.5">
              {bestStore.shortestPathNodes.map((nodeId, idx) => (
                <React.Fragment key={`seq-${nodeId}-${idx}`}>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold shadow-sm ${
                      idx === 0
                        ? 'bg-emerald-600 text-white border border-emerald-400'
                        : idx === bestStore.shortestPathNodes.length - 1
                        ? 'bg-yellow-400 text-slate-950 border border-yellow-300'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {nodeId}
                    {idx === 0
                      ? ' (You)'
                      : idx === bestStore.shortestPathNodes.length - 1
                      ? ' (Store)'
                      : ''}
                  </span>
                  {idx < bestStore.shortestPathNodes.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-rose-950/40 border border-rose-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Order Cannot Be Fulfilled by Any Dark Store</span>
          </div>
          <p className="text-rose-200 text-xs">
            None of our dark stores currently have all requested items in stock at the required
            quantities. Try adjusting item quantities or removing out-of-stock items.
          </p>
        </div>
      )}

      {/* 2. ALL ELIGIBLE STORES COMPARISON TABLE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-cyan-400" />
              Eligible Dark Stores ({eligibleStores.length})
            </h4>
            <p className="text-[11px] text-slate-400">
              Ranked strictly by Dijkstra's shortest path calculation from {customerNodeName}.
            </p>
          </div>
        </div>

        {eligibleStores.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No stores are eligible for the currently selected product basket.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {eligibleStores.map((ev, rank) => {
              const isSelected = activeStore?.store.id === ev.store.id;
              const isRecommended = ev.isBestStore;

              return (
                <div
                  key={ev.store.id}
                  className={`p-3 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/95 border-yellow-500/80 ring-1 ring-yellow-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        isRecommended
                          ? 'bg-yellow-400 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      #{rank + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{ev.store.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-cyan-300">
                          {ev.store.nodeId}
                        </span>
                        {isRecommended && (
                          <span className="px-2 py-0.2 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-500/40 text-[10px] font-bold">
                            ★ OPTIMAL
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Route: {ev.shortestPathNodes.join(' → ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics & Preview Button */}
                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-cyan-300">
                        {ev.totalDistanceKm} km
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        ~{ev.totalTravelTimeMins} mins
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectStoreForPreview(ev)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-yellow-400 text-slate-950 font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isSelected ? 'Viewing' : 'Inspect'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. INELIGIBLE STORES (STOCK SHORTAGE BREAKDOWN) */}
      {ineligibleStores.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400" />
                Ineligible Dark Stores ({ineligibleStores.length})
              </h4>
              <p className="text-[11px] text-slate-400">
                These stores were excluded because one or more requested products are out of stock.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ineligibleStores.map((item) => (
              <div
                key={item.store.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-rose-950/60 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200">{item.store.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-950/60 text-rose-300 border border-rose-800/60">
                    {item.store.nodeId}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Stock Deficit:
                  </span>
                  {item.missingProducts.map((mp) => (
                    <div
                      key={mp.product.id}
                      className="flex items-center justify-between text-[11px] bg-rose-950/30 px-2 py-1 rounded border border-rose-900/40 text-rose-200"
                    >
                      <span>
                        {mp.product.imageIcon} {mp.product.name}
                      </span>
                      <span className="font-mono text-[10px]">
                        Need: <strong>{mp.requested}</strong> | In Stock:{' '}
                        <strong className="text-rose-400">{mp.available}</strong>
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenStoreInventory(item.store.id)}
                  className="mt-1 text-[11px] text-slate-400 hover:text-cyan-300 text-left underline self-start"
                >
                  View full store inventory &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
