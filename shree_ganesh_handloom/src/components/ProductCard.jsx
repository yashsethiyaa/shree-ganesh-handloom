import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs">
            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-medium line-clamp-1">{product.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-xs sm:text-sm ml-1 text-gray-600">{product.rating}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm sm:text-base text-gray-800 font-semibold">₹{product.price.toFixed(2)}</p>
            <p className="text-xs sm:text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</p>
          </div>
          {product.size && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.size}</p>
          )}
        </div>
      </Link>
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-2 rounded text-xs sm:text-sm hover:bg-gray-800 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;