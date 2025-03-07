
import React from 'react';
import { Phone, Clock, Info } from 'lucide-react';
import { Establishment } from '@/data/establishmentData';

interface EstablishmentInfoProps {
  establishment: Establishment;
}

const EstablishmentInfo: React.FC<EstablishmentInfoProps> = ({ establishment }) => {
  return (
    <div className="glassmorphism rounded-xl p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Info className="h-5 w-5 mr-2 text-sinfilas-600" />
        Información
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-gray-900">Teléfono</div>
            <div className="text-sm text-gray-500">{establishment.phone}</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-gray-900">Horario</div>
            <div className="text-sm text-gray-500">{establishment.hours}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-900 mb-1">Descripción</div>
          <div className="text-sm text-gray-500">{establishment.description}</div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">Servicios</div>
          <div className="flex flex-wrap gap-2">
            {establishment.services.map((service, index) => (
              <span 
                key={index} 
                className="inline-block bg-sinfilas-50 text-sinfilas-800 text-xs px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablishmentInfo;
