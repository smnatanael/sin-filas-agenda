
import React, { useState } from 'react';
import { Clock, Calendar, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TicketProps {
  ticketNumber: string;
  businessName: string;
  businessLogo: string;
  date: string;
  time: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  estimatedTime?: number;
}

const Ticket: React.FC<TicketProps> = ({
  ticketNumber,
  businessName,
  businessLogo,
  date,
  time,
  status,
  estimatedTime
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const statusConfig = {
    pending: {
      color: 'bg-amber-100 text-amber-800',
      label: 'Pendiente'
    },
    active: {
      color: 'bg-green-100 text-green-800',
      label: 'Activo'
    },
    completed: {
      color: 'bg-blue-100 text-blue-800',
      label: 'Completado'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800',
      label: 'Cancelado'
    }
  };

  return (
    <div 
      className={cn(
        "perspective-1000 relative h-52 w-full animate-scale-up",
        isFlipped ? "rotate-y-180" : ""
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front of ticket */}
      <div 
        className={cn(
          "absolute w-full h-full backface-hidden",
          "glassmorphism rounded-xl overflow-hidden shadow-md",
          "transition-all duration-500 ease-in-out",
          isFlipped ? "opacity-0 rotate-y-180" : "opacity-100"
        )}
      >
        <div className="bg-sinfilas-600 h-2 w-full" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <img 
                src={businessLogo} 
                alt={businessName} 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{businessName}</h3>
                <div className={statusConfig[status].color + " inline-block px-2 py-0.5 text-xs rounded-full"}>
                  {statusConfig[status].label}
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-sinfilas-600">
              {ticketNumber}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{time}</span>
            </div>
          </div>
          
          {estimatedTime && status === 'pending' && (
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-500">Tiempo estimado de espera</div>
              <div className="text-xl font-bold text-gray-900">{estimatedTime} min</div>
            </div>
          )}
          
          <div className="flex justify-center mt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
            >
              <Pencil className="h-3 w-3 mr-1" />
              Modificar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Back of ticket (modification options) */}
      <div 
        className={cn(
          "absolute w-full h-full backface-hidden",
          "glassmorphism rounded-xl overflow-hidden shadow-md",
          "transition-all duration-500 ease-in-out rotate-y-180",
          isFlipped ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="bg-sinfilas-600 h-2 w-full" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Modificar Cita</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3 mt-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left text-sm" 
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Cambiar fecha/hora
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left text-sm" 
              onClick={(e) => e.stopPropagation()}
            >
              <Clock className="h-4 w-4 mr-2" />
              Solicitar turno más temprano
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full justify-start text-left text-sm mt-4" 
              onClick={(e) => e.stopPropagation()}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar turno
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
