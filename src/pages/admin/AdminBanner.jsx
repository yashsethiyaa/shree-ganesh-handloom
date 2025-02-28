import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminBanner = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [showAddCarouselModal, setShowAddCarouselModal] = useState(false);
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerLink, setBannerLink] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCarousel = (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const imageUrl = URL.createObjectURL(selectedImage);
    setCarouselImages([...carouselImages, { id: Date.now(), image: imageUrl }]);
    setSelectedImage(null);
    setImagePreview(null);
    setShowAddCarouselModal(false);
  };

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const imageUrl = URL.createObjectURL(selectedImage);
    setBanners([...banners, { 
      id: Date.now(), 
      image: imageUrl,
      link: bannerLink 
    }]);
    setSelectedImage(null);
    setImagePreview(null);
    setBannerLink('');
    setShowAddBannerModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Carousel Images</h1>
            <button
              onClick={() => setShowAddCarouselModal(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add Carousel Image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carouselImages.map((item) => (
              <div key={item.id} className="relative group">
                <img
                  src={item.image}
                  alt="Carousel"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setCarouselImages(carouselImages.filter(img => img.id !== item.id));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Banners</h1>
            <button
              onClick={() => setShowAddBannerModal(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add Banner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="relative group">
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-2 rounded">
                  <p className="text-sm truncate">Link: {banner.link}</p>
                </div>
                <button
                  onClick={() => {
                    setBanners(banners.filter(b => b.id !== banner.id));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {showAddCarouselModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Carousel Image</h2>
              <form onSubmit={handleAddCarousel}>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="carousel-image"
                      required
                    />
                    <label
                      htmlFor="carousel-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-500 mb-2">Click to upload image</div>
                          <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCarouselModal(false);
                      setImagePreview(null);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Add Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddBannerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Banner</h2>
              <form onSubmit={handleAddBanner}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Banner Link"
                    className="w-full p-2 border rounded"
                    value={bannerLink}
                    onChange={(e) => setBannerLink(e.target.value)}
                    required
                  />

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="banner-image"
                      required
                    />
                    <label
                      htmlFor="banner-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-gray-500 mb-2">Click to upload image</div>
                          <div className="text-sm text-gray-400">PNG, JPG up to 5MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBannerModal(false);
                      setImagePreview(null);
                      setSelectedImage(null);
                      setBannerLink('');
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                  >
                    Add Banner
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

export default AdminBanner;