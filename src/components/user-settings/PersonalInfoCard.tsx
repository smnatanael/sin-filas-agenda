
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface PersonalInfoCardProps {
  loading: boolean;
  onSaveChanges: () => void;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ 
  loading, 
  onSaveChanges 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Actualiza tu información personal y preferencias de contacto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input id="name" defaultValue="Juan Pérez" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" defaultValue="juan@ejemplo.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" defaultValue="+34 612 345 678" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Notificaciones por email</Label>
            <div className="text-sm text-gray-500">Recibe actualizaciones sobre tus citas y turnos</div>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onSaveChanges} 
            className="bg-sinfilas-600 hover:bg-sinfilas-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
