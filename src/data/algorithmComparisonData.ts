export interface AlgorithmComparisonItem {
  id: string;
  name: string;
  creatorOrOrigin: string;
  type: string;
  timeComplexity: string;
  spaceComplexity: string;
  negativeWeights: 'Supported & Detects Cycles' | 'Not Supported (Fails/Invalid)' | 'N/A (Unweighted)';
  optimalFor: string;
  keyStrengths: string[];
  keyLimitations: string[];
  summary: string;
}

export const comparisonAlgorithms: AlgorithmComparisonItem[] = [
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    creatorOrOrigin: 'Edsger W. Dijkstra (1956)',
    type: 'Single-Source Shortest Path (Greedy)',
    timeComplexity: 'O((V + E) log V) with Min-Heap',
    spaceComplexity: 'O(V + E)',
    negativeWeights: 'Not Supported (Fails/Invalid)',
    optimalFor: 'Static weighted graphs with non-negative edge costs (network routing, maps).',
    keyStrengths: [
      'Guaranteed mathematical optimality on non-negative graphs',
      'Fast O((V+E) log V) execution with binary min-heap',
      'Extremely memory efficient priority queue architecture',
    ],
    keyLimitations: [
      'Fails when any edge weight is negative (greedy assumption violated)',
      'Explores omnidirectionally without goal-directed heuristic',
    ],
    summary: 'The gold standard for single-source shortest paths on non-negative weighted graphs. It iteratively finalizes the closest unvisited vertex.',
  },
  {
    id: 'bellman-ford',
    name: 'Bellman–Ford Algorithm',
    creatorOrOrigin: 'Alfonso Shimbel, Richard Bellman, Lester Ford Jr. (1955–1958)',
    type: 'Single-Source Shortest Path (Dynamic Programming)',
    timeComplexity: 'O(V · E)',
    spaceComplexity: 'O(V)',
    negativeWeights: 'Supported & Detects Cycles',
    optimalFor: 'Graphs with negative edge weights and negative cycle detection (financial arbitrage, distance vector routing).',
    keyStrengths: [
      'Handles arbitrary negative edge weights reliably',
      'Detects and reports reachable negative-weight cycles',
      'Simple relaxation loop across all edges (V - 1) times',
    ],
    keyLimitations: [
      'Asymptotically much slower than heap-based Dijkstra (O(V·E) vs O((V+E) log V))',
      'Impractical for massive road or web networks without pruning',
    ],
    summary: 'Relaxes every edge in the graph (V - 1) times. Capable of discovering negative cycles where infinite cost reduction would otherwise occur.',
  },
  {
    id: 'floyd-warshall',
    name: 'Floyd–Warshall Algorithm',
    creatorOrOrigin: 'Robert Floyd, Stephen Warshall (1962)',
    type: 'All-Pairs Shortest Path (Dynamic Programming)',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    negativeWeights: 'Supported & Detects Cycles',
    optimalFor: 'Dense graphs and systems needing shortest paths between all pairs of nodes (all-to-all connectivity matrices).',
    keyStrengths: [
      'Computes distance between every pair of vertices (u, v) in a single pass',
      'Extremely compact triple-nested loop implementation',
      'Works with negative weights (provided no negative cycles exist)',
    ],
    keyLimitations: [
      'Cubic O(V³) time makes it unusable for graphs with more than a few thousand vertices',
      'O(V²) space requirement for distance and predecessor matrices',
    ],
    summary: 'Uses dynamic programming over intermediate vertices k ∈ {1..V} to solve the all-pairs shortest path problem in O(V³) time.',
  },
  {
    id: 'a-star',
    name: 'A* Search Algorithm',
    creatorOrOrigin: 'Peter Hart, Nils Nilsson, Bertram Raphael (1968)',
    type: 'Heuristic-Guided Single-Pair Search',
    timeComplexity: 'O(E) best-case to O(b^d) worst-case',
    spaceComplexity: 'O(V)',
    negativeWeights: 'Not Supported (Fails/Invalid)',
    optimalFor: 'Goal-directed point-to-point pathfinding (video games, robotics, GPS turn-by-turn navigation).',
    keyStrengths: [
      'Directed search using heuristic f(n) = g(n) + h(n) towards the target',
      'Explores significantly fewer nodes than uninformed Dijkstra',
      'Guaranteed optimal if heuristic h(n) is admissible and consistent',
    ],
    keyLimitations: [
      'Requires a problem-specific heuristic function (e.g. Euclidean distance)',
      'Memory intensive in large state spaces (stores all explored nodes in open/closed sets)',
    ],
    summary: 'Enhances Dijkstra by adding an estimated heuristic cost h(n) to guide the search frontier directly toward the goal node.',
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    creatorOrOrigin: 'Edward F. Moore (1959)',
    type: 'Unweighted Graph Traversal',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    negativeWeights: 'N/A (Unweighted)',
    optimalFor: 'Unweighted graphs, minimum hop counts, peer-to-peer broadcast, bipartite checking.',
    keyStrengths: [
      'Linear O(V + E) runtime using a simple FIFO queue',
      'Finds path with fewest edges with zero priority queue overhead',
      'Minimal memory overhead',
    ],
    keyLimitations: [
      'Ignores edge weights; minimizes hop count rather than accumulated cost',
      'Cannot optimize metrics such as delay, distance, or financial cost',
    ],
    summary: 'Explores vertices level-by-level using a FIFO queue. Equivalent to Dijkstra when all edge weights are identical positive constants.',
  },
  {
    id: 'adaptive-dijkstra',
    name: 'Modified / Adaptive Dijkstra',
    creatorOrOrigin: 'Contemporary Research Category (2017–2025)',
    type: 'Dynamic & Re-optimizing Routing Category',
    timeComplexity: 'O((V + E) log V) base + dynamic updates',
    spaceComplexity: 'O(V + E)',
    negativeWeights: 'Not Supported (Fails/Invalid)',
    optimalFor: 'Dynamic networks, traffic fluctuations, link failure recovery, variable bandwidth paths.',
    keyStrengths: [
      'Recomputes altered subtrees without full re-execution from scratch',
      'Integrates time-dependent cost functions and congestion weights',
      'Bridges static theoretical graphs with real-world telecommunication systems',
    ],
    keyLimitations: [
      'Requires continuous state synchronization and event-driven updates',
      'Increased implementation complexity and state tracking overhead',
    ],
    summary: 'A category of modern adaptations extending Dijkstra to support time-dependent costs, live congestion updates, and rapid incremental route repairs.',
  },
];
