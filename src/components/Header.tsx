import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Calendar, Menu, User, Settings, ListChecks, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
  const [isBusinessUser, setIsBusinessUser] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
    
    if (user) {
      const userData = JSON.parse(user);
      setIsBusinessUser(userData.role === 'business');
    }
  }, [location]);

  const handleViewAppointments = () => {
    navigate('/appointments');
    toast({
      title: "Citas y Turnos",
      description: "Visualizando tus citas y turnos",
    });
    setMobileMenuOpen(false);
  };

  const handleViewTurns = () => {
    navigate('/turns');
    toast({
      title: "Mis Turnos",
      description: "Visualizando tus turnos actuales",
    });
    setMobileMenuOpen(false);
  };

  const handleShowHowItWorks = () => {
    navigate('/how-it-works');
    toast({
      title: "Cómo Funciona",
      description: "Mostrando guía de funcionamiento de SinFilas",
    });
    setMobileMenuOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };
  
  const handleGuestNavigation = () => {
    // Set a guest flag in localStorage
    localStorage.setItem('guestMode', 'true');
    navigate('/');
    toast({
      title: "Modo Invitado",
      description: "Ahora puedes tomar turnos como invitado",
    });
    setMobileMenuOpen(false);
  };
  
  const handleGoToDashboard = () => {
    navigate('/dashboard/home');
    setMobileMenuOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('guestMode');
    setIsLoggedIn(false);
    navigate('/');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    setMobileMenuOpen(false);
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
                    <>
                      <Button 
                        variant="ghost"
                        onClick={handleViewAppointments}
                        className="flex items-center space-x-2"
                      >
                        <ListChecks className="h-4 w-4" />
                        <span>Citas y Turnos</span>
                      </Button>
                      
                      {isBusinessUser && (
                        <Button 
                          variant="ghost"
                          onClick={handleGoToDashboard}
                          className="flex items-center space-x-2"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Mi Dashboard</span>
                        </Button>
                      )}
                    </>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Mi Perfil</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate('/settings')}>
                          Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/appointments')}>
                          Citas y Turnos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                          Cerrar Sesión
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="flex items-center space-x-2"
                        onClick={handleGuestNavigation}
                      >
                        <User className="h-4 w-4" />
                        <span>Navegar como invitado</span>
                      </Button>
                      <Button 
                        variant="default" 
                        className="bg-sinfilas-600 hover:bg-sinfilas-700"
                        onClick={() => navigate('/login')}
                      >
                        Iniciar Sesión
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center">
                    <Clock className="h-6 w-6 text-sinfilas-600 mr-2" />
                    <span className="text-xl font-bold text-sinfilas-600">SinFilas</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6 flex flex-col space-y-3">
                  
                  {isBusinessPage ? (
                    <>
                      <Button 
                        variant="ghost" 
                        className="flex items-center justify-start space-x-2"
                        onClick={handleViewAppointments}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Mis Citas</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex items-center justify-start space-x-2"
                        onClick={handleViewTurns}
                      >
                        <Clock className="h-4 w-4" />
                        <span>Mis Turnos</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      {isLoggedIn && (
                        <>
                          <Button 
                            variant="ghost"
                            onClick={handleViewAppointments}
                            className="flex items-center justify-start space-x-2"
                          >
                            <ListChecks className="h-4 w-4" />
                            <span>Citas y Turnos</span>
                          </Button>
                          
                          {isBusinessUser && (
                            <Button 
                              variant="ghost"
                              onClick={handleGoToDashboard}
                              className="flex items-center justify-start space-x-2"
                            >
                              <Settings className="h-4 w-4" />
                              <span>Mi Dashboard</span>
                            </Button>
                          )}
                          <Button 
                            variant="ghost"
                            onClick={() => navigate('/settings')}
                            className="flex items-center justify-start space-x-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Mi Perfil</span>
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          navigate('/business');
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-start space-x-2"
                      >
                        Para Negocios
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={handleShowHowItWorks}
                        className="flex items-center justify-start space-x-2"
                      >
                        Cómo Funciona
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          navigate('/contact');
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-start space-x-2"
                      >
                        Contacto
                      </Button>
                      
                      {!isLoggedIn && (
                        <>
                          <Button 
                            variant="outline" 
                            className="flex items-center justify-start space-x-2 w-full"
                            onClick={handleGuestNavigation}
                          >
                            <User className="h-4 w-4" />
                            <span>Navegar como invitado</span>
                          </Button>
                          <Button 
                            variant="default" 
                            className="bg-sinfilas-600 hover:bg-sinfilas-700 w-full"
                            onClick={() => {
                              navigate('/login');
                              setMobileMenuOpen(false);
                            }}
                          >
                            Iniciar Sesión
                          </Button>
                        </>
                      )}
                      
                      {isLoggedIn && (
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-start space-x-2 text-red-500"
                          onClick={handleLogout}
                        >
                          Cerrar Sesión
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
