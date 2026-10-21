import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { GraphData, DijkstraResult, AlgorithmStep, NodeVisualState, EdgeVisualState } from '../types/graph';
import { defaultGraph } from '../data/defaultGraph';
import { runDijkstra } from '../algorithms/dijkstra';
import { generateRandomGraph, addEdgeToGraph, updateEdgeWeight, removeEdgeFromGraph } from '../algorithms/graphGenerator';

export function useDijkstraVisualizer() {
  const [graph, setGraph] = useState<GraphData>(defaultGraph);
  const [sourceId, setSourceId] = useState<string>('A');
  const [destinationId, setDestinationId] = useState<string>('G');

  const [dijkstraResult, setDijkstraResult] = useState<DijkstraResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(800); // ms per step
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  // Clear playback timer on unmount or pause
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // Ensure selected source and destination exist in current graph
  useEffect(() => {
    if (graph.nodes.length > 0) {
      if (!graph.nodes.some((n) => n.id === sourceId)) {
        setSourceId(graph.nodes[0].id);
      }
      if (!graph.nodes.some((n) => n.id === destinationId)) {
        setDestinationId(graph.nodes[graph.nodes.length - 1].id);
      }
    }
  }, [graph, sourceId, destinationId]);

  // Compute Dijkstra and prepare steps
  const executeDijkstra = useCallback(
    (startPlaying: boolean = false) => {
      clearTimer();
      setErrorMessage(null);

      const result = runDijkstra(graph, sourceId, destinationId);
      setDijkstraResult(result);

      if (!result.success && result.errorMessage && result.steps.length === 0) {
        setErrorMessage(result.errorMessage);
        setCurrentStepIndex(-1);
        setIsPlaying(false);
        return;
      }

      if (startPlaying) {
        setCurrentStepIndex(0);
        setIsPlaying(true);
      } else {
        // Jump straight to the end/complete step
        setCurrentStepIndex(result.steps.length - 1);
        setIsPlaying(false);
      }
    },
    [graph, sourceId, destinationId, clearTimer]
  );

  // Step-by-step auto-play loop
  useEffect(() => {
    if (isPlaying && dijkstraResult && dijkstraResult.steps.length > 0) {
      clearTimer();
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= dijkstraResult.steps.length - 1) {
            clearTimer();
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, playbackSpeed);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [isPlaying, dijkstraResult, playbackSpeed, clearTimer]);

  // Control handlers
  const handlePlay = useCallback(() => {
    if (!dijkstraResult || currentStepIndex === -1 || currentStepIndex >= dijkstraResult.steps.length - 1) {
      executeDijkstra(true);
    } else {
      setIsPlaying(true);
    }
  }, [dijkstraResult, currentStepIndex, executeDijkstra]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const handleNextStep = useCallback(() => {
    if (!dijkstraResult) {
      executeDijkstra(false);
      setCurrentStepIndex(0);
      return;
    }
    handlePause();
    setCurrentStepIndex((prev) => Math.min(prev + 1, dijkstraResult.steps.length - 1));
  }, [dijkstraResult, executeDijkstra, handlePause]);

  const handlePrevStep = useCallback(() => {
    handlePause();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [handlePause]);

  const handleJumpToStep = useCallback(
    (index: number) => {
      handlePause();
      if (dijkstraResult && index >= 0 && index < dijkstraResult.steps.length) {
        setCurrentStepIndex(index);
      }
    },
    [dijkstraResult, handlePause]
  );

  const handleReset = useCallback(() => {
    handlePause();
    setDijkstraResult(null);
    setCurrentStepIndex(-1);
    setErrorMessage(null);
  }, [handlePause]);

  const handleGenerateRandomGraph = useCallback(() => {
    handleReset();
    const newGraph = generateRandomGraph(7);
    setGraph(newGraph);
    if (newGraph.nodes.length >= 2) {
      setSourceId(newGraph.nodes[0].id);
      setDestinationId(newGraph.nodes[newGraph.nodes.length - 1].id);
    }
  }, [handleReset]);

  const handleResetToDefault = useCallback(() => {
    handleReset();
    setGraph(defaultGraph);
    setSourceId('A');
    setDestinationId('G');
  }, [handleReset]);

  // Node position drag updater
  const handleUpdateNodePosition = useCallback((id: string, x: number, y: number) => {
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, x: Math.round(x), y: Math.round(y) } : n)),
    }));
  }, []);

  // Edge additions and edits
  const handleAddEdge = useCallback(
    (source: string, target: string, weight: number) => {
      const res = addEdgeToGraph(graph, source, target, weight);
      if (res.success) {
        setGraph(res.graph);
        handleReset();
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    },
    [graph, handleReset]
  );

  const handleUpdateEdge = useCallback(
    (edgeId: string, weight: number) => {
      const res = updateEdgeWeight(graph, edgeId, weight);
      if (res.success) {
        setGraph(res.graph);
        handleReset();
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    },
    [graph, handleReset]
  );

  const handleRemoveEdge = useCallback(
    (edgeId: string) => {
      const updated = removeEdgeFromGraph(graph, edgeId);
      setGraph(updated);
      handleReset();
    },
    [graph, handleReset]
  );

  // Derived visual representations for current step
  const currentStep: AlgorithmStep | null = useMemo(() => {
    if (!dijkstraResult || currentStepIndex === -1 || !dijkstraResult.steps[currentStepIndex]) {
      return null;
    }
    return dijkstraResult.steps[currentStepIndex];
  }, [dijkstraResult, currentStepIndex]);

  const nodeStates: Record<string, NodeVisualState> = useMemo(() => {
    if (!currentStep) {
      const defaultStates: Record<string, NodeVisualState> = {};
      graph.nodes.forEach((n) => {
        defaultStates[n.id] = 'unvisited';
      });
      return defaultStates;
    }
    return currentStep.nodeStates;
  }, [currentStep, graph.nodes]);

  const edgeStates: Record<string, EdgeVisualState> = useMemo(() => {
    if (!currentStep) {
      const defaultEdges: Record<string, EdgeVisualState> = {};
      graph.edges.forEach((e) => {
        defaultEdges[e.id] = 'default';
      });
      return defaultEdges;
    }
    return currentStep.edgeStates;
  }, [currentStep, graph.edges]);

  const currentDistances: Record<string, number> = useMemo(() => {
    if (!currentStep) {
      const init: Record<string, number> = {};
      graph.nodes.forEach((n) => {
        init[n.id] = Infinity;
      });
      return init;
    }
    return currentStep.distances;
  }, [currentStep, graph.nodes]);

  const currentPredecessors: Record<string, string | null> = useMemo(() => {
    if (!currentStep) {
      const init: Record<string, string | null> = {};
      graph.nodes.forEach((n) => {
        init[n.id] = null;
      });
      return init;
    }
    return currentStep.predecessors;
  }, [currentStep, graph.nodes]);

  return {
    graph,
    sourceId,
    setSourceId,
    destinationId,
    setDestinationId,
    dijkstraResult,
    currentStepIndex,
    currentStep,
    isPlaying,
    playbackSpeed,
    setPlaybackSpeed,
    errorMessage,
    nodeStates,
    edgeStates,
    currentDistances,
    currentPredecessors,
    executeDijkstra,
    handlePlay,
    handlePause,
    handleNextStep,
    handlePrevStep,
    handleJumpToStep,
    handleReset,
    handleGenerateRandomGraph,
    handleResetToDefault,
    handleUpdateNodePosition,
    handleAddEdge,
    handleUpdateEdge,
    handleRemoveEdge,
  };
}
