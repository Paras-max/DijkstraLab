export interface GraphConcept {
  term: string;
  definition: string;
  significance: string;
}

export const graphTheoryConcepts: GraphConcept[] = [
  {
    term: 'Graph G = (V, E)',
    definition: 'A fundamental discrete mathematical structure consisting of a set of vertices (or nodes) V and a set of connecting edges E.',
    significance: 'Provides the formal abstraction for maps, computer circuits, neural pathways, and the World Wide Web.',
  },
  {
    term: 'Vertices (Nodes) & Edges',
    definition: 'Vertices represent distinct entities or locations (e.g. cities, routers, intersections). Edges represent pairwise relationships or physical links between vertices.',
    significance: 'Form the core computational elements stored in adjacency lists or adjacency matrices.',
  },
  {
    term: 'Weighted vs. Unweighted',
    definition: 'In a weighted graph, each edge (u, v) carries a numerical cost w(u, v). In unweighted graphs, every link is identical with uniform cost of 1.',
    significance: 'Dijkstra optimizes for accumulated numerical weight; BFS is optimal only for unweighted graphs.',
  },
  {
    term: 'Directed vs. Undirected',
    definition: 'In undirected graphs, an edge connects two nodes symmetrically in both directions. In directed graphs (digraphs), edges have an orientation from source to target.',
    significance: 'Undirected graphs allow bidirectional traversal (A ↔ B), while directed graphs model one-way streets or asymmetric internet uplinks.',
  },
  {
    term: 'Source & Destination Nodes',
    definition: 'The source vertex is the designated departure origin where distance is initially 0. The destination vertex is the target objective where the shortest route terminates.',
    significance: 'Dijkstra belongs to the Single-Source Shortest Path (SSSP) problem family.',
  },
  {
    term: 'Path Cost (Cumulative Weight)',
    definition: 'The sum of all edge weights along a sequence of consecutive vertices: Cost = ∑ w(vi, vi+1).',
    significance: 'The objective of Dijkstra\'s algorithm is to find a path that strictly minimizes this cumulative sum.',
  },
];

export interface AlgorithmPrinciple {
  step: number;
  title: string;
  formula?: string;
  description: string;
  greedyIntuition: string;
}

export const corePrinciples: AlgorithmPrinciple[] = [
  {
    step: 1,
    title: 'Initialization',
    formula: 'dist[source] = 0, dist[v] = ∞ (∀ v ≠ source)',
    description: 'Assign tentative distances to all vertices. Set the source node distance to 0 (since cost to stay at origin is zero) and all other nodes to infinity (representing unknown reachability).',
    greedyIntuition: 'Establishes the initial baseline frontier from which shortest paths can be iteratively discovered.',
  },
  {
    step: 2,
    title: 'Greedy Minimum Selection',
    formula: 'u = argmin { dist[v] | v ∉ Visited }',
    description: 'Among all unvisited vertices, extract the vertex u with the smallest tentative distance using a binary min-heap priority queue.',
    greedyIntuition: 'Because all edge weights are non-negative, any alternative route to u would have to pass through another unvisited node with already equal or greater distance, making a detour strictly longer. Thus, dist[u] is guaranteed optimal.',
  },
  {
    step: 3,
    title: 'Edge Relaxation',
    formula: 'if (dist[u] + w(u, v) < dist[v])',
    description: 'For each unvisited neighbor v of u, calculate whether travelling through u yields a shorter total distance than the currently known dist[v].',
    greedyIntuition: 'Testing whether the path through the newly finalized vertex provides a faster shortcut.',
  },
  {
    step: 4,
    title: 'Distance & Predecessor Update',
    formula: 'dist[v] = dist[u] + w(u, v); prev[v] = u',
    description: 'If relaxation succeeds, update dist[v] to the new smaller value and record u as the predecessor of v. Insert or update v in the priority queue.',
    greedyIntuition: 'Maintains the breadcrumb trail that will allow backward reconstruction of the full shortest route.',
  },
  {
    step: 5,
    title: 'Finalization & Termination',
    formula: 'Visited = Visited ∪ {u}',
    description: 'Mark u as visited/finalized. Repeat greedy extraction until the destination node is finalized or all reachable nodes are processed.',
    greedyIntuition: 'Once a node is marked visited, its minimum distance will never be revised again.',
  },
  {
    step: 6,
    title: 'Path Reconstruction',
    formula: 'Path = [curr, prev[curr], prev[prev[curr]], ...]',
    description: 'Starting at destination, follow the predecessor pointers backward to the source node, then reverse the sequence to obtain the optimal path in order.',
    greedyIntuition: 'Extracts the exact sequence of vertices that achieves the minimal cumulative weight.',
  },
];

