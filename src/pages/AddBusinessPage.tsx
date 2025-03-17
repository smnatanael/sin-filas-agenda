
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Phone, Mail, Globe, Building } from 'lucide-react';

const AddBusinessPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu solicitud y la revisaremos pronto.",
      });
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Registra tu Negocio</h1>
            <p className="mt-2 text-lg text-gray-600">
              Completa el formulario para comenzar a gestionar tu negocio con SinFilas
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-sinfilas-600" />
                    Información Básica
                  </CardTitle>
                  <CardDescription>
                    Proporciona los detalles principales de tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nombre del Negocio *</Label>
                      <Input id="businessName" placeholder="Ej: Barbería Moderna" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurante/Cafetería</SelectItem>
                          <SelectItem value="beauty">Salón de Belleza/Barbería</SelectItem>
                          <SelectItem value="health">Servicios de Salud</SelectItem>
                          <SelectItem value="store">Tienda/Comercio</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del Negocio *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe brevemente tu negocio y los servicios que ofreces..." 
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-sinfilas-600" />
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>
                    Datos de contacto para tus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" type="tel" placeholder="Ej: +58 123 456 7890" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" type="email" placeholder="negocio@ejemplo.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web (opcional)</Label>
                    <Input id="website" type="url" placeholder="https://www.ejemplo.com" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-sinfilas-600" />
                    Ubicación
                  </CardTitle>
                  <CardDescription>
                    Dónde pueden encontrarte tus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección Completa *</Label>
                    <Input id="address" placeholder="Calle, número, local, etc." required />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input id="city" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado/Provincia *</Label>
                      <Input id="state" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input id="postalCode" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-sinfilas-600" />
                    Horario de Atención
                  </CardTitle>
                  <CardDescription>
                    Indica cuándo está abierto tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horario de Atención *</Label>
                    <Input 
                      id="hours" 
                      placeholder="Ej: Lun - Vie: 9AM - 6PM, Sáb: 10AM - 2PM" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceTime">Tiempo promedio de servicio (minutos) *</Label>
                    <Input 
                      id="serviceTime" 
                      type="number" 
                      min="1" 
                      max="240" 
                      placeholder="15" 
                      required 
                    />
                    <p className="text-sm text-gray-500">
                      Este tiempo se utilizará para calcular las esperas estimadas.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-sinfilas-600 hover:bg-sinfilas-700 px-8"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Registrar Negocio"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddBusinessPage;
