import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import Cart from '../cart';
import { FaUser } from 'react-icons/fa';
import Logo from '../Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSearch, suggestions, setSuggestions } = useSearch();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/collections?search=${encodeURIComponent(localSearch)}`);
      setLocalSearch('');
      setSuggestions([]);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="logo">
                <Logo />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/collections" className="nav-link">Collections</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 mr-6">
              <div className="flex items-center">
                <form onSubmit={onSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => {
                      setLocalSearch(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    placeholder="Search..."
                    className="search-input px-4 py-1 rounded-lg pr-8"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <SearchIcon className="h-5 w-5 text-gray-500 hover:text-orange-500" />
                  </button>

                  {suggestions.length > 0 && localSearch && (
                    <div className="absolute mt-1 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      {suggestions.map((product) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                            setLocalSearch('');
                            setSuggestions([]);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCartIcon className="cart-icon h-6 w-6 text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <Link 
                to="/signin" 
                state={{ from: location.pathname }}
                className="hover:text-gray-600"
              >
                <FaUser className="h-6 w-6 text-gray-700" />
              </Link>
            </div>

            <div className="md:hidden flex items-center mr-4">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <XIcon className="h-6 w-6 text-gray-700 hover:text-orange-500" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-gray-700 hover:text-orange-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu md:hidden">
            <div className="px-4 pt-2 pb-3 space-y-2">
              <Link to="/" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/collections" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Collections</Link>
              <Link to="/about" className="block nav-link py-2" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link to="/contact" className="block nav-link py-2" onClick={() => setIsOpen(false)}>Contact</Link>
              
              <Link 
                to="/signin" 
                state={{ from: location.pathname }}
                className="block nav-link py-2" 
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <FaUser className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </div>
              </Link>
              
              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setIsOpen(false);
                }}
                className="w-full text-left nav-link py-2"
              >
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </button>
              
              <form onSubmit={onSearchSubmit} className="relative py-2">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-lg pr-8"
                />
                <button 
                  type="submit" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <SearchIcon className="h-5 w-5 text-gray-500 hover:text-orange-500" />
                </button>

                {suggestions.length > 0 && localSearch && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setLocalSearch('');
                          setSuggestions([]);
                          setIsOpen(false);
                        }}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </nav>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;