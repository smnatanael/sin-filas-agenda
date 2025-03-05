
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from './tabs/ProfileTab';
import ServicesTab from './tabs/ServicesTab';
import ScheduleTab from './tabs/ScheduleTab';
import GalleryTab from './tabs/GalleryTab';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        <TabsTrigger value="perfil">Perfil</TabsTrigger>
        <TabsTrigger value="servicios">Servicios</TabsTrigger>
        <TabsTrigger value="horarios">Horarios</TabsTrigger>
        <TabsTrigger value="galeria">Galería</TabsTrigger>
      </TabsList>
      
      <TabsContent value="perfil">
        <ProfileTab />
      </TabsContent>
      
      <TabsContent value="servicios">
        <ServicesTab />
      </TabsContent>
      
      <TabsContent value="horarios">
        <ScheduleTab />
      </TabsContent>
      
      <TabsContent value="galeria">
        <GalleryTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
