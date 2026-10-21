import type { GraphData } from '../types/graph';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateGraph(graph: GraphData): ValidationResult {
  const errors: string[] = [];

  if (!graph.nodes || graph.nodes.length === 0) {
    errors.push('Graph must contain at least one node.');
  }

  const nodeIds = new Set<string>();
  for (const node of graph.nodes) {
    if (!node.id || node.id.trim() === '') {
      errors.push(`Found a node with empty or invalid ID.`);
    }
    if (nodeIds.has(node.id)) {
      errors.push(`Duplicate node ID detected: "${node.id}".`);
    }
    nodeIds.add(node.id);
  }

  const seenEdges = new Set<string>();
  for (const edge of graph.edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push(`Edge references non-existent source node: "${edge.source}".`);
    }
    if (!nodeIds.has(edge.target)) {
      errors.push(`Edge references non-existent target node: "${edge.target}".`);
    }
    if (edge.source === edge.target) {
      errors.push(`Self-loops are not allowed for this graph model: edge on node "${edge.source}".`);
    }
    if (typeof edge.weight !== 'number' || isNaN(edge.weight)) {
      errors.push(`Edge between "${edge.source}" and "${edge.target}" has non-numeric weight.`);
    } else if (edge.weight < 0) {
      errors.push(`Dijkstra's Algorithm requires non-negative edge weights. Found negative weight: ${edge.weight} on edge (${edge.source} - ${edge.target}).`);
    }

    // Check duplicate undirected edge
    const edgeKey = [edge.source, edge.target].sort().join('---');
    if (seenEdges.has(edgeKey)) {
      errors.push(`Duplicate edge detected between "${edge.source}" and "${edge.target}".`);
    }
    seenEdges.add(edgeKey);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePath(
  graph: GraphData,
  path: string[],
  source: string,
  destination: string,
  expectedTotalWeight: number
): { isValid: boolean; reason?: string } {
  if (path.length === 0) {
    return { isValid: false, reason: 'Path is empty.' };
  }

  if (path[0] !== source) {
    return { isValid: false, reason: `Path starts at ${path[0]} instead of source ${source}.` };
  }

  if (path[path.length - 1] !== destination) {
    return { isValid: false, reason: `Path ends at ${path[path.length - 1]} instead of destination ${destination}.` };
  }

  if (source === destination && path.length === 1 && expectedTotalWeight === 0) {
    return { isValid: true };
  }

  let calculatedWeight = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];

    const edge = graph.edges.find(
      (e) => (e.source === u && e.target === v) || (e.source === v && e.target === u)
    );

    if (!edge) {
      return { isValid: false, reason: `No edge exists between consecutive path nodes ${u} and ${v}.` };
    }

    calculatedWeight += edge.weight;
  }

  if (calculatedWeight !== expectedTotalWeight) {
    return {
      isValid: false,
      reason: `Calculated edge weight sum (${calculatedWeight}) does not match expected total (${expectedTotalWeight}).`,
    };
  }

  return { isValid: true };
}
