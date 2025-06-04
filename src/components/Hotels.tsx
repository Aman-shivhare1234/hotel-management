
import React, { useState } from 'react';
import { Plus, Search, MapPin, Users, DollarSign, Phone, Mail } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  rooms: number;
  employees: number;
  dailyRevenue: number;
  occupancyRate: number;
  status: 'active' | 'maintenance' | 'closed';
}

const Hotels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const hotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Plaza Downtown',
      location: 'New York, NY',
      address: '123 Broadway St, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'info@grandplaza.com',
      manager: 'Sarah Johnson',
      rooms: 120,
      employees: 15,
      dailyRevenue: 8500,
      occupancyRate: 85,
      status: 'active'
    },
    {
      id: '2',
      name: 'Seaside Resort',
      location: 'Miami, FL',
      address: '456 Ocean Drive, Miami, FL 33139',
      phone: '+1 (555) 987-6543',
      email: 'contact@seasideresort.com',
      manager: 'Michael Chen',
      rooms: 80,
      employees: 12,
      dailyRevenue: 6200,
      occupancyRate: 72,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mountain View Lodge',
      location: 'Denver, CO',
      address: '789 Mountain Rd, Denver, CO 80202',
      phone: '+1 (555) 456-7890',
      email: 'reservations@mountainview.com',
      manager: 'Emily Rodriguez',
      rooms: 45,
      employees: 8,
      dailyRevenue: 4100,
      occupancyRate: 68,
      status: 'maintenance'
    }
  ];

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotels</h1>
          <p className="text-gray-600">Manage your hotel properties</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Hotel
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  {hotel.location}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(hotel.status)}`}>
                {hotel.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Rooms</div>
                  <div className="font-semibold">{hotel.rooms}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Occupancy</div>
                  <div className="font-semibold">{hotel.occupancyRate}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Employees</div>
                  <div className="font-semibold flex items-center">
                    <Users size={14} className="mr-1" />
                    {hotel.employees}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Daily Revenue</div>
                  <div className="font-semibold flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    ${hotel.dailyRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Manager: {hotel.manager}</div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-1" />
                    {hotel.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={14} className="mr-1" />
                    {hotel.email}
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
