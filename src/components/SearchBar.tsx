
import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

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
            className="block w-full pl-10 pr-3 py-3 border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-sinfilas-500 focus:outline-none"
            placeholder="Ubicación..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <Button className="py-3 bg-sinfilas-600 hover:bg-sinfilas-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
          <Clock className="h-5 w-5 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
