
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-30">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-2 text-xl font-bold text-sinfilas-600">SinFilas</span>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0">
          <div className="p-4">
            <Sidebar className="block h-full" isMobile setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-b from-white to-sinfilas-50">
        <div className="max-w-6xl mx-auto">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
