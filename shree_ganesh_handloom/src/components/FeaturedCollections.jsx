import { useNavigate } from 'react-router-dom';

const FeaturedCollections = () => {
  const navigate = useNavigate();
  
  const collections = [
    { id: 1, name: 'Rugs', image: '/images/categories/IMG@1x.jpg', category: 'Rugs' },
    { id: 2, name: 'Curtains', image: '/images/categories/curtainsIMG.jpg', category: 'curtains' },
    { id: 3, name: 'Table Linens', image: '/images/categories/tablelinensIMG.jpg', category: 'table Linens' },
    { id: 4, name: 'Bedsheet', image: '/images/products/IMG@1x.jpg', category: 'Bedsheets' },
  ];

  const handleCollectionClick = (category) => {
    navigate(`/collections?category=${category}`);
  };

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-serif text-center mb-12">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ">
        {collections.map((collection) => (
          <div 
            key={collection.id} 
            className="featured-card relative cursor-pointer "
            onClick={() => handleCollectionClick(collection.category)}
            
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-64 object-cover "
            />
            <div className="absolute inset-0 flex items-center justify-center ">
              <h3 className="text-white text-xl  font-medium">{collection.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;