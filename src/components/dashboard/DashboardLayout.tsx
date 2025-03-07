
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine if we should show children or the Outlet based on the current path
  const showChildren = location.pathname === '/dashboard';
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          {showChildren ? children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
