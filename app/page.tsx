import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* We'll replace this with a Three.js background later */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/20 to-navy-950 z-10"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Explore Space in Real Time
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-slate-300">
            An immersive journey through our universe with live data and interactive 3D visualization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/explore" 
              className="glassmorphism px-8 py-3 rounded-full text-white font-medium hover:bg-purple-700/20 transition-colors"
            >
              Start Exploring
            </Link>
            <Link 
              href="/events" 
              className="glassmorphism px-8 py-3 rounded-full text-white font-medium hover:bg-blue-700/20 transition-colors"
            >
              Upcoming Events
            </Link>
            <Link 
              href="/learn" 
              className="glassmorphism px-8 py-3 rounded-full text-white font-medium hover:bg-green-700/20 transition-colors"
            >
              Learn Astronomy
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Discover the Universe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glassmorphism p-6 rounded-xl">
              <div className="mb-4 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">3D Universe Map</h3>
              <p className="text-slate-300">Explore our solar system, stars, galaxies, and more in an interactive 3D environment.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glassmorphism p-6 rounded-xl">
              <div className="mb-4 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Events</h3>
              <p className="text-slate-300">Track astronomical events, space missions, and launches in real-time.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="glassmorphism p-6 rounded-xl">
              <div className="mb-4 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Educational Content</h3>
              <p className="text-slate-300">Learn about astronomy with interactive lessons, quizzes, and simulations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
