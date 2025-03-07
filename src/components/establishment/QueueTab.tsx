
import React from 'react';
import { User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QueueStatus from '@/components/QueueStatus';
import Ticket from '@/components/Ticket';
import { Establishment } from '@/data/establishmentData';

interface QueueTabProps {
  establishment: Establishment;
  hasTicket: boolean;
  ticketData: {
    ticketNumber: string;
    yourTicket: string;
    peopleAhead: number;
    estimatedWaitTime: number;
    date: string;
    time: string;
  };
  getNewTicket: () => void;
  handleCancelTicket: () => void;
}

const QueueTab: React.FC<QueueTabProps> = ({ 
  establishment, 
  hasTicket, 
  ticketData, 
  getNewTicket, 
  handleCancelTicket 
}) => {
  return (
    <>
      {hasTicket ? (
        <>
          <QueueStatus 
            currentTicket={establishment.currentTicket}
            yourTicket={ticketData.yourTicket}
            peopleAhead={ticketData.peopleAhead}
            estimatedWaitTime={ticketData.estimatedWaitTime}
            averageServiceTime={establishment.averageServiceTime}
          />
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-900">Tu Ticket</h3>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleCancelTicket}
              >
                <X className="mr-1 h-4 w-4" />
                Cancelar Turno
              </Button>
            </div>
            <Ticket
              ticketNumber={ticketData.yourTicket}
              businessName={establishment.name}
              businessLogo={establishment.logo}
              date={ticketData.date}
              time={ticketData.time}
              status="pending"
              estimatedTime={ticketData.estimatedWaitTime}
            />
          </div>
        </>
      ) : (
        <div className="glassmorphism rounded-xl p-8 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-sinfilas-50 flex items-center justify-center">
              <User className="h-12 w-12 text-sinfilas-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No tienes turno activo</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Toma un turno ahora para entrar en la fila virtual y recibir notificaciones cuando sea tu turno.
          </p>
          <Button 
            className="bg-sinfilas-600 hover:bg-sinfilas-700 text-white"
            onClick={getNewTicket}
          >
            Tomar Turno
          </Button>
          <div className="mt-4 text-sm text-gray-500">
            Tiempo promedio de atención: <span className="font-medium">{establishment.averageServiceTime} minutos</span>
          </div>
        </div>
      )}
    </>
  );
};

export default QueueTab;
