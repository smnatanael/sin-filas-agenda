
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    toast({
      title: "Búsqueda",
      description: `Buscando "${searchTerm}" cerca de "${location || 'cualquier ubicación'}"`,
    });
    // Aquí iría la lógica de búsqueda real que filtraría los establecimientos
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "La geolocalización no está disponible en este navegador",
        variant: "destructive"
      });
      setIsLoadingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Normalmente aquí haríamos una llamada a la API de Google Maps para obtener
        // la dirección basada en las coordenadas, pero para este ejemplo simplemente
        // usaremos las coordenadas
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        
        toast({
          title: "Ubicación obtenida",
          description: "Se ha detectado tu ubicación actual",
        });
        
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = "Error al obtener la ubicación";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso de ubicación denegado";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Información de ubicación no disponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo de espera agotado para obtener la ubicación";
            break;
        }
        
        toast({
          title: "Error de geolocalización",
          description: errorMessage,
          variant: "destructive"
        });
        
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto glassmorphism rounded-xl p-2 animate-scale-up">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-sinfilas-500 focus:outline-none"
            placeholder="Buscar establecimiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-sinfilas-500 focus:outline-none"
            placeholder="Ubicación..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
          >
            <Navigation className={`h-5 w-5 ${isLoadingLocation ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        
        <Button 
          className="py-3 bg-sinfilas-600 hover:bg-sinfilas-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={handleSearch}
        >
          <Clock className="h-5 w-5 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
