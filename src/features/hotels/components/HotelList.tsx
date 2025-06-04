
import React from 'react';
import { MapPin, Users, DollarSign } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  dailyRevenue: number;
  occupancyRate: number;
  status: 'active' | 'maintenance' | 'closed';
}

export const HotelList: React.FC = () => {
  const recentHotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Plaza Downtown',
      location: 'New York, NY',
      dailyRevenue: 8500,
      occupancyRate: 85,
      status: 'active'
    },
    {
      id: '2',
      name: 'Seaside Resort',
      location: 'Miami, FL',
      dailyRevenue: 6200,
      occupancyRate: 72,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mountain View Lodge',
      location: 'Denver, CO',
      dailyRevenue: 4100,
      occupancyRate: 68,
      status: 'maintenance'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hotels Performance</h3>
      <div className="space-y-4">
        {recentHotels.map((hotel) => (
          <div key={hotel.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900">{hotel.name}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(hotel.status)}`}>
                  {hotel.status}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin size={14} className="mr-1" />
                {hotel.location}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center text-gray-600">
                  <DollarSign size={14} className="mr-1" />
                  ${hotel.dailyRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Daily Revenue</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{hotel.occupancyRate}%</div>
                <div className="text-xs text-gray-500">Occupancy</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
