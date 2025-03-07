
import React from 'react';
import { MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { Establishment } from '@/data/establishmentData';

interface EstablishmentHeaderProps {
  establishment: Establishment;
}

const EstablishmentHeader: React.FC<EstablishmentHeaderProps> = ({ establishment }) => {
  return (
    <>
      <Header 
        logoUrl={establishment.logo} 
        businessName={establishment.name} 
        isBusinessPage={true}
      />
      
      <div 
        className="h-64 relative bg-sinfilas-900 overflow-hidden animate-fade-in"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${establishment.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{establishment.name}</h1>
          <div className="flex items-center opacity-90">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{establishment.location}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstablishmentHeader;
