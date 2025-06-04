
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingFormProps {
  customerId: string;
  customerName: string;
  onBack: () => void;
  onSave: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ customerId, customerName, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    hotel_id: '',
    room_number: '',
    check_in_date: '',
    check_out_date: '',
    room_charges: '',
    laundry_charges: '',
    room_service_charges: '',
    other_charges: '',
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  const hotels = [
    { id: '1', name: 'Grand Plaza Downtown' },
    { id: '2', name: 'Seaside Resort' },
    { id: '3', name: 'Mountain View Lodge' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const room = parseFloat(formData.room_charges) || 0;
    const laundry = parseFloat(formData.laundry_charges) || 0;
    const roomService = parseFloat(formData.room_service_charges) || 0;
    const other = parseFloat(formData.other_charges) || 0;
    return room + laundry + roomService + other;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const total = calculateTotal();
      
      const bookingData = {
        customer_id: customerId,
        hotel_id: formData.hotel_id,
        room_number: formData.room_number || null,
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date || null,
        room_charges: parseFloat(formData.room_charges) || 0,
        laundry_charges: parseFloat(formData.laundry_charges) || 0,
        room_service_charges: parseFloat(formData.room_service_charges) || 0,
        other_charges: parseFloat(formData.other_charges) || 0,
        total_amount: total,
        status: 'active',
        notes: formData.notes || null
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      console.log('Booking saved successfully');
      onSave();
    } catch (error) {
      console.error('Error saving booking:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Customer
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">New Booking for {customerName}</h2>
          <p className="text-gray-600">Create a new booking and track charges</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hotel_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Hotel *
                </label>
                <select
                  id="hotel_id"
                  name="hotel_id"
                  value={formData.hotel_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a hotel</option>
                  {hotels.map(hotel => (
                    <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number
                </label>
                <input
                  type="text"
                  id="room_number"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 205"
                />
              </div>

              <div>
                <label htmlFor="check_in_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  id="check_in_date"
                  name="check_in_date"
                  value={formData.check_in_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="check_out_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="check_out_date"
                  name="check_out_date"
                  value={formData.check_out_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Charges Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="room_charges" className="block text-sm font-medium text-gray-700 mb-1">
                    Room Charges ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="room_charges"
                    name="room_charges"
                    value={formData.room_charges}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="laundry_charges" className="block text-sm font-medium text-gray-700 mb-1">
                    Laundry Charges ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="laundry_charges"
                    name="laundry_charges"
                    value={formData.laundry_charges}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="room_service_charges" className="block text-sm font-medium text-gray-700 mb-1">
                    Room Service Charges ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="room_service_charges"
                    name="room_service_charges"
                    value={formData.room_service_charges}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="other_charges" className="block text-sm font-medium text-gray-700 mb-1">
                    Other Charges ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="other_charges"
                    name="other_charges"
                    value={formData.other_charges}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes about this booking..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={saving || !formData.hotel_id || !formData.check_in_date}
                className="flex items-center gap-2"
              >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Booking'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
