"use client";

import { useState } from 'react';
import Image from 'next/image';

// This would be replaced with actual authentication logic
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://via.placeholder.com/150',
  joinDate: '2023-01-15',
  savedEvents: 3,
  trackedSatellites: 2,
  completedCourses: 1,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
      <p className="text-slate-300 mb-6">Manage your account and saved items</p>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="glassmorphism p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image 
                  src={mockUser.avatar} 
                  alt="Profile picture"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{mockUser.name}</h2>
                <p className="text-sm text-slate-400">{mockUser.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('events')} 
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'events' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
              >
                Saved Events
              </button>
              <button 
                onClick={() => setActiveTab('satellites')} 
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'satellites' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
              >
                Tracked Satellites
              </button>
              <button 
                onClick={() => setActiveTab('courses')} 
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'courses' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
              >
                Learning Progress
              </button>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'settings' ? 'bg-purple-600' : 'hover:bg-white/5'}`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow">
          <div className="glassmorphism p-6 rounded-lg">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-400">Name</p>
                        <p>{mockUser.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Email</p>
                        <p>{mockUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Member Since</p>
                        <p>{new Date(mockUser.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Activity Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-400">Saved Events</p>
                        <p>{mockUser.savedEvents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Tracked Satellites</p>
                        <p>{mockUser.trackedSatellites}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Completed Courses</p>
                        <p>{mockUser.completedCourses}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full">
                  Edit Profile
                </button>
              </div>
            )}
            
            {activeTab === 'events' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Saved Events</h2>
                <p className="text-slate-300">You have {mockUser.savedEvents} saved events.</p>
                {/* Event list would go here */}
              </div>
            )}
            
            {activeTab === 'satellites' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Tracked Satellites</h2>
                <p className="text-slate-300">You are tracking {mockUser.trackedSatellites} satellites.</p>
                {/* Satellite list would go here */}
              </div>
            )}
            
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>
                <p className="text-slate-300">You have completed {mockUser.completedCourses} courses.</p>
                {/* Course progress would go here */}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Email notifications for upcoming events</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Satellite pass alerts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Space news updates</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Show my profile to other users</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Allow data collection for personalized recommendations</span>
                      </label>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}