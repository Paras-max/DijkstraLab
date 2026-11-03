import type { Node, Edge, DijkstraResult } from './graph';

export interface Product {
  id: string;
  name: string;
  category: 'Dairy' | 'Bakery' | 'Fresh' | 'Pantry' | 'Beverage';
  price: number;
  unit: string;
  imageIcon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DarkStore {
  id: string;
  name: string;
  nodeId: string;
  address: string;
  rating: number;
  deliveryTimeEstimate: string;
  inventory: Record<string, number>; // productId -> available quantity
}

export type RoadNodeType = 'customer_zone' | 'dark_store' | 'junction';

export interface RoadNode extends Node {
  name: string;
  nodeType: RoadNodeType;
  areaName: string;
  storeId?: string;
  isPopularCustomerZone?: boolean;
}

export interface RoadEdge extends Edge {
  distanceKm: number; // in kilometers
  travelTimeMins: number; // in minutes
  roadName: string;
}

export interface RoadNetworkData {
  nodes: RoadNode[];
  edges: RoadEdge[];
}

export type OptimizationMode = 'DISTANCE' | 'TIME';

export interface MissingProductItem {
  product: Product;
  requested: number;
  available: number;
}

export interface StoreEvaluationResult {
  store: DarkStore;
  isEligible: boolean;
  missingProducts: MissingProductItem[];
  dijkstraResult?: DijkstraResult;
  shortestPathNodes: string[];
  totalDistanceKm: number;
  totalTravelTimeMins: number;
  objectiveMetricValue: number; // distanceKm or travelTimeMins based on selected mode
  isBestStore: boolean;
}

export interface DarkStoreOptimizationSummary {
  customerNodeId: string;
  customerNodeName: string;
  cartItems: CartItem[];
  totalItemsCount: number;
  totalCartValue: number;
  mode: OptimizationMode;
  eligibleStores: StoreEvaluationResult[];
  ineligibleStores: StoreEvaluationResult[];
  bestStore: StoreEvaluationResult | null;
  timestamp: number;
}
