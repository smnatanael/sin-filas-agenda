
import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard-home/StatCard';
import ChartContainer from '@/components/dashboard-home/ChartContainer';
import ActivityEntry from '@/components/dashboard-home/ActivityEntry';

const pieData = [
  { name: 'Turnos completados', value: 24 },
  { name: 'Turnos en espera', value: 8 },
  { name: 'Citas para hoy', value: 12 },
];

const lineData = [
  { name: 'Lun', turnos: 12, citas: 8 },
  { name: 'Mar', turnos: 19, citas: 9 },
  { name: 'Mie', turnos: 15, citas: 10 },
  { name: 'Jue', turnos: 22, citas: 12 },
  { name: 'Vie', turnos: 32, citas: 15 },
  { name: 'Sab', turnos: 28, citas: 14 },
  { name: 'Dom', turnos: 10, citas: 5 },
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

const recentActivities = [
  { type: 'turn', description: 'Nuevo turno registrado', details: 'Cliente #12345', time: 'Hace 1 minuto' },
  { type: 'appointment', description: 'Nueva cita agendada', details: 'Juan Pérez - Servicio Premium', time: 'Hace 2 minutos' },
  { type: 'turn', description: 'Nuevo turno registrado', details: 'Cliente #12346', time: 'Hace 3 minutos' },
  { type: 'appointment', description: 'Nueva cita agendada', details: 'María López - Servicio Básico', time: 'Hace 4 minutos' },
  { type: 'turn', description: 'Nuevo turno registrado', details: 'Cliente #12347', time: 'Hace 5 minutos' },
];

const DashboardHome: React.FC = () => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total de Turnos Hoy" 
          value="32" 
          change="+12% vs ayer" 
          changeType="positive" 
        />
        
        <StatCard 
          title="Tiempo Promedio" 
          value="15 min" 
          change="+3 min vs ayer" 
          changeType="negative" 
        />
        
        <StatCard 
          title="Citas Agendadas" 
          value="12" 
          change="+4 vs ayer" 
          changeType="positive" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="Distribución de Turnos">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <ChartContainer title="Actividad Semanal">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="turnos" stroke="#0088FE" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="citas" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <Card className="shadow-md mb-8">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <ActivityEntry
                key={index}
                type={activity.type as 'turn' | 'appointment'}
                description={activity.description}
                details={activity.details}
                time={activity.time}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
