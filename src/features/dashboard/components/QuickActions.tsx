
import React from 'react';

const QuickActions: React.FC = () => {
  return (
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
  );
};

export default QuickActions;
