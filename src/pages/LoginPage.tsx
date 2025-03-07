
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USERS } from '@/App';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Check if username/email matches admin
    const user = MOCK_USERS.find(u => 
      (u.username === email || email === 'admin') && 
      u.password === password
    );

    setTimeout(() => {
      setLoading(false);
      
      if (user) {
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo a SinFilas",
        });
        
        // If business user, redirect to dashboard
        if (user.role === 'business') {
          navigate('/dashboard/home');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Credenciales incorrectas. Intenta con admin/admin",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulación de envío de correo
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña",
      });
      setShowForgotPassword(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sinfilas-50 p-4">
      <button onClick={() => navigate('/')} className="flex items-center mb-8 hover:opacity-80 transition-opacity">
        <Clock className="h-8 w-8 text-sinfilas-600" />
        <span className="ml-2 text-2xl font-bold text-sinfilas-600">SinFilas</span>
      </button>
      
      {!showForgotPassword ? (
        <Card className="w-full max-w-md shadow-xl glassmorphism">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle className="text-center">Iniciar Sesión</CardTitle>
                  <CardDescription className="text-center">
                    Ingresa tus datos para acceder a tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Usuario o Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      type="text" 
                      placeholder="admin" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <button 
                        type="button" 
                        className="text-sm text-sinfilas-600 hover:underline"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="admin" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    Usuario predeterminado: admin / Contraseña: admin
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-sinfilas-600 hover:bg-sinfilas-700"
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Iniciar Sesión"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-center">Registro</CardTitle>
                <CardDescription className="text-center">
                  Crea una cuenta nueva para comenzar a usar SinFilas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" type="text" placeholder="Juan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" type="text" placeholder="Pérez" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regEmail">Correo Electrónico</Label>
                  <Input id="regEmail" type="email" placeholder="tu@correo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regPassword">Contraseña</Label>
                  <Input id="regPassword" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-gray-300 text-sinfilas-600 focus:ring-sinfilas-500" required />
                  <Label htmlFor="terms" className="text-sm">
                    Acepto los <button onClick={() => navigate('/terms')} className="text-sinfilas-600 hover:underline">términos y condiciones</button>
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-sinfilas-600 hover:bg-sinfilas-700">
                  Crear Cuenta
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-xl glassmorphism">
          <form onSubmit={handleForgotPassword}>
            <CardHeader>
              <CardTitle className="text-center">Recuperar Contraseña</CardTitle>
              <CardDescription className="text-center">
                Te enviaremos un correo con instrucciones para restablecer tu contraseña
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgotEmail">Correo Electrónico</Label>
                <Input 
                  id="forgotEmail" 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-sinfilas-600 hover:bg-sinfilas-700"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Enviar Correo"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                Volver al inicio de sesión
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      <p className="mt-8 text-center text-gray-500">
        ¿Necesitas ayuda? <button onClick={() => navigate('/contact')} className="text-sinfilas-600 hover:underline">Contáctanos</button>
      </p>
    </div>
  );
};

export default LoginPage;
