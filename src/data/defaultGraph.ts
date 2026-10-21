import type { GraphData } from '../types/graph';

// Seven nodes A-G with well-spaced layout for a 800x500 viewport
export const defaultGraph: GraphData = {
  nodes: [
    { id: 'A', label: 'A', x: 120, y: 250 },
    { id: 'B', label: 'B', x: 280, y: 130 },
    { id: 'C', label: 'C', x: 280, y: 370 },
    { id: 'D', label: 'D', x: 480, y: 130 },
    { id: 'E', label: 'E', x: 480, y: 370 },
    { id: 'F', label: 'F', x: 650, y: 200 },
    { id: 'G', label: 'G', x: 670, y: 360 },
  ],
  edges: [
    { id: 'e-AB', source: 'A', target: 'B', weight: 4 },
    { id: 'e-AC', source: 'A', target: 'C', weight: 3 },
    { id: 'e-BC', source: 'B', target: 'C', weight: 2 },
    { id: 'e-BD', source: 'B', target: 'D', weight: 5 },
    { id: 'e-CD', source: 'C', target: 'D', weight: 7 },
    { id: 'e-CE', source: 'C', target: 'E', weight: 8 },
    { id: 'e-DE', source: 'D', target: 'E', weight: 2 },
    { id: 'e-DF', source: 'D', target: 'F', weight: 6 },
    { id: 'e-EF', source: 'E', target: 'F', weight: 4 },
    { id: 'e-EG', source: 'E', target: 'G', weight: 5 },
    { id: 'e-FG', source: 'F', target: 'G', weight: 3 },
  ],
};
