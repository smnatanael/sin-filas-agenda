
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ScheduleTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [businessHours, setBusinessHours] = useState([
    { day: 'Lunes', open: '09:00', close: '18:00', closed: false },
    { day: 'Martes', open: '09:00', close: '18:00', closed: false },
    { day: 'Miércoles', open: '09:00', close: '18:00', closed: false },
    { day: 'Jueves', open: '09:00', close: '18:00', closed: false },
    { day: 'Viernes', open: '09:00', close: '18:00', closed: false },
    { day: 'Sábado', open: '09:00', close: '18:00', closed: false },
    { day: 'Domingo', open: '', close: '', closed: true },
  ]);
  const { toast } = useToast();
  
  const handleToggleClosed = (index: number) => {
    const newHours = [...businessHours];
    newHours[index].closed = !newHours[index].closed;
    setBusinessHours(newHours);
  };
  
  const handleTimeChange = (index: number, field: 'open' | 'close', value: string) => {
    const newHours = [...businessHours];
    newHours[index][field] = value;
    setBusinessHours(newHours);
  };
  
  const handleSaveSchedule = () => {
    toast({
      title: "Horario actualizado",
      description: "Los cambios en el horario se han guardado correctamente",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Horario de Atención</CardTitle>
          <CardDescription>
            Configura los días y horas en que tu negocio está abierto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessHours.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="w-1/4">
                  <h3 className="font-medium">{day.day}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Input 
                      type="time" 
                      value={day.open} 
                      onChange={(e) => handleTimeChange(index, 'open', e.target.value)}
                      disabled={day.closed}
                      className="w-32" 
                    />
                    <span className="mx-2">-</span>
                    <Input 
                      type="time" 
                      value={day.close} 
                      onChange={(e) => handleTimeChange(index, 'close', e.target.value)}
                      disabled={day.closed}
                      className="w-32" 
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`closed-${index}`} 
                      className="rounded border-gray-300 text-sinfilas-600 focus:ring-sinfilas-500" 
                      checked={day.closed}
                      onChange={() => handleToggleClosed(index)}
                    />
                    <Label htmlFor={`closed-${index}`} className="ml-2">Cerrado</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="mt-6 bg-sinfilas-600 hover:bg-sinfilas-700"
            onClick={handleSaveSchedule}
          >
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Vista de Calendario</CardTitle>
          <CardDescription>
            Visualiza y administra tu calendario de servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Selecciona una fecha</Label>
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
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label className="mb-2 block">Horario disponible</Label>
              <div className="p-4 border rounded-lg bg-gray-50">
                {selectedDate ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="inline h-4 w-4 mr-1" />
                        9:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Selecciona una fecha para ver tus citas programadas.
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Selecciona una fecha para ver el horario disponible
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleTab;
