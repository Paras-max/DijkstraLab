import { describe, it, expect } from 'vitest';
import { runDijkstra } from '../algorithms/dijkstra';
import { validatePath, validateGraph } from '../algorithms/graphValidation';
import type { GraphData } from '../types/graph';

describe('Dijkstra Algorithm Unit Tests (10 Core Requirement Test Cases)', () => {
  // 1. Direct shortest route
  it('Case 1: Should correctly find a direct shortest route between two adjacent nodes when direct is optimal', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
        { id: 'C', label: 'C', x: 50, y: 50 },
      ],
      edges: [
        { id: 'e1', source: 'A', target: 'B', weight: 3 },
        { id: 'e2', source: 'A', target: 'C', weight: 5 },
        { id: 'e3', source: 'C', target: 'B', weight: 4 },
      ],
    };

    const result = runDijkstra(graph, 'A', 'B');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A', 'B']);
    expect(result.totalWeight).toBe(3);

    const pathValidation = validatePath(graph, result.path, 'A', 'B', result.totalWeight);
    expect(pathValidation.isValid).toBe(true);
  });

  // 2. Route with several intermediate nodes
  it('Case 2: Should correctly find a route traversing several intermediate nodes', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
        { id: 'C', label: 'C', x: 200, y: 0 },
        { id: 'D', label: 'D', x: 300, y: 0 },
      ],
      edges: [
        { id: 'e1', source: 'A', target: 'B', weight: 2 },
        { id: 'e2', source: 'B', target: 'C', weight: 3 },
        { id: 'e3', source: 'C', target: 'D', weight: 4 },
        { id: 'e4', source: 'A', target: 'D', weight: 15 }, // direct but much worse
      ],
    };

    const result = runDijkstra(graph, 'A', 'D');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A', 'B', 'C', 'D']);
    expect(result.totalWeight).toBe(9);

    const pathValidation = validatePath(graph, result.path, 'A', 'D', result.totalWeight);
    expect(pathValidation.isValid).toBe(true);
  });

  // 3. Graph containing multiple alternative routes
  it('Case 3: Should pick the strictly optimal route among multiple alternative pathways', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: -50 },
        { id: 'C', label: 'C', x: 100, y: 50 },
        { id: 'D', label: 'D', x: 200, y: 0 },
      ],
      edges: [
        { id: 'e1', source: 'A', target: 'B', weight: 6 },
        { id: 'e2', source: 'B', target: 'D', weight: 5 }, // Path A-B-D: 11
        { id: 'e3', source: 'A', target: 'C', weight: 3 },
        { id: 'e4', source: 'C', target: 'D', weight: 4 }, // Path A-C-D: 7
      ],
    };

    const result = runDijkstra(graph, 'A', 'D');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A', 'C', 'D']);
    expect(result.totalWeight).toBe(7);

    const pathValidation = validatePath(graph, result.path, 'A', 'D', result.totalWeight);
    expect(pathValidation.isValid).toBe(true);
  });

  // 4. Source equal to destination
  it('Case 4: Should return single-node path with 0 distance when source equals destination', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
      ],
      edges: [{ id: 'e1', source: 'A', target: 'B', weight: 10 }],
    };

    const result = runDijkstra(graph, 'A', 'A');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A']);
    expect(result.totalWeight).toBe(0);
  });

  // 5. Disconnected destination
  it('Case 5: Should gracefully report no path for disconnected graph components', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 50, y: 0 },
        { id: 'C', label: 'C', x: 200, y: 0 },
      ],
      edges: [{ id: 'e1', source: 'A', target: 'B', weight: 4 }], // C is disconnected
    };

    const result = runDijkstra(graph, 'A', 'C');
    expect(result.success).toBe(false);
    expect(result.path).toEqual([]);
    expect(result.totalWeight).toBe(Infinity);
    expect(result.errorMessage).toContain('No path exists');
  });

  // 6. Single node graph
  it('Case 6: Should handle a single-node graph correctly', () => {
    const graph: GraphData = {
      nodes: [{ id: 'A', label: 'A', x: 0, y: 0 }],
      edges: [],
    };

    const result = runDijkstra(graph, 'A', 'A');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A']);
    expect(result.totalWeight).toBe(0);
  });

  // 7. Graph containing cycles
  it('Case 7: Should correctly resolve graphs with cycles without infinite looping', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
        { id: 'C', label: 'C', x: 100, y: 100 },
        { id: 'D', label: 'D', x: 0, y: 100 },
        { id: 'E', label: 'E', x: 200, y: 50 },
      ],
      edges: [
        // Cycle A-B-C-D-A
        { id: 'e1', source: 'A', target: 'B', weight: 2 },
        { id: 'e2', source: 'B', target: 'C', weight: 2 },
        { id: 'e3', source: 'C', target: 'D', weight: 2 },
        { id: 'e4', source: 'D', target: 'A', weight: 2 },
        // Branch to E
        { id: 'e5', source: 'C', target: 'E', weight: 3 },
      ],
    };

    const result = runDijkstra(graph, 'A', 'E');
    expect(result.success).toBe(true);
    // Path: A -> B -> C -> E (2 + 2 + 3 = 7) or A -> D -> C -> E (2 + 2 + 3 = 7)
    expect(result.totalWeight).toBe(7);
    expect(result.path[0]).toBe('A');
    expect(result.path[result.path.length - 1]).toBe('E');
  });

  // 8. Multiple edges offering different route weights across a mesh
  it('Case 8: Should navigate a complex mesh network with multiple weights', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
        { id: 'C', label: 'C', x: 0, y: 100 },
        { id: 'D', label: 'D', x: 100, y: 100 },
        { id: 'E', label: 'E', x: 200, y: 50 },
      ],
      edges: [
        { id: 'e1', source: 'A', target: 'B', weight: 8 },
        { id: 'e2', source: 'A', target: 'C', weight: 2 },
        { id: 'e3', source: 'C', target: 'D', weight: 2 },
        { id: 'e4', source: 'B', target: 'D', weight: 1 },
        { id: 'e5', source: 'D', target: 'E', weight: 5 },
        { id: 'e6', source: 'B', target: 'E', weight: 1 },
      ],
    };

    // Routes to E:
    // A -> B -> E : 8 + 1 = 9
    // A -> C -> D -> E : 2 + 2 + 5 = 9
    // A -> C -> D -> B -> E : 2 + 2 + 1 + 1 = 6 (Optimal!)
    const result = runDijkstra(graph, 'A', 'E');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A', 'C', 'D', 'B', 'E']);
    expect(result.totalWeight).toBe(6);
  });

  // 9. Graph where the first discovered route is not the shortest route
  it('Case 9: Should update when a longer-hop route has lower total weight than shorter-hop route', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
        { id: 'C', label: 'C', x: 50, y: 50 },
        { id: 'D', label: 'D', x: 150, y: 50 },
      ],
      edges: [
        { id: 'e1', source: 'A', target: 'B', weight: 12 }, // Direct route is 12
        { id: 'e2', source: 'A', target: 'C', weight: 2 },
        { id: 'e3', source: 'C', target: 'D', weight: 3 },
        { id: 'e4', source: 'D', target: 'B', weight: 2 },  // 3-hop route is 2+3+2 = 7
      ],
    };

    const result = runDijkstra(graph, 'A', 'B');
    expect(result.success).toBe(true);
    expect(result.path).toEqual(['A', 'C', 'D', 'B']);
    expect(result.totalWeight).toBe(7);
  });

  // 10. Invalid negative weights rejection
  it('Case 10: Should reject graphs containing negative edge weights with a descriptive validation error', () => {
    const graph: GraphData = {
      nodes: [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 100, y: 0 },
      ],
      edges: [{ id: 'e1', source: 'A', target: 'B', weight: -5 }],
    };

    const validation = validateGraph(graph);
    expect(validation.isValid).toBe(false);
    expect(validation.errors[0]).toContain('Dijkstra\'s Algorithm requires non-negative edge weights');

    const result = runDijkstra(graph, 'A', 'B');
    expect(result.success).toBe(false);
    expect(result.errorMessage).toContain('non-negative edge weights');
  });
});
