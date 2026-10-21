import type { GraphData, DijkstraResult, AlgorithmStep, NodeVisualState, EdgeVisualState } from '../types/graph';
import { MinPriorityQueue } from './priorityQueue';
import { validateGraph } from './graphValidation';

export function runDijkstra(
  graph: GraphData,
  sourceId: string,
  destinationId: string
): DijkstraResult {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  // Validate Graph
  const validation = validateGraph(graph);
  if (!validation.isValid) {
    return {
      path: [],
      totalWeight: Infinity,
      distances: {},
      predecessors: {},
      visitedOrder: [],
      edgeExaminationsCount: 0,
      nodesVisitedCount: 0,
      executionTimeMs: 0,
      steps: [],
      success: false,
      errorMessage: validation.errors.join(' | '),
    };
  }

  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
  if (!nodeMap.has(sourceId)) {
    return {
      path: [],
      totalWeight: Infinity,
      distances: {},
      predecessors: {},
      visitedOrder: [],
      edgeExaminationsCount: 0,
      nodesVisitedCount: 0,
      executionTimeMs: 0,
      steps: [],
      success: false,
      errorMessage: `Source node "${sourceId}" does not exist in the graph.`,
    };
  }

  if (!nodeMap.has(destinationId)) {
    return {
      path: [],
      totalWeight: Infinity,
      distances: {},
      predecessors: {},
      visitedOrder: [],
      edgeExaminationsCount: 0,
      nodesVisitedCount: 0,
      executionTimeMs: 0,
      steps: [],
      success: false,
      errorMessage: `Destination node "${destinationId}" does not exist in the graph.`,
    };
  }

  // Build Adjacency List for undirected graph
  const adj = new Map<string, Array<{ neighbor: string; weight: number; edgeId: string }>>();
  for (const node of graph.nodes) {
    adj.set(node.id, []);
  }

  for (const edge of graph.edges) {
    adj.get(edge.source)?.push({ neighbor: edge.target, weight: edge.weight, edgeId: edge.id });
    adj.get(edge.target)?.push({ neighbor: edge.source, weight: edge.weight, edgeId: edge.id });
  }

  // Initialize data structures
  const distances: Record<string, number> = {};
  const predecessors: Record<string, string | null> = {};
  const visitedSet = new Set<string>();
  const visitedOrder: string[] = [];
  let edgeExaminationsCount = 0;

  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    predecessors[node.id] = null;
  }
  distances[sourceId] = 0;

  const pq = new MinPriorityQueue<string>();
  pq.insert(sourceId, 0);

  // Visual tracking
  const nodeStates: Record<string, NodeVisualState> = {};
  const edgeStates: Record<string, EdgeVisualState> = {};

  for (const node of graph.nodes) {
    nodeStates[node.id] = 'unvisited';
  }
  for (const edge of graph.edges) {
    edgeStates[edge.id] = 'default';
  }

  const steps: AlgorithmStep[] = [];
  let stepCount = 0;

  const recordStep = (
    type: AlgorithmStep['type'],
    desc: string,
    currentNodeId?: string,
    examinedEdge?: { source: string; target: string; weight: number }
  ) => {
    steps.push({
      stepNumber: ++stepCount,
      type,
      currentNodeId,
      examinedEdge,
      distances: { ...distances },
      predecessors: { ...predecessors },
      visitedNodes: [...visitedOrder],
      pqSnapshot: pq.toArray().map((item) => ({ nodeId: item.value, distance: item.priority })),
      nodeStates: { ...nodeStates },
      edgeStates: { ...edgeStates },
      description: desc,
    });
  };

  // Step 1: Initial state
  nodeStates[sourceId] = 'relaxed';
  recordStep(
    'INIT',
    `Initialized distances: dist[${sourceId}] = 0, all other nodes set to ∞. Added source "${sourceId}" to priority queue.`
  );

  // Case: source === destination
  if (sourceId === destinationId) {
    nodeStates[sourceId] = 'path';
    recordStep(
      'COMPLETE',
      `Source and destination are the same node "${sourceId}". Shortest path distance is 0.`,
      sourceId
    );

    const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    return {
      path: [sourceId],
      totalWeight: 0,
      distances,
      predecessors,
      visitedOrder: [sourceId],
      edgeExaminationsCount: 0,
      nodesVisitedCount: 1,
      executionTimeMs: Math.max(0.01, Number((endTime - startTime).toFixed(3))),
      steps,
      success: true,
    };
  }

  // Dijkstra Main Loop
  let destinationFinalized = false;

  while (!pq.isEmpty()) {
    const minItem = pq.extractMin()!;
    const u = minItem.value;
    const currentDist = minItem.priority;

    // Stale entry check
    if (currentDist > distances[u]) {
      continue;
    }

    if (distances[u] === Infinity) {
      // All remaining nodes are unreachable
      break;
    }

    if (visitedSet.has(u)) {
      continue;
    }

    // Set current node visual state
    nodeStates[u] = 'current';
    recordStep(
      'EXTRACT_MIN',
      `Extracted node "${u}" with minimum tentative distance ${distances[u]} from priority queue.`,
      u
    );

    if (u === destinationId) {
      destinationFinalized = true;
      visitedSet.add(u);
      visitedOrder.push(u);
      nodeStates[u] = 'visited';
      recordStep(
        'VISIT_NODE',
        `Destination node "${destinationId}" reached with optimal finalized distance ${distances[u]}.`,
        u
      );
      break;
    }

    // Explore neighbors
    const neighbors = adj.get(u) || [];
    for (const { neighbor: v, weight, edgeId } of neighbors) {
      edgeExaminationsCount++;

      // Visual state for edge examination
      edgeStates[edgeId] = 'examining';
      recordStep(
        'EXAMINE_EDGE',
        `Examining edge (${u} ↔ ${v}) with weight ${weight}. Current dist[${v}] = ${distances[v] === Infinity ? '∞' : distances[v]}.`,
        u,
        { source: u, target: v, weight }
      );

      if (visitedSet.has(v)) {
        edgeStates[edgeId] = 'default';
        recordStep(
          'SKIP_EDGE',
          `Neighbor "${v}" is already finalized/visited. Skipping relaxation.`,
          u,
          { source: u, target: v, weight }
        );
        continue;
      }

      const newDist = distances[u] + weight;
      if (newDist < distances[v]) {
        distances[v] = newDist;
        predecessors[v] = u;
        pq.insert(v, newDist);

        nodeStates[v] = 'relaxed';
        edgeStates[edgeId] = 'relaxed';

        recordStep(
          'RELAX_EDGE',
          `Relaxed edge (${u} ↔ ${v}): improved dist[${v}] from previous value to ${newDist} via predecessor "${u}". Added "${v}" to priority queue.`,
          u,
          { source: u, target: v, weight }
        );
      } else {
        edgeStates[edgeId] = 'default';
        recordStep(
          'SKIP_EDGE',
          `No improvement for node "${v}" via "${u}" (${distances[u]} + ${weight} = ${newDist} ≥ ${distances[v]}).`,
          u,
          { source: u, target: v, weight }
        );
      }
    }

    visitedSet.add(u);
    visitedOrder.push(u);
    nodeStates[u] = 'visited';
    recordStep(
      'VISIT_NODE',
      `Finalized node "${u}" as visited. Tentative distance ${distances[u]} is now guaranteed minimal.`,
      u
    );
  }

  // Reconstruct path
  const path: string[] = [];
  if (distances[destinationId] === Infinity || (!destinationFinalized && distances[destinationId] === Infinity)) {
    recordStep(
      'NO_PATH',
      `No reachable path exists between source "${sourceId}" and destination "${destinationId}".`
    );

    const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    return {
      path: [],
      totalWeight: Infinity,
      distances,
      predecessors,
      visitedOrder,
      edgeExaminationsCount,
      nodesVisitedCount: visitedOrder.length,
      executionTimeMs: Math.max(0.01, Number((endTime - startTime).toFixed(3))),
      steps,
      success: false,
      errorMessage: `No path exists between node "${sourceId}" and node "${destinationId}".`,
    };
  }

  // Trace back predecessors
  let curr: string | null = destinationId;
  while (curr !== null) {
    path.push(curr);
    curr = predecessors[curr];
  }
  path.reverse();

  // Reset edge visual states to default, then highlight shortest path
  for (const edge of graph.edges) {
    edgeStates[edge.id] = 'default';
  }

  // Highlight path edges and nodes
  for (let i = 0; i < path.length; i++) {
    const node = path[i];
    nodeStates[node] = 'path';

    if (i < path.length - 1) {
      const nextNode = path[i + 1];
      const pathEdge = graph.edges.find(
        (e) =>
          (e.source === node && e.target === nextNode) ||
          (e.source === nextNode && e.target === node)
      );
      if (pathEdge) {
        edgeStates[pathEdge.id] = 'path';
      }
    }
  }

  recordStep(
    'RECONSTRUCT_PATH',
    `Reconstructed optimal path from predecessors: ${path.join(' → ')} with total path weight ${distances[destinationId]}.`
  );

  recordStep(
    'COMPLETE',
    `Dijkstra's Algorithm completed successfully! Optimal shortest path: ${path.join(' → ')} (Total Weight: ${distances[destinationId]}).`
  );

  const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return {
    path,
    totalWeight: distances[destinationId],
    distances,
    predecessors,
    visitedOrder,
    edgeExaminationsCount,
    nodesVisitedCount: visitedOrder.length,
    executionTimeMs: Math.max(0.01, Number((endTime - startTime).toFixed(3))),
    steps,
    success: true,
  };
}
