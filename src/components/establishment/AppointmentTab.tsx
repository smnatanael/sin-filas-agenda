
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Establishment } from '@/data/establishmentData';

interface AppointmentTabProps {
  establishment: Establishment;
}

const AppointmentTab: React.FC<AppointmentTabProps> = ({ establishment }) => {
  return (
    <div className="glassmorphism rounded-xl p-8 animate-fade-in">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Mis Citas</h3>
      <p className="text-gray-500 mb-6">
        Selecciona fecha y hora para agendar una cita en {establishment.name}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar fecha</label>
          <button className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 hover:bg-gray-50">
            <span>Seleccionar fecha</span>
            <Calendar className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar hora</label>
          <button className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 hover:bg-gray-50">
            <span>Seleccionar hora</span>
            <Clock className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700">
          <option value="">Seleccionar servicio</option>
          {establishment.services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
      </div>
      
      <div className="mt-8">
        <Button className="w-full bg-sinfilas-600 hover:bg-sinfilas-700 text-white">
          Confirmar Cita
        </Button>
      </div>
    </div>
  );
};

export default AppointmentTab;
