import React, { useState } from 'react';
import { Users, MessageCircle, Search, Clock, Calendar, Info, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: Date | null;
  nextAppointment: Date | null;
  activeTurn: boolean;
  avatar?: string;
  status: 'active' | 'inactive';
}

interface Message {
  id: string;
  clientId: string;
  content: string;
  date: Date;
  isFromClient: boolean;
}

const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+12345678',
    visits: 8,
    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextAppointment: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    activeTurn: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active'
  },
  {
    id: 'c2',
    name: 'María López',
    email: 'maria@example.com',
    phone: '+12345679',
    visits: 4,
    lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    nextAppointment: null,
    activeTurn: false,
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'active'
  },
  {
    id: 'c3',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+12345670',
    visits: 12,
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    activeTurn: false,
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'active'
  },
  {
    id: 'c4',
    name: 'Ana Martínez',
    email: 'ana@example.com',
    phone: '+12345671',
    visits: 3,
    lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextAppointment: null,
    activeTurn: false,
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'inactive'
  }
];

const mockMessages: Record<string, Message[]> = {
  'c1': [
    {
      id: 'm1',
      clientId: 'c1',
      content: 'Hola, ¿a qué hora es mi cita?',
      date: new Date(Date.now() - 50 * 60 * 1000),
      isFromClient: true
    },
    {
      id: 'm2',
      clientId: 'c1',
      content: 'Su cita está agendada para las 3:00 PM el día de hoy.',
      date: new Date(Date.now() - 45 * 60 * 1000),
      isFromClient: false
    },
    {
      id: 'm3',
      clientId: 'c1',
      content: 'Perfecto, gracias.',
      date: new Date(Date.now() - 40 * 60 * 1000),
      isFromClient: true
    }
  ],
  'c2': [
    {
      id: 'm4',
      clientId: 'c2',
      content: '¿Cuánto cuesta el servicio de manicure?',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isFromClient: true
    },
    {
      id: 'm5',
      clientId: 'c2',
      content: 'El manicure básico cuesta $25 y el premium $35.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000),
      isFromClient: false
    }
  ],
  'c3': []
};

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedClientMessages, setSelectedClientMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleOpenChat = (client: Client) => {
    setSelectedClient(client);
    // Get messages for this client or empty array if none
    setSelectedClientMessages(mockMessages[client.id] || []);
    setShowChatDialog(true);
  };

  const handleSendMessage = () => {
    if (!selectedClient || !newMessage.trim()) return;
    
    // Add new message
    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      clientId: selectedClient.id,
      content: newMessage,
      date: new Date(),
      isFromClient: false
    };
    
    setSelectedClientMessages([...selectedClientMessages, newMessageObj]);
    setNewMessage('');
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedClient.name}`,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    
    // Format date to local date string
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <div className="w-full md:w-auto flex">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
        </div>
        
        <Card className="shadow-md mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-sinfilas-600" />
              Listado de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-gray-500 font-medium">Cliente</th>
                    <th className="pb-3 text-gray-500 font-medium">Contacto</th>
                    <th className="pb-3 text-gray-500 font-medium">Visitas</th>
                    <th className="pb-3 text-gray-500 font-medium">Última Visita</th>
                    <th className="pb-3 text-gray-500 font-medium">Próxima Cita</th>
                    <th className="pb-3 text-gray-500 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-500">
                        No se encontraron clientes con la búsqueda actual
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map(client => (
                      <tr key={client.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <Badge variant="outline" className={
                                client.status === 'active' 
                                  ? 'bg-green-50 text-green-700 border-green-100'
                                  : 'bg-gray-50 text-gray-700 border-gray-100'
                              }>
                                {client.status === 'active' ? 'Activo' : 'Inactivo'}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3">
                            <div>
                              <p className="text-sm">{client.email}</p>
                              <p className="text-sm text-gray-500">{client.phone}</p>
                            </div>
                          </td>
                          <td className="py-3">
                            {client.visits}
                          </td>
                          <td className="py-3">
                            {formatDate(client.lastVisit)}
                          </td>
                          <td className="py-3">
                            {client.nextAppointment ? (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-sinfilas-600" />
                                <span>{formatDate(client.nextAppointment)}</span>
                              </div>
                            ) : (
                              'No agendada'
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleOpenChat(client)}
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Info className="h-4 w-4 mr-2" />
                                    <span>Ver detalles</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Agendar cita</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>Asignar turno</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Clientes Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.filter(c => c.status === 'active').slice(0, 4).map(client => (
                    <div key={client.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={client.avatar} alt={client.name} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-500">
                            {client.activeTurn && (
                              <span className="flex items-center text-sinfilas-600">
                                <Clock className="h-3 w-3 mr-1" />
                                Turno activo
                              </span>
                            )}
                            {client.nextAppointment && !client.activeTurn && (
                              <span className="flex items-center text-gray-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                Próxima cita: {formatDate(client.nextAppointment)}
                              </span>
                            )}
                            {!client.nextAppointment && !client.activeTurn && (
                              <span>Sin actividad programada</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenChat(client)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Mensajes Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.values(mockMessages).flat().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay mensajes recientes
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.values(mockMessages)
                      .flat()
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .slice(0, 4)
                      .map(message => {
                        const client = clients.find(c => c.id === message.clientId);
                        if (!client) return null;
                        
                        return (
                          <div key={message.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={client.avatar} alt={client.name} />
                                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-medium">{client.name}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {message.date.toLocaleTimeString('es-ES', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-sm">
                              {message.content.length > 100 
                                ? `${message.content.substring(0, 100)}...` 
                                : message.content
                              }
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      
      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedClient && (
                <>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={selectedClient.avatar} alt={selectedClient.name} />
                    <AvatarFallback>{selectedClient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedClient.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="border rounded-md h-[300px] p-4 overflow-y-auto">
                {selectedClientMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No hay mensajes para mostrar
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedClientMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.isFromClient ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isFromClient 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-sinfilas-100 text-sinfilas-800'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs text-gray-500 mt-1 text-right">
                            {msg.date.toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Input 
                  value={newMessage} 
                  onChange={e => setNewMessage(e.target.value)} 
                  placeholder="Escriba su mensaje..." 
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-sinfilas-600 hover:bg-sinfilas-700"
                >
                  Enviar
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 italic">
                Los mensajes se eliminan automáticamente después de 5 días.
              </div>
            </TabsContent>
            
            <TabsContent value="info">
              {selectedClient && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Nombre</Label>
                    <p>{selectedClient.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Teléfono</Label>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Visitas</Label>
                    <p>{selectedClient.visits}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Última Visita</Label>
                    <p>{formatDate(selectedClient.lastVisit)}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Próxima Cita</Label>
                    <p>{formatDate(selectedClient.nextAppointment)}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Estado</Label>
                    <Badge variant="outline" className={
                      selectedClient.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-gray-50 text-gray-700 border-gray-100'
                    }>
                      {selectedClient.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
