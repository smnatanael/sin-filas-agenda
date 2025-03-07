
import React from 'react';
import { cn } from '@/lib/utils';

interface TabSelectorProps {
  activeTab: 'queue' | 'appointment';
  handleTabChange: (tab: 'queue' | 'appointment') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, handleTabChange }) => {
  return (
    <div className="glassmorphism rounded-xl p-2 mb-6 animate-fade-in">
      <div className="flex">
        <button 
          className={cn(
            "flex-1 text-center py-3 px-4 rounded-lg transition-all",
            activeTab === 'queue' 
              ? "bg-sinfilas-600 text-white font-medium" 
              : "text-gray-600 hover:bg-sinfilas-50"
          )}
          onClick={() => handleTabChange('queue')}
        >
          Estado de la Fila
        </button>
        <button 
          className={cn(
            "flex-1 text-center py-3 px-4 rounded-lg transition-all",
            activeTab === 'appointment' 
              ? "bg-sinfilas-600 text-white font-medium" 
              : "text-gray-600 hover:bg-sinfilas-50"
          )}
          onClick={() => handleTabChange('appointment')}
        >
          Mis Citas
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
