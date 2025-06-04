import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface HotelReport {
  id: string;
  name: string;
  data: ReportData[];
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
}

const Reports: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');

  // Mock data - in a real app, this would come from your API/database
  const hotels = [
    { id: '1', name: 'Grand Plaza Downtown' },
    { id: '2', name: 'Seaside Resort' },
    { id: '3', name: 'Mountain View Lodge' }
  ];

  const generateMockData = (days: number): ReportData[] => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 10000) + 5000,
        expenses: Math.floor(Math.random() * 6000) + 3000,
        profit: 0 // Will be calculated
      };
    }).map(day => ({
      ...day,
      profit: day.revenue - day.expenses
    })).reverse();
  };

  const hotelReports: HotelReport[] = hotels.map(hotel => {
    const data = generateMockData(30);
    return {
      id: hotel.id,
      name: hotel.name,
      data,
      totalRevenue: data.reduce((sum, day) => sum + day.revenue, 0),
      totalExpenses: data.reduce((sum, day) => sum + day.expenses, 0),
      totalProfit: data.reduce((sum, day) => sum + day.profit, 0)
    };
  });

  const combinedData = hotelReports[0].data.map((_, index) => ({
    date: hotelReports[0].data[index].date,
    revenue: hotelReports.reduce((sum, hotel) => sum + hotel.data[index].revenue, 0),
    expenses: hotelReports.reduce((sum, hotel) => sum + hotel.data[index].expenses, 0),
    profit: hotelReports.reduce((sum, hotel) => sum + hotel.data[index].profit, 0)
  }));

  const displayData = selectedHotel === 'all' 
    ? combinedData 
    : hotelReports.find(h => h.id === selectedHotel)?.data || [];

  const totalRevenue = selectedHotel === 'all'
    ? hotelReports.reduce((sum, hotel) => sum + hotel.totalRevenue, 0)
    : hotelReports.find(h => h.id === selectedHotel)?.totalRevenue || 0;

  const totalExpenses = selectedHotel === 'all'
    ? hotelReports.reduce((sum, hotel) => sum + hotel.totalExpenses, 0)
    : hotelReports.find(h => h.id === selectedHotel)?.totalExpenses || 0;

  const totalProfit = selectedHotel === 'all'
    ? hotelReports.reduce((sum, hotel) => sum + hotel.totalProfit, 0)
    : hotelReports.find(h => h.id === selectedHotel)?.totalProfit || 0;

  const handleExport = () => {
    // In a real app, this would generate and download a PDF/Excel file
    console.log('Exporting report...');
  };

  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  // Calculate month-over-month growth
  const currentMonthProfit = displayData.slice(-30).reduce((sum, day) => sum + day.profit, 0);
  const previousMonthProfit = displayData.slice(-60, -30).reduce((sum, day) => sum + day.profit, 0);
  const growthRate = ((currentMonthProfit - previousMonthProfit) / Math.abs(previousMonthProfit) * 100).toFixed(1);

  // Prepare data for revenue breakdown chart
  const revenueBreakdown = hotelReports.map(hotel => ({
    name: hotel.name,
    revenue: hotel.totalRevenue,
    expenses: hotel.totalExpenses,
    profit: hotel.totalProfit
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Track revenue, expenses, and profit across your hotel chain</p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download size={20} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 90 Days</SelectItem>
              <SelectItem value="year">Last 365 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm ${parseFloat(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growthRate}% MoM
              </span>
              <span className="text-sm text-gray-500">Profit Margin: {profitMargin}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown by Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#10B981" />
                  <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                  <Bar dataKey="profit" name="Profit" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed P&L Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Revenue</th>
                  <th className="text-right py-2">Expenses</th>
                  <th className="text-right py-2">Profit</th>
                  <th className="text-right py-2">Margin</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((day, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{day.date}</td>
                    <td className="text-right text-green-600">${day.revenue.toLocaleString()}</td>
                    <td className="text-right text-red-600">${day.expenses.toLocaleString()}</td>
                    <td className="text-right text-blue-600">${day.profit.toLocaleString()}</td>
                    <td className="text-right">
                      {((day.profit / day.revenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;