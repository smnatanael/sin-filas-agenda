
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SinFilas</h3>
            <p className="text-gray-400 mb-4">
              La mejor forma de ahorrar tiempo en tus gestiones diarias.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/business')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Para Negocios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@sinfilas.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SinFilas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
