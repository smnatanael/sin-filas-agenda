
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Ticket from '@/components/Ticket';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
            {MOCK_APPOINTMENTS.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_APPOINTMENTS.map(appointment => (
                  <Ticket 
                    key={appointment.id}
                    ticketNumber={appointment.ticketNumber}
                    businessName={appointment.businessName}
                    businessLogo={appointment.businessLogo}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status as any}
                    estimatedTime={appointment.estimatedTime}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarCheck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No tienes citas programadas</h3>
                <p className="text-gray-500 mt-2">Cuando reserves una cita, aparecerá aquí</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="turnos">
            {MOCK_TURNS.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_TURNS.map(turn => (
                  <Ticket 
                    key={turn.id}
                    ticketNumber={turn.ticketNumber}
                    businessName={turn.businessName}
                    businessLogo={turn.businessLogo}
                    date={turn.date}
                    time={turn.time}
                    status={turn.status as any}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ListChecks className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">No tienes turnos activos</h3>
                <p className="text-gray-500 mt-2">Cuando tomes un turno, aparecerá aquí</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserAppointments;
