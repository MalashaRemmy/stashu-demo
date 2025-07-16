import React, { Suspense } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Navbar, Sidebar, Notification, LoadingSpinner } from './index';

const publicRoutes = ['/login', '/register'];

export default function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // Redirect to login if not authenticated and trying to access protected route
  if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  // Don't show layout for auth pages
  if (publicRoutes.includes(location.pathname)) {
    return (
      <Suspense fallback={<LoadingSpinner size="large" />}>
        <Outlet />
      </Suspense>
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
