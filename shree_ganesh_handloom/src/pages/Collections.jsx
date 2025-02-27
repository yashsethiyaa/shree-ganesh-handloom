import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import ProductCard from '../components/ProductCard';

const Collections = () => {
  const [searchParams] = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryParam = searchParams.get('category');
    return categoryParam ? 
      categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) 
      : "All";
  });

  const [sortBy, setSortBy] = useState("default");
  const [filterSize, setFilterSize] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { searchQuery, handleSearch } = useSearch();
  const [loading, setLoading] = useState(false);

  const productsPerPage = 8;
  const categories = ["All", "Bedsheets", "Curtains", "Rugs", "Table Linens"];
  const sizes = ["all", "Single Bed", "Double Bed", "King Size"];

  const categoryBackgrounds = {
    Bedsheets: "/images/category-bedsheets-bg.jpg",
    Curtains: "/images/category-curtains-bg.jpg",
    Rugs: "/images/category-rugs-bg.jpg",
    "Table Linens": "/images/category-tablelinen-bg.jpg",
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      setActiveCategory(formattedCategory);
    }
  }, [searchParams]);


  const products = [
    {
      id: 1,
      name: "Luxury Cotton King Size Bedsheet Set",
      price: 4999,
      mrp: 6999,
      rating: 4.7,
      reviews: 245,
      size: "King Size",
      image: "/images/bedsheet-luxury.jpg",
      description: "Premium 400 thread count cotton bedsheet set with 2 pillowcovers, featuring elegant floral patterns",
      category: "Bedsheets",
      inStock: true,
    },
    {
      id: 2,
      name: "Handblock Printed Double Bedsheet",
      price: 3499,
      mrp: 4999,
      rating: 4.6,
      reviews: 189,
      size: "Double Bed",
      image: "/images/bedsheet-handblock.jpg",
      description: "Traditional handblock printed pure cotton bedsheet with matching pillowcovers",
      category: "Bedsheets",
      inStock: true,
    },
    {
      id: 3,
      name: "Designer Pillowcover Set",
      price: 899,
      mrp: 1299,
      rating: 4.8,
      reviews: 156,
      size: "18x18 inches",
      image: "/images/pillowcover-designer.jpg",
      description: "Set of 2 decorative pillowcovers with intricate embroidery work",
      category: "Pillowcovers",
      inStock: true,
    },
    {
      id: 4,
      name: "Festive Table Runner",
      price: 1299,
      mrp: 1799,
      rating: 4.5,
      reviews: 92,
      size: "14x72 inches",
      image: "/images/tablerunner-festive.jpg",
      description: "Elegant table runner with gold zari work, perfect for special occasions",
      category: "Table Linens",
      inStock: true,
    },
    {
      id: 5,
      name: "Single Bed Cotton Sheet Set",
      price: 2499,
      mrp: 3499,
      rating: 4.4,
      reviews: 167,
      size: "Single Bed",
      image: "/images/bedsheet-single.jpg",
      description: "Pure cotton single bedsheet with 1 pillowcover, featuring contemporary designs",
      category: "Bedsheets",
      inStock: true,
    },
    {
      id: 6,
      name: "Luxury Dining Table Set",
      price: 5999,
      mrp: 7999,
      rating: 4.9,
      reviews: 78,
      size: "6 seater",
      image: "/images/tablelinen-dining.jpg",
      description: "Complete dining table set including table cloth, runner, and 6 napkins",
      category: "Table Linens",
      inStock: true,
    },
    {
      id: 7,
      name: "Quilted Pillowcover Pair",
      price: 1299,
      mrp: 1799,
      rating: 4.7,
      reviews: 134,
      size: "20x20 inches",
      image: "/images/pillowcover-quilted.jpg",
      description: "Set of 2 quilted pillowcovers with traditional motifs and premium finish",
      category: "Pillowcovers",
      inStock: true,
    },
    {
      id: 8,
      name: "Premium Table Cloth",
      price: 2999,
      mrp: 3999,
      rating: 4.6,
      reviews: 112,
      size: "60x90 inches",
      image: "/images/tablecloth-premium.jpg",
      description: "Stain-resistant premium table cloth with elegant border design",
      category: "Table Linens",
      inStock: true,
    }
  ];

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProducts = (products) => {
    let filtered =
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory);

    if (filterSize !== "all") {
      filtered = filtered.filter((product) => product.size === filterSize);
    }

    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return sortProducts(filtered);
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search && searchQuery !== search) {
      handleSearch(search);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [searchParams, searchQuery]);

  const filteredProducts = filterProducts(products);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, filterSize, sortBy, searchQuery]);

  return (
    <div className="min-h-screen">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/collections-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-25">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl font-serif mb-4">Our Collections</h1>
            <p className="text-xl mb-8">
              Discover our exquisite range of handcrafted textiles
            </p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {categories
              .filter((cat) => cat !== "All")
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative h-32 sm:h-40 rounded-lg overflow-hidden group ${
                    activeCategory === category ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={categoryBackgrounds[category]}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gray-900 opacity-25 group-hover:bg-opacity-30 transition-all duration-300">
                    <div className="h-full flex items-center justify-center">
                      <span className={`text-base sm:text-xl font-serif text-white ${
                        activeCategory === category ? "font-bold" : ""
                      }`}>
                        {category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 sm:px-4 py-1 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:border-black"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="px-2 sm:px-4 py-1 sm:py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:border-black"
              >
                <option value="all">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg text-xs sm:text-sm ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;