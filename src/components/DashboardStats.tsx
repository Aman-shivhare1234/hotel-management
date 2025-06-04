
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Hotel as HotelIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Hotels"
        value={12}
        change={8.5}
        icon={<HotelIcon className="h-6 w-6 text-white" />}
        color="bg-blue-500"
      />
      <StatCard
        title="Daily Revenue"
        value="$24,580"
        change={12.3}
        icon={<DollarSign className="h-6 w-6 text-white" />}
        color="bg-green-500"
      />
      <StatCard
        title="Active Customers"
        value={156}
        change={-2.1}
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-purple-500"
      />
      <StatCard
        title="Total Employees"
        value={48}
        change={5.7}
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-orange-500"
      />
    </div>
  );
};

export default DashboardStats;
