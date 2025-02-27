import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    minPurchase: '',
    validFrom: '',
    validUntil: '',
    maxUses: '',
  });

  const handleAddCoupon = (e) => {
    e.preventDefault();
    setCoupons([
      ...coupons,
      {
        ...newCoupon,
        id: Date.now(),
        status: 'active',
        usedCount: 0,
      },
    ]);
    setNewCoupon({
      code: '',
      discount: '',
      type: 'percentage',
      minPurchase: '',
      validFrom: '',
      validUntil: '',
      maxUses: '',
    });
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Coupons</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Coupon
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Code</th>
                <th className="text-left p-4">Discount</th>
                <th className="text-left p-4">Min Purchase</th>
                <th className="text-left p-4">Valid Until</th>
                <th className="text-left p-4">Uses</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b">
                  <td className="p-4">{coupon.code}</td>
                  <td className="p-4">
                    {coupon.type === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}
                  </td>
                  <td className="p-4">₹{coupon.minPurchase}</td>
                  <td className="p-4">{new Date(coupon.validUntil).toLocaleDateString()}</td>
                  <td className="p-4">{coupon.usedCount}/{coupon.maxUses}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => {
                        setCoupons(coupons.filter(c => c.id !== coupon.id));
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
              <form onSubmit={handleAddCoupon}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full p-2 border rounded"
                    value={newCoupon.code}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })
                    }
                    required
                  />
                  
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      placeholder="Discount"
                      className="w-2/3 p-2 border rounded"
                      value={newCoupon.discount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, discount: e.target.value })
                      }
                      required
                    />
                    <select
                      className="w-1/3 p-2 border rounded"
                      value={newCoupon.type}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, type: e.target.value })
                      }
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₹</option>
                    </select>
                  </div>

                  <input
                    type="number"
                    placeholder="Minimum Purchase Amount"
                    className="w-full p-2 border rounded"
                    value={newCoupon.minPurchase}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, minPurchase: e.target.value })
                    }
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Valid From
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newCoupon.validFrom}
                        onChange={(e) =>
                          setNewCoupon({ ...newCoupon, validFrom: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Valid Until
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newCoupon.validUntil}
                        onChange={(e) =>
                          setNewCoupon({ ...newCoupon, validUntil: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <input
                    type="number"
                    placeholder="Maximum Uses"
                    className="w-full p-2 border rounded"
                    value={newCoupon.maxUses}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, maxUses: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setNewCoupon({
                        code: '',
                        discount: '',
                        type: 'percentage',
                        minPurchase: '',
                        validFrom: '',
                        validUntil: '',
                        maxUses: '',
                      });
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Add Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;