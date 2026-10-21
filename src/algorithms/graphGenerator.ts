import type { GraphData, Node, Edge } from '../types/graph';

export function generateRandomGraph(nodeCount: number = 7): GraphData {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const count = Math.min(Math.max(nodeCount, 4), letters.length);

  // Generate nodes arranged in a spacious ellipse with nice layout
  const width = 800;
  const height = 480;
  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = 300;
  const radiusY = 170;

  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    // Distribute angles evenly
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    // Add minor pleasant organic offset
    const jitterX = ((i % 3) - 1) * 15;
    const jitterY = (((i + 1) % 3) - 1) * 15;

    nodes.push({
      id: letters[i],
      label: letters[i],
      x: Math.round(centerX + radiusX * Math.cos(angle) + jitterX),
      y: Math.round(centerY + radiusY * Math.sin(angle) + jitterY),
    });
  }

  const edges: Edge[] = [];
  const existingEdges = new Set<string>();

  const getEdgeKey = (u: string, v: string) => [u, v].sort().join('---');

  const addEdge = (u: string, v: string, weight?: number) => {
    if (u === v) return;
    const key = getEdgeKey(u, v);
    if (existingEdges.has(key)) return;

    const edgeWeight = weight ?? Math.floor(Math.random() * 9) + 2; // integer 2 to 10
    edges.push({
      id: `e-${u}-${v}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      source: u,
      target: v,
      weight: edgeWeight,
    });
    existingEdges.add(key);
  };

  // 1. Spanning tree to GUARANTEE connectivity
  const connectedNodes: string[] = [nodes[0].id];
  const remainingNodes: string[] = nodes.slice(1).map((n) => n.id);

  while (remainingNodes.length > 0) {
    const remIndex = Math.floor(Math.random() * remainingNodes.length);
    const nodeToAdd = remainingNodes.splice(remIndex, 1)[0];

    const connectToIndex = Math.floor(Math.random() * connectedNodes.length);
    const targetNode = connectedNodes[connectToIndex];

    addEdge(nodeToAdd, targetNode);
    connectedNodes.push(nodeToAdd);
  }

  // 2. Add extra edges to create alternative pathways (cycles & alternative routes)
  const extraEdgesCount = Math.floor(count * 0.8) + 1;
  let attempts = 0;
  while (edges.length < count - 1 + extraEdgesCount && attempts < 50) {
    attempts++;
    const uIdx = Math.floor(Math.random() * count);
    const vIdx = Math.floor(Math.random() * count);
    if (uIdx !== vIdx) {
      addEdge(nodes[uIdx].id, nodes[vIdx].id);
    }
  }

  return { nodes, edges };
}

export function addEdgeToGraph(
  graph: GraphData,
  source: string,
  target: string,
  weight: number
): { success: boolean; graph: GraphData; error?: string } {
  if (source === target) {
    return { success: false, graph, error: 'Cannot connect a node to itself (self-loops are not allowed).' };
  }

  if (weight <= 0) {
    return { success: false, graph, error: 'Edge weight must be a positive integer greater than zero.' };
  }

  const existing = graph.edges.find(
    (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
  );

  if (existing) {
    return { success: false, graph, error: `An edge already exists between ${source} and ${target}.` };
  }

  const newEdge: Edge = {
    id: `e-${source}-${target}-${Date.now()}`,
    source,
    target,
    weight: Math.round(weight),
  };

  return {
    success: true,
    graph: {
      ...graph,
      edges: [...graph.edges, newEdge],
    },
  };
}

export function updateEdgeWeight(
  graph: GraphData,
  edgeId: string,
  newWeight: number
): { success: boolean; graph: GraphData; error?: string } {
  if (newWeight <= 0) {
    return { success: false, graph, error: 'Edge weight must be positive.' };
  }

  const edges = graph.edges.map((e) =>
    e.id === edgeId ? { ...e, weight: Math.round(newWeight) } : e
  );

  return {
    success: true,
    graph: {
      ...graph,
      edges,
    },
  };
}

export function removeEdgeFromGraph(graph: GraphData, edgeId: string): GraphData {
  return {
    ...graph,
    edges: graph.edges.filter((e) => e.id !== edgeId),
  };
}
