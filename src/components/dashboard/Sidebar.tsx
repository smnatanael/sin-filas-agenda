
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Settings, Users, Building, HelpCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSidebarItem?: string;
  setActiveSidebarItem?: (item: string) => void;
  className?: string;
  isMobile?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSidebarItem, 
  setActiveSidebarItem,
  className,
  isMobile = false,
  setMobileMenuOpen
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Determine active item from URL if not provided
  const currentPath = location.pathname.split('/').pop() || 'dashboard';
  const activeItem = activeSidebarItem || currentPath;

  const handleSidebarClick = (item: string) => {
    // Update active item in parent component if provided
    if (setActiveSidebarItem) {
      setActiveSidebarItem(item);
    }
    
    // Close mobile menu if we're on mobile
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Navigate to appropriate route
    switch(item) {
      case "dashboard":
      case "home":
        navigate('/dashboard/home');
        break;
      case "turnos":
      case "turns":
        navigate('/dashboard/turns');
        break;
      case "citas":
      case "appointments":
        navigate('/dashboard/appointments');
        break;
      case "clientes":
      case "clients":
        navigate('/dashboard/clients');
        break;
      case "configuracion":
      case "settings":
        navigate('/dashboard/settings');
        break;
      case "soporte":
      case "support":
        navigate('/dashboard/support');
        break;
      case "logout":
        // Show toast before logout
        toast({
          title: "Cerrando sesión",
          description: "Has cerrado sesión correctamente",
        });
        
        // Clear user session
        localStorage.removeItem('currentUser');
        localStorage.removeItem('guestMode');
        
        // Navigate to home after a brief delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className={cn("glassmorphism w-64 p-4 shadow-lg h-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Clock className="h-6 w-6 text-sinfilas-600" />
          <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
        </button>
        
        {/* Close button (only on mobile) */}
        {isMobile && setMobileMenuOpen && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="space-y-2 flex-1">
        <Button 
          variant={activeItem === "dashboard" || activeItem === "home" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("dashboard")}
        >
          <Building className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button 
          variant={activeItem === "turnos" || activeItem === "turns" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("turnos")}
        >
          <Clock className="mr-2 h-4 w-4" />
          Turnos Actuales
        </Button>
        <Button 
          variant={activeItem === "citas" || activeItem === "appointments" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("citas")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Citas
        </Button>
        <Button 
          variant={activeItem === "clientes" || activeItem === "clients" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("clientes")}
        >
          <Users className="mr-2 h-4 w-4" />
          Clientes
        </Button>
        <Button 
          variant={activeItem === "configuracion" || activeItem === "settings" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("configuracion")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button 
          variant={activeItem === "soporte" || activeItem === "support" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("soporte")}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Soporte
        </Button>
      </div>
      
      <div className="mt-auto">
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
