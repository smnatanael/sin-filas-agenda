import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellOff, Users, Store, Calendar, Settings, Mail, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const mockNotifications = [
  { id: 1, title: 'Nuevo usuario registrado', message: 'Ana López se ha registrado en la plataforma.', time: 'Hace 5 minutos', type: 'users', read: false },
  { id: 2, title: 'Nuevo negocio registrado', message: 'Se ha registrado el negocio "Clínica Dental Sonrisa".', time: 'Hace 30 minutos', type: 'businesses', read: false },
  { id: 3, title: 'Cita cancelada', message: 'Juan Pérez ha cancelado su cita en "Barbería X".', time: 'Hace 2 horas', type: 'appointments', read: true },
  { id: 4, title: 'Reporte de sistema', message: 'Se ha completado el respaldo automático de la base de datos.', time: 'Hace 1 día', type: 'system', read: true },
  { id: 5, title: 'Nuevo mensaje de soporte', message: 'Un usuario ha enviado un mensaje de soporte.', time: 'Hace 3 días', type: 'support', read: true },
];

const AdminNotifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Centro de Notificaciones</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BellOff className="mr-2 h-4 w-4" />
            Marcar todo como leído
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configurar Notificaciones
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="businesses">Negocios</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {mockNotifications.map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {notification.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                    {notification.type === 'businesses' && <Store className="h-5 w-5 text-green-500" />}
                    {notification.type === 'appointments' && <Calendar className="h-5 w-5 text-purple-500" />}
                    {notification.type === 'system' && <Settings className="h-5 w-5 text-gray-500" />}
                    {notification.type === 'support' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
                <CardDescription className="text-xs text-muted-foreground">{notification.time}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" size="sm" className="px-0">Ver detalles</Button>
                {!notification.read && <Button variant="ghost" size="sm">Marcar como leído</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4 mt-4">
          {mockNotifications.filter(n => n.type === 'users').map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {notification.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                    {notification.type === 'businesses' && <Store className="h-5 w-5 text-green-500" />}
                    {notification.type === 'appointments' && <Calendar className="h-5 w-5 text-purple-500" />}
                    {notification.type === 'system' && <Settings className="h-5 w-5 text-gray-500" />}
                    {notification.type === 'support' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
                <CardDescription className="text-xs text-muted-foreground">{notification.time}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" size="sm" className="px-0">Ver detalles</Button>
                {!notification.read && <Button variant="ghost" size="sm">Marcar como leído</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="businesses" className="space-y-4 mt-4">
          {mockNotifications.filter(n => n.type === 'businesses').map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {notification.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                    {notification.type === 'businesses' && <Store className="h-5 w-5 text-green-500" />}
                    {notification.type === 'appointments' && <Calendar className="h-5 w-5 text-purple-500" />}
                    {notification.type === 'system' && <Settings className="h-5 w-5 text-gray-500" />}
                    {notification.type === 'support' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
                <CardDescription className="text-xs text-muted-foreground">{notification.time}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" size="sm" className="px-0">Ver detalles</Button>
                {!notification.read && <Button variant="ghost" size="sm">Marcar como leído</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-4 mt-4">
          {mockNotifications.filter(n => n.type === 'appointments').map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {notification.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                    {notification.type === 'businesses' && <Store className="h-5 w-5 text-green-500" />}
                    {notification.type === 'appointments' && <Calendar className="h-5 w-5 text-purple-500" />}
                    {notification.type === 'system' && <Settings className="h-5 w-5 text-gray-500" />}
                    {notification.type === 'support' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
                <CardDescription className="text-xs text-muted-foreground">{notification.time}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" size="sm" className="px-0">Ver detalles</Button>
                {!notification.read && <Button variant="ghost" size="sm">Marcar como leído</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-4">
          {mockNotifications.filter(n => n.type === 'system').map(notification => (
            <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {notification.type === 'users' && <Users className="h-5 w-5 text-blue-500" />}
                    {notification.type === 'businesses' && <Store className="h-5 w-5 text-green-500" />}
                    {notification.type === 'appointments' && <Calendar className="h-5 w-5 text-purple-500" />}
                    {notification.type === 'system' && <Settings className="h-5 w-5 text-gray-500" />}
                    {notification.type === 'support' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
                <CardDescription className="text-xs text-muted-foreground">{notification.time}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{notification.message}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="link" size="sm" className="px-0">Ver detalles</Button>
                {!notification.read && <Button variant="ghost" size="sm">Marcar como leído</Button>}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Configuración de Notificaciones</CardTitle>
          <CardDescription>Personaliza qué tipo de notificaciones deseas recibir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Usuarios</p>
                  <p className="text-sm text-muted-foreground">Notificaciones sobre nuevos usuarios y actualizaciones</p>
                </div>
              </div>
              <Switch id="notify-users" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Store className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Negocios</p>
                  <p className="text-sm text-muted-foreground">Notificaciones sobre nuevos negocios y actualizaciones</p>
                </div>
              </div>
              <Switch id="notify-businesses" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Citas</p>
                  <p className="text-sm text-muted-foreground">Notificaciones sobre nuevas citas, cancelaciones y cambios</p>
                </div>
              </div>
              <Switch id="notify-appointments" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Sistema</p>
                  <p className="text-sm text-muted-foreground">Notificaciones sobre el sistema y mantenimiento</p>
                </div>
              </div>
              <Switch id="notify-system" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                </div>
              </div>
              <Switch id="notify-email" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Guardar Configuración</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminNotifications;
