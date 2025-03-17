
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AppointmentsTab from '@/components/user-appointments/AppointmentsTab';
import TurnsTab from '@/components/user-appointments/TurnsTab';

// Mock data for appointments
const MOCK_APPOINTMENTS = [
  {
    id: '1',
    ticketNumber: 'A-101',
    businessName: 'Barbería X',
    businessLogo: '/placeholder.svg',
    date: '12 de Junio, 2023',
    time: '10:30 AM',
    status: 'pending',
    estimatedTime: 15
  },
  {
    id: '2',
    ticketNumber: 'B-202',
    businessName: 'Clínica Dental',
    businessLogo: '/placeholder.svg',
    date: '15 de Junio, 2023',
    time: '12:00 PM',
    status: 'active',
    estimatedTime: 5
  }
];

// Mock data for turns
const MOCK_TURNS = [
  {
    id: '3',
    ticketNumber: 'T-303',
    businessName: 'Banco Nacional',
    businessLogo: '/placeholder.svg',
    date: '10 de Junio, 2023',
    time: '9:15 AM',
    status: 'completed'
  },
  {
    id: '4',
    ticketNumber: 'T-404',
    businessName: 'Oficina de Correos',
    businessLogo: '/placeholder.svg',
    date: '8 de Junio, 2023',
    time: '11:45 AM',
    status: 'cancelled'
  }
];

const UserAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState("citas");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mis Citas y Turnos</h1>
          <p className="text-gray-600">Gestiona tus reservas y turnos en curso</p>
        </div>
        
        <Tabs defaultValue="citas" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="citas" className="flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Citas
            </TabsTrigger>
            <TabsTrigger value="turnos" className="flex items-center justify-center">
              <ListChecks className="w-4 h-4 mr-2" />
              Turnos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="citas">
            <AppointmentsTab appointments={MOCK_APPOINTMENTS} />
          </TabsContent>
          
          <TabsContent value="turnos">
            <TurnsTab turns={MOCK_TURNS} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserAppointments;
