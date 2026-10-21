export interface ModernAdaptation {
  id: string;
  title: string;
  category: string;
  badge: string;
  underlyingIdea: string;
  shortestPathRelation: string;
  potentialBenefits: string[];
  limitationsAndChallenges: string[];
  relevantUseCase: string;
}

export const modernAdaptations: ModernAdaptation[] = [
  {
    id: 'dynamic-edge-weighting',
    title: 'Dynamic Edge Weighting',
    category: 'Network Optimization',
    badge: 'Real-Time Telemetry',
    underlyingIdea: 'Instead of assuming edge weights are fixed constants, dynamic edge weighting models weights as time-varying functions w(e, t) based on real-time latency, queue lengths, or physical road speeds.',
    shortestPathRelation: 'Extends Dijkstra\'s relaxation step so tentative distance accounts for the arrival time at node u: dist[v] = dist[u] + w(e, dist[u]).',
    potentialBenefits: [
      'Eliminates routing into freshly congested corridors or overloaded links',
      'Reflects physical reality far better than static metrics',
      'Enables proactive load balancing across redundant backbones',
    ],
    limitationsAndChallenges: [
      'Violates FIFO order if faster departures overtake earlier ones (requires FIFO consistency property)',
      'Requires frequent weight broadcast telemetry which consumes network bandwidth',
    ],
    relevantUseCase: 'Software-Defined Networking (SDN) dynamic packet routing based on live switch buffer occupancy.',
  },
  {
    id: 'traffic-aware-routing',
    title: 'Traffic-Aware Urban Routing',
    category: 'Transportation',
    badge: 'Spatio-Temporal',
    underlyingIdea: 'Combines historical rush-hour speed profiles with live incident sensor feeds to assign variable impedance to roadway segments.',
    shortestPathRelation: 'Shortest path becomes minimum estimated travel time (METT) rather than minimum geometric distance.',
    potentialBenefits: [
      'Significant reduction in commuter delays and vehicular idle time',
      'Reduces fuel consumption and urban carbon footprint',
      'Enables rapid detouring around sudden traffic accidents',
    ],
    limitationsAndChallenges: [
      'Risk of "herding effect" where routing all drivers to the same detour congests secondary residential streets',
      'Requires high-frequency GPS telemetry ingestion and map matching',
    ],
    relevantUseCase: 'Metropolitan intelligent transportation navigation systems (like Google Maps or Waze engines).',
  },
  {
    id: 'a-star-heuristics',
    title: 'A* Search & Heuristic Guidance',
    category: 'Heuristic Search',
    badge: 'Target-Directed',
    underlyingIdea: 'Incorporates a distance estimator h(n) (e.g. Euclidean or Haversine distance) to bias the priority queue toward the destination, evaluating f(n) = g(n) + h(n).',
    shortestPathRelation: 'Transforms Dijkstra\'s spherical search horizon into an elliptical beam aimed directly at the target coordinate.',
    potentialBenefits: [
      'Massive reduction in evaluated search space (often 10x fewer vertices expanded)',
      'Identical mathematical guarantee of optimality when h(n) is admissible and consistent',
      'Dramatic drop in CPU latency for point-to-point queries',
    ],
    limitationsAndChallenges: [
      'Requires spatial coordinate knowledge (x, y, z) to compute admissible heuristics',
      'Does not provide all-destinations shortest path trees in one pass like Dijkstra does',
    ],
    relevantUseCase: 'Autonomous mobile robot waypoint navigation and open-world video game AI pathfinding.',
  },
  {
    id: 'ant-colony-optimization',
    title: 'Ant Colony Optimization (ACO)',
    category: 'Swarm Intelligence',
    badge: 'Probabilistic Metaheuristic',
    underlyingIdea: 'A bio-inspired metaheuristic where simulated agents lay artificial pheromone trails along graph edges. Successful paths accumulate more pheromone, attracting subsequent agents.',
    shortestPathRelation: 'Replaces deterministic greedy priority queue extraction with stochastic swarm exploration to solve complex multi-objective routing problems.',
    potentialBenefits: [
      'Naturally explores multiple Pareto-optimal routes simultaneously',
      'Robust against single-point network link failures',
      'Solves NP-hard extensions like Traveling Salesperson Problem (TSP)',
    ],
    limitationsAndChallenges: [
      'Does not provide hard mathematical guarantees of absolute shortest distance',
      'High computational overhead and slower convergence than Dijkstra on standard graphs',
    ],
    relevantUseCase: 'Multi-depot industrial delivery fleet logistics and dynamic ad-hoc mobile networks (MANETs).',
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning in Path Planning',
    category: 'Machine Learning',
    badge: 'Q-Learning & Deep RL',
    underlyingIdea: 'An autonomous agent learns an optimal routing policy π(s) through trial-and-error environmental interactions, receiving rewards for low latency and penalties for packet loss.',
    shortestPathRelation: 'Pre-learns action-value functions (Q-values) that approximate cumulative shortest cost without traversing explicit graph edges at runtime.',
    potentialBenefits: [
      'Zero-latency decision making at packet forwarding switches via inference',
      'Adapts to non-stationary stochastic traffic patterns over time',
      'Handles complex constraints (jitter, loss, multi-tenant QoS) seamlessly',
    ],
    limitationsAndChallenges: [
      'Lengthy offline training phase and vulnerability to out-of-distribution network topologies',
      'Lack of formal safety or loop-free routing guarantees in adversarial conditions',
    ],
    relevantUseCase: 'Autonomous drone flight path planning through dynamic obstacle zones and next-gen 6G core networks.',
  },
  {
    id: 'ai-assisted-hybrid-routing',
    title: 'AI-Assisted Hybrid Routing Frameworks',
    category: 'Hybrid Architectures',
    badge: 'Neural-Graph Integration',
    underlyingIdea: 'Couples deep Graph Neural Networks (GNNs) with classical Dijkstra search. The neural model predicts graph pruning masks or edge importance, and Dijkstra computes the exact certified path.',
    shortestPathRelation: 'Uses AI to dramatically prune the graph candidate set (V\', E\') while keeping Dijkstra as the deterministic solver to guarantee correctness.',
    potentialBenefits: [
      'Combines the speed of deep learning with the mathematical rigor of Dijkstra',
      'Ensures 100% path validity while achieving sub-millisecond query execution on continental graphs',
    ],
    limitationsAndChallenges: [
      'Requires GPU acceleration or specialized neural inference runtimes',
      'Requires substantial training datasets of historical graph queries',
    ],
    relevantUseCase: 'Global cloud backbone interconnect routing across continental data center clusters.',
  },
];
