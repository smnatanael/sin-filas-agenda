
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Calendar, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  logoUrl?: string;
  businessName?: string;
  isBusinessPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  logoUrl, 
  businessName, 
  isBusinessPage = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, [location]);

  const handleViewAppointments = () => {
    navigate('/appointments');
    toast({
      title: "Mis Citas",
      description: "Visualizando tus citas agendadas",
    });
  };

  const handleViewTurns = () => {
    navigate('/turns');
    toast({
      title: "Mis Turnos",
      description: "Visualizando tus turnos actuales",
    });
  };

  const handleShowHowItWorks = () => {
    navigate('/how-it-works');
    toast({
      title: "Cómo Funciona",
      description: "Mostrando guía de funcionamiento de SinFilas",
    });
  };

  const handleMobileMenu = () => {
    toast({
      title: "Menú Móvil",
      description: "Abriendo menú de navegación",
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className="w-full sticky top-0 z-50 glassmorphism animate-blur-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleGoHome} className="flex items-center space-x-3">
              {isBusinessPage && logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={businessName || 'Business logo'} 
                  className="h-10 w-10 object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-sinfilas-600" />
                  <span className="ml-2 text-2xl font-bold text-sinfilas-600">SinFilas</span>
                </div>
              )}
              {isBusinessPage && businessName && (
                <span className="text-xl font-medium text-gray-800">{businessName}</span>
              )}
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isBusinessPage ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2"
                    onClick={handleViewAppointments}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Mis Citas</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2"
                    onClick={handleViewTurns}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Mis Turnos</span>
                  </Button>
                </>
              ) : (
                <>
                  {isLoggedIn && (
                    <Button 
                      variant="ghost"
                      onClick={handleViewAppointments}
                      className="flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Mis Citas</span>
                    </Button>
                  )}
                  <Button 
                    variant="ghost"
                    onClick={() => navigate('/business')}
                  >
                    Para Negocios
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={handleShowHowItWorks}
                  >
                    Cómo Funciona
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/contact')}
                  >
                    Contacto
                  </Button>
                  {isLoggedIn ? (
                    <Button 
                      variant="default" 
                      className="bg-sinfilas-600 hover:bg-sinfilas-700"
                      onClick={() => {
                        localStorage.removeItem('currentUser');
                        setIsLoggedIn(false);
                        navigate('/');
                        toast({
                          title: "Sesión cerrada",
                          description: "Has cerrado sesión correctamente",
                        });
                      }}
                    >
                      Cerrar Sesión
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      className="bg-sinfilas-600 hover:bg-sinfilas-700"
                      onClick={() => navigate('/login')}
                    >
                      Iniciar Sesión
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
