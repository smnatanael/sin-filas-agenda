
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Settings, Users, Building, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {
  activeSidebarItem: string;
  setActiveSidebarItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSidebarItem, 
  setActiveSidebarItem 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSidebarClick = (item: string) => {
    setActiveSidebarItem(item);
    
    // If the item needs to navigate to a different page
    if (item === 'logout') {
      // Show toast before logout
      toast({
        title: "Cerrando sesión",
        description: "Has cerrado sesión correctamente",
      });
      
      // Navigate to home after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="glassmorphism w-64 p-4 hidden md:block shadow-lg">
      <div className="flex items-center mb-8">
        <Clock className="h-6 w-6 text-sinfilas-600" />
        <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
      </div>
      
      <div className="space-y-2">
        <Button 
          variant={activeSidebarItem === "dashboard" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("dashboard")}
        >
          <Building className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button 
          variant={activeSidebarItem === "turnos" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("turnos")}
        >
          <Clock className="mr-2 h-4 w-4" />
          Turnos Actuales
        </Button>
        <Button 
          variant={activeSidebarItem === "citas" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("citas")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Citas
        </Button>
        <Button 
          variant={activeSidebarItem === "clientes" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("clientes")}
        >
          <Users className="mr-2 h-4 w-4" />
          Clientes
        </Button>
        <Button 
          variant={activeSidebarItem === "configuracion" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("configuracion")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button 
          variant={activeSidebarItem === "soporte" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("soporte")}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Soporte
        </Button>
      </div>
      
      <div className="absolute bottom-8 left-4 right-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleSidebarClick("logout")}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
