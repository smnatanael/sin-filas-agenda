
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, FileText, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FAQList from '@/components/support/FAQList';
import GuidesList from '@/components/support/GuidesList';
import ContactForm from '@/components/support/ContactForm';

const faqs = [
  {
    question: "¿Cómo cambio el horario de mi negocio?",
    answer: "Para cambiar el horario de tu negocio, ve a la pestaña 'Horarios' en el Panel de Negocio. Allí podrás establecer los días y horas en que tu negocio está abierto."
  },
  {
    question: "¿Cómo añado un nuevo servicio?",
    answer: "Para añadir un nuevo servicio, ve a la pestaña 'Servicios' en el Panel de Negocio y haz clic en el botón 'Añadir Nuevo Servicio'. Completa el formulario con el nombre, duración y precio del servicio."
  },
  {
    question: "¿Puedo limitar el número de citas diarias?",
    answer: "Sí, puedes limitar el número de citas diarias. Ve a la pestaña 'Configuración' y en la sección 'Ajustes de Citas' podrás establecer un límite de citas por día."
  },
  {
    question: "¿Cómo cancelo una cita?",
    answer: "Para cancelar una cita, ve a la sección 'Citas' en el Panel de Negocio, localiza la cita que deseas cancelar y haz clic en el icono 'X' o en el botón 'Cancelar Cita'."
  },
  {
    question: "¿Qué ocurre si un cliente no se presenta a su cita?",
    answer: "Si un cliente no se presenta a su cita, puedes marcarla como 'No presentado' en la sección de 'Citas'. Esto te ayudará a llevar un registro de los clientes que no asisten a sus citas programadas."
  },
  {
    question: "¿Cómo puedo ver las estadísticas de mi negocio?",
    answer: "Próximamente añadiremos una sección de 'Estadísticas' donde podrás ver información detallada sobre citas, turnos, servicios más populares y horas pico."
  }
];

const guides = [
  {
    title: "Guía de inicio rápido",
    description: "Aprende a configurar tu negocio y comenzar a recibir citas en SinFilas",
    icon: FileText
  },
  {
    title: "Gestión de citas y turnos",
    description: "Cómo gestionar eficientemente las citas y turnos de tu negocio",
    icon: MessageCircle
  },
  {
    title: "Personalización de servicios",
    description: "Añade, edita y personaliza los servicios que ofreces en tu negocio",
    icon: FileText
  },
  {
    title: "Comunicación con clientes",
    description: "Aprende a usar las herramientas de comunicación para mantener a tus clientes informados",
    icon: MessageCircle
  }
];

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSendSupportMessage = () => {
    if (!supportMessage || !supportEmail || !supportSubject) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos para enviar tu mensaje.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulación de envío de mensaje
    setTimeout(() => {
      setLoading(false);
      setSupportMessage('');
      setSupportEmail('');
      setSupportSubject('');
      
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado correctamente. Te responderemos lo antes posible.",
      });
    }, 1500);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Soporte</h1>
      </div>
      
      <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="guides">Guías</TabsTrigger>
          <TabsTrigger value="contact">Contactar Soporte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar en preguntas frecuentes..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <FAQList 
            faqs={faqs} 
            searchTerm={searchTerm} 
            onContactSupportClick={() => setActiveTab("contact")} 
          />
        </TabsContent>
        
        <TabsContent value="guides">
          <GuidesList guides={guides} />
        </TabsContent>
        
        <TabsContent value="contact">
          <ContactForm
            supportEmail={supportEmail}
            supportSubject={supportSubject}
            supportMessage={supportMessage}
            loading={loading}
            onSupportEmailChange={setSupportEmail}
            onSupportSubjectChange={setSupportSubject}
            onSupportMessageChange={setSupportMessage}
            onSendMessage={handleSendSupportMessage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
