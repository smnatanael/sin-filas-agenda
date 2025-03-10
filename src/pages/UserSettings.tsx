
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
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
import { useToast } from '@/hooks/use-toast';

const UserSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulación de guardado
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cambios guardados",
        description: "Tu información ha sido actualizada correctamente",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <p className="text-gray-600">Administra tu cuenta y preferencias</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
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
                  onClick={handleSaveChanges} 
                  className="bg-sinfilas-600 hover:bg-sinfilas-700"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>
                Actualiza tu contraseña y configuración de seguridad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleSaveChanges} 
                  className="bg-sinfilas-600 hover:bg-sinfilas-700"
                  disabled={loading}
                >
                  Actualizar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;
