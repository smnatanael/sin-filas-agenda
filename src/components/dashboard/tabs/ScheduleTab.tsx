
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ScheduleTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horario de Atención</CardTitle>
        <CardDescription>
          Configura los días y horas en que tu negocio está abierto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="w-1/4">
                <h3 className="font-medium">{day}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Input type="time" defaultValue={index < 6 ? "09:00" : ""} className="w-32" />
                  <span className="mx-2">-</span>
                  <Input type="time" defaultValue={index < 6 ? "18:00" : ""} className="w-32" />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={`closed-${index}`} 
                    className="rounded border-gray-300 text-sinfilas-600 focus:ring-sinfilas-500" 
                    defaultChecked={index === 6}
                  />
                  <Label htmlFor={`closed-${index}`} className="ml-2">Cerrado</Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTab;
