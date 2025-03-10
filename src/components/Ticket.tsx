
import React, { useState } from 'react';
import { Clock, Calendar, Pencil, X, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00");
  const { toast } = useToast();

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

  const handleModifyDate = () => {
    setShowDateDialog(false);
    toast({
      title: "Cita modificada",
      description: `Tu cita ha sido actualizada para el ${selectedDate ? format(selectedDate, "d 'de' MMMM", { locale: es }) : ''} a las ${selectedTime}`,
    });
  };

  const handleRequestEarlier = () => {
    toast({
      title: "Solicitud enviada",
      description: "Se ha notificado al establecimiento tu petición de un turno más temprano",
    });
    setIsFlipped(false);
  };

  const handleCancelTurn = () => {
    setShowCancelDialog(false);
    toast({
      title: "Turno cancelado",
      description: "Tu turno ha sido cancelado correctamente",
      variant: "destructive"
    });
  };

  // Generar horas disponibles para el selector
  const availableTimes = [];
  for (let hour = 8; hour < 20; hour++) {
    availableTimes.push(`${hour}:00`);
    availableTimes.push(`${hour}:30`);
  }

  return (
    <div 
      className={cn(
        "perspective-1000 relative h-64 w-full animate-scale-up",
        isFlipped ? "rotate-y-180" : ""
      )}
    >
      {/* Front of ticket */}
      <div 
        className={cn(
          "absolute w-full h-full backface-hidden",
          "glassmorphism rounded-xl overflow-hidden shadow-md",
          "transition-all duration-500 ease-in-out",
          isFlipped ? "opacity-0 rotate-y-180" : "opacity-100"
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="bg-sinfilas-600 h-2 w-full" />
        <div className="p-4 h-full flex flex-col">
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
          
          <div className="flex justify-between mt-2">
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
            <div className="mt-4 text-center flex-grow flex flex-col justify-center">
              <div className="text-sm text-gray-500">Tiempo estimado de espera</div>
              <div className="text-xl font-bold text-gray-900">{estimatedTime} min</div>
            </div>
          )}
          
          {!estimatedTime && (
            <div className="flex-grow"></div>
          )}
          
          <div className="flex justify-center mt-auto pb-2 space-x-2">
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
        <div className="p-4 h-full flex flex-col">
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
          
          <div className="space-y-3 mt-2 flex-grow">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left text-sm" 
              onClick={(e) => {
                e.stopPropagation();
                setShowDateDialog(true);
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Cambiar fecha/hora
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left text-sm" 
              onClick={(e) => {
                e.stopPropagation();
                handleRequestEarlier();
              }}
            >
              <Clock className="h-4 w-4 mr-2" />
              Solicitar turno más temprano
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full justify-start text-left text-sm mt-4" 
              onClick={(e) => {
                e.stopPropagation();
                setShowCancelDialog(true);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar turno
            </Button>
          </div>
        </div>
      </div>

      {/* Change Date/Time Dialog */}
      <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cambiar fecha y hora</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Fecha</Label>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                  initialFocus
                  locale={es}
                  className="rounded-md border w-full"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Hora</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Selecciona una hora" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleModifyDate}>
              Confirmar cambio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Turn Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancelar turno</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">¿Estás seguro de que quieres cancelar este turno? Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Regresar
            </Button>
            <Button variant="destructive" onClick={handleCancelTurn}>
              Sí, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ticket;
