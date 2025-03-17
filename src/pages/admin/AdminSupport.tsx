
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, Users, Filter, AlertCircle, CheckCircle, Clock, Star, X, ChevronRight, Mail, Phone, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockTickets = [
  { id: 'TK-1001', user: 'Ana López', subject: 'Problema con reserva de cita', category: 'Reservas', priority: 'Alta', status: 'Abierto', lastUpdate: '15/08/2023', assignedTo: 'Carlos Ramírez' },
  { id: 'TK-1002', user: 'Juan Pérez', subject: 'No puedo actualizar mi perfil', category: 'Cuenta', priority: 'Media', status: 'En proceso', lastUpdate: '14/08/2023', assignedTo: 'María González' },
  { id: 'TK-1003', user: 'Laura Martínez', subject: 'Error al cargar negocios cercanos', category: 'Búsqueda', priority: 'Baja', status: 'Cerrado', lastUpdate: '10/08/2023', assignedTo: 'Carlos Ramírez' },
  { id: 'TK-1004', user: 'Roberto Sánchez', subject: 'Solicitud de nueva característica', category: 'Sugerencia', priority: 'Media', status: 'Abierto', lastUpdate: '15/08/2023', assignedTo: 'Sin asignar' },
  { id: 'TK-1005', user: 'Carmen Díaz', subject: 'Facturación incorrecta', category: 'Pagos', priority: 'Alta', status: 'En proceso', lastUpdate: '13/08/2023', assignedTo: 'María González' },
];

const mockFAQs = [
  { id: 1, question: '¿Cómo puedo registrar mi negocio?', answer: 'Para registrar tu negocio, dirígete a la sección "Agregar Negocio" desde la página principal. Completa el formulario con la información requerida y envía la solicitud para revisión.', category: 'Registro' },
  { id: 2, question: '¿Cómo programar una cita?', answer: 'Para programar una cita, busca el negocio deseado, selecciona el servicio que necesitas, elige fecha y hora disponible, y confirma tu reserva.', category: 'Reservas' },
  { id: 3, question: '¿Puedo cancelar una cita?', answer: 'Sí, puedes cancelar una cita hasta 24 horas antes. Dirígete a "Mis Citas" en tu perfil y selecciona la opción de cancelar.', category: 'Reservas' },
  { id: 4, question: '¿Cómo cambio mi contraseña?', answer: 'Para cambiar tu contraseña, dirígete a "Configuración" en tu perfil y selecciona la opción "Cambiar Contraseña".', category: 'Cuenta' },
  { id: 5, question: '¿El servicio tiene costo?', answer: 'Ofrecemos un plan básico gratuito y planes premium con funcionalidades adicionales. Consulta la sección de precios para más información.', category: 'Pagos' },
];

const AdminSupport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Centro de Soporte</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Nuevo Ticket
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Gestionar Agentes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tickets Abiertos</CardTitle>
            <CardDescription>Total de tickets sin resolver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tiempo de Respuesta</CardTitle>
            <CardDescription>Promedio últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.5h</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tasa de Resolución</CardTitle>
            <CardDescription>Tickets resueltos vs nuevos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Base de Conocimiento</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tickets..."
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="in-progress">En proceso</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        ticket.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        ticket.status === 'Abierto' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'En proceso' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status === 'Abierto' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {ticket.status === 'En proceso' && <Clock className="h-3 w-3 mr-1" />}
                        {ticket.status === 'Cerrado' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en la base de conocimiento..."
                className="pl-8"
              />
            </div>
            <Button>Añadir Artículo</Button>
          </div>
          
          <Tabs defaultValue="faqs">
            <TabsList>
              <TabsTrigger value="faqs">Preguntas Frecuentes</TabsTrigger>
              <TabsTrigger value="articles">Artículos</TabsTrigger>
              <TabsTrigger value="tutorials">Tutoriales</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faqs" className="space-y-4 mt-4">
              {mockFAQs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                      <Badge variant="outline">{faq.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{faq.answer}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <X className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="articles" className="mt-4">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay artículos disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">Crea tu primer artículo para la base de conocimiento</p>
                <Button>Añadir Artículo</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-4">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay tutoriales disponibles</h3>
                <p className="text-sm text-muted-foreground mb-4">Crea tu primer tutorial para la base de conocimiento</p>
                <Button>Añadir Tutorial</Button>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulario de Contacto</CardTitle>
                <CardDescription>Envía un mensaje al equipo de soporte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                    <Input id="name" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
                    <Input id="email" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Asunto</label>
                    <Input id="subject" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                    <Textarea id="message" rows={5} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>Canales de comunicación disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Correo Electrónico</h3>
                      <p className="text-sm text-muted-foreground mb-1">Para consultas generales:</p>
                      <p className="text-sm font-medium">soporte@sinfilas.com</p>
                      <p className="text-sm text-muted-foreground mt-2 mb-1">Para asuntos técnicos:</p>
                      <p className="text-sm font-medium">tecnico@sinfilas.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-green-500" />
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-sm text-muted-foreground mb-1">Atención al cliente:</p>
                      <p className="text-sm font-medium">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="h-6 w-6 text-purple-500" />
                    <div>
                      <h3 className="font-medium">Chat en Vivo</h3>
                      <p className="text-sm text-muted-foreground mb-2">Soporte en tiempo real para usuarios registrados</p>
                      <Button variant="outline" size="sm">Iniciar Chat</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Tiempo promedio de respuesta: <span className="font-medium">24 horas</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes Destacadas</CardTitle>
              <CardDescription>Respuestas rápidas a las consultas más comunes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFAQs.slice(0, 3).map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium mb-1">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver Todas las Preguntas Frecuentes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSupport;
