"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'eclipse' | 'meteor' | 'mission' | 'other';
  location?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    // In a real implementation, this would fetch from an API
    const fetchEvents = async () => {
      // Simulating API call
      setTimeout(() => {
        setEvents([
          {
            id: '1',
            title: 'Lunar Eclipse',
            date: '2023-10-28',
            description: 'A partial lunar eclipse visible from North America and parts of South America.',
            type: 'eclipse'
          },
          {
            id: '2',
            title: 'Orionid Meteor Shower',
            date: '2023-10-21',
            description: 'The Orionids, which peak during mid-October, are considered to be one of the most beautiful showers of the year.',
            type: 'meteor'
          },
          {
            id: '3',
            title: 'SpaceX Crew-8 Launch',
            date: '2023-11-15',
            description: 'SpaceX Crew Dragon spacecraft will launch on a Falcon 9 rocket from Kennedy Space Center.',
            type: 'mission',
            location: 'Kennedy Space Center, FL'
          },
          {
            id: '4',
            title: 'Jupiter at Opposition',
            date: '2023-11-03',
            description: 'Jupiter will be at its closest approach to Earth and fully illuminated by the Sun.',
            type: 'other'
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    
    fetchEvents();
  }, []);
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">Astronomical Events</h1>
      <p className="text-slate-300 mb-6">Stay updated with upcoming celestial events and space missions</p>
      
      {/* Filter controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600' : 'glassmorphism'}`}
          >
            All Events
          </button>
          <button 
            onClick={() => setFilter('eclipse')} 
            className={`px-4 py-2 rounded-full ${filter === 'eclipse' ? 'bg-blue-600' : 'glassmorphism'}`}
          >
            Eclipses
          </button>
          <button 
            onClick={() => setFilter('meteor')} 
            className={`px-4 py-2 rounded-full ${filter === 'meteor' ? 'bg-green-600' : 'glassmorphism'}`}
          >
            Meteor Showers
          </button>
          <button 
            onClick={() => setFilter('mission')} 
            className={`px-4 py-2 rounded-full ${filter === 'mission' ? 'bg-red-600' : 'glassmorphism'}`}
          >
            Space Missions
          </button>
          <button 
            onClick={() => setFilter('other')} 
            className={`px-4 py-2 rounded-full ${filter === 'other' ? 'bg-yellow-600' : 'glassmorphism'}`}
          >
            Other Events
          </button>
        </div>
      </div>
      
      {/* Events list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism p-6 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.type === 'eclipse' ? 'bg-blue-600' :
                  event.type === 'meteor' ? 'bg-green-600' :
                  event.type === 'mission' ? 'bg-red-600' : 'bg-yellow-600'
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="mb-4">{event.description}</p>
              {event.location && (
                <p className="text-sm text-slate-400">Location: {event.location}</p>
              )}
              <button className="mt-4 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 transition-colors rounded-full text-sm">
                Add to Calendar
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}