
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const BusinessDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("perfil");
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar 
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
      />
      
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          <DashboardHeader businessName="Barbería X" />
          
          {/* Dashboard tabs */}
          <DashboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          {/* This renders child routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
