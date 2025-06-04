
import React from 'react';
import DashboardStats from './DashboardStats';
import RevenueChart from './RevenueChart';
import QuickActions from './QuickActions';
import { HotelList } from '../../hotels/components/HotelList';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your hotel chain performance</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <QuickActions />
      </div>
      
      <HotelList />
    </div>
  );
};

export default Dashboard;
