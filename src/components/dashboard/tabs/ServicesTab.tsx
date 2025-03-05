
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ServicesTab: React.FC = () => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Servicios y Precios</CardTitle>
        <CardDescription>
          Añade y gestiona los servicios que ofreces en tu negocio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['Corte de Cabello', 'Afeitado', 'Corte de Barba'].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{service}</h3>
                <p className="text-sm text-gray-500">Duración: 20 minutos</p>
              </div>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-sinfilas-600">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  15.00
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Editar servicio",
                      description: `Editando: ${service}`,
                    });
                  }}
                >
                  Editar
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            className="mt-6 w-full"
            onClick={() => {
              toast({
                title: "Nuevo servicio",
                description: "Formulario para añadir nuevo servicio",
              });
            }}
          >
            Añadir Nuevo Servicio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
