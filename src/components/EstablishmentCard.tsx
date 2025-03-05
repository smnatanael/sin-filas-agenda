
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EstablishmentProps {
  id: string;
  name: string;
  image: string;
  category: string;
  waitTime: number;
  peopleInQueue: number;
  location: string;
}

const EstablishmentCard: React.FC<EstablishmentProps> = ({
  id,
  name,
  image,
  category,
  waitTime,
  peopleInQueue,
  location
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/establishment/${id}`} 
      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
    >
      <div className={cn(
        "w-full h-full glassmorphism p-4 rounded-xl transition-all duration-300 transform group-hover:scale-[1.02]",
        "border border-gray-100 hover:border-sinfilas-200 bg-white/70",
        "flex flex-col animate-scale-up"
      )}>
        <div className="relative h-44 rounded-lg overflow-hidden mb-4">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <img
            src={image}
            alt={name}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
            {category}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{name}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0 mr-1" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="mt-auto grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center bg-sinfilas-50 p-2 rounded-lg">
            <Clock className="h-4 w-4 text-sinfilas-600 mr-2" />
            <span className="font-medium text-gray-800">{waitTime} min. espera</span>
          </div>
          <div className="flex items-center bg-sinfilas-50 p-2 rounded-lg">
            <Users className="h-4 w-4 text-sinfilas-600 mr-2" />
            <span className="font-medium text-gray-800">{peopleInQueue} en fila</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EstablishmentCard;
