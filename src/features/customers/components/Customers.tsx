
import React, { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails';

type View = 'list' | 'form' | 'details';

const Customers: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentView('details');
  };

  const handleAddCustomer = () => {
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCustomerId(null);
  };

  const handleSaveCustomer = () => {
    setCurrentView('list');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'form':
        return (
          <CustomerForm
            onBack={handleBackToList}
            onSave={handleSaveCustomer}
          />
        );
      case 'details':
        return selectedCustomerId ? (
          <CustomerDetails
            customerId={selectedCustomerId}
            onBack={handleBackToList}
          />
        ) : null;
      default:
        return (
          <CustomerList
            onSelectCustomer={handleSelectCustomer}
            onAddCustomer={handleAddCustomer}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderCurrentView()}
    </div>
  );
};

export default Customers;
