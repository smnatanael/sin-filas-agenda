
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Calendar, 
  Settings, 
  HelpCircle, 
  ChartBar,
  Shield,
  Bell,
  X 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  className?: string;
  isMobile?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  className,
  isMobile = false,
  setMobileMenuOpen
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Determine active item from URL
  const currentPath = location.pathname.split('/').pop() || 'overview';

  const handleSidebarClick = (item: string) => {
    // Close mobile menu if we're on mobile
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Navigate to appropriate route
    switch(item) {
      case "overview":
        navigate('/admin/overview');
        break;
      case "users":
        navigate('/admin/users');
        break;
      case "businesses":
        navigate('/admin/businesses');
        break;
      case "analytics":
        navigate('/admin/analytics');
        break;
      case "appointments":
        navigate('/admin/appointments');
        break;
      case "notifications":
        navigate('/admin/notifications');
        break;
      case "settings":
        navigate('/admin/settings');
        break;
      case "security":
        navigate('/admin/security');
        break;
      case "support":
        navigate('/admin/support');
        break;
      case "logout":
        toast({
          title: "Cerrando sesión",
          description: "Has cerrado sesión correctamente",
        });
        
        localStorage.removeItem('currentUser');
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
        break;
      default:
        navigate('/admin/overview');
    }
  };

  return (
    <div className={cn("glassmorphism w-64 p-4 shadow-lg h-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Shield className="h-6 w-6 text-sinfilas-600" />
          <span className="ml-2 text-xl font-bold text-sinfilas-600">Admin Panel</span>
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
          variant={currentPath === "overview" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("overview")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Resumen
        </Button>
        <Button 
          variant={currentPath === "users" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("users")}
        >
          <Users className="mr-2 h-4 w-4" />
          Usuarios
        </Button>
        <Button 
          variant={currentPath === "businesses" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("businesses")}
        >
          <Store className="mr-2 h-4 w-4" />
          Negocios
        </Button>
        <Button 
          variant={currentPath === "analytics" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("analytics")}
        >
          <ChartBar className="mr-2 h-4 w-4" />
          Analíticas
        </Button>
        <Button 
          variant={currentPath === "appointments" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("appointments")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Citas
        </Button>
        <Button 
          variant={currentPath === "notifications" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notificaciones
        </Button>
        <Button 
          variant={currentPath === "security" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("security")}
        >
          <Shield className="mr-2 h-4 w-4" />
          Seguridad
        </Button>
        <Button 
          variant={currentPath === "settings" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button 
          variant={currentPath === "support" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => handleSidebarClick("support")}
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

export default AdminSidebar;
