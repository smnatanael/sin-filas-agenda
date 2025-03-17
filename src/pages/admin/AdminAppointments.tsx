
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, FilterIcon, PlusIcon, CheckCircle, XCircle, Clock } from 'lucide-react';

const mockAppointments = [
  { id: 1, client: 'Ana López', business: 'Barbería X', service: 'Corte de cabello', date: '15/08/2023', time: '10:00', status: 'Completada' },
  { id: 2, client: 'Carlos Ramírez', business: 'Consultorio Médico', service: 'Consulta general', date: '16/08/2023', time: '11:30', status: 'Pendiente' },
  { id: 3, client: 'María González', business: 'Estudio Jurídico', service: 'Asesoría legal', date: '17/08/2023', time: '09:15', status: 'Pendiente' },
  { id: 4, client: 'Juan Pérez', business: 'Restaurante El Sabor', service: 'Reserva', date: '15/08/2023', time: '20:00', status: 'Cancelada' },
  { id: 5, client: 'Laura Martínez', business: 'Gimnasio Fitness', service: 'Entrenamiento personal', date: '18/08/2023', time: '17:00', status: 'Pendiente' },
];

const AdminAppointments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar citas..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Negocio</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.client}</TableCell>
                <TableCell>{appointment.business}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                    appointment.status === 'Completada' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status === 'Completada' && <CheckCircle className="h-3 w-3" />}
                    {appointment.status === 'Pendiente' && <Clock className="h-3 w-3" />}
                    {appointment.status === 'Cancelada' && <XCircle className="h-3 w-3" />}
                    {appointment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Cancelar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAppointments;
