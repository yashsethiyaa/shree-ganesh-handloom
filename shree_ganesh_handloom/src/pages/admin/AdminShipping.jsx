import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminShipping = () => {
  const [shippingRates, setShippingRates] = useState({
    standard: 99,
    express: 199,
    freeShippingThreshold: 999,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedRates, setEditedRates] = useState({ ...shippingRates });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRates(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShippingRates(editedRates);
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Shipping Charges Management</h1>
          
          <div className="bg-white rounded-lg shadow p-6">
            {!isEditing ? (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Standard Shipping</h3>
                      <p className="text-sm text-gray-600">Regular delivery (3-5 business days)</p>
                    </div>
                    <p className="text-lg">₹{shippingRates.standard}</p>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Express Shipping</h3>
                      <p className="text-sm text-gray-600">Fast delivery (1-2 business days)</p>
                    </div>
                    <p className="text-lg">₹{shippingRates.express}</p>
                  </div>

                  <div className="flex justify-between items-center pb-4">
                    <div>
                      <h3 className="font-medium">Free Shipping Threshold</h3>
                      <p className="text-sm text-gray-600">Orders above this amount qualify for free shipping</p>
                    </div>
                    <p className="text-lg">₹{shippingRates.freeShippingThreshold}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Edit Rates
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Standard Shipping Rate (₹)
                  </label>
                  <input
                    type="number"
                    name="standard"
                    value={editedRates.standard}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Express Shipping Rate (₹)
                  </label>
                  <input
                    type="number"
                    name="express"
                    value={editedRates.express}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    name="freeShippingThreshold"
                    value={editedRates.freeShippingThreshold}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="0"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedRates({ ...shippingRates });
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShipping;