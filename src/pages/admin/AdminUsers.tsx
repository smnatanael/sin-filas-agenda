
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, PlusIcon } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Ana López', email: 'ana.lopez@ejemplo.com', role: 'Usuario', status: 'Activo', createdAt: '15/05/2023' },
  { id: 2, name: 'Carlos Ramírez', email: 'carlos.ramirez@ejemplo.com', role: 'Usuario', status: 'Activo', createdAt: '21/06/2023' },
  { id: 3, name: 'María González', email: 'maria.gonzalez@ejemplo.com', role: 'Negocio', status: 'Pendiente', createdAt: '10/07/2023' },
  { id: 4, name: 'Juan Pérez', email: 'juan.perez@ejemplo.com', role: 'Administrador', status: 'Activo', createdAt: '05/03/2023' },
  { id: 5, name: 'Laura Martínez', email: 'laura.martinez@ejemplo.com', role: 'Usuario', status: 'Inactivo', createdAt: '30/08/2023' },
];

const AdminUsers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
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
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Activo' ? 'bg-green-100 text-green-800' :
                    user.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
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

export default AdminUsers;
