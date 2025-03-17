
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NotificationsTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default NotificationsTab;
