'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-4 py-6 bg-white/10 backdrop-blur-xl border-r border-white/10">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-xl rotate-45 relative overflow-hidden group transition-transform hover:rotate-0 duration-300">
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                P
              </span>
            </div>
            <span className="text-xl font-semibold text-white">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white group transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white group transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Projects</span>
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white group transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Messages</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white group transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`relative ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl border-b border-white/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-400 rounded-lg lg:hidden hover:bg-white/5 hover:text-white transition-colors"
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-sm font-medium text-white">Admin</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="relative p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 