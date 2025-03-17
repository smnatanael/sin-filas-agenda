
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
