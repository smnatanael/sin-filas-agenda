
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Clock3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileTab: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulación de guardado
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cambios guardados",
        description: "La información de tu negocio ha sido actualizada",
      });
    }, 1000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Información del Negocio</CardTitle>
            <CardDescription>
              Actualiza la información principal de tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Negocio</Label>
              <Input id="businessName" defaultValue="Barbería X" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description" 
                rows={4}
                defaultValue="Somos una barbería especializada en cortes modernos y clásicos. Ofrecemos servicios de alta calidad con los mejores profesionales."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input id="category" defaultValue="Barbería" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" defaultValue="+34 612 345 678" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue="contacto@barberiax.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web (opcional)</Label>
              <Input id="website" type="url" placeholder="https://ejemplo.com" />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue="Centro Comercial Plaza, Local 23" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" defaultValue="Madrid" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input id="postalCode" defaultValue="28001" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock3 className="mr-2 h-4 w-4" />
                Tiempo Estimado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="averageServiceTime">Tiempo promedio por servicio (minutos)</Label>
                <Input id="averageServiceTime" type="number" defaultValue="20" />
              </div>
              <p className="text-sm text-gray-500">Esta información se usa para calcular los tiempos de espera.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSaveChanges} 
          className="bg-sinfilas-600 hover:bg-sinfilas-700"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </>
  );
};

export default ProfileTab;
