
import React from 'react';
import { MapPin, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  customers: number;
  revenue: number;
  profitChange: number;
  employees: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Downtown',
    location: 'New York, NY',
    customers: 45,
    revenue: 8500,
    profitChange: 12.5,
    employees: 15,
    status: 'excellent'
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Miami, FL',
    customers: 38,
    revenue: 6200,
    profitChange: -3.2,
    employees: 12,
    status: 'warning'
  },
  {
    id: '3',
    name: 'Mountain View Lodge',
    location: 'Denver, CO',
    customers: 22,
    revenue: 4100,
    profitChange: 8.7,
    employees: 8,
    status: 'good'
  },
  {
    id: '4',
    name: 'City Center Inn',
    location: 'Chicago, IL',
    customers: 51,
    revenue: 9200,
    profitChange: 15.3,
    employees: 18,
    status: 'excellent'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-green-100 text-green-800';
    case 'good': return 'bg-blue-100 text-blue-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'poor': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const HotelList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Hotel Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hotel.location}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {hotel.customers}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    ${hotel.revenue.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hotel.employees}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {hotel.profitChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      hotel.profitChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {hotel.profitChange >= 0 ? '+' : ''}{hotel.profitChange}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(hotel.status)}`}>
                    {hotel.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelList;
