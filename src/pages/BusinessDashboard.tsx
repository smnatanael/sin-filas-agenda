
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MainDashboard from '@/components/dashboard/MainDashboard';

const BusinessDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <MainDashboard />
    </DashboardLayout>
  );
};

export default BusinessDashboard;
