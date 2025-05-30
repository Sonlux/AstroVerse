"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';

// Define the type for the Satellite component props
type Satellite = {
  id: string;
  name: string;
  norad_id: number;
  type: 'ISS' | 'Starlink' | 'Weather' | 'Communication' | 'Other';
  launch_date: string;
  altitude: number;
  velocity: number;
  visible: boolean;
};

// Define the type for the SatelliteMap component props
type SatelliteMapProps = {
  satellites: Satellite[];
  selectedSatellite: Satellite | null;
  onSelectSatellite: Dispatch<SetStateAction<Satellite | null>>;
};

// Dynamically import the SatelliteMap component with no SSR and explicit type
const SatelliteMap = dynamic<SatelliteMapProps>(
  () => import('../../components/satellites/SatelliteMap').then(mod => mod.default as React.ComponentType<SatelliteMapProps>),
  { ssr: false }
);

export default function SatellitesPage() {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  
  useEffect(() => {
    // In a real implementation, this would fetch from an API
    const fetchSatellites = async () => {
      // Simulating API call
      setTimeout(() => {
        setSatellites([
          {
            id: '1',
            name: 'International Space Station',
            norad_id: 25544,
            type: 'ISS',
            launch_date: '1998-11-20',
            altitude: 408,
            velocity: 27600,
            visible: true
          },
          {
            id: '2',
            name: 'Starlink-1234',
            norad_id: 48208,
            type: 'Starlink',
            launch_date: '2020-03-18',
            altitude: 550,
            velocity: 27000,
            visible: false
          },
          // Add more satellites as needed
        ]);
        setLoading(false);
      }, 1000);
    };
    
    fetchSatellites();
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Satellite Tracker</h1>
        <p className="text-slate-300 mb-6">Track satellites in real-time as they orbit Earth</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Main map area */}
        <div className="flex-grow h-[60vh] lg:h-[80vh]">
          {/* Render SatelliteMap only if not loading and on client side */}
          {!loading && (
            <SatelliteMap 
              satellites={satellites} 
              selectedSatellite={selectedSatellite}
              onSelectSatellite={setSelectedSatellite}
            />
          )}
        </div>
        
        {/* Sidebar with satellite list */}
        <div className="w-full lg:w-80 p-4">
          <div className="glassmorphism p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Satellites</h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {satellites.map(satellite => (
                  <div 
                    key={satellite.id}
                    onClick={() => setSelectedSatellite(satellite)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedSatellite?.id === satellite.id ? 'bg-purple-600/50' : 'hover:bg-white/5'}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{satellite.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        satellite.type === 'ISS' ? 'bg-blue-600' :
                        satellite.type === 'Starlink' ? 'bg-yellow-600' :
                        satellite.type === 'Weather' ? 'bg-green-600' :
                        satellite.type === 'Communication' ? 'bg-pink-600' :
                        'bg-gray-600'
                      }`}>
                        {satellite.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">NORAD ID: {satellite.norad_id}</p>
                    {selectedSatellite?.id === satellite.id && (
                      <div className="mt-2 text-sm text-slate-400">
                        <p>Altitude: {satellite.altitude} km</p>
                        <p>Velocity: {satellite.velocity} km/h</p>
                        <p>Launch Date: {satellite.launch_date}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}