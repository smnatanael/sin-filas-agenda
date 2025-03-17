
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { PaintBucket } from 'lucide-react';

const AppearanceTab: React.FC = () => {
  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default AppearanceTab;
