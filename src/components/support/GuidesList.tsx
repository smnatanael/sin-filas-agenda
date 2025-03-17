
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Guide {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface GuidesListProps {
  guides: Guide[];
}

const GuidesList: React.FC<GuidesListProps> = ({ guides }) => {
  return (
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
  );
};

export default GuidesList;
