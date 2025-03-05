
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar, Settings, Users, Clock3, ImageIcon, MapPin, DollarSign, HelpCircle, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BusinessDashboard: React.FC = () => {
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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="glassmorphism w-64 p-4 hidden md:block shadow-lg">
        <div className="flex items-center mb-8">
          <Clock className="h-6 w-6 text-sinfilas-600" />
          <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
        </div>
        
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Building className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Turnos Actuales
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Citas
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Clientes
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Soporte
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-4 right-4">
          <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
            Cerrar Sesión
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard de Barbería X</h1>
            <Button className="bg-sinfilas-600 hover:bg-sinfilas-700">
              <Clock className="mr-2 h-4 w-4" />
              Estado: Abierto
            </Button>
          </div>
          
          {/* Dashboard tabs */}
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="servicios">Servicios</TabsTrigger>
              <TabsTrigger value="horarios">Horarios</TabsTrigger>
              <TabsTrigger value="galeria">Galería</TabsTrigger>
            </TabsList>
            
            <TabsContent value="perfil">
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
            </TabsContent>
            
            <TabsContent value="servicios">
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
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="mt-6 w-full">
                      Añadir Nuevo Servicio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="horarios">
              <Card>
                <CardHeader>
                  <CardTitle>Horario de Atención</CardTitle>
                  <CardDescription>
                    Configura los días y horas en que tu negocio está abierto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="w-1/4">
                          <h3 className="font-medium">{day}</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Input type="time" defaultValue={index < 6 ? "09:00" : ""} className="w-32" />
                            <span className="mx-2">-</span>
                            <Input type="time" defaultValue={index < 6 ? "18:00" : ""} className="w-32" />
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`closed-${index}`} 
                              className="rounded border-gray-300 text-sinfilas-600 focus:ring-sinfilas-500" 
                              defaultChecked={index === 6}
                            />
                            <Label htmlFor={`closed-${index}`} className="ml-2">Cerrado</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="galeria">
              <Card>
                <CardHeader>
                  <CardTitle>Galería de Imágenes</CardTitle>
                  <CardDescription>
                    Sube fotos de tu negocio, servicios y trabajos realizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition">
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
                          <Button variant="destructive" size="sm">Eliminar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
