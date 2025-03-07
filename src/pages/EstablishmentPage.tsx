
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { establishmentData } from '@/data/establishmentData';

// Components
import EstablishmentHeader from '@/components/establishment/EstablishmentHeader';
import EstablishmentInfo from '@/components/establishment/EstablishmentInfo';
import TabSelector from '@/components/establishment/TabSelector';
import QueueTab from '@/components/establishment/QueueTab';
import AppointmentTab from '@/components/establishment/AppointmentTab';
import EstablishmentFooter from '@/components/establishment/EstablishmentFooter';
import GuestInfoDialog from '@/components/establishment/GuestInfoDialog';
import LoginPromptDialog from '@/components/establishment/LoginPromptDialog';
import CancelTicketDialog from '@/components/establishment/CancelTicketDialog';

const EstablishmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'queue' | 'appointment'>('queue');
  const [hasTicket, setHasTicket] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [showGuestInfoDialog, setShowGuestInfoDialog] = useState(false);
  const [showLoginPromptDialog, setShowLoginPromptDialog] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ firstName: '', lastName: '' });
  const { toast } = useToast();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const guestMode = localStorage.getItem('guestMode');
    setIsGuestMode(!!guestMode);
    
    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser);
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

  const handleTabChange = (tab: 'queue' | 'appointment') => {
    if (tab === 'appointment' && isGuestMode && !isLoggedIn) {
      setShowLoginPromptDialog(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPromptDialog(false);
    localStorage.setItem('redirectAfterLogin', id || '');
    navigate('/login');
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
      <EstablishmentHeader establishment={establishment} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <EstablishmentInfo establishment={establishment} />
          </div>
          
          <div className="lg:col-span-2">
            <TabSelector 
              activeTab={activeTab} 
              handleTabChange={handleTabChange} 
            />
            
            {activeTab === 'queue' && (
              <QueueTab 
                establishment={establishment}
                hasTicket={hasTicket}
                ticketData={ticketData}
                getNewTicket={getNewTicket}
                handleCancelTicket={handleCancelTicket}
              />
            )}
            
            {activeTab === 'appointment' && (
              <AppointmentTab establishment={establishment} />
            )}
          </div>
        </div>
      </main>
      
      <EstablishmentFooter />

      <CancelTicketDialog 
        open={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmCancelTicket}
      />
      
      <GuestInfoDialog 
        open={showGuestInfoDialog}
        onOpenChange={setShowGuestInfoDialog}
        guestInfo={guestInfo}
        setGuestInfo={setGuestInfo}
        onSubmit={handleGuestInfoSubmit}
      />
      
      <LoginPromptDialog 
        open={showLoginPromptDialog}
        onOpenChange={setShowLoginPromptDialog}
        onLogin={handleLoginRedirect}
      />
    </div>
  );
};

export default EstablishmentPage;
