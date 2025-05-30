"use client";

import { useState, useEffect } from 'react'; // Import useEffect

type FilterOption = {
  id: string;
  label: string;
  color: string;
};

type ControlPanelProps = {
  onFilterChange: (filters: string[]) => void;
  onZoomLevel: (level: number) => void;
};

export default function ControlPanel({ onFilterChange, onZoomLevel }: ControlPanelProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(['planets', 'stars']);
  const [zoomLevel, setZoomLevel] = useState<number>(5);

  // Synchronize initial state with parent after the first render
  useEffect(() => {
    onFilterChange(activeFilters);
    onZoomLevel(zoomLevel);
  }, []); // Empty dependency array ensures this runs only once

  const filterOptions: FilterOption[] = [
    { id: 'planets', label: 'Planets', color: 'bg-blue-500' },
    { id: 'stars', label: 'Stars', color: 'bg-yellow-500' },
    { id: 'galaxies', label: 'Galaxies', color: 'bg-purple-500' },
    { id: 'nebulae', label: 'Nebulae', color: 'bg-pink-500' },
    { id: 'satellites', label: 'Satellites', color: 'bg-green-500' },
  ];

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev => {
      const newFilters = prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];

      // Call the parent's state update function
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseInt(e.target.value);
    setZoomLevel(newZoom);
    // Call the parent's state update function
    onZoomLevel(newZoom);
  };

  return (
    <div className="glassmorphism p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Universe Controls</h3>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Object Types</h4>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleFilterToggle(option.id)} // Correct: wrapped in arrow function
              className={`px-3 py-1 rounded-full text-sm transition-colors ${option.color} ${activeFilters.includes(option.id) ? 'opacity-100' : 'opacity-40'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Zoom Level</h4>
        <input
          type="range"
          min="1"
          max="10"
          value={zoomLevel}
          onChange={handleZoomChange} // Correct: passing function reference
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>Close</span>
          <span>Far</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">View Mode</h4>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full text-sm bg-purple-500 opacity-100">Solar System</button>
          <button className="px-3 py-1 rounded-full text-sm bg-blue-500 opacity-40">Galaxy</button>
          <button className="px-3 py-1 rounded-full text-sm bg-green-500 opacity-40">Universe</button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Information</h4>
        <div className="text-xs text-slate-300">
          <p>Click on any object to focus</p>
          <p>Drag to rotate the view</p>
          <p>Scroll to zoom in/out</p>
        </div>
      </div>
    </div>
  );
}