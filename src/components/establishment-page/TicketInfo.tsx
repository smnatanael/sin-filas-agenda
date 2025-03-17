
import React from 'react';
import { Button } from '@/components/ui/button';

interface TicketData {
  ticketNumber: string;
  yourTicket: string;
  peopleAhead: number;
  estimatedWaitTime: number;
  date: string;
  time: string;
}

interface TicketInfoProps {
  hasTicket: boolean;
  ticketData: TicketData;
  getNewTicket: () => void;
  handleCancelTicket: () => void;
}

const TicketInfo: React.FC<TicketInfoProps> = ({
  hasTicket,
  ticketData,
  getNewTicket,
  handleCancelTicket
}) => {
  return (
    <div className="mt-6 space-y-4">
      {hasTicket ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-4">
            <p className="text-gray-600">Tu turno</p>
            <h3 className="text-3xl font-bold text-sinfilas-600">{ticketData.yourTicket}</h3>
            <p className="text-gray-500">
              {ticketData.date} · {ticketData.time}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">Personas delante</p>
              <p className="font-bold text-lg">{ticketData.peopleAhead}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">Tiempo estimado</p>
              <p className="font-bold text-lg">{ticketData.estimatedWaitTime} min</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleCancelTicket}
            >
              Cancelar Turno
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">
            Obtén un turno virtual para ser atendido sin necesidad de esperar físicamente en el lugar.
          </p>
          <Button 
            className="bg-sinfilas-600 hover:bg-sinfilas-700"
            onClick={getNewTicket}
          >
            Obtener Turno
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketInfo;
