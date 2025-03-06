
import React, { useState } from 'react';
import { Clock, MessageCircle, X, UserPlus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/dashboard/Sidebar';

interface Turn {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  estimatedTime: number;
  status: 'waiting' | 'inProgress' | 'completed' | 'cancelled';
  waitingTime: number;
  position: number;
}

const mockTurns: Turn[] = [
  {
    id: 't1',
    name: 'Juan Pérez',
    phone: '+12345678',
    email: 'juan@example.com',
    service: 'Corte de Cabello',
    estimatedTime: 20,
    status: 'inProgress',
    waitingTime: 0,
    position: 0
  },
  {
    id: 't2',
    name: 'María López',
    phone: '+12345679',
    email: 'maria@example.com',
    service: 'Manicure',
    estimatedTime: 30,
    status: 'waiting',
    waitingTime: 20,
    position: 1
  },
  {
    id: 't3',
    name: 'Carlos Rodríguez',
    phone: '+12345670',
    email: 'carlos@example.com',
    service: 'Corte de Barba',
    estimatedTime: 15,
    status: 'waiting',
    waitingTime: 50,
    position: 2
  },
  {
    id: 't4',
    name: 'Ana Martínez',
    phone: '+12345671',
    email: 'ana@example.com',
    service: 'Teñido de Cabello',
    estimatedTime: 45,
    status: 'waiting',
    waitingTime: 65,
    position: 3
  }
];

const CurrentTurns: React.FC = () => {
  const [turns, setTurns] = useState<Turn[]>(mockTurns);
  const [showAddTurn, setShowAddTurn] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  
  const [newTurn, setNewTurn] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });

  const handleStatusChange = (turnId: string, newStatus: Turn['status']) => {
    setTurns(turns.map(turn => {
      if (turn.id === turnId) {
        return { ...turn, status: newStatus };
      }
      return turn;
    }));
    
    toast({
      title: "Estado actualizado",
      description: `Turno actualizado a "${newStatus}"`,
    });
  };

  const handleAddTurn = () => {
    const newId = `t${turns.length + 1}`;
    const lastPosition = turns.length > 0 ? Math.max(...turns.map(t => t.position)) : -1;
    
    const turnToAdd: Turn = {
      id: newId,
      ...newTurn,
      estimatedTime: 20,
      status: 'waiting',
      waitingTime: 65 + turns.length * 15,
      position: lastPosition + 1
    };
    
    setTurns([...turns, turnToAdd]);
    setNewTurn({ name: '', phone: '', email: '', service: '' });
    setShowAddTurn(false);
    
    toast({
      title: "Turno agregado",
      description: `${newTurn.name} se ha añadido a la lista de espera`,
    });
  };

  const handleRemoveTurn = (turnId: string) => {
    setTurns(turns.filter(turn => turn.id !== turnId));
    
    toast({
      title: "Turno eliminado",
      description: "Se ha eliminado el turno de la lista",
    });
  };

  const handleOpenMessage = (turn: Turn) => {
    setSelectedTurn(turn);
    setShowMessageDialog(true);
  };

  const handleSendMessage = () => {
    if (!selectedTurn || !message.trim()) return;
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedTurn.name}`,
    });
    
    setMessage('');
    setShowMessageDialog(false);
  };

  const getStatusBadge = (status: Turn['status']) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">En Espera</Badge>;
      case 'inProgress':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">En Progreso</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Completado</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSidebarItem="turnos" />
      
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Turnos Actuales</h1>
            <Button onClick={() => setShowAddTurn(true)} className="bg-sinfilas-600 hover:bg-sinfilas-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Turno
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-sinfilas-600" />
                  En Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                {turns.filter(turn => turn.status === 'inProgress').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay turnos en progreso actualmente
                  </div>
                ) : (
                  <div className="space-y-4">
                    {turns.filter(turn => turn.status === 'inProgress').map(turn => (
                      <div key={turn.id} className="p-4 border rounded-lg bg-green-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{turn.name}</h3>
                            <p className="text-sm text-gray-600">{turn.service}</p>
                          </div>
                          {getStatusBadge(turn.status)}
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Tiempo est.: {turn.estimatedTime} min</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleOpenMessage(turn)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleStatusChange(turn.id, 'completed')}
                            >
                              Completado
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-sinfilas-600" />
                  Lista de Espera ({turns.filter(turn => turn.status === 'waiting').length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {turns.filter(turn => turn.status === 'waiting').length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay turnos en espera actualmente
                  </div>
                ) : (
                  <div className="space-y-4">
                    {turns.filter(turn => turn.status === 'waiting')
                      .sort((a, b) => a.position - b.position)
                      .map(turn => (
                      <div key={turn.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{turn.name}</h3>
                            <p className="text-sm text-gray-600">{turn.service}</p>
                          </div>
                          <div className="flex items-center">
                            {getStatusBadge(turn.status)}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveTurn(turn.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Espera aprox: {turn.waitingTime} min</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleOpenMessage(turn)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleStatusChange(turn.id, 'inProgress')}
                            >
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-md mb-8">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Turnos Completados Hoy</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left mt-4">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-gray-500 font-medium">Cliente</th>
                      <th className="pb-3 text-gray-500 font-medium">Servicio</th>
                      <th className="pb-3 text-gray-500 font-medium">Duración</th>
                      <th className="pb-3 text-gray-500 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turns.filter(turn => turn.status === 'completed').length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">
                          No hay turnos completados para hoy
                        </td>
                      </tr>
                    ) : (
                      turns.filter(turn => turn.status === 'completed').map(turn => (
                        <tr key={turn.id} className="border-b">
                          <td className="py-3">{turn.name}</td>
                          <td className="py-3">{turn.service}</td>
                          <td className="py-3">{turn.estimatedTime} min</td>
                          <td className="py-3">{getStatusBadge(turn.status)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Turn Dialog */}
      <Dialog open={showAddTurn} onOpenChange={setShowAddTurn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Turno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Cliente</Label>
              <Input 
                id="name" 
                value={newTurn.name} 
                onChange={e => setNewTurn({...newTurn, name: e.target.value})} 
                placeholder="Nombre completo" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input 
                id="phone" 
                value={newTurn.phone} 
                onChange={e => setNewTurn({...newTurn, phone: e.target.value})} 
                placeholder="+123456789" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                value={newTurn.email} 
                onChange={e => setNewTurn({...newTurn, email: e.target.value})} 
                placeholder="cliente@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Servicio</Label>
              <Input 
                id="service" 
                value={newTurn.service} 
                onChange={e => setNewTurn({...newTurn, service: e.target.value})} 
                placeholder="Tipo de servicio" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTurn(false)}>Cancelar</Button>
            <Button 
              onClick={handleAddTurn}
              disabled={!newTurn.name || !newTurn.service}
              className="bg-sinfilas-600 hover:bg-sinfilas-700"
            >
              Agregar Turno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Mensaje a {selectedTurn?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Input 
                id="message" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="Escriba su mensaje aquí..." 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Cancelar</Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-sinfilas-600 hover:bg-sinfilas-700"
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentTurns;
