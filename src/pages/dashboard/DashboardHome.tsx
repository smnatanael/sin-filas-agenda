
import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const DashboardHome: React.FC = () => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total de Turnos Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">32</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">+12% vs ayer</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tiempo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">15 min</span>
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">+3 min vs ayer</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Citas Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">12</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">+4 vs ayer</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Distribución de Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Actividad Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md mb-8">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    {index % 2 === 0 ? 'T' : 'C'}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {index % 2 === 0 ? 'Nuevo turno registrado' : 'Nueva cita agendada'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {index % 2 === 0 ? 'Cliente #12345' : 'Juan Pérez - Servicio Premium'}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Hace {index + 1} {index === 0 ? 'minuto' : 'minutos'}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
