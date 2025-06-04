
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../features/dashboard/components/Dashboard';
import Hotels from '../features/hotels/components/Hotels';
import Employees from '../features/employees/components/Employees';
import Customers from '../features/customers/components/Customers';
import Expenses from '../features/expenses/components/Expenses';
import Reports from '../features/reports/components/Reports';
import Settings from '../features/settings/components/Settings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'hotels':
        return <Hotels />;
      case 'employees':
        return <Employees />;
      case 'customers':
        return <Customers />;
      case 'expenses':
        return <Expenses />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 p-8 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
