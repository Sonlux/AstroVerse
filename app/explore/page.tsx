"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from '../../components/map/ControlPanel';

// Dynamically import the UniverseMap component with no SSR
// This is necessary because Three.js requires the browser environment
const UniverseMap = dynamic(
  () => import('../../components/map/UniverseMap'),
  { ssr: false }
);

export default function ExplorePage() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['planets', 'stars']);
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    // In a real implementation, we would pass these filters to the UniverseMap
    console.log('Filters changed:', filters);
  };
  
  const handleZoomLevel = (level: number) => {
    setZoomLevel(level);
    // In a real implementation, we would pass this zoom level to the UniverseMap
    console.log('Zoom level changed:', level);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Explore the Universe</h1>
        <p className="text-slate-300 mb-6">Interact with our 3D map of the universe to discover celestial objects</p>
      </div>
      
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Main 3D visualization area */}
        <div className="flex-grow h-[60vh] lg:h-auto">
          <UniverseMap />
        </div>
        
        {/* Control panel sidebar */}
        <div className="w-full lg:w-80 p-4">
          <ControlPanel 
            onFilterChange={handleFilterChange} 
            onZoomLevel={handleZoomLevel} 
          />
          
          {/* Object details panel - shown when an object is selected */}
          <div className="glassmorphism p-4 rounded-lg mt-4 hidden lg:block">
            <h3 className="text-lg font-medium mb-2">Object Details</h3>
            <p className="text-sm text-slate-300 mb-4">Select an object to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
}