export interface WalkthroughStep {
  step: number;
  action: string;
  extractedNode: string;
  tentativeDistances: Record<string, string>;
  predecessors: Record<string, string>;
  visitedSet: string[];
  pqState: string[];
  explanation: string;
}

export const verifiableWalkthrough = {
  graphDescription: 'A 4-node connected graph with vertices {A, B, C, D}. Edges: (A, B)=2, (A, C)=5, (B, C)=1, (B, D)=7, (C, D)=3. Objective: Find shortest path from A to D.',
  steps: [
    {
      step: 0,
      action: 'Initialization',
      extractedNode: '—',
      tentativeDistances: { A: '0', B: '∞', C: '∞', D: '∞' },
      predecessors: { A: '—', B: '—', C: '—', D: '—' },
      visitedSet: [],
      pqState: ['A: 0'],
      explanation: 'Set dist[A] = 0 and all others to ∞. Push A to priority queue with priority 0.',
    },
    {
      step: 1,
      action: 'Extract A & Relax Neighbors',
      extractedNode: 'A (dist=0)',
      tentativeDistances: { A: '0', B: '2', C: '5', D: '∞' },
      predecessors: { A: '—', B: 'A', C: 'A', D: '—' },
      visitedSet: ['A'],
      pqState: ['B: 2', 'C: 5'],
      explanation: 'Extract A. Relax edge (A, B): 0 + 2 = 2 < ∞, so dist[B] becomes 2, prev[B]=A. Relax edge (A, C): 0 + 5 = 5 < ∞, so dist[C] becomes 5, prev[C]=A. Finalize A.',
    },
    {
      step: 2,
      action: 'Extract B & Relax Neighbors',
      extractedNode: 'B (dist=2)',
      tentativeDistances: { A: '0', B: '2', C: '3', D: '9' },
      predecessors: { A: '—', B: 'A', C: 'B', D: 'B' },
      visitedSet: ['A', 'B'],
      pqState: ['C: 3', 'D: 9', 'C: 5 (stale)'],
      explanation: 'Extract B (minimum tentative distance 2). Relax edge (B, C): 2 + 1 = 3 < 5! Notice how travelling via B is shorter than the direct edge (A, C). dist[C] improves to 3, prev[C]=B. Relax edge (B, D): 2 + 7 = 9 < ∞, dist[D]=9, prev[D]=B. Finalize B.',
    },
    {
      step: 3,
      action: 'Extract C & Relax Neighbors',
      extractedNode: 'C (dist=3)',
      tentativeDistances: { A: '0', B: '2', C: '3', D: '6' },
      predecessors: { A: '—', B: 'A', C: 'B', D: 'C' },
      visitedSet: ['A', 'B', 'C'],
      pqState: ['D: 6', 'D: 9 (stale)'],
      explanation: 'Extract C (tentative distance 3). Relax edge (C, D): 3 + 3 = 6 < 9! Travelling through C is faster than the path through B-D (9). dist[D] improves to 6, prev[D]=C. Finalize C.',
    },
    {
      step: 4,
      action: 'Extract D (Destination Reached)',
      extractedNode: 'D (dist=6)',
      tentativeDistances: { A: '0', B: '2', C: '3', D: '6' },
      predecessors: { A: '—', B: 'A', C: 'B', D: 'C' },
      visitedSet: ['A', 'B', 'C', 'D'],
      pqState: [],
      explanation: 'Extract D. Destination node is finalized with optimal distance 6. Algorithm terminates.',
    },
  ],
  conclusion: 'Path reconstruction by following predecessors backward: D ← C ← B ← A. Reversing yields optimal path A → B → C → D with total weight 6. Notice how the 3-hop route (cost 6) beats both the 2-hop route A-B-D (cost 9) and A-C-D (cost 8).',
};
