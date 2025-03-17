
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs: FAQ[];
  searchTerm: string;
  onContactSupportClick: () => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, searchTerm, onContactSupportClick }) => {
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
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
            onClick={onContactSupportClick}
          >
            Contactar Soporte
          </Button>
        </div>
      )}
    </>
  );
};

export default FAQList;
