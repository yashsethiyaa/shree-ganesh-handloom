import { useState } from 'react';
import { useCart } from './context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const applyCoupon = (couponCode) => {
    const coupon = availableCoupons.find(c => c.code === couponCode);
    if (!coupon) {
      setDiscountedTotal(null);
      return;
    }

    if (subtotal < coupon.minPurchase) {
      alert(`Minimum purchase amount of ₹${coupon.minPurchase} required for this coupon`);
      setSelectedCoupon('');
      setDiscountedTotal(null);
      return;
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }

    setDiscountedTotal(subtotal - discount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1 ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">₹{item.price}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border rounded"
                          >-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border rounded"
                          >+</button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Apply Coupon</h3>
                  <select
                    value={selectedCoupon}
                    onChange={(e) => {
                      setSelectedCoupon(e.target.value);
                      applyCoupon(e.target.value);
                    }}
                    className="w-full p-2 border rounded focus:ring-black focus:border-black"
                  >
                    <option value="">Select a coupon</option>
                    {availableCoupons.map((coupon) => (
                      <option key={coupon.code} value={coupon.code}>
                        {coupon.code} - {coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discountedTotal !== null && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({selectedCoupon})</span>
                      <span>-₹{(subtotal - discountedTotal).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{(discountedTotal || subtotal).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;