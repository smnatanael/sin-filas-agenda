
import React from 'react';
import Ticket from '@/components/Ticket';
import { ListChecks } from 'lucide-react';

interface Turn {
  id: string;
  ticketNumber: string;
  businessName: string;
  businessLogo: string;
  date: string;
  time: string;
  status: string;
}

interface TurnsTabProps {
  turns: Turn[];
}

const TurnsTab: React.FC<TurnsTabProps> = ({ turns }) => {
  return (
    <>
      {turns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {turns.map(turn => (
            <Ticket 
              key={turn.id}
              ticketNumber={turn.ticketNumber}
              businessName={turn.businessName}
              businessLogo={turn.businessLogo}
              date={turn.date}
              time={turn.time}
              status={turn.status as any}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ListChecks className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No tienes turnos activos</h3>
          <p className="text-gray-500 mt-2">Cuando tomes un turno, aparecerá aquí</p>
        </div>
      )}
    </>
  );
};

export default TurnsTab;
