
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormProps {
  supportEmail: string;
  supportSubject: string;
  supportMessage: string;
  loading: boolean;
  onSupportEmailChange: (value: string) => void;
  onSupportSubjectChange: (value: string) => void;
  onSupportMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  supportEmail,
  supportSubject,
  supportMessage,
  loading,
  onSupportEmailChange,
  onSupportSubjectChange,
  onSupportMessageChange,
  onSendMessage
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contactar con Soporte</CardTitle>
        <CardDescription>
          Envíanos un mensaje y te responderemos lo antes posible
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="support-email">Correo electrónico</Label>
          <Input 
            id="support-email" 
            type="email" 
            placeholder="tu@correo.com"
            value={supportEmail}
            onChange={(e) => onSupportEmailChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="support-subject">Asunto</Label>
          <Input 
            id="support-subject" 
            placeholder="Asunto de tu consulta"
            value={supportSubject}
            onChange={(e) => onSupportSubjectChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="support-message">Mensaje</Label>
          <Textarea 
            id="support-message" 
            placeholder="Describe tu problema o consulta con detalle"
            rows={6}
            value={supportMessage}
            onChange={(e) => onSupportMessageChange(e.target.value)}
            required
          />
        </div>
        
        <Button 
          className="w-full bg-sinfilas-600 hover:bg-sinfilas-700"
          onClick={onSendMessage}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Mensaje"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
