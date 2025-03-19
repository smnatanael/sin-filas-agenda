
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import GeneralTab from '@/components/admin-settings/GeneralTab';
import AppearanceTab from '@/components/admin-settings/AppearanceTab';
import NotificationsTab from '@/components/admin-settings/NotificationsTab';
import BackupTab from '@/components/admin-settings/BackupTab';
import AdvancedTab from '@/components/admin-settings/AdvancedTab';

const AdminSettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Cambios guardados",
        description: "La configuración del sistema ha sido actualizada correctamente",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <Button onClick={handleSaveChanges} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      <Alert className="bg-yellow-100">
        <AlertTitle className="text-yellow-800">Recordatorio</AlertTitle>
        <AlertDescription className="text-yellow-800">
          Algunos cambios de configuración pueden requerir reiniciar el sistema para aplicarse completamente.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="backup">Respaldos</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="backup">
          <BackupTab />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
