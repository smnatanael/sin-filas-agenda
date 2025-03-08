
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import EstablishmentCard from '@/components/EstablishmentCard';
import Footer from '@/components/Footer';
import { establishmentData } from '@/data/establishmentData';
import { useSearchResults } from '@/hooks/use-search-results';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { searchResults, clearSearchResults } = useSearchResults();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, []);
  
  // Convert establishment data to array for rendering
  const establishmentsArray = searchResults || 
    Object.entries(establishmentData).map(([id, data]) => [id, data]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-20 bg-gradient-to-b from-white to-sinfilas-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
                Olvídate de las filas y esperas
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
                Reserva turnos, agenda citas y ahorra tiempo en tus establecimientos favoritos
              </p>
            </div>
            
            <SearchBar />
            
            {searchResults && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  {searchResults.length} resultados encontrados
                </p>
                <button 
                  onClick={clearSearchResults}
                  className="text-sinfilas-600 hover:underline mt-1"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Establishments section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {searchResults ? 'Resultados de búsqueda' : 'Establecimientos populares'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {establishmentsArray.map(([id, data]) => (
              <EstablishmentCard 
                key={id}
                id={id}
                data={data}
                onClick={() => navigate(`/establishment/${id}`)}
              />
            ))}
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              ¿Por qué usar SinFilas?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-sinfilas-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-sinfilas-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ahorra tiempo</h3>
                <p className="text-gray-600">
                  Olvídate de esperar en filas. Reserva tu turno y llega justo a tiempo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-sinfilas-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-sinfilas-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fácil de usar</h3>
                <p className="text-gray-600">
                  Interfaz intuitiva que te permite reservar en segundos desde cualquier dispositivo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-sinfilas-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl text-sinfilas-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Notificaciones</h3>
                <p className="text-gray-600">
                  Recibe alertas cuando sea tu turno o para recordarte tus citas programadas.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-sinfilas-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Comienza a ahorrar tiempo hoy
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a miles de personas que ya disfrutan de la libertad de no hacer filas
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isLoggedIn ? (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-sinfilas-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Ir a mi Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="bg-white text-sinfilas-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="bg-sinfilas-700 hover:bg-sinfilas-800 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
