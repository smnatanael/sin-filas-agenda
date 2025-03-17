
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType = 'positive' }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {change && (
            <span className={`text-sm ${changeType === 'positive' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'} px-2 py-1 rounded`}>
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
