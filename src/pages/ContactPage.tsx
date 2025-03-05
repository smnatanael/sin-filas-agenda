
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de envío del formulario
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sinfilas-50">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <section className="mb-16 pt-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in text-balance">
            Estamos aquí para responder tus preguntas y ayudarte a mejorar la experiencia de tus clientes.
          </p>
        </section>
        
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glassmorphism rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@correo.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input id="subject" placeholder="¿Sobre qué nos escribes?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escribe tu mensaje aquí..." 
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-sinfilas-600 hover:bg-sinfilas-700"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>
            
            <div>
              <div className="glassmorphism rounded-xl p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-sinfilas-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Correo Electrónico</h3>
                      <p className="text-gray-600">contacto@sinfilas.com</p>
                      <p className="text-gray-600">soporte@sinfilas.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-sinfilas-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Teléfono</h3>
                      <p className="text-gray-600">+34 612 345 678</p>
                      <p className="text-gray-600">+34 912 345 678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-sinfilas-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Dirección</h3>
                      <p className="text-gray-600">Calle Tecnología 123</p>
                      <p className="text-gray-600">28001, Madrid, España</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glassmorphism rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Horario de Atención</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Lunes - Viernes</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Sábado</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Domingo</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="glassmorphism rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Eres un negocio?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Regístrate ahora y comienza a gestionar tus citas y turnos de manera eficiente. 
              Mejora la experiencia de tus clientes y optimiza los tiempos de espera.
            </p>
            <Button className="bg-sinfilas-600 hover:bg-sinfilas-700 text-white font-medium rounded-lg px-8 py-3 text-lg transition-all duration-200 ease-in-out transform hover:scale-105">
              Registrar mi negocio
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-6 w-6 text-sinfilas-600" />
              <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
            </div>
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} SinFilas. Todos los derechos reservados.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
