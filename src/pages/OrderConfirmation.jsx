import { useLocation, Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/solid';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="pt-24 px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl">No order information found.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
            <p className="text-gray-600">
              Order #{order.orderId} has been successfully placed
            </p>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <h2 className="font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Order Date:</p>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Payment Method:</p>
                <p>{order.paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Shipping Address:</p>
                <p>{order.firstName} {order.lastName}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.postalCode}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-4">Items Ordered</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} | Size: {item.size}
                    </p>
                  </div>
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Link
              to="/"
              className="text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="text-gray-600 hover:text-black"
            >
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;