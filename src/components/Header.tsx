
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  return (
    <header className="w-full sticky top-0 z-50 glassmorphism animate-blur-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
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
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isBusinessPage ? (
                <>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Agendar Cita</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Mis Turnos</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost">
                    <Link to="/business">Para Negocios</Link>
                  </Button>
                  <Button variant="ghost">Cómo Funciona</Button>
                  <Button variant="ghost">
                    <Link to="/contact">Contacto</Link>
                  </Button>
                  <Button variant="default" className="bg-sinfilas-600 hover:bg-sinfilas-700">
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
