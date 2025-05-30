"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  source: string;
  category: 'mission' | 'discovery' | 'research' | 'technology' | 'other';
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    // In a real implementation, this would fetch from an API
    const fetchNews = async () => {
      // Simulating API call
      setTimeout(() => {
        setArticles([
          {
            id: '1',
            title: "NASA's Perseverance Rover Discovers Organic Material on Mars", // Changed to double quotes
            summary: 'The rover has detected complex organic molecules that could indicate past life on the red planet.',
            publishedAt: '2023-10-15',
            url: '#',
            imageUrl: 'https://via.placeholder.com/800x400?text=Mars+Rover',
            source: 'NASA',
            category: 'discovery'
          },
          {
            id: '2',
            title: 'SpaceX Successfully Launches Starship Prototype SN20',
            summary: 'The latest test flight brings SpaceX one step closer to Mars missions.',
            publishedAt: '2023-10-12',
            url: '#',
            imageUrl: 'https://via.placeholder.com/800x400?text=Starship+Launch',
            source: 'SpaceX',
            category: 'mission'
          },
          {
            id: '3',
            title: 'James Webb Space Telescope Reveals New Details of Distant Galaxy',
            summary: 'The telescope has captured unprecedented images of a galaxy 13 billion light-years away.',
            publishedAt: '2023-10-10',
            url: '#',
            imageUrl: 'https://via.placeholder.com/800x400?text=JWST+Galaxy',
            source: 'ESA',
            category: 'discovery'
          },
          {
            id: '4',
            title: 'New Quantum Computing Breakthrough Could Revolutionize Space Communications',
            summary: 'Scientists have developed a quantum system that could enable faster and more secure communications with spacecraft.',
            publishedAt: '2023-10-08',
            url: '#',
            imageUrl: 'https://via.placeholder.com/800x400?text=Quantum+Computing',
            source: 'MIT',
            category: 'technology'
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    
    fetchNews();
  }, []);
  
  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category === filter);
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">Space News</h1>
      <p className="text-slate-300 mb-6">Stay updated with the latest developments in space exploration</p>
      
      {/* Filter controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600' : 'glassmorphism'}`}
          >
            All News
          </button>
          <button 
            onClick={() => setFilter('mission')} 
            className={`px-4 py-2 rounded-full ${filter === 'mission' ? 'bg-blue-600' : 'glassmorphism'}`}
          >
            Missions
          </button>
          <button 
            onClick={() => setFilter('discovery')} 
            className={`px-4 py-2 rounded-full ${filter === 'discovery' ? 'bg-green-600' : 'glassmorphism'}`}
          >
            Discoveries
          </button>
          <button 
            onClick={() => setFilter('research')} 
            className={`px-4 py-2 rounded-full ${filter === 'research' ? 'bg-yellow-600' : 'glassmorphism'}`}
          >
            Research
          </button>
          <button 
            onClick={() => setFilter('technology')} 
            className={`px-4 py-2 rounded-full ${filter === 'technology' ? 'bg-red-600' : 'glassmorphism'}`}
          >
            Technology
          </button>
        </div>
      </div>
      
      {/* News articles */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism rounded-lg overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    article.category === 'mission' ? 'bg-blue-600' :
                    article.category === 'discovery' ? 'bg-green-600' :
                    article.category === 'research' ? 'bg-yellow-600' :
                    article.category === 'technology' ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">{article.source}</span>
                  <span className="text-sm text-slate-400">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-slate-300 mb-4">{article.summary}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 transition-colors rounded-full text-sm"
                >
                  Read More
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}