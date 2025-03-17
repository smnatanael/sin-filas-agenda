
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PersonalInfoCard from '@/components/user-settings/PersonalInfoCard';
import SecurityCard from '@/components/user-settings/SecurityCard';
import { useToast } from '@/hooks/use-toast';

const UserSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    setLoading(true);
    
    // Simulación de guardado
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cambios guardados",
        description: "Tu información ha sido actualizada correctamente",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <p className="text-gray-600">Administra tu cuenta y preferencias</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <PersonalInfoCard 
            loading={loading}
            onSaveChanges={handleSaveChanges}
          />
          
          <SecurityCard 
            loading={loading}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      </main>
    </div>
  );
};

export default UserSettings;
