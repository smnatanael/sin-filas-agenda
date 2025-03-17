
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const AdvancedTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default AdvancedTab;
