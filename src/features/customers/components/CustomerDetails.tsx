
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Calendar, DollarSign, Users, MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BookingForm from './BookingForm';

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
  room_charges: number;
  laundry_charges: number;
  room_service_charges: number;
  other_charges: number;
  total_amount: number;
  status: string;
  notes: string;
}

interface CustomerDetailsProps {
  customerId: string;
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customerId, onBack }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchCustomerDetails();
    fetchBookings();
  }, [customerId]);

  const fetchCustomerDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      if (error) throw error;
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'checked_out': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = bookings.reduce((sum, booking) => sum + Number(booking.total_amount), 0);
  const activeBookings = bookings.filter(b => b.status === 'active').length;

  if (loading) {
    return <div className="p-6">Loading customer details...</div>;
  }

  if (!customer) {
    return <div className="p-6">Customer not found</div>;
  }

  if (showBookingForm) {
    return (
      <BookingForm
        customerId={customerId}
        customerName={customer.name}
        onBack={() => setShowBookingForm(false)}
        onSave={() => {
          setShowBookingForm(false);
          fetchBookings();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Customers
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
          <p className="text-gray-600">Customer details and booking history</p>
        </div>
        <Button onClick={() => setShowBookingForm(true)} className="flex items-center gap-2">
          <Plus size={20} />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Name</div>
              <div className="font-medium">{customer.name}</div>
            </div>
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{customer.email}</div>
                </div>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{customer.phone}</div>
                </div>
              </div>
            )}
            {customer.address && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{customer.address}</div>
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-500">Customer Since</div>
              <div className="font-medium">
                {new Date(customer.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{activeBookings}</div>
                <div className="text-sm text-gray-500">Active Bookings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={20} />
              Revenue Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Revenue Generated</div>
            {bookings.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Avg per booking: ${(totalRevenue / bookings.length).toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.hotel_id}</TableCell>
                    <TableCell>{booking.room_number || 'N/A'}</TableCell>
                    <TableCell>{new Date(booking.check_in_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {booking.check_out_date 
                        ? new Date(booking.check_out_date).toLocaleDateString() 
                        : 'Ongoing'
                      }
                    </TableCell>
                    <TableCell>${booking.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">This customer hasn't made any bookings</p>
              <Button onClick={() => setShowBookingForm(true)}>Create First Booking</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;
