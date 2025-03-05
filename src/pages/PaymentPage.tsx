
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Clock, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const query = new URLSearchParams(location.search);
  const plan = query.get('plan') || 'básico';
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Split into groups of 4 and join with spaces
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    
    return formatted.substring(0, 19); // max 16 digits + 3 spaces
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardNumber.length < 19 || !cardName || expiryDate.length < 5 || cvv.length < 3) {
      toast({
        title: "Información incompleta",
        description: "Por favor, completa correctamente todos los campos de la tarjeta.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulación de proceso de pago
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Pago procesado correctamente",
        description: "Tu suscripción ha sido activada.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sinfilas-50 p-4">
      <div className="flex items-center mb-8">
        <Clock className="h-8 w-8 text-sinfilas-600" />
        <span className="ml-2 text-2xl font-bold text-sinfilas-600">SinFilas</span>
      </div>
      
      <div className="w-full max-w-md">
        <Card className="shadow-xl glassmorphism">
          <CardHeader>
            <CardTitle className="text-center">Completar Suscripción</CardTitle>
            <CardDescription className="text-center">
              Estás suscribiéndote al Plan {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de tarjeta</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      className="pl-10"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                  <Input 
                    id="cardName" 
                    placeholder="NOMBRE APELLIDO" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Fecha de caducidad</Label>
                    <Input 
                      id="expiryDate" 
                      placeholder="MM/AA"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md flex items-start mt-4">
                  <CheckCircle className="h-5 w-5 text-sinfilas-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Sin compromiso de permanencia.</span> Puedes cancelar tu suscripción en cualquier momento desde tu panel de control.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>Pago seguro con cifrado SSL</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-sinfilas-600 hover:bg-sinfilas-700"
                disabled={loading}
              >
                {loading ? "Procesando pago..." : "Confirmar Pago"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-sm text-gray-500 text-center mt-2">
              Al confirmar, aceptas los <a href="#" className="text-sinfilas-600 hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-sinfilas-600 hover:underline">Política de Privacidad</a>.
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-4 text-center">
          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
