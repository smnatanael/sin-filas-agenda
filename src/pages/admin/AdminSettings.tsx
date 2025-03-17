
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw, Trash2, Globe, PaintBucket, BellRing, Database, Mail, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <Alert className="bg-yellow-100">
        <AlertTitle className="text-yellow-800">Recordatorio</AlertTitle>
        <AlertDescription className="text-yellow-800">
          Algunos cambios de configuración pueden requerir reiniciar el sistema para aplicarse completamente.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="backup">Respaldos</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información del Sitio</CardTitle>
              <CardDescription>Ajustes generales de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="site-name" className="text-sm font-medium">Nombre del Sitio</label>
                    <Input id="site-name" defaultValue="Sin Filas" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="site-url" className="text-sm font-medium">URL del Sitio</label>
                    <Input id="site-url" defaultValue="https://sinfilas.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="site-description" className="text-sm font-medium">Descripción del Sitio</label>
                  <Textarea id="site-description" defaultValue="Plataforma para la gestión de turnos y citas en línea." />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="admin-email" className="text-sm font-medium">Correo Electrónico de Administración</label>
                  <Input id="admin-email" defaultValue="admin@sinfilas.com" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configuración Regional</CardTitle>
              <CardDescription>Ajustes de idioma, zona horaria y formato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">Idioma por Defecto</label>
                    <Select defaultValue="es">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timezone" className="text-sm font-medium">Zona Horaria</label>
                    <Select defaultValue="america-mexico_city">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Seleccionar zona horaria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-mexico_city">América/Ciudad de México</SelectItem>
                        <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                        <SelectItem value="america-santiago">América/Santiago</SelectItem>
                        <SelectItem value="america-buenos_aires">América/Buenos Aires</SelectItem>
                        <SelectItem value="europe-madrid">Europa/Madrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="date-format" className="text-sm font-medium">Formato de Fecha</label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="time-format" className="text-sm font-medium">Formato de Hora</label>
                    <Select defaultValue="24h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 horas</SelectItem>
                        <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-multilanguage" />
                  <label htmlFor="enable-multilanguage" className="text-sm font-medium">Habilitar soporte multilenguaje para usuarios</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Temas y Colores</CardTitle>
              <CardDescription>Personalización de la apariencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer bg-white flex flex-col items-center justify-center hover:border-blue-500 relative">
                    <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <PaintBucket className="h-8 w-8 mb-2 text-gray-500" />
                    <span className="text-sm">Claro</span>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer bg-gray-900 flex flex-col items-center justify-center hover:border-blue-500">
                    <PaintBucket className="h-8 w-8 mb-2 text-gray-300" />
                    <span className="text-sm text-gray-300">Oscuro</span>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center justify-center hover:border-yellow-500">
                    <PaintBucket className="h-8 w-8 mb-2 text-white" />
                    <span className="text-sm text-white">Personalizado</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <p className="text-sm font-medium">Colores Primarios</p>
                  <div className="grid grid-cols-6 gap-2">
                    <div className="h-10 rounded-md bg-blue-500 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-green-500 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-purple-500 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-red-500 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-yellow-500 cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-gray-500 cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="custom-css" className="text-sm font-medium">CSS Personalizado</label>
                  <Textarea id="custom-css" placeholder="Añadir CSS personalizado..." className="font-mono text-sm" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-animations" defaultChecked />
                  <label htmlFor="enable-animations" className="text-sm font-medium">Habilitar animaciones</label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Logotipo e Identidad</CardTitle>
              <CardDescription>Personalización de la marca</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logotipo Principal</label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <img src="placeholder.svg" alt="Logo" className="h-12 mb-2" />
                    <Button variant="outline" size="sm">Cambiar Logotipo</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Favicon</label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <img src="favicon.ico" alt="Favicon" className="h-8 mb-2" />
                    <Button variant="outline" size="sm">Cambiar Favicon</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Correo Electrónico</CardTitle>
              <CardDescription>Configurar el servidor de correo saliente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="smtp-server" className="text-sm font-medium">Servidor SMTP</label>
                    <Input id="smtp-server" placeholder="smtp.ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="smtp-port" className="text-sm font-medium">Puerto SMTP</label>
                    <Input id="smtp-port" placeholder="587" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="smtp-username" className="text-sm font-medium">Usuario SMTP</label>
                    <Input id="smtp-username" placeholder="usuario@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="smtp-password" className="text-sm font-medium">Contraseña SMTP</label>
                    <Input id="smtp-password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="smtp-ssl" defaultChecked />
                  <label htmlFor="smtp-ssl" className="text-sm font-medium">Usar SSL/TLS</label>
                </div>
                
                <Button variant="outline" size="sm">Probar Conexión</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Notificaciones</CardTitle>
              <CardDescription>Personalización de mensajes de notificación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select defaultValue="welcome">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Bienvenida a nuevos usuarios</SelectItem>
                    <SelectItem value="appointment-confirmation">Confirmación de cita</SelectItem>
                    <SelectItem value="appointment-reminder">Recordatorio de cita</SelectItem>
                    <SelectItem value="appointment-cancelled">Cita cancelada</SelectItem>
                    <SelectItem value="password-reset">Restablecer contraseña</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="space-y-2">
                  <label htmlFor="email-subject" className="text-sm font-medium">Asunto</label>
                  <Input id="email-subject" defaultValue="¡Bienvenido a Sin Filas!" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email-body" className="text-sm font-medium">Contenido</label>
                  <Textarea id="email-body" rows={10} defaultValue="Hola [nombre],\n\nBienvenido a Sin Filas, la plataforma para gestionar tus citas de manera eficiente.\n\nPara comenzar a utilizar todos nuestros servicios, por favor verifica tu cuenta haciendo clic en el siguiente enlace:\n\n[link_verificacion]\n\nSi tienes alguna duda, no dudes en contactarnos.\n\nSaludos,\nEl equipo de Sin Filas" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Variables disponibles:</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>[nombre]</div>
                      <div>[email]</div>
                      <div>[link_verificacion]</div>
                      <div>[fecha]</div>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" className="w-full">Vista Previa</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Plantilla</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Respaldo de Datos</CardTitle>
              <CardDescription>Configuración de respaldos automáticos y manuales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-500" />
                      <div>
                        <p className="font-medium">Último respaldo</p>
                        <p className="text-sm text-muted-foreground">15/08/2023 03:00 AM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Exitoso</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Crear respaldo ahora
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Restaurar desde respaldo
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="backup-frequency" className="text-sm font-medium">Frecuencia de respaldo automático</label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensualmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="backup-retention" className="text-sm font-medium">Retención de respaldos</label>
                  <Select defaultValue="30">
                    <SelectTrigger id="backup-retention">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="14">14 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="backup-location" className="text-sm font-medium">Ubicación de respaldos</label>
                  <Select defaultValue="local">
                    <SelectTrigger id="backup-location">
                      <SelectValue placeholder="Seleccionar ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Servidor local</SelectItem>
                      <SelectItem value="cloud">Almacenamiento en la nube</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="backup-encryption" defaultChecked />
                  <label htmlFor="backup-encryption" className="text-sm font-medium">Encriptar respaldos</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription className="text-red-500">Precaución: Estos ajustes pueden afectar el funcionamiento del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo de depuración</p>
                    <p className="text-sm text-muted-foreground">Habilitar registro detallado para solución de problemas</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modo de mantenimiento</p>
                    <p className="text-sm text-muted-foreground">Deshabilitar el acceso al sitio para mantenimiento</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">API pública</p>
                    <p className="text-sm text-muted-foreground">Permitir acceso a la API desde aplicaciones externas</p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <label htmlFor="cache-ttl" className="text-sm font-medium">Tiempo de vida de caché (segundos)</label>
                  <Input id="cache-ttl" defaultValue="3600" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="session-timeout" className="text-sm font-medium">Tiempo de inactividad de sesión (minutos)</label>
                  <Input id="session-timeout" defaultValue="30" />
                </div>
                
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <h3 className="text-red-600 font-medium mb-2">Zona de peligro</h3>
                  <p className="text-sm text-red-600 mb-4">Estas acciones son irreversibles y pueden causar pérdida de datos</p>
                  <div className="flex space-x-2">
                    <Button variant="destructive" size="sm">Resetear sistema</Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300">Purgar caché</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
