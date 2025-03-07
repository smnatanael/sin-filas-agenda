
import React from 'react';
import { Clock } from 'lucide-react';

const EstablishmentFooter: React.FC = () => {
  return (
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
  );
};

export default EstablishmentFooter;
