export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export type NodeVisualState = 
  | 'unvisited'
  | 'visited'
  | 'current'
  | 'relaxed'
  | 'path';

export type EdgeVisualState = 
  | 'default'
  | 'examining'
  | 'relaxed'
  | 'path';

export interface AlgorithmStep {
  stepNumber: number;
  type: 
    | 'INIT'
    | 'EXTRACT_MIN'
    | 'EXAMINE_EDGE'
    | 'RELAX_EDGE'
    | 'SKIP_EDGE'
    | 'VISIT_NODE'
    | 'RECONSTRUCT_PATH'
    | 'COMPLETE'
    | 'NO_PATH';
  currentNodeId?: string;
  examinedEdge?: { source: string; target: string; weight: number };
  distances: Record<string, number>;
  predecessors: Record<string, string | null>;
  visitedNodes: string[];
  pqSnapshot: Array<{ nodeId: string; distance: number }>;
  nodeStates: Record<string, NodeVisualState>;
  edgeStates: Record<string, EdgeVisualState>;
  description: string;
  highlightedCodeLine?: number;
}

export interface DijkstraResult {
  path: string[];
  totalWeight: number;
  distances: Record<string, number>;
  predecessors: Record<string, string | null>;
  visitedOrder: string[];
  edgeExaminationsCount: number;
  nodesVisitedCount: number;
  executionTimeMs: number;
  steps: AlgorithmStep[];
  success: boolean;
  errorMessage?: string;
}
