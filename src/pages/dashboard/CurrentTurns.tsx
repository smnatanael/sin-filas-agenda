
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MessageCircle, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Turn {
  id: string;
  name: string;
  phone: string;
  service: string;
  estimatedTime: number;
  status: 'waiting' | 'in-progress' | 'completed';
  imageUrl: string;
}

const demoTurns: Turn[] = [
  {
    id: 't1',
    name: 'Carlos Rodríguez',
    phone: '+34 612 345 111',
    service: 'Corte de Cabello',
    estimatedTime: 15,
    status: 'waiting',
    imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 't2',
    name: 'Ana García',
    phone: '+34 612 345 222',
    service: 'Corte de Cabello',
    estimatedTime: 20,
    status: 'in-progress',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 't3',
    name: 'Miguel Sánchez',
    phone: '+34 612 345 333',
    service: 'Afeitado',
    estimatedTime: 10,
    status: 'waiting',
    imageUrl: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=100&h=100&fit=crop'
  },
  {
    id: 't4',
    name: 'Laura Martínez',
    phone: '+34 612 345 444',
    service: 'Corte de Barba',
    estimatedTime: 15,
    status: 'waiting',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&fit=crop'
  }
];

const CurrentTurns: React.FC = () => {
  const [turns, setTurns] = useState<Turn[]>(demoTurns);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const handleMessageClient = (turn: Turn) => {
    toast({
      title: "Redirigiendo al chat",
      description: `Contactando a ${turn.name}`,
    });
  };
  
  const handleRemoveTurn = (turnId: string) => {
    setTurns(turns.filter(turn => turn.id !== turnId));
    toast({
      title: "Turno eliminado",
      description: "El turno ha sido eliminado correctamente",
      variant: "destructive",
    });
  };
  
  const handleStatusChange = (turnId: string, newStatus: 'waiting' | 'in-progress' | 'completed') => {
    setTurns(turns.map(turn => {
      if (turn.id === turnId) {
        return { ...turn, status: newStatus };
      }
      return turn;
    }));
    
    const statusMessages = {
      'waiting': 'El cliente está en espera',
      'in-progress': 'El cliente está siendo atendido',
      'completed': 'El servicio ha sido completado'
    };
    
    toast({
      title: "Estado actualizado",
      description: statusMessages[newStatus],
    });
  };
  
  const filteredTurns = turns.filter(turn => 
    turn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turn.service.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Turnos Actuales</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar turnos..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTurns.map((turn) => (
          <Card key={turn.id} className={`
            ${turn.status === 'in-progress' ? 'border-l-4 border-l-amber-500' : ''}
            ${turn.status === 'completed' ? 'border-l-4 border-l-green-500' : ''}
            ${turn.status === 'waiting' ? 'border-l-4 border-l-blue-500' : ''}
          `}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img src={turn.imageUrl} alt={turn.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <CardTitle className="text-lg">{turn.name}</CardTitle>
                    <p className="text-sm text-gray-500">{turn.phone}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveTurn(turn.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Servicio:</span>
                  <span className="font-medium">{turn.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tiempo estimado:</span>
                  <span className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {turn.estimatedTime} min
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estado:</span>
                  <select 
                    value={turn.status}
                    onChange={(e) => handleStatusChange(turn.id, e.target.value as 'waiting' | 'in-progress' | 'completed')}
                    className="text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                  >
                    <option value="waiting">En espera</option>
                    <option value="in-progress">En atención</option>
                    <option value="completed">Completado</option>
                  </select>
                </div>
                
                <div className="flex justify-center mt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs mr-2"
                        onClick={() => handleMessageClient(turn)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Contactar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ir a Clientes</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Para chatear con el cliente, accede a la sección de "Clientes" donde encontrarás todas las conversaciones organizadas.</p>
                      </div>
                      <Button className="w-full" onClick={() => window.location.href = "/dashboard/clients"}>
                        Ir a Clientes
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredTurns.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600">No hay turnos activos</h3>
          <p className="text-gray-500">Actualmente no hay clientes en espera o en atención.</p>
        </div>
      )}
    </div>
  );
};

export default CurrentTurns;
