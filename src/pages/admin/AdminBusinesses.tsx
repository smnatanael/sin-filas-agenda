
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, PlusIcon } from 'lucide-react';

const mockBusinesses = [
  { id: 1, name: 'Barbería X', owner: 'Carlos Ramírez', category: 'Belleza', status: 'Activo', createdAt: '15/05/2023' },
  { id: 2, name: 'Consultorio Médico', owner: 'María González', category: 'Salud', status: 'Pendiente', createdAt: '21/06/2023' },
  { id: 3, name: 'Estudio Jurídico', owner: 'Juan Pérez', category: 'Servicios', status: 'Activo', createdAt: '10/07/2023' },
  { id: 4, name: 'Restaurante El Sabor', owner: 'Ana López', category: 'Gastronomía', status: 'Inactivo', createdAt: '05/03/2023' },
  { id: 5, name: 'Gimnasio Fitness', owner: 'Laura Martínez', category: 'Deportes', status: 'Activo', createdAt: '30/08/2023' },
];

const AdminBusinesses: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Negocios</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Negocio
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar negocios..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell>{business.id}</TableCell>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.owner}</TableCell>
                <TableCell>{business.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    business.status === 'Activo' ? 'bg-green-100 text-green-800' :
                    business.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {business.status}
                  </span>
                </TableCell>
                <TableCell>{business.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Eliminar</Button>
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

export default AdminBusinesses;
