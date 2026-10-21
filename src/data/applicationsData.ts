export interface ApplicationCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Navigation' | 'Truck' | 'Cpu' | 'Bot' | 'Share2';
  graphRepresentation: {
    vertices: string;
    edges: string;
    weights: string;
  };
  description: string;
  realWorldImpact: string;
  practicalExample: string;
}

export const applicationCards: ApplicationCard[] = [
  {
    id: 'transportation',
    title: 'Transportation & Road Networks',
    subtitle: 'Turn-by-turn navigation & metropolitan routing',
    iconName: 'Navigation',
    graphRepresentation: {
      vertices: 'Road intersections, highway exits, transit hubs',
      edges: 'Street segments, expressways, tunnels',
      weights: 'Physical distance (km) or estimated travel time (min)',
    },
    description: 'Models metropolitan road topology where vertices denote intersections and edges correspond to navigable streets. Shortest-path search yields minimum-travel-time turn sequences.',
    realWorldImpact: 'Forms the underlying graph routing engine of consumer GPS navigation systems, ride-hailing dispatchers, and emergency vehicle response coordination.',
    practicalExample: 'Routing an ambulance from a fire station to an emergency ward via highway bypasses rather than congested surface streets.',
  },
  {
    id: 'logistics',
    title: 'Industrial Logistics & Supply Chains',
    subtitle: 'Fleet distribution & fulfillment pipeline routing',
    iconName: 'Truck',
    graphRepresentation: {
      vertices: 'Warehouses, distribution hubs, retail stores, customer drops',
      edges: 'Freight corridors, cargo flight paths, rail spurs',
      weights: 'Fuel expenditure, toll fees, transit duration',
    },
    description: 'Freight carriers evaluate multimodal supply chains with Dijkstra-based algorithms to find least-cost paths between central distribution centers and regional sorting depots.',
    realWorldImpact: 'Reduces operational transportation overhead, lowers diesel consumption, and ensures strict adherence to next-day delivery service-level agreements (SLAs).',
    practicalExample: 'Selecting the optimal cargo transfer route between a maritime seaport container yard and a central regional fulfillment warehouse.',
  },
  {
    id: 'communication',
    title: 'Communication & Computer Networks',
    subtitle: 'Internet packet routing & IP backbone protocols',
    iconName: 'Cpu',
    graphRepresentation: {
      vertices: 'Internet routers, switches, gateways, exchange points',
      edges: 'Fiber optic cables, microwave relays, satellite up-links',
      weights: 'Propagation delay (ms), link congestion, inverse bandwidth',
    },
    description: 'Underpins foundational interior gateway routing protocols, most notably OSPF (Open Shortest Path First) and IS-IS (Intermediate System to Intermediate System).',
    realWorldImpact: 'Ensures instantaneous packet forwarding across the global Internet infrastructure with minimal latency and automatic re-routing during fiber cuts.',
    practicalExample: 'An OSPF router calculating the loop-free shortest forwarding path for video streaming packets across an autonomous system (AS).',
  },
  {
    id: 'robotics',
    title: 'Autonomous Robotics & Motion Planning',
    subtitle: 'Obstacle avoidance & spatial waypoint navigation',
    iconName: 'Bot',
    graphRepresentation: {
      vertices: 'Grid cells, visibility graph corners, topological nodes',
      edges: 'Collision-free line-of-sight traversals',
      weights: 'Euclidean distance, traversal terrain penalty, motor energy',
    },
    description: 'Robots decompose workspace laser scans or 3D point clouds into visibility graphs or cell occupancy grids, finding shortest collision-free paths from start to target pose.',
    realWorldImpact: 'Powers automated guided vehicles (AGVs) in automated fulfillment warehouses, robotic surgical arms, and planetary exploration rovers.',
    practicalExample: 'A warehouse AGV navigating shelves to retrieve a product pallet without intersecting stationary structural pillars or other moving carts.',
  },
  {
    id: 'network-optimization',
    title: 'Telecommunication Network Optimization',
    subtitle: 'Bandwidth allocation, survivability & fault tolerance',
    iconName: 'Share2',
    graphRepresentation: {
      vertices: 'Telecom base stations, cell towers, fiber cross-connects',
      edges: 'Transmission links, leased lines, radio channels',
      weights: 'Composite link cost (financial rental + latency + error rate)',
    },
    description: 'Telecom engineers use Dijkstra\'s algorithm to design survivable mesh topologies, establish primary and secondary protection paths, and analyze network vulnerability.',
    realWorldImpact: 'Maximizes carrier bandwidth utilization, prevents systemic blackouts, and supports automated failover within 50 milliseconds in carrier-grade Ethernet.',
    practicalExample: 'Computing disjoint primary and backup fiber circuit paths for high-frequency financial trading connections between data centers.',
  },
];
