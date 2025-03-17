
import React from 'react';

interface ActivityEntryProps {
  type: 'turn' | 'appointment';
  description: string;
  details: string;
  time: string;
  index: number;
}

const ActivityEntry: React.FC<ActivityEntryProps> = ({ type, description, details, time, index }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'turn' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
          {type === 'turn' ? 'T' : 'C'}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">{description}</p>
          <p className="text-sm text-gray-500">{details}</p>
        </div>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
  );
};

export default ActivityEntry;
