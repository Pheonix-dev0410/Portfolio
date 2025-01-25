'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  createdAt: string;
}

interface Stats {
  totalProjects: number;
  recentProjects: Project[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    recentProjects: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const projects = await response.json();
        
        setStats({
          totalProjects: projects.length,
          recentProjects: projects
            .sort((a: Project, b: Project) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
            .map((project: Project) => ({
              id: project.id,
              title: project.title,
              createdAt: new Date(project.createdAt).toLocaleDateString(),
            })),
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Projects</p>
              <p className="text-3xl font-bold">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        {/* Recent Projects Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          {stats.recentProjects.length > 0 ? (
            <div className="space-y-4">
              {stats.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium">{project.title}</span>
                  <span className="text-sm text-gray-500">{project.createdAt}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No projects yet</p>
          )}
        </div>
      </div>
    </div>
  );
} 