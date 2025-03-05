
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MessageCircle, X, Search, Clock, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  imageUrl: string;
}

const demoAppointments: Appointment[] = [
  {
    id: 'a1',
    name: 'Elena López',
    phone: '+34 612 345 555',
    service: 'Corte de Cabello',
    date: '2023-11-15',
    time: '10:00',
    duration: 30,
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 'a2',
    name: 'Juan Pérez',
    phone: '+34 612 345 666',
    service: 'Afeitado',
    date: '2023-11-15',
    time: '11:30',
    duration: 20,
    status: 'confirmed',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 'a3',
    name: 'María Gutiérrez',
    phone: '+34 612 345 777',
    service: 'Corte y Peinado',
    date: '2023-11-16',
    time: '09:00',
    duration: 45,
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 'a4',
    name: 'Pedro Martín',
    phone: '+34 612 345 888',
    service: 'Corte de Barba',
    date: '2023-11-17',
    time: '16:00',
    duration: 15,
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&fit=crop'
  }
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();
  
  const handleMessageClient = (appointment: Appointment) => {
    toast({
      title: "Redirigiendo al chat",
      description: `Contactando a ${appointment.name}`,
    });
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: 'cancelled' };
      }
      return appointment;
    }));
    
    toast({
      title: "Cita cancelada",
      description: "La cita ha sido cancelada correctamente",
      variant: "destructive",
    });
  };
  
  const handleStatusChange = (appointmentId: string, newStatus: 'scheduled' | 'confirmed' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    }));
    
    const statusMessages = {
      'scheduled': 'La cita ha sido programada',
      'confirmed': 'La cita ha sido confirmada',
      'completed': 'La cita ha sido completada',
      'cancelled': 'La cita ha sido cancelada'
    };
    
    toast({
      title: "Estado actualizado",
      description: statusMessages[newStatus],
    });
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'upcoming') {
      return matchesSearch && (appointment.status === 'scheduled' || appointment.status === 'confirmed');
    } else if (activeTab === 'completed') {
      return matchesSearch && appointment.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return matchesSearch && appointment.status === 'cancelled';
    }
    
    return matchesSearch;
  });
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Citas</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar citas..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className={`
            ${appointment.status === 'confirmed' ? 'border-l-4 border-l-amber-500' : ''}
            ${appointment.status === 'completed' ? 'border-l-4 border-l-green-500' : ''}
            ${appointment.status === 'scheduled' ? 'border-l-4 border-l-blue-500' : ''}
            ${appointment.status === 'cancelled' ? 'border-l-4 border-l-red-500' : ''}
          `}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img src={appointment.imageUrl} alt={appointment.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <CardTitle className="text-lg">{appointment.name}</CardTitle>
                    <p className="text-sm text-gray-500">{appointment.phone}</p>
                  </div>
                </div>
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Servicio:</span>
                  <span className="font-medium">{appointment.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fecha:</span>
                  <span className="font-medium flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {appointment.date}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Hora:</span>
                  <span className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.time} ({appointment.duration} min)
                  </span>
                </div>
                
                {appointment.status !== 'cancelled' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Estado:</span>
                    <select 
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value as 'scheduled' | 'confirmed' | 'completed' | 'cancelled')}
                      className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                      disabled={appointment.status === 'completed'}
                    >
                      <option value="scheduled">Programada</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="completed">Completada</option>
                    </select>
                  </div>
                )}
                
                {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <div className="flex justify-center mt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs mr-2"
                          onClick={() => handleMessageClient(appointment)}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Contactar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ir a Clientes</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>Para chatear con el cliente, accede a la sección de "Clientes" donde encontrarás todas las conversaciones organizadas.</p>
                        </div>
                        <Button className="w-full" onClick={() => window.location.href = "/dashboard/clients"}>
                          Ir a Clientes
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No hay citas {activeTab === 'upcoming' ? 'programadas' : activeTab === 'completed' ? 'completadas' : 'canceladas'}</h3>
          <p className="text-gray-500">
            {activeTab === 'upcoming' 
              ? 'Actualmente no hay citas programadas o confirmadas.' 
              : activeTab === 'completed' 
                ? 'No tienes citas completadas en este período.' 
                : 'No tienes citas canceladas en este período.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Appointments;
