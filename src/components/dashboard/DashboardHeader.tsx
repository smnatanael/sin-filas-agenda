
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardHeaderProps {
  businessName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ businessName }) => {
  const { toast } = useToast();

  const handleStateChange = () => {
    toast({
      title: "Estado actualizado",
      description: "Tu negocio ahora aparece como Cerrado",
      variant: "default",
    });
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold">{businessName}</h1>
      <Button 
        className="bg-sinfilas-600 hover:bg-sinfilas-700"
        onClick={handleStateChange}
      >
        <Clock className="mr-2 h-4 w-4" />
        Estado: Abierto
      </Button>
    </div>
  );
};

export default DashboardHeader;
