import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, type: 'percentage' },
    { code: 'SAVE20', discount: 20, type: 'percentage' },
    { code: 'FLAT50', discount: 50, type: 'fixed' }
  ];

  useEffect(() => {
    const existingItem = cart.find(item => item.id === parseInt(id));
    if (existingItem?.couponApplied) {
      setCouponApplied(true);
    }
  }, [cart, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const productData = {
            id: parseInt(id),
            name: 'Handwoven Cotton Throw',
            price: 75.00,
            mrp: 99.00,
            rating: 4.7,
            description: 'Luxurious handwoven cotton throw with traditional patterns',
            images: [
              '/images/products/IMG@1x.jpg',
              '/cotton-throw-2.jpg',
              '/cotton-throw-3.jpg',
              '/cotton-throw-4.jpg'
            ],
            category: 'Bedsheets',
            reviews: [
              { id: 1, user: "John D.", rating: 5, comment: "Excellent quality!", date: "2024-01-15" },
              { id: 2, user: "Sarah M.", rating: 4, comment: "Very comfortable material", date: "2024-01-10" }
            ],
            sizes: {
              "Bedsheets": ["Single Bed", "Double Bed", "King Size"],
              "Curtains": ["7ft x 4ft", "8ft x 4ft", "9ft x 4ft"],
              "Rugs": ["4ft x 6ft", "6ft x 8ft", "8ft x 10ft"],
              "Table Linens": ["4 seater", "6 seater", "8 seater"]
            }
          };
          setProduct(productData);
          setReviews(productData.reviews);
          if (productData.sizes[productData.category]) {
            setSelectedSize(productData.sizes[productData.category][0]);
          }
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const applyCoupon = (couponCode) => {
    if (!couponCode) {
      setDiscountedPrice(null);
      setSelectedCoupon('');
      return;
    }

    if (couponApplied) {
      alert('A coupon has already been applied to this item in your cart');
      setSelectedCoupon('');
      return;
    }

    const coupon = availableCoupons.find(c => c.code === couponCode);
    if (!coupon) {
      setDiscountedPrice(null);
      return;
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (product.price * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }

    setDiscountedPrice(product.price - discount);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: discountedPrice || product.price,
      image: product.images[selectedImage],
      size: selectedSize,
      couponApplied: !!discountedPrice,
      appliedCoupon: selectedCoupon || null
    }, quantity);
  };

  const handleAddReview = () => {
    if (newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        user: "Guest User",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Product not found</p>
    </div>
  );

  return (
    <div className="pt-24 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

        
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
      
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-xl ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
                <span className="ml-2 text-gray-600">{product.rating}</span>
              </div>
              <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
            </div>

      
            <div className="mb-6">
              {discountedPrice !== null ? (
                <div>
                  <span className="text-2xl font-bold">₹{discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-gray-500 line-through">₹{product.mrp.toFixed(2)}</span>
                  <span className="ml-2 text-green-600">({selectedCoupon} applied)</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold">₹{product.price.toFixed(2)}</p>
                  <p className="text-gray-500 line-through">₹{product.mrp.toFixed(2)}</p>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

          
            {product.sizes[product.category] && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes[product.category].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

        
            <div className="mb-6">
              <h3 className="font-medium mb-2">Apply Coupon</h3>
              <div className="flex space-x-2">
                <select
                  value={selectedCoupon}
                  onChange={(e) => {
                    setSelectedCoupon(e.target.value);
                    applyCoupon(e.target.value);
                  }}
                  className="flex-1 p-2 border rounded focus:ring-black focus:border-black"
                  disabled={couponApplied}
                >
                  <option value="">Select a coupon</option>
                  {availableCoupons.map((coupon) => (
                    <option key={coupon.code} value={coupon.code}>
                      {coupon.code} - {coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                    </option>
                  ))}
                </select>
              </div>
              {couponApplied && (
                <p className="text-red-500 text-sm mt-2">
                  A coupon has already been applied to this item in your cart
                </p>
              )}
            </div>

            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border-r"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border-l"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

  
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-8">Customer Reviews</h2>
          
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                    className={`text-2xl ${index < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your thoughts about this product..."
              className="w-full p-4 border rounded-lg focus:outline-none focus:border-black mb-4"
              rows="4"
            />
            <button
              onClick={handleAddReview}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Submit Review
            </button>
          </div>

      
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-sm ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;