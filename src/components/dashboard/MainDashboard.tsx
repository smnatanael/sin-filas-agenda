
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("perfil");
  
  return (
    <>
      <DashboardHeader businessName="Barbería X" />
      
      {/* Dashboard tabs */}
      <DashboardTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default MainDashboard;
