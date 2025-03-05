
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GalleryTab: React.FC = () => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galería de Imágenes</CardTitle>
        <CardDescription>
          Sube fotos de tu negocio, servicios y trabajos realizados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              toast({
                title: "Subir imagen",
                description: "Selecciona una imagen para subir a la galería",
              });
            }}
          >
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Añadir Imagen</span>
          </div>
          
          {[1, 2, 3, 4, 5].map((img) => (
            <div key={img} className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
              <img 
                src={`https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=400&h=400&fit=crop`} 
                alt={`Galería ${img}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Imagen eliminada",
                      description: `Imagen ${img} eliminada correctamente`,
                      variant: "destructive",
                    });
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryTab;
