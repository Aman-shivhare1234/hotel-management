import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Expense {
  id: string;
  hotelId: string;
  hotelName: string;
  category: 'salary' | 'utility' | 'maintenance' | 'supplies' | 'other';
  amount: number;
  date: string;
  description: string;
}

const Expenses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Mock data - in a real app, this would come from your database
  const expenses: Expense[] = [
    {
      id: '1',
      hotelId: '1',
      hotelName: 'Grand Plaza Downtown',
      category: 'salary',
      amount: 25000,
      date: '2024-03-15',
      description: 'Staff salaries for March'
    },
    {
      id: '2',
      hotelId: '1',
      hotelName: 'Grand Plaza Downtown',
      category: 'utility',
      amount: 8500,
      date: '2024-03-15',
      description: 'Electricity and water bills'
    },
    {
      id: '3',
      hotelId: '2',
      hotelName: 'Seaside Resort',
      category: 'maintenance',
      amount: 3200,
      date: '2024-03-14',
      description: 'HVAC system maintenance'
    },
    {
      id: '4',
      hotelId: '2',
      hotelName: 'Seaside Resort',
      category: 'supplies',
      amount: 1500,
      date: '2024-03-14',
      description: 'Cleaning supplies'
    }
  ];

  const hotels = [
    { id: '1', name: 'Grand Plaza Downtown' },
    { id: '2', name: 'Seaside Resort' },
    { id: '3', name: 'Mountain View Lodge' }
  ];

  const categories = [
    { id: 'salary', name: 'Salaries' },
    { id: 'utility', name: 'Utilities' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'supplies', name: 'Supplies' },
    { id: 'other', name: 'Other' }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHotel = selectedHotel === 'all' || expense.hotelId === selectedHotel;
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    
    return matchesSearch && matchesHotel && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'salary': return 'bg-blue-100 text-blue-800';
      case 'utility': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'supplies': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = categories.map(category => ({
    ...category,
    total: filteredExpenses
      .filter(e => e.category === category.id)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track and manage hotel expenses</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${totalExpenses.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <Select value={selectedHotel} onValueChange={setSelectedHotel}>
            <SelectTrigger>
              <SelectValue placeholder="Select Hotel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hotels</SelectItem>
              {hotels.map(hotel => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          <Select value={dateRange} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setDateRange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">{expense.hotelName}</div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                          {categories.find(c => c.id === expense.category)?.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{expense.description}</div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center font-medium">
                          <DollarSign size={14} className="mr-1" />
                          {expense.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expensesByCategory.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">{category.name}</span>
                      <span className="text-sm font-medium">${category.total.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{
                          width: `${(category.total / totalExpenses) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Expenses;