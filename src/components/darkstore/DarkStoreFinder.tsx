import React, { useState, useMemo } from 'react';
import { ProductCatalog } from './ProductCatalog';
import { CustomerLocationSelector } from './CustomerLocationSelector';
import { RoadNetworkCanvas } from './RoadNetworkCanvas';
import { OptimizationResultsView } from './OptimizationResultsView';
import { StoreInventoryModal } from './StoreInventoryModal';
import { sampleProducts } from '../../data/productData';
import { sampleDarkStores } from '../../data/storeData';
import { cityRoadNetwork } from '../../data/roadNetwork';
import { optimizeDarkStoreDelivery } from '../../services/routeOptimizer';
import type { CartItem, OptimizationMode, StoreEvaluationResult } from '../../types/store';
import { Truck, Cpu, Network, Info } from 'lucide-react';

export const DarkStoreFinder: React.FC = () => {
  // Cart state - initialized with popular everyday items so results render immediately
  const [cart, setCart] = useState<CartItem[]>([
    { product: sampleProducts[0], quantity: 1 }, // Milk
    { product: sampleProducts[1], quantity: 1 }, // Bread
  ]);

  // Customer location state - default to Green Valley Residency (N02)
  const [customerNodeId, setCustomerNodeId] = useState<string>('N02');

  // Optimization mode state - Distance (km) vs Travel Time (mins)
  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>('DISTANCE');

  // Preview store route state (user can click "Inspect" on any eligible store to preview its route)
  const [previewStoreResult, setPreviewStoreResult] = useState<StoreEvaluationResult | null>(null);

  // Store inventory modal state
  const [inspectStoreId, setInspectStoreId] = useState<string | null>(null);

  // Compute live dark store optimization via Dijkstra whenever inputs change
  const optimizationSummary = useMemo(() => {
    return optimizeDarkStoreDelivery(
      customerNodeId,
      cart,
      sampleDarkStores,
      cityRoadNetwork,
      optimizationMode
    );
  }, [customerNodeId, cart, optimizationMode]);

  // Handle active preview path
  const activePathNodes = useMemo(() => {
    if (previewStoreResult && previewStoreResult.shortestPathNodes.length > 0) {
      return previewStoreResult.shortestPathNodes;
    }
    if (optimizationSummary.bestStore && optimizationSummary.bestStore.shortestPathNodes.length > 0) {
      return optimizationSummary.bestStore.shortestPathNodes;
    }
    return [];
  }, [previewStoreResult, optimizationSummary.bestStore]);

  // Reset preview when cart or location changes
  const handleSelectCustomerNode = (nodeId: string) => {
    setCustomerNodeId(nodeId);
    setPreviewStoreResult(null);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setPreviewStoreResult(null);
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      } else {
        const prod = sampleProducts.find((p) => p.id === productId);
        if (!prod) return prev;
        return [...prev, { product: prod, quantity }];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
    setPreviewStoreResult(null);
  };

  const handleApplyPreset = (presetName: string) => {
    setPreviewStoreResult(null);
    if (presetName === 'BREAKFAST') {
      const items = ['prod_milk', 'prod_bread', 'prod_eggs', 'prod_butter'];
      setCart(
        sampleProducts
          .filter((p) => items.includes(p.id))
          .map((p) => ({ product: p, quantity: 1 }))
      );
    } else if (presetName === 'PANTRY') {
      const items = ['prod_rice', 'prod_vegetables', 'prod_milk'];
      setCart(
        sampleProducts
          .filter((p) => items.includes(p.id))
          .map((p) => ({ product: p, quantity: 1 }))
      );
    } else if (presetName === 'FRESH') {
      const items = ['prod_fruits', 'prod_vegetables', 'prod_juice'];
      setCart(
        sampleProducts
          .filter((p) => items.includes(p.id))
          .map((p) => ({ product: p, quantity: 1 }))
      );
    }
  };

  const currentInspectingStore = useMemo(() => {
    if (!inspectStoreId) return null;
    return sampleDarkStores.find((s) => s.id === inspectStoreId) || null;
  }, [inspectStoreId]);

  return (
    <div className="flex flex-col gap-6">
      {/* Feature Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400 mb-1.5">
            <Truck className="w-3.5 h-3.5" />
            Quick-Commerce Real-World Application
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Dark Store Finder & Delivery Route Optimizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Simulates instant delivery operations like Zepto or Blinkit. Select products, filter
            fulfilling dark stores by live inventory, and compute the shortest road delivery path
            using Dijkstra's algorithm.
          </p>
        </div>

        {/* Algorithm Insight Pill */}
        <div className="bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Algorithm:</span>
            <strong className="text-cyan-300 font-mono">Dijkstra (O(E log V))</strong>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>Road Graph:</span>
            <strong className="text-white font-mono">15 Nodes, 24 Edges</strong>
          </div>
        </div>
      </div>

      {/* Step 1: Product Selection Catalog */}
      <ProductCatalog
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onApplyPreset={handleApplyPreset}
      />

      {/* Step 2: Customer Location & Mode Selector */}
      <CustomerLocationSelector
        nodes={cityRoadNetwork.nodes}
        selectedNodeId={customerNodeId}
        onSelectNode={handleSelectCustomerNode}
        optimizationMode={optimizationMode}
        onChangeMode={(mode) => {
          setOptimizationMode(mode);
          setPreviewStoreResult(null);
        }}
      />

      {/* Step 3: Interactive Road Network Graph & Results View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive City Road Network SVG Map */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-yellow-400" />
              City Road Network & Route Visualization
            </h3>
            <span className="text-[11px] text-slate-400">
              Click any node on the map to set delivery location
            </span>
          </div>

          <RoadNetworkCanvas
            roadNetwork={cityRoadNetwork}
            customerNodeId={customerNodeId}
            onSelectCustomerNode={handleSelectCustomerNode}
            selectedStoreResult={previewStoreResult || optimizationSummary.bestStore}
            activePathNodes={activePathNodes}
            allStoreEvaluations={[
              ...optimizationSummary.eligibleStores,
              ...optimizationSummary.ineligibleStores,
            ]}
            optimizationMode={optimizationMode}
          />

          {/* Educational Note Callout */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-300">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white">Analysis of Algorithms Demonstration:</strong> Notice
              how inventory constraint filtering prunes candidate dark stores first. For each
              eligible store, Dijkstra's algorithm searches through topological road segments rather
              than Euclidean straight-line distance. By switching between{' '}
              <strong className="text-cyan-300">Minimum Distance</strong> and{' '}
              <strong className="text-emerald-300">Minimum Time</strong>, different arterial paths or
              stores emerge as strictly optimal!
            </div>
          </div>
        </div>

        {/* Right Column: Dijkstra Optimization Results & Store Rankings */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <OptimizationResultsView
            summary={optimizationSummary}
            selectedStoreResult={previewStoreResult}
            onSelectStoreForPreview={(ev) => setPreviewStoreResult(ev)}
            onOpenStoreInventory={(storeId) => setInspectStoreId(storeId)}
            optimizationMode={optimizationMode}
          />
        </div>
      </div>

      {/* Store Inventory Modal */}
      <StoreInventoryModal
        isOpen={inspectStoreId !== null}
        onClose={() => setInspectStoreId(null)}
        store={currentInspectingStore}
        cart={cart}
      />
    </div>
  );
};

