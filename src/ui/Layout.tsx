import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Sidebar, Notification, LoadingSpinner } from './index';

const publicRoutes = ['/', '/auth'];

export default function Layout() {
  const location = useLocation();
  const { loading } = useAuth();
  
  // Don't show layout for public pages
  if (publicRoutes.includes(location.pathname)) {
    return (
      <Suspense fallback={<LoadingSpinner size="large" />}>
        <Outlet />
      </Suspense>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Suspense fallback={<LoadingSpinner size="large" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Notification />
    </div>
  );
}
