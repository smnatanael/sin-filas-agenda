
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Building2, Clock, MapPin, Calendar, Image, CreditCard } from 'lucide-react';

const BusinessPage: React.FC = () => {
  const features = [
    { icon: Clock, text: "Gestión de turnos en tiempo real" },
    { icon: Calendar, text: "Sistema de citas y agenda personalizable" },
    { icon: MapPin, text: "Página con tu ubicación y datos de contacto" },
    { icon: Building2, text: "Presencia digital para tu negocio" },
    { icon: Image, text: "Galería de imágenes para mostrar tus servicios" },
    { icon: CreditCard, text: "Panel para gestionar precios y servicios" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sinfilas-50">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <section className="mb-16 pt-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Impulsa tu negocio <span className="text-sinfilas-600">sin filas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in text-balance">
            Optimiza la atención al cliente, reduce los tiempos de espera y mejora la experiencia de tus clientes.
          </p>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glassmorphism p-6 rounded-xl flex flex-col items-center text-center">
                <div className="bg-sinfilas-100 p-3 rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-sinfilas-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.text}</h3>
                <p className="text-gray-500 text-sm">Mejora la experiencia de tus clientes y la eficiencia de tu negocio.</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Planes disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-sinfilas-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Plan Básico</CardTitle>
                <CardDescription>Para pequeños negocios</CardDescription>
                <div className="mt-4 text-3xl font-bold text-sinfilas-600">$0 <span className="text-base font-normal text-gray-500">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Hasta 20 turnos diarios</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Página de negocio básica</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Gestión de turnos</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sinfilas-600 hover:bg-sinfilas-700">
                  <Link to="/register" className="w-full">Comenzar gratis</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-sinfilas-600 shadow-xl relative">
              <div className="absolute top-0 left-0 right-0 bg-sinfilas-600 text-white text-center py-1 text-sm font-medium">Recomendado</div>
              <CardHeader className="text-center pt-8">
                <CardTitle>Plan Profesional</CardTitle>
                <CardDescription>Para negocios en crecimiento</CardDescription>
                <div className="mt-4 text-3xl font-bold text-sinfilas-600">$0 <span className="text-base font-normal text-gray-500">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Turnos ilimitados</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Página personalizada</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Análisis de datos</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Notificaciones SMS</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sinfilas-600 hover:bg-sinfilas-700">
                  <Link to="/register" className="w-full">Prueba gratis</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-sinfilas-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Plan Empresarial</CardTitle>
                <CardDescription>Para grandes empresas</CardDescription>
                <div className="mt-4 text-3xl font-bold text-sinfilas-600">$0 <span className="text-base font-normal text-gray-500">/mes</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Todo lo del plan Profesional</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Múltiples sucursales</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Integración con otros sistemas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Soporte personalizado</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sinfilas-600 hover:bg-sinfilas-700">
                  <Link to="/register" className="w-full">Contactar ventas</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="glassmorphism rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Listo para optimizar tu negocio?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Regístrate ahora y comienza a gestionar tus citas y turnos de manera eficiente. 
              Mejora la experiencia de tus clientes y optimiza los tiempos de espera.
            </p>
            <Button className="bg-sinfilas-600 hover:bg-sinfilas-700 text-white font-medium rounded-lg px-8 py-3 text-lg transition-all duration-200 ease-in-out transform hover:scale-105">
              <Link to="/register">Registrar mi negocio</Link>
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

export default BusinessPage;
