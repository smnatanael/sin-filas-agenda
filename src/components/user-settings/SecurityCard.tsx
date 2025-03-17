
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SecurityCardProps {
  loading: boolean;
  onSaveChanges: () => void;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ 
  loading, 
  onSaveChanges 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguridad de la Cuenta</CardTitle>
        <CardDescription>
          Actualiza tu contraseña y configuración de seguridad
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Contraseña actual</Label>
          <Input id="current-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password">Nueva contraseña</Label>
          <Input id="new-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
          <Input id="confirm-password" type="password" />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={onSaveChanges} 
            className="bg-sinfilas-600 hover:bg-sinfilas-700"
            disabled={loading}
          >
            Actualizar Contraseña
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
