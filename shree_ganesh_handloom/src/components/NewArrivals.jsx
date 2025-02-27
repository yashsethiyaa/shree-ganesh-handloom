import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: 5,
      name: 'Handloom Silk Scarf',
      price: 55.00,
      mrp: 79.00,
      rating: 4.7,
      reviews: 42,
      image: '/silk-scarf.jpg',
      description: 'Elegant handloom silk scarf with contemporary design'
    },
    {
      id: 6,
      name: 'Traditional Wall Hanging',
      price: 89.00,
      mrp: 129.00,
      rating: 4.9,
      reviews: 36,
      image: '/wall-hanging.jpg',
      description: 'Beautiful traditional wall hanging with intricate patterns'
    },
    {
      id: 7,
      name: 'Modern Table Cloth',
      price: 65.00,
      mrp: 85.00,
      rating: 4.6,
      reviews: 58,
      image: '/table-cloth.jpg',
      description: 'Contemporary table cloth with traditional weaving techniques'
    },
    {
      id: 8,
      name: 'Decorative Pillow Set',
      price: 95.00,
      mrp: 125.00,
      rating: 4.8,
      reviews: 73,
      image: '/pillow-set.jpg',
      description: 'Set of decorative pillows with handwoven covers'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8">New Arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;