
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LoginPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

const LoginPromptDialog: React.FC<LoginPromptDialogProps> = ({
  open,
  onOpenChange,
  onLogin
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar sesión requerido</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Para agendar citas necesitas iniciar sesión. ¿Deseas iniciar sesión ahora?
          </p>
        </div>
        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            No, continuar como invitado
          </Button>
          <Button 
            onClick={onLogin}
            className="bg-sinfilas-600 hover:bg-sinfilas-700"
          >
            Iniciar sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptDialog;
