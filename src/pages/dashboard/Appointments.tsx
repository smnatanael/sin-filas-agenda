
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MessageCircle, X, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/dashboard/Sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  service: string;
  date: Date;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  phone: string;
  email: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    customerId: 'c1',
    customerName: 'Juan Pérez',
    service: 'Corte de Cabello Premium',
    date: new Date(new Date().setHours(10, 0, 0, 0)),
    duration: 30,
    status: 'confirmed',
    phone: '+12345678',
    email: 'juan@example.com'
  },
  {
    id: 'a2',
    customerId: 'c2',
    customerName: 'María López',
    service: 'Tinte + Corte',
    date: new Date(new Date().setHours(11, 30, 0, 0)),
    duration: 90,
    status: 'pending',
    phone: '+12345679',
    email: 'maria@example.com'
  },
  {
    id: 'a3',
    customerId: 'c3',
    customerName: 'Carlos Rodríguez',
    service: 'Barba + Corte',
    date: new Date(new Date().setHours(14, 15, 0, 0)),
    duration: 45,
    status: 'pending',
    phone: '+12345670',
    email: 'carlos@example.com'
  },
  {
    id: 'a4',
    customerId: 'c4',
    customerName: 'Ana Martínez',
    service: 'Manicure + Pedicure',
    date: new Date(new Date().setHours(16, 0, 0, 0)),
    duration: 60,
    status: 'confirmed',
    phone: '+12345671',
    email: 'ana@example.com'
  }
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();
  
  const [newAppointment, setNewAppointment] = useState({
    customerName: '',
    phone: '',
    email: '',
    service: '',
    date: new Date(),
    time: '10:00',
    duration: 30
  });

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    }));
    
    toast({
      title: "Estado actualizado",
      description: `Cita actualizada a "${newStatus}"`,
    });
  };

  const handleAddAppointment = () => {
    const newId = `a${appointments.length + 1}`;
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes, 0, 0);
    
    const appointmentToAdd: Appointment = {
      id: newId,
      customerId: `c${appointments.length + 1}`,
      customerName: newAppointment.customerName,
      service: newAppointment.service,
      date: appointmentDate,
      duration: newAppointment.duration,
      status: 'pending',
      phone: newAppointment.phone,
      email: newAppointment.email
    };
    
    setAppointments([...appointments, appointmentToAdd]);
    setNewAppointment({
      customerName: '',
      phone: '',
      email: '',
      service: '',
      date: new Date(),
      time: '10:00',
      duration: 30
    });
    setShowAddAppointment(false);
    
    toast({
      title: "Cita agendada",
      description: `Se ha agendado una cita para ${newAppointment.customerName}`,
    });
  };

  const handleRemoveAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    
    toast({
      title: "Cita eliminada",
      description: "Se ha eliminado la cita del calendario",
    });
  };

  const handleOpenMessage = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowMessageDialog(true);
  };

  const handleSendMessage = () => {
    if (!selectedAppointment || !message.trim()) return;
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedAppointment.customerName}`,
    });
    
    setMessage('');
    setShowMessageDialog(false);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Confirmada</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelada</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completada</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    return appointment.date.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSidebarItem="citas" />
      
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Citas</h1>
            <Button onClick={() => setShowAddAppointment(true)} className="bg-sinfilas-600 hover:bg-sinfilas-700">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-sinfilas-600" />
                  Calendario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  locale={es}
                />
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Resumen del día</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total citas:</span>
                      <span className="text-sm font-medium">{filteredAppointments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Confirmadas:</span>
                      <span className="text-sm font-medium">
                        {filteredAppointments.filter(a => a.status === 'confirmed').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pendientes:</span>
                      <span className="text-sm font-medium">
                        {filteredAppointments.filter(a => a.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-sinfilas-600" />
                  Citas para {format(selectedDate, "d 'de' MMMM", { locale: es })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay citas programadas para este día
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map(appointment => (
                      <div key={appointment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.customerName}</h3>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                            <p className="text-sm text-gray-500">
                              {format(appointment.date, "h:mm a")} • {appointment.duration} min
                            </p>
                          </div>
                          <div className="flex items-center">
                            {getStatusBadge(appointment.status)}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-end items-center space-x-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenMessage(appointment)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          
                          {appointment.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            >
                              Confirmar
                            </Button>
                          )}
                          
                          {appointment.status === 'confirmed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleStatusChange(appointment.id, 'completed')}
                            >
                              Completar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-gray-500 font-medium">Cliente</th>
                      <th className="pb-3 text-gray-500 font-medium">Servicio</th>
                      <th className="pb-3 text-gray-500 font-medium">Fecha</th>
                      <th className="pb-3 text-gray-500 font-medium">Hora</th>
                      <th className="pb-3 text-gray-500 font-medium">Estado</th>
                      <th className="pb-3 text-gray-500 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      .filter(a => a.date > new Date() && a.status !== 'cancelled')
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .slice(0, 5)
                      .map(appointment => (
                        <tr key={appointment.id} className="border-b">
                          <td className="py-3">{appointment.customerName}</td>
                          <td className="py-3">{appointment.service}</td>
                          <td className="py-3">{format(appointment.date, "d MMM yyyy", { locale: es })}</td>
                          <td className="py-3">{format(appointment.date, "h:mm a")}</td>
                          <td className="py-3">{getStatusBadge(appointment.status)}</td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleOpenMessage(appointment)}
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              
                              {appointment.status === 'pending' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    
                    {appointments.filter(a => a.date > new Date() && a.status !== 'cancelled').length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-gray-500">
                          No hay citas programadas próximamente
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Appointment Dialog */}
      <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar Nueva Cita</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nombre del Cliente</Label>
              <Input 
                id="customerName" 
                value={newAppointment.customerName} 
                onChange={e => setNewAppointment({...newAppointment, customerName: e.target.value})} 
                placeholder="Nombre completo" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input 
                id="phone" 
                value={newAppointment.phone} 
                onChange={e => setNewAppointment({...newAppointment, phone: e.target.value})} 
                placeholder="+123456789" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                value={newAppointment.email} 
                onChange={e => setNewAppointment({...newAppointment, email: e.target.value})} 
                placeholder="cliente@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Servicio</Label>
              <Input 
                id="service" 
                value={newAppointment.service} 
                onChange={e => setNewAppointment({...newAppointment, service: e.target.value})} 
                placeholder="Tipo de servicio" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newAppointment.date ? format(newAppointment.date, "d MMM yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => date && setNewAppointment({...newAppointment, date})}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newAppointment.time} 
                  onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input 
                id="duration" 
                type="number" 
                value={newAppointment.duration} 
                onChange={e => setNewAppointment({...newAppointment, duration: parseInt(e.target.value)})} 
                min={15}
                step={15}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAppointment(false)}>Cancelar</Button>
            <Button 
              onClick={handleAddAppointment}
              disabled={!newAppointment.customerName || !newAppointment.service}
              className="bg-sinfilas-600 hover:bg-sinfilas-700"
            >
              Agendar Cita
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Mensaje a {selectedAppointment?.customerName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Input 
                id="message" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="Escriba su mensaje aquí..." 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Cancelar</Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-sinfilas-600 hover:bg-sinfilas-700"
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
