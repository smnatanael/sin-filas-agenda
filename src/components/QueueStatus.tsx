
import React from 'react';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QueueStatusProps {
  currentTicket: string;
  yourTicket: string;
  peopleAhead: number;
  estimatedWaitTime: number;
  averageServiceTime: number;
}

const QueueStatus: React.FC<QueueStatusProps> = ({
  currentTicket,
  yourTicket,
  peopleAhead,
  estimatedWaitTime,
  averageServiceTime
}) => {
  return (
    <div className="glassmorphism rounded-xl p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 rounded-lg p-4 text-center flex flex-col items-center">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Turno Actual
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2 animate-pulse-subtle">
            {currentTicket}
          </div>
          <Clock className="h-5 w-5 text-sinfilas-600" />
        </div>
        
        <div className="bg-sinfilas-50 rounded-lg p-4 text-center flex flex-col items-center border-2 border-sinfilas-200">
          <div className="text-xs font-medium text-sinfilas-700 uppercase tracking-wider mb-1">
            Tu Turno
          </div>
          <div className="text-4xl font-bold text-sinfilas-800 mb-2 animate-float">
            {yourTicket}
          </div>
          <User className="h-5 w-5 text-sinfilas-600" />
        </div>
        
        <div className="bg-white/80 rounded-lg p-4 text-center flex flex-col items-center">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Tiempo Promedio
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {averageServiceTime} min
          </div>
          <Clock className="h-5 w-5 text-sinfilas-600" />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-medium text-sinfilas-700 inline-block py-1 px-2 uppercase rounded-full bg-sinfilas-50">
                Posición en Fila
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-sinfilas-700 inline-block py-1 px-2 uppercase rounded-full bg-sinfilas-50">
                {peopleAhead} personas adelante
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-sinfilas-100">
            <div 
              style={{ width: `${Math.min(100, 100 - (peopleAhead * 10))}%` }} 
              className={cn(
                "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                "bg-gradient-to-r from-sinfilas-400 to-sinfilas-600 transition-all duration-1000 ease-in-out"
              )}
            />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <div className="text-sm text-gray-500 mb-1">Tiempo estimado de espera</div>
          <div className="text-3xl font-bold text-gray-900">
            {estimatedWaitTime} minutos
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;
