
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const GeneralTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default GeneralTab;
