
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GuestInfo {
  firstName: string;
  lastName: string;
}

interface GuestInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestInfo: GuestInfo;
  setGuestInfo: (info: GuestInfo) => void;
  onSubmit: () => void;
}

const GuestInfoDialog: React.FC<GuestInfoDialogProps> = ({
  open,
  onOpenChange,
  guestInfo,
  setGuestInfo,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingresa tus datos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input 
              id="firstName" 
              value={guestInfo.firstName} 
              onChange={e => setGuestInfo({...guestInfo, firstName: e.target.value})} 
              placeholder="Tu nombre" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input 
              id="lastName" 
              value={guestInfo.lastName} 
              onChange={e => setGuestInfo({...guestInfo, lastName: e.target.value})} 
              placeholder="Tu apellido" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button 
            onClick={onSubmit}
            disabled={!guestInfo.firstName || !guestInfo.lastName}
            className="bg-sinfilas-600 hover:bg-sinfilas-700"
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestInfoDialog;
