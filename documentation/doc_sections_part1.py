"""
DijkstraLab Documentation: Part 1 through Part 7
Covers Introduction, Problem Statement, Architecture, Graph Theory, Dijkstra's Algorithm,
Dark Store Working, and Inventory System.
"""

from doc_builder_core import (
    add_heading_1, add_heading_2, add_heading_3, add_paragraph,
    add_bullet, add_callout, add_code_block, add_table_data
)
from docx.shared import Inches

def build_part1_to_part7(doc):
    # EXECUTIVE SUMMARY & TABLE OF CONTENTS
    add_heading_1(doc, "EXECUTIVE SUMMARY")
    add_paragraph(
        doc,
        "DijkstraLab is an integrated Analysis of Algorithms (AOA) project that bridges fundamental theoretical computer science "
        "and applied modern software engineering. The platform unites two interconnected modules: an interactive, step-by-step "
        "Dijkstra's Algorithm Visualizer designed for academic exploration, and a Smart Dark Store Finder & Delivery Route Optimizer "
        "modeled after contemporary quick-commerce hyper-local logistics platforms such as Zepto and Blinkit."
    )
    add_paragraph(
        doc,
        "While traditional university algorithmic curricula frequently treat graph algorithms in isolation on abstract graphs, "
        "DijkstraLab demonstrates how Dijkstra's Single-Source Shortest Path (SSSP) algorithm directly powers multi-criteria decision "
        "engines. In quick commerce, order fulfillment requires two sequential algorithmic stages: first, multi-item inventory constraint "
        "satisfaction across geographically distributed warehouses (dark stores), and second, single-source shortest path calculation across "
        "a weighted urban road network to determine the strictly minimal delivery route. All 20 automated unit tests have been executed "
        "and verified passing, guaranteeing mathematical correctness, edge-case resilience, and zero runtime regression."
    )
    add_callout(
        doc,
        "Key Engineering Highlights: Built with React 19, TypeScript, and Vite; pure client-side binary min-heap priority queue (O((V + E) log V)); "
        "dual optimization objectives (Road Distance in km vs. Transit Time in mins); real-time multi-product inventory filtering; "
        "and interactive SVG canvas rendering.",
        title="SYSTEM HIGHLIGHTS",
        kind="success"
    )

    # TABLE OF CONTENTS
    add_heading_1(doc, "TABLE OF CONTENTS")
    toc_data = [
        ("Part 1", "Project Introduction, Background, Motivation & Objectives"),
        ("Part 2", "Problem Statement: Theoretical Shortest Path & Quick-Commerce Logistics"),
        ("Part 3", "Complete Project Architecture & Module Synergy"),
        ("Part 4", "Fundamental Concepts, Graph Theory & Dark Store Mapping"),
        ("Part 5", "Dijkstra's Algorithm: Mathematical Foundation, Relaxation & Pseudocode"),
        ("Part 6", "Smart Dark Store Finder: Complete 7-Step Operational Workflow"),
        ("Part 7", "Inventory Management System, Data Structures & Constraint Filtering"),
        ("Part 8", "City Road Network Representation & Graph Topology"),
        ("Part 9", "Min-Priority Queue: Binary Heap Theory, Operations & Stale Entry Check"),
        ("Part 10", "Exhaustive Source Code Line-by-Line Explanation"),
        ("Part 11", "Complete Technology Stack Justification"),
        ("Part 12", "Repository Structure, Module Interactions & Flowcharts"),
        ("Part 13", "Mathematical Analysis, Proof Intuition & Algorithmic Complexity"),
        ("Part 14", "Comprehensive Numerical Worked Example with Step-by-Step Tables"),
        ("Part 15", "Dual Optimization Modes: Distance vs. Estimated Travel Time"),
        ("Part 16", "Website Features, UI Controls & User Interaction Guide"),
        ("Part 17", "Testing, Verification & 20-Scenario Test Suite Execution"),
        ("Part 18", "Empirical Results, Observations & Practical Findings"),
        ("Part 19", "Technical Limitations & Operational Constraints"),
        ("Part 20", "Future Scope & Advanced Engineering Roadmap"),
        ("Part 21", "Comparative Algorithmic Analysis (Dijkstra vs. Bellman-Ford, A*, Floyd-Warshall, BFS)"),
        ("Part 22", "Real-World Industrial Applications"),
        ("Part 23", "Comprehensive Viva Voce Preparation Guide (70+ Questions & Answers)"),
        ("Part 24", "Formal Project Demonstration Script (7-10 Minutes Spoken Presentation)"),
        ("Part 25", "Academic Conclusion & Pedagogical Value"),
        ("Part 26", "References & Seminal Literature"),
    ]
    add_table_data(doc, ["Chapter", "Topic Description"], toc_data, [Inches(1.2), Inches(5.3)])

    # PART 1
    add_heading_1(doc, "PART 1: PROJECT INTRODUCTION & MOTIVATION")
    add_heading_2(doc, "1.1 Project Title")
    add_paragraph(doc, "DijkstraLab - Interactive Dijkstra's Algorithm Visualization and Smart Dark Store Delivery Route Optimizer.")

    add_heading_2(doc, "1.2 Project Overview")
    add_paragraph(
        doc,
        "DijkstraLab is a comprehensive software platform engineered to demystify graph algorithms through interactive visual computing "
        "and demonstrate their indispensable value in hyper-local commerce logistics. The application operates in two distinct, "
        "completely independent yet logically synergistic modes accessible from a unified navigation interface:"
    )
    add_bullet(doc, "An educational simulator that executes Dijkstra's algorithm step-by-step on customizable and dynamically generated weighted undirected graphs. Users inspect tentative distance arrays, predecessor trees, edge relaxation events, and min-heap snapshots in real time.", "Component 1 (Algorithm Visualizer): ")
    add_bullet(doc, "A full-scale quick-commerce simulation where customers build a grocery cart and specify a delivery address on a 15-node urban road network. The engine filters 5 candidate dark stores by multi-item inventory stock, executes Dijkstra's algorithm to all fulfilling candidates, and selects the optimal dark store minimizing road distance or travel time.", "Component 2 (Smart Dark Store Finder): ")

    add_heading_2(doc, "1.3 Background and Motivation")
    add_paragraph(
        doc,
        "In undergraduate computer science curricula, graph algorithms are often presented as dry pseudocode accompanied by static chalkboard diagrams. "
        "Students frequently struggle to comprehend dynamic edge relaxation, priority queue updates, and the greedy choice property. "
        "Simultaneously, students fail to connect these mathematical formulations to modern technological innovations that they interact with daily, "
        "such as 10-minute grocery delivery services (Zepto, Blinkit, Instamart) and GPS route navigators (Google Maps, OSRM)."
    )
    add_paragraph(
        doc,
        "DijkstraLab was conceived to solve both challenges simultaneously: providing an intuitive visual environment for textbook learning while "
        "furnishing a production-grade demonstration of how multi-constraint combinatorial optimization works in modern industry."
    )

    add_heading_2(doc, "1.4 Main Objectives")
    add_bullet(doc, "To provide an interactive visual sandbox for Dijkstra's SSSP algorithm with discrete forward/backward stepping, auto-playback, and live priority queue inspection.", "1. Interactive Pedagogical Simulation: ")
    add_bullet(doc, "To implement a pure, high-performance binary min-heap priority queue in TypeScript guaranteeing O((V + E) log V) theoretical time complexity.", "2. Algorithm Implementation Rigor: ")
    add_bullet(doc, "To model an urban road network graph (15 nodes, 24 edges) mapping real-world physical constraints such as road length, traffic delay, and alternative bypasses.", "3. Urban Network Modeling: ")
    add_bullet(doc, "To create a multi-item grocery inventory ledger across multiple dark stores that dynamically enforces stock availability constraints prior to route computation.", "4. Constraint Satisfaction: ")
    add_bullet(doc, "To support dual optimization criteria (Minimum Road Distance in km vs. Minimum Travel Time in minutes) demonstrating the versatility of edge weight assignments.", "5. Multi-Objective Flexibility: ")
    add_bullet(doc, "To validate the entire engine through automated unit testing across 20 distinct algorithmic and domain-specific scenarios.", "6. Comprehensive Test Verification: ")

    # PART 2
    add_heading_1(doc, "PART 2: PROBLEM STATEMENT & PROPOSED SOLUTION")
    add_heading_2(doc, "2.1 The Traditional Shortest Path Problem")
    add_paragraph(
        doc,
        "Given a weighted graph G = (V, E) where each edge (u, v) ∈ E has a non-negative weight w(u, v) ≥ 0, and a designated source vertex s ∈ V, "
        "the Single-Source Shortest Path (SSSP) problem seeks to find a path P from s to every vertex v ∈ V such that the total weight "
        "w(P) = ∑ w(e) is minimized. Manually identifying shortest routes in graphs exceeding 5 nodes is error-prone due to the combinatorial explosion "
        "of potential paths (in a complete graph, the number of simple paths between two vertices is O(V!))."
    )

    add_heading_2(doc, "2.2 The Quick-Commerce Dark Store Selection Problem")
    add_paragraph(
        doc,
        "In quick-commerce platforms, customer satisfaction depends on delivery speed (typically 10 to 15 minutes). When an order is placed, "
        "selecting the fulfillment warehouse (dark store) is non-trivial due to competing constraints:"
    )
    add_bullet(doc, "The geographically nearest dark store (as measured by straight-line Euclidean distance) may be out of stock of one or more critical products.", "Constraint 1 (Stock Availability): ")
    add_bullet(doc, "An alternative dark store may have full stock, but local urban geography (rivers, railway tracks, one-way streets, traffic choke points) may force a circuitous road detour.", "Constraint 2 (Road Network Topology): ")
    add_bullet(doc, "The road route with the lowest physical distance (km) may traverse highly congested inner-city lanes, whereas a slightly longer highway bypass delivers the order faster.", "Constraint 3 (Distance vs. Congestion Trade-off): ")

    add_heading_2(doc, "2.3 The Proposed Solution: Two-Stage Algorithmic Pipeline")
    add_paragraph(
        doc,
        "DijkstraLab implements a mathematically rigorous two-stage optimization pipeline:"
    )
    add_bullet(doc, "For a customer cart C = {(p_1, q_1), (p_2, q_2), ...}, the system evaluates each candidate store S_k. Store S_k qualifies if and only if ∀ (p_i, q_i) ∈ C: Inventory(S_k, p_i) ≥ q_i. Ineligible stores are pruned immediately with exact shortage diagnostics.", "Stage 1 (Inventory Pruning): ")
    add_bullet(doc, "For each qualified store S_k, the road network graph G_Road is constructed with weights matching the chosen objective (Distance or Travel Time). Dijkstra's algorithm runs from the customer location s to store location S_k.nodeId. The candidate with min(DijkstraCost) is selected as optimal.", "Stage 2 (Dijkstra SSSP Route Optimization): ")

    # PART 3
    add_heading_1(doc, "PART 3: COMPLETE PROJECT ARCHITECTURE")
    add_paragraph(
        doc,
        "DijkstraLab adheres to a clean, decoupled software architecture separating user interface presentation, "
        "state management hooks, domain business services, and mathematical algorithm engines."
    )
    add_callout(
        doc,
        "Core Architectural Flow:\n"
        "[Client Navigation: Navbar (Tab Switcher)]\n"
        "   ├── Tab 1: Educational Visualizer\n"
        "   │     ├── useDijkstraVisualizer Hook\n"
        "   │     ├── runDijkstra Engine (src/algorithms/dijkstra.ts)\n"
        "   │     ├── MinPriorityQueue (src/algorithms/priorityQueue.ts)\n"
        "   │     └── Visualizer UI (GraphCanvas, Controls, Log, DistanceTable)\n"
        "   └── Tab 2: Smart Dark Store Finder\n"
        "         ├── Product Catalog & Cart State (src/data/productData.ts)\n"
        "         ├── Inventory Service (src/services/inventoryService.ts)\n"
        "         ├── Road Network Graph (src/data/roadNetwork.ts)\n"
        "         ├── Route Optimizer Engine (src/services/routeOptimizer.ts)\n"
        "         │     └── Calls runDijkstra Engine\n"
        "         └── Dark Store UI (RoadNetworkCanvas, ResultsView, InventoryModal)",
        title="SYSTEM ARCHITECTURE DIAGRAM",
        kind="info"
    )

    # PART 4
    add_heading_1(doc, "PART 4: FUNDAMENTAL CONCEPTS AND GRAPH THEORY")
    add_paragraph(
        doc,
        "To establish a sound theoretical foundation, this section defines the core graph-theoretic primitives and explains "
        "how they map directly to urban logistics and dark store delivery networks."
    )
    add_bullet(doc, "A mathematical structure G = (V, E) consisting of a set of vertices (or nodes) V and a set of edges E connecting pairs of vertices.", "Graph (G): ")
    add_bullet(doc, "A fundamental point or entity in the graph. In the Visualizer, labeled A through G. In the road network, represents customer residences, commercial hubs, dark stores, and traffic junctions.", "Vertex / Node (V): ")
    add_bullet(doc, "A connection or link between two vertices (u, v). In an undirected graph, (u, v) is identical to (v, u).", "Edge (E): ")
    add_bullet(doc, "A graph where a numerical value w(u, v) is assigned to each edge. In DijkstraLab, weights represent physical distance in kilometers or transit time in minutes.", "Weighted Graph: ")
    add_bullet(doc, "A graph where a path exists between every pair of vertices. DijkstraLab guarantees road network connectivity via an initial spanning tree backbone.", "Connected Graph: ")
    add_bullet(doc, "A sequence of vertices (v_0, v_1, ..., v_k) where consecutive vertices are connected by edges. The path weight is the sum of its constituent edge weights.", "Path & Path Weight: ")
    add_bullet(doc, "The path between two nodes that achieves the minimum possible total weight among all possible connecting paths.", "Shortest Path: ")
    add_bullet(doc, "A collection of lists where each vertex u maintains a list of tuples (v, w) representing all its adjacent neighbors and corresponding edge weights. DijkstraLab utilizes Map<string, Array<{neighbor, weight, edgeId}>> providing optimal O(1) adjacency lookup and O(V + E) memory footprint.", "Adjacency List: ")

    add_heading_2(doc, "4.1 Mapping Graph Theory to Quick-Commerce Logistics")
    mapping_data = [
        ("Graph Primitive", "Logistics Domain Entity", "DijkstraLab Implementation Instance"),
        ("Vertex v ∈ V", "Delivery location, junction, or store", "Node N02 (Green Valley), N01 (North Dark Store)"),
        ("Edge e ∈ E", "Physical bidirectional road segment", "Edge R_N01_N02 connecting North Square & Green Valley"),
        ("Edge Weight w(e)", "Road length (km) or transit delay (min)", "2.4 km (Distance mode) or 6 mins (Time mode)"),
        ("Source Vertex s", "Customer ordering location", "Customer's active pin (e.g. Node N02)"),
        ("Destination Target", "Candidate fulfilling warehouse", "Dark Store location node (e.g. Node N01, N04)"),
        ("Shortest Path P*", "Optimal delivery route sequence", "N02 → N05 → N01 (Total: 4.0 km / 13 mins)"),
        ("Graph G = (V, E)", "Metropolitan road infrastructure", "15 Nodes, 24 Interconnected Road Arteries"),
    ]
    add_table_data(doc, ["Graph Concept", "Domain Entity", "Project Instance"], mapping_data, [Inches(1.5), Inches(2.3), Inches(2.7)])

    # PART 5
    add_heading_1(doc, "PART 5: DIJKSTRA'S ALGORITHM - MATHEMATICAL FOUNDATION")
    add_paragraph(
        doc,
        "Dijkstra's Algorithm, published by Dutch computer scientist Edsger W. Dijkstra in 1959, is an optimal greedy algorithm "
        "for solving the Single-Source Shortest Path problem on weighted graphs with non-negative edge weights."
    )
    add_heading_2(doc, "5.1 The Greedy Choice Principle")
    add_paragraph(
        doc,
        "Dijkstra's algorithm partitions the vertex set V into two disjoint sets: the set S of finalized vertices whose shortest-path distances "
        "from the source s are permanently known, and the set V \\ S of unfinalized vertices whose distances are tentative. "
        "At each iteration, the algorithm greedily selects the vertex u ∈ V \\ S with the minimum tentative distance: "
        "u = argmin_{v ∈ V \\ S} dist[v]. Because all edge weights are non-negative (w(e) ≥ 0), no future relaxation through another vertex could "
        "ever produce a smaller path to u. Vertex u is therefore permanently moved to S."
    )

    add_heading_2(doc, "5.2 Edge Relaxation Formula")
    add_paragraph(
        doc,
        "Edge relaxation is the core operational step. When examining an edge (u, v) with weight w(u, v) from a newly finalized vertex u, "
        "the algorithm tests whether traversing through u offers a shorter path to neighbor v than currently recorded:"
    )
    add_callout(
        doc,
        "Relaxation Equation:\n"
        "if dist[u] + w(u, v) < dist[v] then:\n"
        "    dist[v] ← dist[u] + w(u, v)\n"
        "    predecessor[v] ← u\n"
        "    PriorityQueue.insert(v, dist[v])",
        title="RELAXATION THEOREM",
        kind="info"
    )

    add_heading_2(doc, "5.3 Why Non-Negative Weights Are Strictly Mandatory")
    add_paragraph(
        doc,
        "Dijkstra's algorithm relies fundamentally on the non-decreasing monotonic property: along any path from the source, path lengths strictly increase or stay equal. "
        "If an edge weight were negative (w(u, v) < 0), a path visiting v through an unvisited node later might decrease the distance to an already 'finalized' node, "
        "violating Dijkstra's greedy invariant and yielding incorrect results. DijkstraLab strictly validates graph inputs and rejects negative weights with error diagnostics."
    )

    add_heading_2(doc, "5.4 Formal Pseudocode")
    algo_code = (
        "function Dijkstra(Graph G, Source s, Destination d):\n"
        "    Initialize dist[v] = ∞, predecessor[v] = null for all v in G.nodes\n"
        "    dist[s] = 0\n"
        "    PQ = new MinPriorityQueue()\n"
        "    PQ.insert(s, 0)\n"
        "    visitedSet = new Set()\n"
        "\n"
        "    while not PQ.isEmpty():\n"
        "        (u, currentDist) = PQ.extractMin()\n"
        "        if currentDist > dist[u]: continue  // Skip stale entry\n"
        "        if dist[u] == ∞: break              // Unreachable component\n"
        "        if u in visitedSet: continue\n"
        "\n"
        "        if u == d: break                   // Destination reached optimally\n"
        "        visitedSet.add(u)\n"
        "\n"
        "        for each neighbor (v, weight) in G.adj[u]:\n"
        "            if v in visitedSet: continue\n"
        "            newDist = dist[u] + weight\n"
        "            if newDist < dist[v]:\n"
        "                dist[v] = newDist\n"
        "                predecessor[v] = u\n"
        "                PQ.insert(v, newDist)\n"
        "\n"
        "    return ReconstructPath(predecessor, s, d)"
    )
    add_code_block(doc, algo_code, "Core Dijkstra SSSP Implementation with Min-Heap")

    # PART 6
    add_heading_1(doc, "PART 6: SMART DARK STORE FINDER - COMPLETE WORKING")
    add_paragraph(
        doc,
        "The Smart Dark Store Finder simulates real-world instant grocery logistics through seven rigorous sequential stages:"
    )
    add_bullet(doc, "The customer selects grocery items (Milk, Bread, Eggs, Butter, Rice, Fruits, Vegetables, Juice) and quantities. State is maintained in a live reactive cart.", "Step 1: Customer Product Selection: ")
    add_bullet(doc, "The customer specifies their residential node (e.g. N02 Green Valley) via a drop-down or by directly clicking any node on the interactive SVG road map.", "Step 2: Customer Location Specification: ")
    add_bullet(doc, "Each of the 5 dark stores maintains an inventory map [productId: string]: number reflecting live stock in that facility.", "Step 3: Dark Store Inventory Ingestion: ")
    add_bullet(doc, "The inventoryService checks all stores. A store is marked eligible only if it can fulfill 100% of the cart items with sufficient stock. Ineligible stores are categorized with missing product diagnostics.", "Step 4: Multi-Item Inventory Constraint Filtering: ")
    add_bullet(doc, "The 15-node, 24-edge city road network is weighted according to the chosen optimization mode (Distance in km or Travel Time in minutes).", "Step 5: Road Network Graph Instantiation: ")
    add_bullet(doc, "The system executes Dijkstra's algorithm from the customer node to every eligible dark store's location. Shortest paths, distances, and transit times are recorded.", "Step 6: Dijkstra SSSP Execution & Candidate Comparison: ")
    add_bullet(doc, "The store with min(Cost) is selected as optimal. The UI highlights the winning store, draws the glowing delivery route on the canvas, lists all alternatives, and itemizes stock deficits for unavailable stores.", "Step 7: Final Result Presentation & Route Rendering: ")

    # PART 7
    add_heading_1(doc, "PART 7: INVENTORY MANAGEMENT SYSTEM")
    add_paragraph(
        doc,
        "The inventory management system models realistic warehouse availability. The 5 dark stores feature distinct stock profiles:"
    )
    inv_data = [
        ("Store Name", "Node", "Milk", "Bread", "Eggs", "Butter", "Rice", "Fruits", "Veg", "Juice", "Key Profile"),
        ("ZeptoSpeed North Hub", "N01", "35", "20", "24", "15", "0 (OOS)", "12", "30", "18", "Dairy/Bakery focus; No Rice"),
        ("FlashMart Central Depot", "N04", "80", "50", "60", "45", "40", "35", "70", "50", "Mega-hub; 100% full stock"),
        ("BlinkFast East Corridor", "N08", "25", "18", "0 (OOS)", "0 (OOS)", "15", "40", "45", "30", "Fresh focus; No Eggs/Butter"),
        ("QuickDrop West Pod", "N11", "40", "30", "36", "25", "50", "0 (OOS)", "20", "0 (OOS)", "Pantry focus; No Fruits/Juice"),
        ("HyperLocal South River", "N14", "28", "22", "30", "0 (OOS)", "0 (OOS)", "25", "50", "22", "Produce focus; No Butter/Rice"),
    ]
    add_table_data(doc, ["Store", "Node", "Milk", "Bread", "Eggs", "Butt", "Rice", "Fruit", "Veg", "Juice", "Profile Notes"], inv_data,
                   [Inches(1.2), Inches(0.4), Inches(0.4), Inches(0.4), Inches(0.4), Inches(0.4), Inches(0.6), Inches(0.5), Inches(0.4), Inches(0.5), Inches(1.3)])

    add_heading_2(doc, "7.1 Inventory Complexity Analysis")
    add_paragraph(
        doc,
        "Let |S| denote the number of candidate dark stores (here, |S| = 5) and |C| denote the number of unique items in the customer's cart (|C| ≤ 8). "
        "For each store, checking inventory requires iterating through the cart and performing an O(1) hash map lookup: store.inventory[productId]. "
        "Thus, the total inventory filtering time complexity is O(|S| · |C|). Space complexity is O(|S|) to store evaluation records. "
        "In a real-world city with 100 dark stores and an average cart of 20 items, this takes less than 0.1 milliseconds."
    )
