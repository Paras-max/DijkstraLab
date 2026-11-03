import { describe, it, expect } from 'vitest';
import { sampleProducts } from '../data/productData';
import { sampleDarkStores } from '../data/storeData';
import { cityRoadNetwork } from '../data/roadNetwork';
import { filterStoresByInventory, checkStoreInventory } from '../services/inventoryService';
import {
  optimizeDarkStoreDelivery,
  buildDijkstraGraph,
} from '../services/routeOptimizer';
import type { CartItem, DarkStore, RoadNetworkData } from '../types/store';

describe('Smart Dark Store Finder & Route Optimizer Unit Tests', () => {
  const milk = sampleProducts.find((p) => p.id === 'prod_milk')!;
  const bread = sampleProducts.find((p) => p.id === 'prod_bread')!;
  const rice = sampleProducts.find((p) => p.id === 'prod_rice')!;
  const butter = sampleProducts.find((p) => p.id === 'prod_butter')!;
  const juice = sampleProducts.find((p) => p.id === 'prod_juice')!;

  // 1. Product available in multiple stores
  it('Scenario 1: Correctly identifies multiple stores having requested product in stock', () => {
    const cart: CartItem[] = [{ product: milk, quantity: 2 }];
    const filtering = filterStoresByInventory(sampleDarkStores, cart);

    // All sample stores carry Milk
    expect(filtering.eligibleStores.length).toBeGreaterThanOrEqual(4);
    expect(filtering.hasAnyEligibleStore).toBe(true);
  });

  // 2. Product unavailable in some stores
  it('Scenario 2: Excludes stores where a product is out of stock', () => {
    // Rice is out of stock in DS_NORTH and DS_SOUTH
    const cart: CartItem[] = [{ product: rice, quantity: 1 }];
    const filtering = filterStoresByInventory(sampleDarkStores, cart);

    const eligibleIds = filtering.eligibleStores.map((s) => s.id);
    expect(eligibleIds).not.toContain('DS_NORTH');
    expect(eligibleIds).not.toContain('DS_SOUTH');

    // Central, East and West have rice
    expect(eligibleIds).toContain('DS_CENTRAL');
    expect(eligibleIds).toContain('DS_EAST');
    expect(eligibleIds).toContain('DS_WEST');
  });

  // 3. Product unavailable everywhere (excessive quantity requested)
  it('Scenario 3: Gracefully handles scenario where product requested exceeds any store stock', () => {
    const cart: CartItem[] = [{ product: milk, quantity: 9999 }];
    const filtering = filterStoresByInventory(sampleDarkStores, cart);

    expect(filtering.eligibleStores.length).toBe(0);
    expect(filtering.hasAnyEligibleStore).toBe(false);
    expect(filtering.ineligibleStores.length).toBe(sampleDarkStores.length);
  });

  // 4. Multiple products available in one store
  it('Scenario 4: Validates multi-product fulfillment in a single qualifying store', () => {
    // Cart with Milk and Bread
    const cart: CartItem[] = [
      { product: milk, quantity: 2 },
      { product: bread, quantity: 2 },
    ];
    const check = checkStoreInventory(sampleDarkStores[0], cart);
    expect(check.isEligible).toBe(true);
    expect(check.missingProducts.length).toBe(0);
  });

  // 5. No single store has all requested products
  it('Scenario 5: Rejects stores when no single store holds all requested items simultaneously', () => {
    // Create a mock set of two stores with disjoint inventories
    const disjointStores: DarkStore[] = [
      {
        id: 'STORE_A',
        name: 'Store A',
        nodeId: 'N01',
        address: 'A',
        rating: 4.5,
        deliveryTimeEstimate: '10m',
        inventory: { prod_rice: 10, prod_butter: 0 },
      },
      {
        id: 'STORE_B',
        name: 'Store B',
        nodeId: 'N04',
        address: 'B',
        rating: 4.5,
        deliveryTimeEstimate: '10m',
        inventory: { prod_rice: 0, prod_butter: 10 },
      },
    ];

    const cart: CartItem[] = [
      { product: rice, quantity: 1 },
      { product: butter, quantity: 1 },
    ];

    const filtering = filterStoresByInventory(disjointStores, cart);
    expect(filtering.eligibleStores.length).toBe(0);
    expect(filtering.ineligibleStores.length).toBe(2);
  });

  // 6. Computes different routes to different stores using Dijkstra
  it('Scenario 6: Computes distinct Dijkstra shortest paths to different dark stores', () => {
    const cart: CartItem[] = [{ product: milk, quantity: 1 }];
    const customerLocation = 'N02'; // Green Valley Residency

    const result = optimizeDarkStoreDelivery(
      customerLocation,
      cart,
      sampleDarkStores,
      cityRoadNetwork,
      'DISTANCE'
    );

    expect(result.eligibleStores.length).toBeGreaterThan(1);
    const storeN01Result = result.eligibleStores.find((s) => s.store.nodeId === 'N01');
    const storeN04Result = result.eligibleStores.find((s) => s.store.nodeId === 'N04');

    expect(storeN01Result).toBeDefined();
    expect(storeN04Result).toBeDefined();

    // Verify paths are different
    expect(storeN01Result!.shortestPathNodes).not.toEqual(storeN04Result!.shortestPathNodes);
    expect(storeN01Result!.shortestPathNodes[0]).toBe('N02');
    expect(storeN01Result!.shortestPathNodes[storeN01Result!.shortestPathNodes.length - 1]).toBe(
      'N01'
    );
  });

  // 7. Shortest route differs from simple node hop count or straight line
  it('Scenario 7: Shortest route by Dijkstra accounts for actual edge weights rather than hop count', () => {
    // Custom test graph: direct edge has weight 10, but 2-hop route has weight 2 + 2 = 4
    const testNetwork: RoadNetworkData = {
      nodes: [
        {
          id: 'CUST',
          label: 'C',
          name: 'Customer',
          areaName: 'Zone',
          nodeType: 'customer_zone',
          x: 0,
          y: 0,
        },
        {
          id: 'MID',
          label: 'M',
          name: 'Mid Junction',
          areaName: 'Mid',
          nodeType: 'junction',
          x: 50,
          y: 50,
        },
        {
          id: 'DS_NEAR_HOPS',
          label: 'DS1',
          name: 'Store 1',
          areaName: 'Area 1',
          nodeType: 'dark_store',
          x: 100,
          y: 0,
        },
      ],
      edges: [
        {
          id: 'e_direct_heavy',
          source: 'CUST',
          target: 'DS_NEAR_HOPS',
          distanceKm: 15.0,
          travelTimeMins: 30,
          roadName: 'Heavy Toll Highway',
          weight: 15.0,
        },
        {
          id: 'e_step1',
          source: 'CUST',
          target: 'MID',
          distanceKm: 3.0,
          travelTimeMins: 6,
          roadName: 'Quiet Street',
          weight: 3.0,
        },
        {
          id: 'e_step2',
          source: 'MID',
          target: 'DS_NEAR_HOPS',
          distanceKm: 2.0,
          travelTimeMins: 4,
          roadName: 'Park Lane',
          weight: 2.0,
        },
      ],
    };

    const testStore: DarkStore = {
      id: 'DS_TEST',
      name: 'Test Store',
      nodeId: 'DS_NEAR_HOPS',
      address: 'Address',
      rating: 5,
      deliveryTimeEstimate: '5m',
      inventory: { prod_milk: 10 },
    };

    const result = optimizeDarkStoreDelivery(
      'CUST',
      [{ product: milk, quantity: 1 }],
      [testStore],
      testNetwork,
      'DISTANCE'
    );

    expect(result.bestStore).not.toBeNull();
    // Path should be CUST -> MID -> DS_NEAR_HOPS (total 5.0 km), NOT direct (15.0 km)
    expect(result.bestStore!.shortestPathNodes).toEqual(['CUST', 'MID', 'DS_NEAR_HOPS']);
    expect(result.bestStore!.totalDistanceKm).toBe(5.0);
  });

  // 8. Disconnected graph handling
  it('Scenario 8: Gracefully handles disconnected graph components where store is unreachable', () => {
    const disconnectedNetwork: RoadNetworkData = {
      nodes: [
        {
          id: 'CUST',
          label: 'C',
          name: 'Customer',
          areaName: 'Zone',
          nodeType: 'customer_zone',
          x: 0,
          y: 0,
        },
        {
          id: 'DS_ISLAND',
          label: 'DS',
          name: 'Island Store',
          areaName: 'Island',
          nodeType: 'dark_store',
          x: 200,
          y: 200,
        },
      ],
      edges: [], // No roads connect customer to island store!
    };

    const islandStore: DarkStore = {
      id: 'DS_ISLAND_STORE',
      name: 'Island Store',
      nodeId: 'DS_ISLAND',
      address: 'Isolated Island',
      rating: 4.0,
      deliveryTimeEstimate: 'N/A',
      inventory: { prod_milk: 100 },
    };

    const result = optimizeDarkStoreDelivery(
      'CUST',
      [{ product: milk, quantity: 1 }],
      [islandStore],
      disconnectedNetwork,
      'DISTANCE'
    );

    // Store has stock, but is unreachable
    expect(result.bestStore).toBeNull();
    expect(result.eligibleStores.length).toBe(0);
  });

  // 9. Equal-distance routes handling
  it('Scenario 9: Correctly handles two paths with identical weights deterministically', () => {
    const symmNetwork: RoadNetworkData = {
      nodes: [
        {
          id: 'CUST',
          label: 'C',
          name: 'Customer',
          areaName: 'C',
          nodeType: 'customer_zone',
          x: 0,
          y: 0,
        },
        {
          id: 'WAY1',
          label: 'W1',
          name: 'Way 1',
          areaName: 'W1',
          nodeType: 'junction',
          x: 50,
          y: -50,
        },
        {
          id: 'WAY2',
          label: 'W2',
          name: 'Way 2',
          areaName: 'W2',
          nodeType: 'junction',
          x: 50,
          y: 50,
        },
        {
          id: 'DS_TARGET',
          label: 'DS',
          name: 'Store',
          areaName: 'DS',
          nodeType: 'dark_store',
          x: 100,
          y: 0,
        },
      ],
      edges: [
        {
          id: 'e1',
          source: 'CUST',
          target: 'WAY1',
          distanceKm: 4.0,
          travelTimeMins: 8,
          roadName: 'North Path',
          weight: 4.0,
        },
        {
          id: 'e2',
          source: 'WAY1',
          target: 'DS_TARGET',
          distanceKm: 4.0,
          travelTimeMins: 8,
          roadName: 'North Exit',
          weight: 4.0,
        },
        {
          id: 'e3',
          source: 'CUST',
          target: 'WAY2',
          distanceKm: 4.0,
          travelTimeMins: 8,
          roadName: 'South Path',
          weight: 4.0,
        },
        {
          id: 'e4',
          source: 'WAY2',
          target: 'DS_TARGET',
          distanceKm: 4.0,
          travelTimeMins: 8,
          roadName: 'South Exit',
          weight: 4.0,
        },
      ],
    };

    const symmStore: DarkStore = {
      id: 'DS_SYM',
      name: 'Symmetric Store',
      nodeId: 'DS_TARGET',
      address: 'Target Hub',
      rating: 4.9,
      deliveryTimeEstimate: '10m',
      inventory: { prod_milk: 10 },
    };

    const result = optimizeDarkStoreDelivery(
      'CUST',
      [{ product: milk, quantity: 1 }],
      [symmStore],
      symmNetwork,
      'DISTANCE'
    );

    expect(result.bestStore).not.toBeNull();
    expect(result.bestStore!.totalDistanceKm).toBe(8.0);
  });

  // 10. Distance vs Travel Time optimization mode comparison
  it('Scenario 10: Produces different optimal paths or metrics when comparing DISTANCE vs TIME mode', () => {
    // Road N08 -> N10 in cityRoadNetwork:
    // Via N06: distance = 2.0 + 2.5 = 4.5 km, time = 4 + 9 = 13 mins (dense city lane)
    // Direct R_N08_N10 (East Outer Bypass): distance = 4.2 km, time = 8 mins!
    // Meanwhile, compare N02 to N03:
    // University Expressway: 3.1 km, 7 mins
    // Let's verify buildDijkstraGraph changes weights properly
    const distGraph = buildDijkstraGraph(cityRoadNetwork, 'DISTANCE');
    const timeGraph = buildDijkstraGraph(cityRoadNetwork, 'TIME');

    const edgeDist = distGraph.edges.find((e) => e.id === 'R_N01_N02')!;
    const edgeTime = timeGraph.edges.find((e) => e.id === 'R_N01_N02')!;

    expect(edgeDist.weight).toBe(2.4); // 2.4 km
    expect(edgeTime.weight).toBe(6); // 6 mins

    // Run optimization for customer at N03 (University) for Juice
    const cart: CartItem[] = [{ product: juice, quantity: 1 }];

    const distResult = optimizeDarkStoreDelivery(
      'N03',
      cart,
      sampleDarkStores,
      cityRoadNetwork,
      'DISTANCE'
    );
    const timeResult = optimizeDarkStoreDelivery(
      'N03',
      cart,
      sampleDarkStores,
      cityRoadNetwork,
      'TIME'
    );

    expect(distResult.bestStore).not.toBeNull();
    expect(timeResult.bestStore).not.toBeNull();
    expect(distResult.bestStore!.totalDistanceKm).toBeGreaterThan(0);
    expect(timeResult.bestStore!.totalTravelTimeMins).toBeGreaterThan(0);
  });
});
