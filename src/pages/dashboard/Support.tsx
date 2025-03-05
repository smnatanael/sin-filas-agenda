
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HelpCircle, FileText, MessageCircle, Search, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <HelpCircle className="h-5 w-5 text-sinfilas-600 mr-2" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-600">No se encontraron resultados</h3>
              <p className="text-gray-500">Intenta con otras palabras o contacta con soporte.</p>
              <Button 
                className="mt-4 bg-sinfilas-600 hover:bg-sinfilas-700"
                onClick={() => setActiveTab("contact")}
              >
                Contactar Soporte
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <guide.icon className="h-5 w-5 text-sinfilas-600 mr-2" />
                      {guide.title}
                    </CardTitle>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{guide.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
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
                  onChange={(e) => setSupportEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-subject">Asunto</Label>
                <Input 
                  id="support-subject" 
                  placeholder="Asunto de tu consulta"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
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
                  onChange={(e) => setSupportMessage(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                className="w-full bg-sinfilas-600 hover:bg-sinfilas-700"
                onClick={handleSendSupportMessage}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
