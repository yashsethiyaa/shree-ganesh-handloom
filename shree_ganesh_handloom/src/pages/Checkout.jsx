import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit',
    upiId: '',
    selectedAddress: '',
    onlineApp: ''
  });

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingRates, setShippingRates] = useState({
    standard: 99,
    express: 199,
    freeShippingThreshold: 999
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= shippingRates.freeShippingThreshold 
    ? 0 
    : shippingRates[shippingMethod];
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const fetchShippingRates = async () => {
      try {
        const response = await fetch('/api/shipping-rates');
        const data = await response.json();
        setShippingRates(data);
      } catch (error) {
        console.error('Error fetching shipping rates:', error);
      }
    };

    fetchShippingRates();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method);
  };

  const handleAddressSelect = (addressId) => {
    const selectedAddress = user.addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setFormData({
        ...formData,
        firstName: selectedAddress.firstName,
        lastName: selectedAddress.lastName,
        address: selectedAddress.address,
        city: selectedAddress.city,
        postalCode: selectedAddress.postalCode,
        selectedAddress: addressId
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      orderId: `ORD-${Date.now()}`,
      items: cart,
      total,
      subtotal,
      shipping,
      shippingMethod,
      tax,
      date: new Date().toISOString()
    };
    
    console.log('Order placed:', orderData);
    clearCart();
    navigate('/order-confirmation', { state: { order: orderData } });
  };

  return (
    <div className="pt-24 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Link to="/cart" className="text-gray-600 hover:text-black">
            ← Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
              {user?.addresses && user.addresses.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Saved Addresses</label>
                  <div className="space-y-2">
                    {user.addresses.map((address) => (
                      <label 
                        key={address.id} 
                        className={`flex items-center p-3 border rounded cursor-pointer ${
                          formData.selectedAddress === address.id ? 'border-black' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="savedAddress"
                          value={address.id}
                          checked={formData.selectedAddress === address.id}
                          onChange={() => handleAddressSelect(address.id)}
                          className="mr-2"
                        />
                        <div>
                          <p className="font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.address}, {address.city}, {address.postalCode}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setUseSavedAddress(false);
                        setFormData({
                          ...formData,
                          selectedAddress: '',
                          firstName: '',
                          lastName: '',
                          address: '',
                          city: '',
                          postalCode: ''
                        });
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Use a different address
                    </button>
                  </div>
                </div>
              )}

              {!formData.selectedAddress && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      required
                      className="w-full p-2 border rounded"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded cursor-pointer ${
                    shippingMethod === 'standard' ? 'border-black' : ''
                  }`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => handleShippingMethodChange(e.target.value)}
                      className="mr-2"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Standard Shipping</span>
                        <span>{subtotal >= shippingRates.freeShippingThreshold ? 'FREE' : `₹${shippingRates.standard}`}</span>
                      </div>
                      <p className="text-sm text-gray-600">Delivery in 5-7 business days</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border rounded cursor-pointer ${
                    shippingMethod === 'express' ? 'border-black' : ''
                  }`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => handleShippingMethodChange(e.target.value)}
                      className="mr-2"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Express Shipping</span>
                        <span>₹{shippingRates.express}</span>
                      </div>
                      <p className="text-sm text-gray-600">Delivery in 1-2 business days</p>
                    </div>
                  </label>
                </div>
                {subtotal >= shippingRates.freeShippingThreshold && (
                  <p className="mt-2 text-sm text-green-600">
                    Your order qualifies for free standard shipping!
                  </p>
                )}
              </div>

              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center p-4 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>UPI</span>
                </label>
                {formData.paymentMethod === 'upi' && (
                  <div className="pl-6">
                    <label className="block text-sm mb-1">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      placeholder="username@bank"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required={formData.paymentMethod === 'upi'}
                    />
                  </div>
                )}
                <label className="flex items-center p-4 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="onlineApps"
                    checked={formData.paymentMethod === 'onlineApps'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Online Payment Apps</span>
                </label>
                {formData.paymentMethod === 'onlineApps' && (
                  <div className="pl-6 grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, onlineApp: 'phonepe' })}
                      className={`p-4 border rounded text-center ${
                        formData.onlineApp === 'phonepe' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <img 
                        src="/images/phonepe-logo.png" 
                        alt="PhonePe" 
                        className="h-8 mx-auto mb-2"
                      />
                      PhonePe
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, onlineApp: 'gpay' })}
                      className={`p-4 border rounded text-center ${
                        formData.onlineApp === 'gpay' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <img 
                        src="/images/gpay-logo.png" 
                        alt="Google Pay" 
                        className="h-8 mx-auto mb-2"
                      />
                      Google Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, onlineApp: 'paytm' })}
                      className={`p-4 border rounded text-center ${
                        formData.onlineApp === 'paytm' ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <img 
                        src="/images/paytm-logo.png" 
                        alt="Paytm" 
                        className="h-8 mx-auto mb-2"
                      />
                      Paytm
                    </button>
                  </div>
                )}
                <label className="flex items-center p-4 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Complete Purchase
            </button>
          </form>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-6 pt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {subtotal >= shippingRates.freeShippingThreshold 
                      ? 'FREE' 
                      : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;