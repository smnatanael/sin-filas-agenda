
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Trash2, Database } from 'lucide-react';

const BackupTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default BackupTab;
