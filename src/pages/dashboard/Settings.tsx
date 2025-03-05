
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Settings as SettingsIcon, 
  Lock, 
  LogOut, 
  UserCog, 
  Store, 
  AlertTriangle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

const DashboardSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cuenta");
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulación de guardado
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cambios guardados",
        description: "La información ha sido actualizada correctamente",
      });
    }, 1000);
  };
  
  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    
    toast({
      title: isPaused ? "Negocio activado" : "Negocio pausado",
      description: isPaused 
        ? "Tu negocio vuelve a estar visible para los clientes" 
        : "Tu negocio ha sido pausado y no recibirá nuevos turnos ni citas",
    });
  };
  
  const handleDeleteBusiness = () => {
    toast({
      title: "Negocio eliminado",
      description: "Tu negocio ha sido eliminado correctamente",
      variant: "destructive",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  const handleCancelPlan = () => {
    toast({
      title: "Plan cancelado",
      description: "Tu plan ha sido cancelado correctamente. Se mantendrá activo hasta el fin del período de facturación.",
      variant: "destructive",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>
      
      <Tabs defaultValue="cuenta" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="negocio">Negocio</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>
        
        {/* Cuenta Tab */}
        <TabsContent value="cuenta">
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
                <Input id="name" defaultValue="Alberto González" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" defaultValue="alberto@ejemplo.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" defaultValue="+34 612 345 123" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificaciones por email</Label>
                  <div className="text-sm text-gray-500">Recibe actualizaciones sobre tu cuenta y tu negocio</div>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="flex justify-end">
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
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </TabsContent>
        
        {/* Negocio Tab */}
        <TabsContent value="negocio">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Estado del Negocio</CardTitle>
              <CardDescription>
                Controla la visibilidad de tu negocio en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Estado del negocio</Label>
                  <div className="text-sm text-gray-500">
                    {isPaused 
                      ? "Tu negocio está pausado y no recibirá nuevos turnos ni citas" 
                      : "Tu negocio está activo y recibiendo turnos y citas"}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={isPaused ? "text-red-500" : "text-green-500"}>
                    {isPaused ? "Pausado" : "Activo"}
                  </span>
                  <Switch checked={!isPaused} onCheckedChange={handlePauseToggle} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Zona de Peligro</CardTitle>
              <CardDescription>
                Estas acciones no se pueden deshacer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 w-full mb-2"
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Eliminar Negocio
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará permanentemente tu negocio y todos sus datos. Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteBusiness}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <div className="border border-red-100 rounded-lg p-4 bg-red-50">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-700">Advertencia</h4>
                    <p className="text-sm text-red-500 mt-1">
                      Eliminar tu negocio borrará todas las citas, turnos y datos asociados. 
                      Esta acción es definitiva y no puede ser revertida.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pagos Tab */}
        <TabsContent value="pagos">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plan Actual</CardTitle>
              <CardDescription>
                Información sobre tu plan actual y opciones de pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sinfilas-50 p-4 rounded-lg border border-sinfilas-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Plan Profesional</h3>
                    <p className="text-gray-500">Facturación mensual</p>
                  </div>
                  <div className="text-xl font-bold text-sinfilas-600">$0<span className="text-sm font-normal">/mes</span></div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Tu próxima factura: 15 de diciembre de 2023</p>
                </div>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 w-full mt-2"
                  >
                    Cancelar Plan
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cancelar tu plan actual limitará las funcionalidades de tu cuenta. 
                      Tu plan se mantendrá activo hasta el final del período de facturación.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Mantener Plan</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancelPlan}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Cancelar Plan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>
                Gestiona tus tarjetas y métodos de pago
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4789</p>
                    <p className="text-sm text-gray-500">Visa · Vence: 05/24</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Editar</Button>
              </div>
              
              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Añadir Nuevo Método de Pago
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Seguridad Tab */}
        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>
                Gestiona tu contraseña y la seguridad de tu cuenta
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
              
              <div className="pt-2">
                <Button 
                  onClick={handleSaveChanges} 
                  className="bg-sinfilas-600 hover:bg-sinfilas-700"
                  disabled={loading}
                >
                  {loading ? "Actualizando..." : "Actualizar Contraseña"}
                </Button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <Label>Verificación en dos pasos</Label>
                    <div className="text-sm text-gray-500">Aumenta la seguridad de tu cuenta</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sesiones activas</Label>
                    <div className="text-sm text-gray-500">Gestiona los dispositivos con sesión iniciada</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
