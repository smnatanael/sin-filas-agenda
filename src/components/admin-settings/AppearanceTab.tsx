
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { PaintBucket, Moon, Sun, Monitor } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';

const AppearanceTab: React.FC = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [selectedColor, setSelectedColor] = useState<string>('blue');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // Initialize the state with the current theme from next-themes
    if (currentTheme) {
      setSelectedTheme(currentTheme as 'light' | 'dark' | 'system');
    }
  }, [currentTheme]);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(theme);
    setTheme(theme);
    
    toast({
      title: "Tema actualizado",
      description: `El tema se ha cambiado a ${
        theme === 'light' ? 'claro' : theme === 'dark' ? 'oscuro' : 'sistema'
      }`,
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Here we would need to update CSS variables or a color theme system
    // For now, let's just show a toast
    document.documentElement.style.setProperty('--primary', getColorHslValue(color));
    
    toast({
      title: "Color primario actualizado",
      description: `El color primario se ha cambiado a ${color}`,
    });
  };

  // Function to get HSL values for different colors
  const getColorHslValue = (color: string): string => {
    switch (color) {
      case 'blue': return '201 94% 46%';
      case 'green': return '142 76% 36%';
      case 'purple': return '262 83% 58%';
      case 'red': return '0 84% 60%';
      case 'yellow': return '48 96% 53%';
      case 'gray': return '220 14% 96%';
      default: return '201 94% 46%';
    }
  };

  // If not mounted yet, don't render to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

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
              <div 
                className={`border rounded-md p-4 cursor-pointer bg-white flex flex-col items-center justify-center hover:border-blue-500 relative ${selectedTheme === 'light' ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                {selectedTheme === 'light' && <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"></div>}
                <Sun className="h-8 w-8 mb-2 text-gray-500" />
                <span className="text-sm">Claro</span>
              </div>

              <div 
                className={`border rounded-md p-4 cursor-pointer bg-gray-900 flex flex-col items-center justify-center hover:border-blue-500 ${selectedTheme === 'dark' ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                {selectedTheme === 'dark' && <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"></div>}
                <Moon className="h-8 w-8 mb-2 text-gray-300" />
                <span className="text-sm text-gray-300">Oscuro</span>
              </div>

              <div 
                className={`border rounded-md p-4 cursor-pointer bg-gradient-to-r from-white to-gray-900 flex flex-col items-center justify-center hover:border-blue-500 ${selectedTheme === 'system' ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
                onClick={() => handleThemeChange('system')}
              >
                {selectedTheme === 'system' && <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-blue-500"></div>}
                <Monitor className="h-8 w-8 mb-2 text-gray-600" />
                <span className="text-sm">Sistema</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <p className="text-sm font-medium">Colores Primarios</p>
              <div className="grid grid-cols-6 gap-2">
                <div 
                  className={`h-10 rounded-md bg-blue-500 cursor-pointer ${selectedColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  onClick={() => handleColorChange('blue')}
                ></div>
                <div 
                  className={`h-10 rounded-md bg-green-500 cursor-pointer ${selectedColor === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                  onClick={() => handleColorChange('green')}
                ></div>
                <div 
                  className={`h-10 rounded-md bg-purple-500 cursor-pointer ${selectedColor === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                  onClick={() => handleColorChange('purple')}
                ></div>
                <div 
                  className={`h-10 rounded-md bg-red-500 cursor-pointer ${selectedColor === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
                  onClick={() => handleColorChange('red')}
                ></div>
                <div 
                  className={`h-10 rounded-md bg-yellow-500 cursor-pointer ${selectedColor === 'yellow' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
                  onClick={() => handleColorChange('yellow')}
                ></div>
                <div 
                  className={`h-10 rounded-md bg-gray-500 cursor-pointer ${selectedColor === 'gray' ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
                  onClick={() => handleColorChange('gray')}
                ></div>
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
                <img src="/placeholder.svg" alt="Logo" className="h-12 mb-2" />
                <Button variant="outline" size="sm">Cambiar Logotipo</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Favicon</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <img src="/placeholder.svg" alt="Favicon" className="h-8 mb-2" />
                <Button variant="outline" size="sm">Cambiar Favicon</Button>
              </div>
            </div>
            
            <div className="pt-2">
              <Button className="w-full">Guardar cambios de apariencia</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceTab;
