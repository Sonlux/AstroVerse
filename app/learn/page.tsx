"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Course = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  imageUrl: string;
  modules: number;
};

const courses: Course[] = [
  {
    id: 'intro-astronomy',
    title: 'Introduction to Astronomy',
    description: 'Learn the basics of astronomy, including the solar system, stars, and galaxies.',
    level: 'beginner',
    duration: '4 weeks',
    imageUrl: 'https://via.placeholder.com/400x300?text=Astronomy+101',
    modules: 8
  },
  {
    id: 'planetary-science',
    title: 'Planetary Science',
    description: 'Explore the planets of our solar system, their moons, and other objects.',
    level: 'intermediate',
    duration: '6 weeks',
    imageUrl: 'https://via.placeholder.com/400x300?text=Planetary+Science',
    modules: 12
  },
  {
    id: 'astrophysics',
    title: 'Introduction to Astrophysics',
    description: 'Study the physics of stars, black holes, and the universe.',
    level: 'advanced',
    duration: '8 weeks',
    imageUrl: 'https://via.placeholder.com/400x300?text=Astrophysics',
    modules: 16
  },
  {
    id: 'space-exploration',
    title: 'History of Space Exploration',
    description: 'Learn about the history of human space exploration and future missions.',
    level: 'beginner',
    duration: '3 weeks',
    imageUrl: 'https://via.placeholder.com/400x300?text=Space+Exploration',
    modules: 6
  },
];

export default function LearnPage() {
  const [levelFilter, setLevelFilter] = useState<string>('all');
  
  const filteredCourses = levelFilter === 'all' 
    ? courses 
    : courses.filter(course => course.level === levelFilter);
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Learn Astronomy</h1>
        <p className="text-slate-300 mb-6">Explore our educational resources and courses about space and astronomy</p>
        
        {/* Filter controls */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Courses</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setLevelFilter('all')} 
              className={`px-4 py-2 rounded-full ${levelFilter === 'all' ? 'bg-purple-600' : 'glassmorphism'}`}
            >
              All Levels
            </button>
            <button 
              onClick={() => setLevelFilter('beginner')} 
              className={`px-4 py-2 rounded-full ${levelFilter === 'beginner' ? 'bg-green-600' : 'glassmorphism'}`}
            >
              Beginner
            </button>
            <button 
              onClick={() => setLevelFilter('intermediate')} 
              className={`px-4 py-2 rounded-full ${levelFilter === 'intermediate' ? 'bg-blue-600' : 'glassmorphism'}`}
            >
              Intermediate
            </button>
            <button 
              onClick={() => setLevelFilter('advanced')} 
              className={`px-4 py-2 rounded-full ${levelFilter === 'advanced' ? 'bg-red-600' : 'glassmorphism'}`}
            >
              Advanced
            </button>
          </div>
        </div>
        
        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map(course => (
            <div key={course.id} className="glassmorphism rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image 
                  src={course.imageUrl} 
                  alt={course.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.level === 'beginner' ? 'bg-green-600' :
                    course.level === 'intermediate' ? 'bg-blue-600' : 'bg-red-600'
                  }`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-slate-300 mb-4">{course.description}</p>
                <div className="flex justify-between text-sm text-slate-400 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.modules} modules</span>
                </div>
                <Link 
                  href={`/learn/${course.id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional resources section */}
        <div className="mb-12">
          <h2 className="text-xl font-medium mb-4">Interactive Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Sky Tonight</h3>
              <p className="text-slate-300 mb-4">See what's visible in the night sky from your location tonight.</p>
              <Link 
                href="/tools/sky-tonight"
                className="inline-block px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 transition-colors rounded-full text-sm"
              >
                Open Tool
              </Link>
            </div>
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Planet Explorer</h3>
              <p className="text-slate-300 mb-4">Interactive 3D models of planets with detailed information.</p>
              <Link 
                href="/tools/planet-explorer"
                className="inline-block px-4 py-2 bg-green-600/30 hover:bg-green-600/50 transition-colors rounded-full text-sm"
              >
                Open Tool
              </Link>
            </div>
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Space Quiz</h3>
              <p className="text-slate-300 mb-4">Test your knowledge about space with our interactive quizzes.</p>
              <Link 
                href="/tools/quiz"
                className="inline-block px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 transition-colors rounded-full text-sm"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}