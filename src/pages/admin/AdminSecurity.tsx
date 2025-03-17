
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Key, Lock, AlertTriangle, Activity, Clock, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const mockSecurityLogs = [
  { id: 1, user: 'admin@sinfilas.com', action: 'Inicio de sesión', ip: '192.168.1.1', time: '15/08/2023 10:23', status: 'Exitoso' },
  { id: 2, user: 'carlos@ejemplo.com', action: 'Intento de inicio de sesión', ip: '203.0.113.1', time: '15/08/2023 09:45', status: 'Fallido' },
  { id: 3, user: 'maria@ejemplo.com', action: 'Restablecimiento de contraseña', ip: '198.51.100.1', time: '14/08/2023 16:12', status: 'Exitoso' },
  { id: 4, user: 'admin@sinfilas.com', action: 'Cambio de permisos', ip: '192.168.1.1', time: '14/08/2023 14:30', status: 'Exitoso' },
  { id: 5, user: 'juan@ejemplo.com', action: 'Intento de inicio de sesión', ip: '203.0.113.45', time: '13/08/2023 11:05', status: 'Fallido' },
];

const AdminSecurity: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Seguridad del Sistema</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Auditoría de Seguridad
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Estado del Sistema</AlertTitle>
        <AlertDescription>
          El sistema está funcionando correctamente. Último escaneo de seguridad: hace 2 horas.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Estado de Seguridad</CardTitle>
            <CardDescription>Evaluación general del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="relative">
                <div className="text-4xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Puntuación</div>
              </div>
              <Progress value={85} className="w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Ver Detalles</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Actividad Reciente</CardTitle>
            <CardDescription>Últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Inicios de sesión</span>
                </div>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Intentos fallidos</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Key className="h-4 w-4 mr-2 text-green-500" />
                  <span>Cambios de contraseña</span>
                </div>
                <span className="font-bold">2</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Ver Actividad</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Configuración Actual</CardTitle>
            <CardDescription>Ajustes de seguridad activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">Autenticación de dos factores</div>
                <Badge variant="outline" className="bg-green-100 text-green-800">Activo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Bloqueo después de 5 intentos</div>
                <Badge variant="outline" className="bg-green-100 text-green-800">Activo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Tiempo de sesión: 30 minutos</div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Revisar</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Modificar Configuración</Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="logs">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="logs">Registros</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="access">Control de Acceso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Registros de Seguridad</CardTitle>
              <CardDescription>Últimas actividades registradas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Dirección IP</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSecurityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          log.status === 'Exitoso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver Todos los Registros</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Seguridad</CardTitle>
              <CardDescription>Configuración de las políticas de seguridad del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Complejidad de Contraseñas</p>
                    <p className="text-sm text-muted-foreground">Requerir contraseñas complejas para todos los usuarios</p>
                  </div>
                  <Switch id="password-complexity" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticación de Dos Factores</p>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios administradores</p>
                  </div>
                  <Switch id="2fa-required" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bloqueo de Cuenta</p>
                    <p className="text-sm text-muted-foreground">Bloquear cuenta después de 5 intentos fallidos</p>
                  </div>
                  <Switch id="account-lockout" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Caducidad de Contraseña</p>
                    <p className="text-sm text-muted-foreground">Requerir cambio de contraseña cada 90 días</p>
                  </div>
                  <Switch id="password-expiry" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Registro de Actividad</p>
                    <p className="text-sm text-muted-foreground">Registrar todas las actividades de administración</p>
                  </div>
                  <Switch id="activity-logging" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Guardar Políticas</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="access" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Control de Acceso</CardTitle>
              <CardDescription>Gestión de roles y permisos de usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Administradores</h3>
                    <p className="text-sm text-muted-foreground mb-2">Acceso completo al sistema</p>
                    <Badge className="bg-blue-100 text-blue-800">3 usuarios</Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Moderadores</h3>
                    <p className="text-sm text-muted-foreground mb-2">Acceso limitado</p>
                    <Badge className="bg-blue-100 text-blue-800">5 usuarios</Badge>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Supervisores</h3>
                    <p className="text-sm text-muted-foreground mb-2">Acceso de solo lectura</p>
                    <Badge className="bg-blue-100 text-blue-800">8 usuarios</Badge>
                  </Card>
                </div>
                
                <Button variant="outline" className="w-full">Gestionar Roles y Permisos</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSecurity;
