import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    mrp: '',
    saleDiscount: '',
    category: '',
    description: '',
    sizes: [],
    images: [],
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [pageSection, setPageSection] = useState('');
  const [showSizeInput, setShowSizeInput] = useState(true);

  const pageSectionOptions = [
    { value: 'home_featured', label: 'Home Page - Featured Products' },
    { value: 'home_bestsellers', label: 'Home Page - Best Sellers' },
    { value: 'collections_bedsheets', label: 'Collections - Bedsheets' },
    { value: 'collections_pillowcovers', label: 'Collections - Pillow Covers' },
    { value: 'collections_tablelinens', label: 'Collections - Table Linens' }
  ];

  const categoryBasedSizes = {
    'Bedsheets': ['Single Bed', 'Double Bed', 'King Size'],
    'Curtains': ['7ft x 4ft', '8ft x 4ft', '9ft x 4ft'],
    'Rugs': ['4ft x 6ft', '6ft x 8ft', '8ft x 10ft'],
    'Table Linens': ['4 seater', '6 seater', '8 seater']
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages([...selectedImages, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagesPreviews([...imagesPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagesPreviews(imagesPreviews.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size) => {
    const updatedSizes = newProduct.sizes.includes(size)
      ? newProduct.sizes.filter(s => s !== size)
      : [...newProduct.sizes, size];
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setSelectedImages([]);
    setImagesPreviews(product.images);
    setPageSection(product.pageSection);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        return {
          ...editingProduct,
          images: imagesPreviews,
          pageSection: pageSection
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowEditModal(false);
    setEditingProduct(null);
    setSelectedImages([]);
    setImagesPreviews([]);
    setPageSection('');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (selectedImages.length === 0 || !pageSection) {
      alert('Please fill all required fields and add at least one image');
      return;
    }

    const imageUrls = selectedImages.map(image => URL.createObjectURL(image));
    
    setProducts([
      ...products,
      {
        ...newProduct,
        id: Date.now(),
        images: imageUrls,
        pageSection: pageSection
      },
    ]);

    setNewProduct({
      name: '',
      price: '',
      mrp: '',
      saleDiscount: '',
      category: '',
      description: '',
      sizes: [],
      images: [],
    });
    setSelectedImages([]);
    setImagesPreviews([]);
    setPageSection('');
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Images</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">MRP</th>
                  <th className="text-left p-4">Sale Price</th>
                  <th className="text-left p-4">Discount</th>
                  <th className="text-left p-4">Sizes</th>
                  <th className="text-left p-4">Section</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {product.images.slice(0, 2).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${product.name} ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                        {product.images.length > 2 && (
                          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            +{product.images.length - 2}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">₹{Number(product.mrp).toLocaleString()}</td>
                    <td className="p-4">₹{Number(product.price).toLocaleString()}</td>
                    <td className="p-4">{product.saleDiscount}%</td>
                    <td className="p-4">{product.sizes.join(', ')}</td>
                    <td className="p-4">{pageSectionOptions.find(opt => opt.value === product.pageSection)?.label}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Page Section
                    </label>
                    <select
                      value={pageSection}
                      onChange={(e) => setPageSection(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a section</option>
                      {pageSectionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="MRP"
                      className="w-full p-2 border rounded"
                      value={newProduct.mrp}
                      onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Sale Price"
                      className="w-full p-2 border rounded"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Sale Discount (%)"
                      className="w-full p-2 border rounded"
                      value={newProduct.saleDiscount}
                      onChange={(e) => {
                        const discount = Math.min(100, Math.max(0, Number(e.target.value)));
                        const mrp = Number(newProduct.mrp);
                        const discountedPrice = mrp - (mrp * discount / 100);
                        setNewProduct({ 
                          ...newProduct, 
                          saleDiscount: discount,
                          price: discountedPrice.toFixed(2)
                        });
                      }}
                      min="0"
                      max="100"
                    />
                    {newProduct.saleDiscount && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-600">
                        {newProduct.saleDiscount}% OFF
                      </div>
                    )}
                  </div>

                  <div>
                    <select
                      value={newProduct.category}
                      onChange={(e) => {
                        setNewProduct({ 
                          ...newProduct, 
                          category: e.target.value,
                          sizes: [] 
                        });
                        setShowSizeInput(!!categoryBasedSizes[e.target.value]);
                      }}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categoryBasedSizes).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showSizeInput && newProduct.category && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Sizes</label>
                      <div className="flex flex-wrap gap-2">
                        {categoryBasedSizes[newProduct.category].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeChange(size)}
                            className={`px-3 py-1 rounded border ${
                              newProduct.sizes.includes(size)
                                ? 'bg-black text-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="product-image"
                      multiple
                    />
                    <label
                      htmlFor="product-image"
                      className="cursor-pointer block"
                    >
                      <div className="text-center mb-4">
                        <div className="text-gray-500">Click to upload images</div>
                        <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
                      </div>
                    </label>
                    
                    {imagesPreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {imagesPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedImages([]);
                      setImagesPreviews([]);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
          
                {showEditModal && editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleUpdateProduct}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Page Section
                    </label>
                    <select
                      value={pageSection}
                      onChange={(e) => setPageSection(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a section</option>
                      {pageSectionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      name: e.target.value 
                    })}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="MRP"
                      className="w-full p-2 border rounded"
                      value={editingProduct.mrp}
                      onChange={(e) => setEditingProduct({ 
                        ...editingProduct, 
                        mrp: e.target.value 
                      })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Sale Price"
                      className="w-full p-2 border rounded"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ 
                        ...editingProduct, 
                        price: e.target.value 
                      })}
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Sale Discount (%)"
                      className="w-full p-2 border rounded"
                      value={editingProduct.saleDiscount}
                      onChange={(e) => {
                        const discount = Math.min(100, Math.max(0, Number(e.target.value)));
                        const mrp = Number(editingProduct.mrp);
                        const discountedPrice = mrp - (mrp * discount / 100);
                        setEditingProduct({ 
                          ...editingProduct, 
                          saleDiscount: discount,
                          price: discountedPrice.toFixed(2)
                        });
                      }}
                      min="0"
                      max="100"
                    />
                    {editingProduct.saleDiscount && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-green-600">
                        {editingProduct.saleDiscount}% OFF
                      </div>
                    )}
                  </div>

                  <div>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => {
                        setEditingProduct({ 
                          ...editingProduct, 
                          category: e.target.value,
                          sizes: [] 
                        });
                        setShowSizeInput(!!categoryBasedSizes[e.target.value]);
                      }}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categoryBasedSizes).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showSizeInput && editingProduct.category && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Sizes</label>
                      <div className="flex flex-wrap gap-2">
                        {categoryBasedSizes[editingProduct.category].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              const updatedSizes = editingProduct.sizes.includes(size)
                                ? editingProduct.sizes.filter(s => s !== size)
                                : [...editingProduct.sizes, size];
                              setEditingProduct({
                                ...editingProduct,
                                sizes: updatedSizes
                              });
                            }}
                            className={`px-3 py-1 rounded border ${
                              editingProduct.sizes.includes(size)
                                ? 'bg-black text-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      description: e.target.value 
                    })}
                    required
                  />

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="edit-product-image"
                      multiple
                    />
                    <label
                      htmlFor="edit-product-image"
                      className="cursor-pointer block"
                    >
                      <div className="text-center mb-4">
                        <div className="text-gray-500">Click to upload images</div>
                        <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
                      </div>
                    </label>
                    
                    {imagesPreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {imagesPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingProduct(null);
                      setSelectedImages([]);
                      setImagesPreviews([]);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;