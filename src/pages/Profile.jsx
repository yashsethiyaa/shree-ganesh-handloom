import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              defaultValue="JohnDoe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              rows="3"
              defaultValue="123 Main Street, Apt 4B&#10;New York, NY 10001"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Contact Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="johndoe@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Delivery Location</label>
            <div className="bg-gray-200 h-48 rounded-lg"></div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">My Orders</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Order #12345</div>
                  <div className="text-sm text-gray-600">Placed on: 2024-01-15</div>
                </div>
                <span className="text-green-600">Delivered</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Order #12346</div>
                  <div className="text-sm text-gray-600">Placed on: 2024-01-20</div>
                </div>
                <span className="text-blue-600">In Transit</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;