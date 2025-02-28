import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const BestSellers = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: 1,
      name: 'Handwoven Cotton Throw',
      price: 75.00,
      mrp: 99.00,
      rating: 4.5,
      reviews: 128,
      image: '/cotton-throw.jpg',
      description: 'Luxurious handwoven cotton throw with traditional patterns'
    },
    {
      id: 2,
      name: 'Artisanal Table Runner',
      price: 45.00,
      mrp: 59.00,
      rating: 4.8,
      reviews: 96,
      image: '/table-runner.jpg',
      description: 'Elegant handcrafted table runner for your dining space'
    },
    {
      id: 3,
      name: 'Designer Cushion Covers',
      price: 35.00,
      mrp: 49.00,
      rating: 4.6,
      reviews: 156,
      image: '/cushion-covers.jpg',
      description: 'Beautiful designer cushion covers with intricate details'
    },
    {
      id: 4,
      name: 'Heritage Bedspread',
      price: 149.00,
      mrp: 199.00,
      rating: 4.9,
      reviews: 84,
      image: '/bedspread.jpg',
      description: 'Traditional heritage bedspread with premium quality'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;