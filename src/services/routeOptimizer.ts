import type { GraphData, Edge } from '../types/graph';
import type {
  RoadNetworkData,
  DarkStore,
  CartItem,
  OptimizationMode,
  StoreEvaluationResult,
  DarkStoreOptimizationSummary,
} from '../types/store';
import { runDijkstra } from '../algorithms/dijkstra';
import { filterStoresByInventory } from './inventoryService';

/**
 * Transforms a city RoadNetworkData into the core GraphData structure required by Dijkstra,
 * setting the edge weight based on the user's selected optimization mode.
 */
export function buildDijkstraGraph(
  roadNetwork: RoadNetworkData,
  mode: OptimizationMode
): GraphData {
  const edges: Edge[] = roadNetwork.edges.map((re) => ({
    id: re.id,
    source: re.source,
    target: re.target,
    weight: mode === 'DISTANCE' ? re.distanceKm : re.travelTimeMins,
  }));

  return {
    nodes: roadNetwork.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      x: n.x,
      y: n.y,
    })),
    edges,
  };
}

/**
 * Helper to compute both total distance (km) and total travel time (mins)
 * for a reconstructed sequence of node IDs along the road network.
 */
export function computePathRoadMetrics(
  pathNodes: string[],
  roadNetwork: RoadNetworkData
): { distanceKm: number; travelTimeMins: number } {
  if (pathNodes.length <= 1) {
    return { distanceKm: 0, travelTimeMins: 0 };
  }

  let totalDist = 0;
  let totalTime = 0;

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const u = pathNodes[i];
    const v = pathNodes[i + 1];

    const roadEdge = roadNetwork.edges.find(
      (e) => (e.source === u && e.target === v) || (e.source === v && e.target === u)
    );

    if (roadEdge) {
      totalDist += roadEdge.distanceKm;
      totalTime += roadEdge.travelTimeMins;
    }
  }

  return {
    distanceKm: Number(totalDist.toFixed(2)),
    travelTimeMins: Math.round(totalTime),
  };
}

/**
 * Core Dark Store Optimization Engine:
 * 1. Filters dark stores by product availability in the customer's cart.
 * 2. Prepares the road network graph weighted by chosen metric (Distance or Travel Time).
 * 3. Runs Dijkstra's algorithm from the customer location to EACH eligible dark store.
 * 4. Compares Dijkstra paths and chooses the strictly optimal store with minimum cost.
 */
export function optimizeDarkStoreDelivery(
  customerNodeId: string,
  cartItems: CartItem[],
  stores: DarkStore[],
  roadNetwork: RoadNetworkData,
  mode: OptimizationMode = 'DISTANCE'
): DarkStoreOptimizationSummary {
  // 1. Inventory Filtering
  const inventorySummary = filterStoresByInventory(stores, cartItems);

  // 2. Build graph for Dijkstra with weights matching mode
  const dijkstraGraph = buildDijkstraGraph(roadNetwork, mode);

  // 3. Evaluate eligible stores with Dijkstra
  const eligibleEvaluations: StoreEvaluationResult[] = [];

  for (const store of inventorySummary.eligibleStores) {
    const dijkstraResult = runDijkstra(dijkstraGraph, customerNodeId, store.nodeId);

    if (dijkstraResult.success && dijkstraResult.path.length > 0) {
      const roadMetrics = computePathRoadMetrics(dijkstraResult.path, roadNetwork);

      eligibleEvaluations.push({
        store,
        isEligible: true,
        missingProducts: [],
        dijkstraResult,
        shortestPathNodes: dijkstraResult.path,
        totalDistanceKm: roadMetrics.distanceKm,
        totalTravelTimeMins: roadMetrics.travelTimeMins,
        objectiveMetricValue:
          mode === 'DISTANCE' ? roadMetrics.distanceKm : roadMetrics.travelTimeMins,
        isBestStore: false,
      });
    } else {
      // Store has stock, but is topologically unreachable in the road network
      eligibleEvaluations.push({
        store,
        isEligible: false,
        missingProducts: [],
        dijkstraResult,
        shortestPathNodes: [],
        totalDistanceKm: Infinity,
        totalTravelTimeMins: Infinity,
        objectiveMetricValue: Infinity,
        isBestStore: false,
      });
    }
  }

  // 4. Sort reachable eligible stores by the objective metric ascending
  const reachableEligible = eligibleEvaluations.filter((ev) => ev.shortestPathNodes.length > 0);
  reachableEligible.sort((a, b) => a.objectiveMetricValue - b.objectiveMetricValue);

  if (reachableEligible.length > 0) {
    reachableEligible[0].isBestStore = true;
  }

  // 5. Ineligible stores (due to stock shortage)
  const ineligibleEvaluations: StoreEvaluationResult[] = inventorySummary.ineligibleStores.map(
    (item) => ({
      store: item.store,
      isEligible: false,
      missingProducts: item.missingProducts,
      shortestPathNodes: [],
      totalDistanceKm: Infinity,
      totalTravelTimeMins: Infinity,
      objectiveMetricValue: Infinity,
      isBestStore: false,
    })
  );

  const customerNode = roadNetwork.nodes.find((n) => n.id === customerNodeId);
  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartValue = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  return {
    customerNodeId,
    customerNodeName: customerNode ? customerNode.name : customerNodeId,
    cartItems,
    totalItemsCount,
    totalCartValue,
    mode,
    eligibleStores: reachableEligible,
    ineligibleStores: ineligibleEvaluations,
    bestStore: reachableEligible.length > 0 ? reachableEligible[0] : null,
    timestamp: Date.now(),
  };
}

