import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GraphCanvas } from './components/GraphCanvas';
import { VisualizerControls } from './components/VisualizerControls';
import { ResultsPanel } from './components/ResultsPanel';
import { AlgorithmLog } from './components/AlgorithmLog';
import { DistanceTable } from './components/DistanceTable';
import { GraphEditorModal } from './components/GraphEditorModal';
import { useDijkstraVisualizer } from './hooks/useDijkstraVisualizer';
import { GitFork, AlertTriangle } from 'lucide-react';

export function App() {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const {
    graph,
    sourceId,
    setSourceId,
    destinationId,
    setDestinationId,
    dijkstraResult,
    currentStepIndex,
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
  } = useDijkstraVisualizer();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Visualizer Page */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Visualizer Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-semibold text-cyan-400 mb-1.5">
              <GitFork className="w-3.5 h-3.5" />
              Graph Theory Simulator
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dijkstra's Algorithm Visualizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select source and destination nodes, explore edge relaxation, and replay discrete algorithm steps.
            </p>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main Column: Canvas & Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <GraphCanvas
              graph={graph}
              sourceId={sourceId}
              destinationId={destinationId}
              nodeStates={nodeStates}
              edgeStates={edgeStates}
              currentDistances={currentDistances}
              onSelectSource={setSourceId}
              onSelectDestination={setDestinationId}
              onUpdateNodePosition={handleUpdateNodePosition}
            />

            <VisualizerControls
              graph={graph}
              sourceId={sourceId}
              destinationId={destinationId}
              onSelectSource={setSourceId}
              onSelectDestination={setDestinationId}
              onRunInstant={() => executeDijkstra(false)}
              onPlay={handlePlay}
              onPause={handlePause}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onReset={handleReset}
              onGenerateRandom={handleGenerateRandomGraph}
              onResetToDefault={handleResetToDefault}
              onOpenEditor={() => setIsEditorOpen(true)}
              isPlaying={isPlaying}
              currentStepIndex={currentStepIndex}
              totalSteps={dijkstraResult?.steps.length || 0}
              playbackSpeed={playbackSpeed}
              onChangeSpeed={setPlaybackSpeed}
              isComplete={
                dijkstraResult !== null &&
                currentStepIndex === dijkstraResult.steps.length - 1
              }
            />
          </div>

          {/* Right / Auxiliary Column: Results, Event Log, Distance Table */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* 1. Results Summary Panel */}
            <ResultsPanel
              result={dijkstraResult}
              sourceId={sourceId}
              destinationId={destinationId}
            />

            {/* 2. Step-by-Step Execution Log */}
            <AlgorithmLog
              steps={dijkstraResult?.steps || []}
              currentStepIndex={currentStepIndex}
              onJumpToStep={handleJumpToStep}
            />

            {/* 3. Real-Time Distance & Predecessor Table */}
            <DistanceTable
              graph={graph}
              sourceId={sourceId}
              distances={currentDistances}
              predecessors={currentPredecessors}
              nodeStates={nodeStates}
              finalPath={dijkstraResult?.path}
            />
          </div>
        </div>
      </main>

      {/* Custom Graph Editor Modal */}
      <GraphEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        graph={graph}
        onAddEdge={handleAddEdge}
        onUpdateEdge={handleUpdateEdge}
        onRemoveEdge={handleRemoveEdge}
      />
    </div>
  );
}

export default App;
