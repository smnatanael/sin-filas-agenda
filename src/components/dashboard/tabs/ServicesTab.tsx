
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const ServicesTab: React.FC = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Corte de Cabello', duration: 20, price: 15 },
    { id: '2', name: 'Afeitado', duration: 20, price: 15 },
    { id: '3', name: 'Corte de Barba', duration: 20, price: 15 }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    duration: 20,
    price: 0
  });

  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  const handleAddNewService = () => {
    setIsAddDialogOpen(true);
  };

  const saveNewService = () => {
    if (newService.name.trim() === '') {
      toast({
        title: "Error",
        description: "El nombre del servicio no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    const id = Math.random().toString(36).substring(2, 9);
    setServices([...services, { id, ...newService }]);
    setNewService({ name: '', duration: 20, price: 0 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Servicio añadido",
      description: `${newService.name} ha sido añadido correctamente`,
    });
  };

  const saveEditedService = () => {
    if (!currentService) return;
    
    if (currentService.name.trim() === '') {
      toast({
        title: "Error",
        description: "El nombre del servicio no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ));
    setIsEditDialogOpen(false);
    
    toast({
      title: "Servicio actualizado",
      description: `${currentService.name} ha sido actualizado correctamente`,
    });
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado correctamente",
    });
  };

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
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-gray-500">Duración: {service.duration} minutos</p>
              </div>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-sinfilas-600">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  {service.price.toFixed(2)}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditService(service)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteService(service.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            className="mt-6 w-full"
            onClick={handleAddNewService}
          >
            Añadir Nuevo Servicio
          </Button>
        </div>

        {/* Diálogo para añadir nuevo servicio */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Servicio</DialogTitle>
              <DialogDescription>
                Complete los detalles del nuevo servicio que desea ofrecer.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Servicio</Label>
                <Input 
                  id="name" 
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="Ej. Corte de Cabello"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (minutos)</Label>
                <Input 
                  id="duration" 
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input 
                  id="price" 
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                  step="0.01"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={saveNewService}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo para editar servicio */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Servicio</DialogTitle>
              <DialogDescription>
                Modifique los detalles del servicio seleccionado.
              </DialogDescription>
            </DialogHeader>
            
            {currentService && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre del Servicio</Label>
                  <Input 
                    id="edit-name" 
                    value={currentService.name}
                    onChange={(e) => setCurrentService({...currentService, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duración (minutos)</Label>
                  <Input 
                    id="edit-duration" 
                    type="number"
                    value={currentService.duration}
                    onChange={(e) => setCurrentService({...currentService, duration: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Precio</Label>
                  <Input 
                    id="edit-price" 
                    type="number"
                    value={currentService.price}
                    onChange={(e) => setCurrentService({...currentService, price: parseFloat(e.target.value) || 0})}
                    step="0.01"
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
              <Button onClick={saveEditedService}>Actualizar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
