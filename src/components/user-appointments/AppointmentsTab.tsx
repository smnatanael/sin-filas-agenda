
import React from 'react';
import Ticket from '@/components/Ticket';
import { CalendarCheck } from 'lucide-react';

interface Appointment {
  id: string;
  ticketNumber: string;
  businessName: string;
  businessLogo: string;
  date: string;
  time: string;
  status: string;
  estimatedTime?: number;
}

interface AppointmentsTabProps {
  appointments: Appointment[];
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ appointments }) => {
  return (
    <>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(appointment => (
            <Ticket 
              key={appointment.id}
              ticketNumber={appointment.ticketNumber}
              businessName={appointment.businessName}
              businessLogo={appointment.businessLogo}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status as any}
              estimatedTime={appointment.estimatedTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalendarCheck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No tienes citas programadas</h3>
          <p className="text-gray-500 mt-2">Cuando reserves una cita, aparecerá aquí</p>
        </div>
      )}
    </>
  );
};

export default AppointmentsTab;
