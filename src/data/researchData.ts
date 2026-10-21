export interface ResearchPaper {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  volumeIssue?: string;
  pages?: string;
  category: 
    | 'Classical Shortest-Path Algorithms'
    | 'Transportation & Road Networks'
    | 'Industrial Logistics'
    | 'Adjustable & Dynamic Weights'
    | 'AI-Assisted & Hybrid Methods';
  researchFocus: string;
  mainContribution: string;
  citationString: string;
}

export const researchPapers: ResearchPaper[] = [
  {
    id: 'paper-hadi-2025',
    authors: 'Hadi, H. M., & Ibrahim, I. M.',
    year: 2025,
    title: 'A Comprehensive Review of Shortest Path Algorithms for Network Routing',
    journal: 'Asian Journal of Research in Computer Science',
    volumeIssue: '18(3)',
    pages: '152–175',
    category: 'Classical Shortest-Path Algorithms',
    researchFocus: 'Comprehensive survey of classical and contemporary network routing graph algorithms.',
    mainContribution: 'Synthesizes structural trade-offs across Dijkstra, Bellman-Ford, and Floyd-Warshall; highlights queue optimizations and memory overhead in modern communication backbones.',
    citationString: 'Hadi, H. M., & Ibrahim, I. M. (2025). A Comprehensive Review of Shortest Path Algorithms for Network Routing. Asian Journal of Research in Computer Science, 18(3), 152–175.',
  },
  {
    id: 'paper-jabbar-2023',
    authors: 'Jabbar, L. S., Abbas, E. I., & Hasan, S. D.',
    year: 2023,
    title: 'A Modification of Shortest Path Algorithm According to Adjustable Weights Based on Dijkstra Algorithm',
    journal: 'Engineering and Technology Journal',
    volumeIssue: '41(2)',
    pages: '359–374',
    category: 'Adjustable & Dynamic Weights',
    researchFocus: 'Real-time weight adjustments in graphs where edge costs vary dynamically with network congestion.',
    mainContribution: 'Proposes an adaptive formulation extending Dijkstra\'s algorithm to recalculate cost matrices incrementally without rebuilding the entire shortest-path tree from scratch.',
    citationString: 'Jabbar, L. S., Abbas, E. I., & Hasan, S. D. (2023). A Modification of Shortest Path Algorithm According to Adjustable Weights Based on Dijkstra Algorithm. Engineering and Technology Journal, 41(2), 359–374.',
  },
  {
    id: 'paper-ojekudo-2017',
    authors: 'Ojekudo, N. A., & Akpan, N. P.',
    year: 2017,
    title: 'An Application of Dijkstra\'s Algorithm to Shortest Route Problem',
    journal: 'IOSR Journal of Mathematics',
    volumeIssue: '13(3)',
    pages: '20–32',
    category: 'Industrial Logistics',
    researchFocus: 'Practical vehicle route optimization and distribution pipeline cost minimization.',
    mainContribution: 'Demonstrates empirical cost and transit time reductions by applying Dijkstra\'s algorithm to real-world industrial delivery supply chains modeled as weighted graphs.',
    citationString: 'Ojekudo, N. A., & Akpan, N. P. (2017). An Application of Dijkstra\'s Algorithm to Shortest Route Problem. IOSR Journal of Mathematics, 13(3), 20–32.',
  },
  {
    id: 'paper-alam-2019',
    authors: 'Alam, M. A., & Faruq, M. O.',
    year: 2019,
    title: 'Finding Shortest Path for Road Network Using Dijkstra\'s Algorithm',
    journal: 'Bangladesh Journal of Multidisciplinary Scientific Research',
    volumeIssue: '1(2)',
    pages: '41–47',
    category: 'Transportation & Road Networks',
    researchFocus: 'Urban road network modeling and metropolitan intersection-to-intersection travel optimization.',
    mainContribution: 'Evaluates spatial intersection graphs using physical distance and average travel speed metrics, demonstrating how Dijkstra\'s algorithm resolves urban bottleneck congestion.',
    citationString: 'Alam, M. A., & Faruq, M. O. (2019). Finding Shortest Path for Road Network Using Dijkstra\'s Algorithm. Bangladesh Journal of Multidisciplinary Scientific Research, 1(2), 41–47.',
  },
  {
    id: 'paper-bhat-2024',
    authors: 'Bhat, A.',
    year: 2024,
    title: 'An Integrated Study on Dijkstra\'s Algorithm and Its Modern Adaptations for Network Optimisation',
    journal: 'Computer Modelling in Engineering & Sciences',
    volumeIssue: '141(1)',
    category: 'AI-Assisted & Hybrid Methods',
    researchFocus: 'Integrated synthesis of graph theoretical foundations, modern routing adaptations, and emerging AI/heuristic hybrids.',
    mainContribution: 'Provides an overarching analytical framework connecting classical greedy single-source algorithms with modern dynamic, heuristic (A*), and machine-learning-augmented network optimization paradigms.',
    citationString: 'Bhat, A. (2024). An Integrated Study on Dijkstra\'s Algorithm and Its Modern Adaptations for Network Optimisation. Computer Modelling in Engineering & Sciences, 141(1).',
  },
];
