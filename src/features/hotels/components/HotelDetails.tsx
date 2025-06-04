
import React, { useState } from 'react';
import { ArrowLeft, MapPin, User, Building, Users, DollarSign, TrendingUp, TrendingDown, Calendar, Phone, Mail } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface HotelDetailsProps {
  hotelId: string;
  onBack: () => void;
}

interface ExpenseCategory {
  category: string;
  amount: number;
  color: string;
}

interface DailyData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotelId, onBack }) => {
  // Mock data - in real app, this would come from API/database
  const hotelData = {
    id: '1',
    name: 'Grand Plaza Downtown',
    location: 'New York, NY',
    address: '123 Broadway St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@grandplaza.com',
    manager: 'Sarah Johnson',
    rooms: 120,
    employees: 15,
    occupancyRate: 85,
    status: 'active'
  };

  const customerData = {
    dailyCount: 102,
    totalBookings: 450,
    checkInsToday: 25,
    checkOutsToday: 18,
    servicesUsed: {
      laundry: 35,
      roomService: 67,
      spa: 12,
      restaurant: 89
    }
  };

  const expenseBreakdown: ExpenseCategory[] = [
    { category: 'Employee Salaries', amount: 25000, color: '#3B82F6' },
    { category: 'Laundry Charges', amount: 3500, color: '#10B981' },
    { category: 'Room Service', amount: 4200, color: '#F59E0B' },
    { category: 'Utilities', amount: 8000, color: '#EF4444' },
    { category: 'Maintenance', amount: 2800, color: '#8B5CF6' },
    { category: 'Other Expenses', amount: 1500, color: '#6B7280' }
  ];

  const dailyProfitData: DailyData[] = [
    { date: '2024-01-01', revenue: 12000, expenses: 8500, profit: 3500 },
    { date: '2024-01-02', revenue: 11500, expenses: 8200, profit: 3300 },
    { date: '2024-01-03', revenue: 13200, expenses: 9100, profit: 4100 },
    { date: '2024-01-04', revenue: 10800, expenses: 7900, profit: 2900 },
    { date: '2024-01-05', revenue: 14500, expenses: 9800, profit: 4700 },
    { date: '2024-01-06', revenue: 13800, expenses: 9200, profit: 4600 },
    { date: '2024-01-07', revenue: 12500, expenses: 8600, profit: 3900 }
  ];

  const totalRevenue = dailyProfitData.reduce((sum, day) => sum + day.revenue, 0);
  const totalExpenses = dailyProfitData.reduce((sum, day) => sum + day.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{hotelData.name}</h1>
          <p className="text-gray-600">Hotel Details & Analytics</p>
        </div>
      </div>

      {/* General Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{hotelData.location}</div>
                <div className="text-sm text-gray-600">{hotelData.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{hotelData.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{hotelData.email}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Manager</div>
                <div className="font-medium">{hotelData.manager}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Total Rooms</div>
                <div className="font-medium">{hotelData.rooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-gray-400" size={20} />
              <div>
                <div className="text-sm text-gray-500">Employees</div>
                <div className="font-medium">{hotelData.employees}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Occupancy Rate</div>
              <div className="font-medium text-2xl text-blue-600">{hotelData.occupancyRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${hotelData.occupancyRate}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {hotelData.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{customerData.dailyCount}</div>
            <div className="text-sm text-gray-600">Customers Today</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{customerData.checkInsToday}</div>
            <div className="text-sm text-gray-600">Check-ins Today</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{customerData.checkOutsToday}</div>
            <div className="text-sm text-gray-600">Check-outs Today</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{customerData.totalBookings}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Services Used Today</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Laundry</span>
              <span className="font-medium">{customerData.servicesUsed.laundry}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Room Service</span>
              <span className="font-medium">{customerData.servicesUsed.roomService}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Spa</span>
              <span className="font-medium">{customerData.servicesUsed.spa}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Restaurant</span>
              <span className="font-medium">{customerData.servicesUsed.restaurant}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {expenseBreakdown.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: expense.color }}
                  ></div>
                  <span className="text-sm font-medium">{expense.category}</span>
                </div>
                <span className="font-semibold">${expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total Expenses</span>
              <span className="font-bold text-lg">
                ${expenseBreakdown.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="amount"
                label={({ category, value }) => `${category}: $${value.toLocaleString()}`}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit and Loss */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profit & Loss Analysis</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Expenses</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              {totalProfit >= 0 ? (
                <TrendingUp className="text-blue-600" size={20} />
              ) : (
                <TrendingDown className="text-red-600" size={20} />
              )}
              <div className={`text-xl font-bold ${totalProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ${Math.abs(totalProfit).toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-gray-600">Net Profit</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">{profitMargin}%</div>
            <div className="text-sm text-gray-600">Profit Margin</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyProfitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-right">Revenue</th>
                <th className="px-4 py-2 text-right">Expenses</th>
                <th className="px-4 py-2 text-right">Profit/Loss</th>
                <th className="px-4 py-2 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dailyProfitData.map((day, index) => {
                const margin = ((day.profit / day.revenue) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(day.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-right text-green-600 font-medium">
                      ${day.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-red-600 font-medium">
                      ${day.expenses.toLocaleString()}
                    </td>
                    <td className={`px-4 py-2 text-right font-medium ${
                      day.profit >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      ${day.profit.toLocaleString()}
                    </td>
                    <td className={`px-4 py-2 text-right font-medium ${
                      parseFloat(margin) >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {margin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
