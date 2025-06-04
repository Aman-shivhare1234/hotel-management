
import React from 'react';
import DashboardStats from './DashboardStats';
import RevenueChart from './RevenueChart';
import HotelList from './HotelList';

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Add New Hotel</div>
              <div className="text-sm text-gray-500">Register a new property</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Generate Report</div>
              <div className="text-sm text-gray-500">Create financial reports</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Manage Employees</div>
              <div className="text-sm text-gray-500">Update staff information</div>
            </button>
          </div>
        </div>
      </div>
      
      <HotelList />
    </div>
  );
};

export default Dashboard;
