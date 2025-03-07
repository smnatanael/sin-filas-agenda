
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Establishment } from '@/data/establishmentData';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AppointmentTabProps {
  establishment: Establishment;
}

const AppointmentTab: React.FC<AppointmentTabProps> = ({ establishment }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();
  
  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];
  
  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: "Datos incompletos",
        description: "Por favor, selecciona fecha, hora y servicio",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Cita confirmada",
      description: `Tu cita ha sido agendada para el ${format(selectedDate, "d 'de' MMMM", { locale: es })} a las ${selectedTime}`,
    });
  };

  return (
    <div className="glassmorphism rounded-xl p-8 animate-fade-in">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Agendar Cita</h3>
      <p className="text-gray-500 mb-6">
        Selecciona fecha y hora para agendar una cita en {establishment.name}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "d 'de' MMMM, yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={es}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar hora</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedTime && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {selectedTime ? selectedTime : <span>Seleccionar hora</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="grid grid-cols-3 gap-2 p-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => {
                      setSelectedTime(time);
                      document.querySelector('.popover-close')?.dispatchEvent(new Event('click'));
                    }}
                    className={cn(
                      "justify-center",
                      selectedTime === time && "bg-sinfilas-100 text-sinfilas-700"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Seleccionar servicio</option>
          {establishment.services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
      </div>
      
      <div className="mt-8">
        <Button 
          className="w-full bg-sinfilas-600 hover:bg-sinfilas-700 text-white"
          onClick={handleConfirmAppointment}
        >
          Confirmar Cita
        </Button>
      </div>
    </div>
  );
};

export default AppointmentTab;
