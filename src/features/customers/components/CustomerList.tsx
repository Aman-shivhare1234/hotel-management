
import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Calendar, DollarSign, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

interface Booking {
  id: string;
  customer_id: string;
  hotel_id: string;
  room_number: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  status: string;
}

interface CustomerListProps {
  onSelectCustomer: (customerId: string) => void;
  onAddCustomer: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onSelectCustomer, onAddCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
    fetchBookings();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*');

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerStats = (customerId: string) => {
    const customerBookings = bookings.filter(b => b.customer_id === customerId);
    const totalRevenue = customerBookings.reduce((sum, booking) => sum + Number(booking.total_amount), 0);
    const activeBookings = customerBookings.filter(b => b.status === 'active').length;
    
    return {
      totalBookings: customerBookings.length,
      totalRevenue,
      activeBookings
    };
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (loading) {
    return <div className="p-6">Loading customers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage customer bookings and track revenue</p>
        </div>
        <Button onClick={onAddCustomer} className="flex items-center gap-2">
          <Plus size={20} />
          Add Customer
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search customers by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const stats = getCustomerStats(customer.id);
          return (
            <Card key={customer.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelectCustomer(customer.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    {customer.name}
                  </CardTitle>
                  {stats.activeBookings > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1 mb-1">
                    <span>📧</span>
                    {customer.email || 'No email'}
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <span>📞</span>
                    {customer.phone || 'No phone'}
                  </div>
                  {customer.address && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {customer.address}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500">Total Bookings</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Calendar size={14} />
                      {stats.totalBookings}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Revenue</div>
                    <div className="font-semibold flex items-center gap-1">
                      <DollarSign size={14} />
                      ${stats.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-3" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first customer'}
          </p>
          {!searchTerm && (
            <Button onClick={onAddCustomer}>Add First Customer</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
