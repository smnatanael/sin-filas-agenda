import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Phone, MapPin, Info, User, X, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import QueueStatus from '@/components/QueueStatus';
import Ticket from '@/components/Ticket';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const establishmentData = {
  'barberia-x': {
    name: 'Barbería X',
    logo: 'https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=1500',
    location: 'Centro Comercial Plaza, Local 23',
    phone: '+58 123 456 7890',
    description: 'Barbería moderna especializada en cortes de cabello y arreglo de barba con estilo contemporáneo.',
    hours: 'Lun - Sáb: 9AM - 8PM',
    services: ['Corte de cabello', 'Arreglo de barba', 'Afeitado clásico', 'Tratamientos capilares'],
    currentTicket: 'B12',
    averageServiceTime: 15
  },
  'salon-salome': {
    name: 'Salón Salomé',
    logo: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1500',
    location: 'Av. Principal 456',
    phone: '+58 987 654 3210',
    description: 'Salón de belleza con servicios completos para el cuidado del cabello, uñas y tratamientos faciales.',
    hours: 'Lun - Sáb: 10AM - 7PM',
    services: ['Corte y peinado', 'Coloración', 'Manicure y pedicure', 'Tratamientos faciales'],
    currentTicket: 'S09',
    averageServiceTime: 30
  },
  'pizzas-xxl': {
    name: 'Pizzas XXL',
    logo: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1500',
    location: 'Calle Italiana 789',
    phone: '+58 111 222 3333',
    description: 'Pizzería especializada en pizzas extragrandes con ingredientes frescos y hornos tradicionales.',
    hours: 'Lun - Dom: 11AM - 11PM',
    services: ['Pizza para llevar', 'Entrega a domicilio', 'Ordenes para fiestas', 'Especialidades italianas'],
    currentTicket: 'P15',
    averageServiceTime: 10
  },
  'comedor-guillermo': {
    name: 'Comedor Guillermo',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500',
    location: 'Plaza Central 234',
    phone: '+58 444 555 6666',
    description: 'Comedor tradicional con platillos caseros preparados al momento y ambiente familiar.',
    hours: 'Lun - Vie: 7AM - 4PM',
    services: ['Desayunos', 'Almuerzos', 'Platos para llevar', 'Menú ejecutivo'],
    currentTicket: 'C08',
    averageServiceTime: 8
  },
  'farmacia-carol': {
    name: 'Farmacia Carol',
    logo: 'https://images.unsplash.com/photo-1567850083672-fff8fdcfc1e7?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1567850083672-fff8fdcfc1e7?q=80&w=1500',
    location: 'Av. Salud 567',
    phone: '+58 777 888 9999',
    description: 'Farmacia con amplio surtido de medicamentos, productos de cuidado personal y asesoría farmacéutica.',
    hours: 'Lun - Dom: 24 horas',
    services: ['Medicamentos con receta', 'Productos OTC', 'Inyecciones', 'Consultas rápidas'],
    currentTicket: 'F05',
    averageServiceTime: 5
  },
  'ginecostetra-xy': {
    name: 'Consultorio Ginecostetra XY',
    logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1500',
    location: 'Centro Médico Especialidades, Piso 3',
    phone: '+58 333 444 5555',
    description: 'Consulta ginecológica con enfoque en salud integral de la mujer y atención prenatal.',
    hours: 'Lun - Vie: 8AM - 5PM',
    services: ['Consulta ginecológica', 'Control prenatal', 'Ultrasonidos', 'Papanicolaou'],
    currentTicket: 'G07',
    averageServiceTime: 25
  }
};

const EstablishmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'queue' | 'appointment'>('queue');
  const [hasTicket, setHasTicket] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [showGuestInfoDialog, setShowGuestInfoDialog] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ firstName: '', lastName: '' });
  const { toast } = useToast();
  const [isGuestMode, setIsGuestMode] = useState(false);
  
  useEffect(() => {
    const guestMode = localStorage.getItem('guestMode');
    setIsGuestMode(!!guestMode);
  }, []);
  
  if (!id || !establishmentData[id as keyof typeof establishmentData]) {
    return <div>Establecimiento no encontrado</div>;
  }
  
  const establishment = establishmentData[id as keyof typeof establishmentData];
  
  const ticketData = {
    ticketNumber: 'B15',
    yourTicket: 'B15',
    peopleAhead: 3,
    estimatedWaitTime: 45,
    date: '12 Mayo, 2024',
    time: '14:30'
  };
  
  const getNewTicket = () => {
    if (isGuestMode) {
      setShowGuestInfoDialog(true);
    } else {
      completeTicketProcess();
    }
  };

  const completeTicketProcess = () => {
    setHasTicket(true);
    setShowGuestInfoDialog(false);
    
    let message = `Se te ha asignado el turno ${ticketData.yourTicket}`;
    if (isGuestMode && guestInfo.firstName) {
      message = `${guestInfo.firstName} ${guestInfo.lastName}, se te ha asignado el turno ${ticketData.yourTicket}`;
    }
    
    toast({
      title: "Turno obtenido",
      description: message,
    });
  };

  const handleGuestInfoSubmit = () => {
    if (!guestInfo.firstName || !guestInfo.lastName) {
      toast({
        title: "Información incompleta",
        description: "Por favor ingresa tu nombre y apellido",
        variant: "destructive"
      });
      return;
    }
    
    completeTicketProcess();
  };

  const handleCancelTicket = () => {
    setIsDeleteAlertOpen(true);
  };

  const confirmCancelTicket = () => {
    setHasTicket(false);
    setIsDeleteAlertOpen(false);
    toast({
      title: "Turno cancelado",
      description: "Tu turno ha sido cancelado exitosamente",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sinfilas-50">
      <Header 
        logoUrl={establishment.logo} 
        businessName={establishment.name} 
        isBusinessPage={true}
      />
      
      <div 
        className="h-64 relative bg-sinfilas-900 overflow-hidden animate-fade-in"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${establishment.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{establishment.name}</h1>
          <div className="flex items-center opacity-90">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{establishment.location}</span>
          </div>
        </div>
      </div>
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glassmorphism rounded-xl p-6 mb-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-sinfilas-600" />
                Información
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Teléfono</div>
                    <div className="text-sm text-gray-500">{establishment.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Horario</div>
                    <div className="text-sm text-gray-500">{establishment.hours}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Descripción</div>
                  <div className="text-sm text-gray-500">{establishment.description}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Servicios</div>
                  <div className="flex flex-wrap gap-2">
                    {establishment.services.map((service, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-sinfilas-50 text-sinfilas-800 text-xs px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glassmorphism rounded-xl p-2 mb-6 animate-fade-in">
              <div className="flex">
                <button 
                  className={cn(
                    "flex-1 text-center py-3 px-4 rounded-lg transition-all",
                    activeTab === 'queue' 
                      ? "bg-sinfilas-600 text-white font-medium" 
                      : "text-gray-600 hover:bg-sinfilas-50"
                  )}
                  onClick={() => setActiveTab('queue')}
                >
                  Estado de la Fila
                </button>
                <button 
                  className={cn(
                    "flex-1 text-center py-3 px-4 rounded-lg transition-all",
                    activeTab === 'appointment' 
                      ? "bg-sinfilas-600 text-white font-medium" 
                      : "text-gray-600 hover:bg-sinfilas-50"
                  )}
                  onClick={() => setActiveTab('appointment')}
                  disabled={isGuestMode}
                >
                  Mis Citas
                </button>
              </div>
              {isGuestMode && activeTab !== 'queue' && (
                <div className="text-xs text-center mt-1 text-amber-600">
                  El modo invitado solo permite tomar turnos, no agendar citas
                </div>
              )}
            </div>
            
            {activeTab === 'queue' && (
              <>
                {hasTicket ? (
                  <>
                    <QueueStatus 
                      currentTicket={establishment.currentTicket}
                      yourTicket={ticketData.yourTicket}
                      peopleAhead={ticketData.peopleAhead}
                      estimatedWaitTime={ticketData.estimatedWaitTime}
                      averageServiceTime={establishment.averageServiceTime}
                    />
                    
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Tu Ticket</h3>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={handleCancelTicket}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Cancelar Turno
                        </Button>
                      </div>
                      <Ticket
                        ticketNumber={ticketData.yourTicket}
                        businessName={establishment.name}
                        businessLogo={establishment.logo}
                        date={ticketData.date}
                        time={ticketData.time}
                        status="pending"
                        estimatedTime={ticketData.estimatedWaitTime}
                      />
                    </div>
                  </>
                ) : (
                  <div className="glassmorphism rounded-xl p-8 text-center animate-fade-in">
                    <div className="flex justify-center mb-6">
                      <div className="h-24 w-24 rounded-full bg-sinfilas-50 flex items-center justify-center">
                        <User className="h-12 w-12 text-sinfilas-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No tienes turno activo</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Toma un turno ahora para entrar en la fila virtual y recibir notificaciones cuando sea tu turno.
                    </p>
                    <Button 
                      className="bg-sinfilas-600 hover:bg-sinfilas-700 text-white"
                      onClick={getNewTicket}
                    >
                      Tomar Turno
                    </Button>
                    <div className="mt-4 text-sm text-gray-500">
                      Tiempo promedio de atención: <span className="font-medium">{establishment.averageServiceTime} minutos</span>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'appointment' && (
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
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Clock className="h-6 w-6 text-sinfilas-600" />
              <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
            </div>
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} SinFilas. Todos los derechos reservados.</div>
          </div>
        </div>
      </footer>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Cancelar Turno
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cancelar tu turno? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmCancelTicket}
            >
              Sí, cancelar turno
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={showGuestInfoDialog} onOpenChange={setShowGuestInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ingresa tus datos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input 
                id="firstName" 
                value={guestInfo.firstName} 
                onChange={e => setGuestInfo({...guestInfo, firstName: e.target.value})} 
                placeholder="Tu nombre" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input 
                id="lastName" 
                value={guestInfo.lastName} 
                onChange={e => setGuestInfo({...guestInfo, lastName: e.target.value})} 
                placeholder="Tu apellido" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGuestInfoDialog(false)}>Cancelar</Button>
            <Button 
              onClick={handleGuestInfoSubmit}
              disabled={!guestInfo.firstName || !guestInfo.lastName}
              className="bg-sinfilas-600 hover:bg-sinfilas-700"
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EstablishmentPage;
