
export interface Establishment {
  name: string;
  logo: string;
  cover: string;
  location: string;
  phone: string;
  description: string;
  hours: string;
  services: string[];
  currentTicket: string;
  averageServiceTime: number;
}

export const establishmentData: Record<string, Establishment> = {
  'barberia-x': {
    name: 'Barbería X',
    logo: 'https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1589421333492-81506411c533?q=80&w=1500',
    location: 'Centro Comercial Plaza, Local 23',
    phone: '+58 123 456 7890',
    description: 'Barbería moderna especializada en cortes de cabello y arreglo de barba con estilo contemporáneo.',
    hours: 'Lun - Sáb: 9AM - 8PM',
    services: ['Corte de cabello', 'Arreglo de barba', 'Afeitado clásico', 'Tratamientos capilares'],
    currentTicket: 'B12',
    averageServiceTime: 15
  },
  'salon-salome': {
    name: 'Salón Salomé',
    logo: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1500',
    location: 'Av. Principal 456',
    phone: '+58 987 654 3210',
    description: 'Salón de belleza con servicios completos para el cuidado del cabello, uñas y tratamientos faciales.',
    hours: 'Lun - Sáb: 10AM - 7PM',
    services: ['Corte y peinado', 'Coloración', 'Manicure y pedicure', 'Tratamientos faciales'],
    currentTicket: 'S09',
    averageServiceTime: 30
  },
  'pizzas-xxl': {
    name: 'Pizzas XXL',
    logo: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1500',
    location: 'Calle Italiana 789',
    phone: '+58 111 222 3333',
    description: 'Pizzería especializada en pizzas extragrandes con ingredientes frescos y hornos tradicionales.',
    hours: 'Lun - Dom: 11AM - 11PM',
    services: ['Pizza para llevar', 'Entrega a domicilio', 'Ordenes para fiestas', 'Especialidades italianas'],
    currentTicket: 'P15',
    averageServiceTime: 10
  },
  'comedor-guillermo': {
    name: 'Comedor Guillermo',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500',
    location: 'Plaza Central 234',
    phone: '+58 444 555 6666',
    description: 'Comedor tradicional con platillos caseros preparados al momento y ambiente familiar.',
    hours: 'Lun - Vie: 7AM - 4PM',
    services: ['Desayunos', 'Almuerzos', 'Platos para llevar', 'Menú ejecutivo'],
    currentTicket: 'C08',
    averageServiceTime: 8
  },
  'farmacia-carol': {
    name: 'Farmacia Carol',
    logo: 'https://images.unsplash.com/photo-1567850083672-fff8fdcfc1e7?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1567850083672-fff8fdcfc1e7?q=80&w=1500',
    location: 'Av. Salud 567',
    phone: '+58 777 888 9999',
    description: 'Farmacia con amplio surtido de medicamentos, productos de cuidado personal y asesoría farmacéutica.',
    hours: 'Lun - Dom: 24 horas',
    services: ['Medicamentos con receta', 'Productos OTC', 'Inyecciones', 'Consultas rápidas'],
    currentTicket: 'F05',
    averageServiceTime: 5
  },
  'ginecostetra-xy': {
    name: 'Consultorio Ginecostetra XY',
    logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=500',
    cover: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1500',
    location: 'Centro Médico Especialidades, Piso 3',
    phone: '+58 333 444 5555',
    description: 'Consulta ginecológica con enfoque en salud integral de la mujer y atención prenatal.',
    hours: 'Lun - Vie: 8AM - 5PM',
    services: ['Consulta ginecológica', 'Control prenatal', 'Ultrasonidos', 'Papanicolaou'],
    currentTicket: 'G07',
    averageServiceTime: 25
  }
};
