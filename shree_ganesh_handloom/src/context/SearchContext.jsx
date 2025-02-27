import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Premium Cotton Bedsheet',
      price: 129.99,
      size: 'Single Bed',
      image: '/images/bedsheet-premium.jpg',
      description: 'Hand-woven luxury bedsheet',
      category: 'Bedsheets'
    },
    {
      id: 2,
      name: 'Silk Blend Curtain',
      price: 199.99,
      size: 'Double Bed',
      image: '/images/curtain-silk.jpg',
      description: 'Elegant silk blend curtains',
      category: 'Curtains'
    },
    {
      id: 3,
      name: 'Handcrafted Area Rug',
      price: 299.99,
      size: 'King Size',
      image: '/images/rug-traditional.jpg',
      description: 'Traditional pattern rug',
      category: 'Rugs'
    },
    {
      id: 4,
      name: 'Table Runner Set',
      price: 89.99,
      size: 'Single Bed',
      image: '/images/table-runner.jpg',
      description: 'Decorative table runner',
      category: 'Table Linens'
    },
    {
      id: 5,
      name: 'Designer Bedsheet Set',
      price: 159.99,
      size: 'King Size',
      image: '/images/bedsheet-designer.jpg',
      description: 'Premium designer bedsheet set',
      category: 'Bedsheets'
    },
    {
      id: 6,
      name: 'Sheer Curtain Panel',
      price: 149.99,
      size: 'Double Bed',
      image: '/images/curtain-sheer.jpg',
      description: 'Light and airy sheer curtains',
      category: 'Curtains'
    },
    {
      id: 7,
      name: 'Handwoven Carpet',
      price: 399.99,
      size: 'King Size',
      image: '/images/carpet-handwoven.jpg',
      description: 'Artisanal handwoven carpet',
      category: 'Rugs'
    },
    {
      id: 8,
      name: 'Dining Table Set',
      price: 119.99,
      size: 'Double Bed',
      image: '/images/table-set.jpg',
      description: 'Complete dining table linen set',
      category: 'Table Linens'
    },
    {
      id: 9,
      name: 'Luxury King Bedsheet',
      price: 189.99,
      size: 'King Size',
      image: '/images/bedsheet-luxury.jpg',
      description: 'Premium quality king size bedsheet',
      category: 'Bedsheets'
    },
    {
      id: 10,
      name: 'Designer Curtains',
      price: 249.99,
      size: 'Double Bed',
      image: '/images/curtain-designer.jpg',
      description: 'Elegant designer curtains',
      category: 'Curtains'
    },
    {
      id: 11,
      name: 'Persian Style Rug',
      price: 449.99,
      size: 'King Size',
      image: '/images/rug-persian.jpg',
      description: 'Traditional Persian style rug',
      category: 'Rugs'
    },
    {
      id: 12,
      name: 'Festive Table Set',
      price: 139.99,
      size: 'Single Bed',
      image: '/images/table-festive.jpg',
      description: 'Complete festive table set',
      category: 'Table Linens'
    },
    {
      id: 13,
      name: 'Classic Bedsheet Set',
      price: 169.99,
      size: 'Double Bed',
      image: '/images/bedsheet-classic.jpg',
      description: 'Classic pattern bedsheet set',
      category: 'Bedsheets'
    },
    {
      id: 14,
      name: 'Modern Curtain Panels',
      price: 179.99,
      size: 'King Size',
      image: '/images/curtain-modern.jpg',
      description: 'Contemporary curtain panels',
      category: 'Curtains'
    },
    {
      id: 15,
      name: 'Geometric Rug',
      price: 349.99,
      size: 'Double Bed',
      image: '/images/rug-geometric.jpg',
      description: 'Modern geometric pattern rug',
      category: 'Rugs'
    },
    {
      id: 16,
      name: 'Premium Table Runner',
      price: 99.99,
      size: 'Single Bed',
      image: '/images/table-premium.jpg',
      description: 'Premium quality table runner',
      category: 'Table Linens'
    }
  ];

  const getSuggestions = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 5);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSuggestions(getSuggestions(query));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      suggestions, 
      handleSearch,
      setSuggestions,
      products 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchContext;