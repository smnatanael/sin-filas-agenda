
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Search, Send, Calendar, Clock, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'business' | 'client';
  timestamp: string;
}

interface Client {
  id: string;
  name: string;
  imageUrl: string;
  lastActive: string;
  hasAppointment: boolean;
  hasTurn: boolean;
  messages: Message[];
}

const demoClients: Client[] = [
  {
    id: 'c1',
    name: 'Elena López',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop',
    lastActive: '2023-11-14 16:35',
    hasAppointment: true,
    hasTurn: false,
    messages: [
      {
        id: 'm1',
        text: 'Hola, ¿me podrías confirmar mi cita para mañana a las 10:00?',
        sender: 'client',
        timestamp: '2023-11-14 16:30'
      },
      {
        id: 'm2',
        text: 'Claro, Elena. Tu cita para mañana a las 10:00 está confirmada. Te esperamos.',
        sender: 'business',
        timestamp: '2023-11-14 16:35'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Juan Pérez',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&fit=crop',
    lastActive: '2023-11-14 15:20',
    hasAppointment: true,
    hasTurn: false,
    messages: [
      {
        id: 'm3',
        text: '¿Es posible cambiar mi cita para otro día?',
        sender: 'client',
        timestamp: '2023-11-14 15:15'
      },
      {
        id: 'm4',
        text: 'Sí, Juan. ¿Qué día te vendría mejor?',
        sender: 'business',
        timestamp: '2023-11-14 15:20'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Carlos Rodríguez',
    imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&h=100&fit=crop',
    lastActive: '2023-11-14 13:45',
    hasAppointment: false,
    hasTurn: true,
    messages: [
      {
        id: 'm5',
        text: '¿Cuánto falta para mi turno?',
        sender: 'client',
        timestamp: '2023-11-14 13:40'
      },
      {
        id: 'm6',
        text: 'Carlos, tienes 2 personas delante. El tiempo estimado de espera es de 15 minutos aproximadamente.',
        sender: 'business',
        timestamp: '2023-11-14 13:45'
      }
    ]
  }
];

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(demoClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };
  
  const handleSendMessage = () => {
    if (!selectedClient || !newMessage.trim()) return;
    
    const newMessageObj: Message = {
      id: `m${Math.random().toString(36).substring(2, 9)}`,
      text: newMessage,
      sender: 'business',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          messages: [...client.messages, newMessageObj],
          lastActive: newMessageObj.timestamp
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    setSelectedClient({
      ...selectedClient,
      messages: [...selectedClient.messages, newMessageObj],
      lastActive: newMessageObj.timestamp
    });
    setNewMessage('');
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedClient.name}`,
    });
  };
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Clientes</h1>
      
      <div className="flex flex-1 gap-6 h-full">
        <div className="w-1/3 flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar clientes..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto flex-1 glassmorphism rounded-lg">
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <div 
                  key={client.id}
                  className={`
                    p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedClient?.id === client.id ? 'bg-gray-50' : ''}
                  `}
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="flex items-center">
                    <img src={client.imageUrl} alt={client.name} className="h-12 w-12 rounded-full object-cover mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{client.name}</h3>
                        <div className="flex">
                          {client.hasAppointment && (
                            <Badge variant="outline" className="mr-1 bg-blue-50">
                              <Calendar className="h-3 w-3 mr-1 text-blue-500" />
                              <span className="text-xs text-blue-500">Cita</span>
                            </Badge>
                          )}
                          {client.hasTurn && (
                            <Badge variant="outline" className="bg-amber-50">
                              <Clock className="h-3 w-3 mr-1 text-amber-500" />
                              <span className="text-xs text-amber-500">Turno</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-500 truncate max-w-[150px]">
                          {client.messages[client.messages.length - 1]?.text}
                        </p>
                        <span className="text-xs text-gray-400">{client.lastActive.split(' ')[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Users className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-600">No hay clientes</h3>
                <p className="text-gray-500">No se encontraron clientes que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-2/3 flex flex-col glassmorphism rounded-lg">
          {selectedClient ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <img src={selectedClient.imageUrl} alt={selectedClient.name} className="h-10 w-10 rounded-full object-cover mr-3" />
                  <div>
                    <h3 className="font-medium">{selectedClient.name}</h3>
                    <div className="flex mt-1">
                      {selectedClient.hasAppointment && (
                        <Badge variant="outline" className="mr-1 bg-blue-50">
                          <Calendar className="h-3 w-3 mr-1 text-blue-500" />
                          <span className="text-xs text-blue-500">Cita</span>
                        </Badge>
                      )}
                      {selectedClient.hasTurn && (
                        <Badge variant="outline" className="bg-amber-50">
                          <Clock className="h-3 w-3 mr-1 text-amber-500" />
                          <span className="text-xs text-amber-500">Turno</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <Info className="h-4 w-4 inline-block mr-1" />
                  <span>Los mensajes se borrarán automáticamente después de 5 días</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: "200px" }}>
                {selectedClient.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`
                      flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}
                    `}
                  >
                    <div 
                      className={`
                        max-w-[70%] p-3 rounded-lg 
                        ${message.sender === 'business' 
                          ? 'bg-sinfilas-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'}
                      `}
                    >
                      <p>{message.text}</p>
                      <div 
                        className={`
                          text-xs mt-1 
                          ${message.sender === 'business' ? 'text-sinfilas-100' : 'text-gray-500'}
                        `}
                      >
                        {message.timestamp.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex">
                  <Textarea 
                    placeholder="Escribe un mensaje..." 
                    className="mr-2 resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">Selecciona un cliente</h3>
              <p className="text-gray-500 max-w-md mt-2">
                Selecciona un cliente de la lista para ver su historial de mensajes y empezar a chatear.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
