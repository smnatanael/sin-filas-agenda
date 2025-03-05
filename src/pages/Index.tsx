
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import EstablishmentCard, { EstablishmentProps } from '@/components/EstablishmentCard';
import { Clock } from 'lucide-react';

const demoEstablishments: EstablishmentProps[] = [
  {
    id: 'barberia-x',
    name: 'Barbería X',
    image: 'https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=1000',
    category: 'Barbería',
    waitTime: 15,
    peopleInQueue: 4,
    location: 'Centro Comercial Plaza, Local 23'
  },
  {
    id: 'salon-salome',
    name: 'Salón Salomé',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1000',
    category: 'Salón de Belleza',
    waitTime: 30,
    peopleInQueue: 7,
    location: 'Av. Principal 456'
  },
  {
    id: 'pizzas-xxl',
    name: 'Pizzas XXL',
    image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1000',
    category: 'Restaurante',
    waitTime: 10,
    peopleInQueue: 3,
    location: 'Calle Italiana 789'
  },
  {
    id: 'comedor-guillermo',
    name: 'Comedor Guillermo',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000',
    category: 'Comedor',
    waitTime: 8,
    peopleInQueue: 5,
    location: 'Plaza Central 234'
  },
  {
    id: 'farmacia-carol',
    name: 'Farmacia Carol',
    image: 'https://images.unsplash.com/photo-1567850083672-fff8fdcfc1e7?q=80&w=1000',
    category: 'Farmacia',
    waitTime: 5,
    peopleInQueue: 2,
    location: 'Av. Salud 567'
  },
  {
    id: 'ginecostetra-xy',
    name: 'Consultorio Ginecostetra XY',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1000',
    category: 'Salud',
    waitTime: 25,
    peopleInQueue: 6,
    location: 'Centro Médico Especialidades, Piso 3'
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRegisterBusiness = () => {
    navigate('/business');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sinfilas-50">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <section className="mb-16 pt-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Olvídate de las <span className="text-sinfilas-600">filas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in text-balance">
            Agenda citas, toma turnos y recibe notificaciones en tiempo real para cualquier establecimiento.
          </p>
          <SearchBar />
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Establecimientos Populares</h2>
            <button className="text-sinfilas-600 hover:text-sinfilas-700 font-medium">Ver todos</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoEstablishments.map((establishment) => (
              <EstablishmentCard 
                key={establishment.id}
                {...establishment}
              />
            ))}
          </div>
        </section>
        
        <section className="mt-20 text-center">
          <div className="glassmorphism rounded-xl p-8 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">¿Eres propietario de un negocio?</h2>
            <p className="text-gray-600 mb-6 text-balance">
              Optimiza la gestión de turnos y citas de tu establecimiento. Mejora la experiencia de tus clientes y aumenta la eficiencia.
            </p>
            <button 
              onClick={handleRegisterBusiness}
              className="bg-sinfilas-600 hover:bg-sinfilas-700 text-white font-medium rounded-lg px-8 py-3 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Registra tu negocio
            </button>
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

export default Index;
