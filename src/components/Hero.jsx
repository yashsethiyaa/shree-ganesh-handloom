import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true
  };

  const slides = [
    {
      image: '/images/banners/home-banner.jpg',
      title: 'Home Decor',
      subtitle: 'Discover the beauty of traditional craftsmanship blended with contemporary design'
    },
    {
      image: '/images/banners/IMG@1x.jpg',
      title: 'Luxury Collection',
      subtitle: 'Elevate your space with our premium handcrafted furnishings'
    }
  ];

  const handleShopClick = () => {
    navigate('/collections');
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[80vh]">
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-3xl px-4">
                <h1 className="text-5xl md:text-6xl font-playfair text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl text-white mb-8 font-inter drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={handleShopClick}
                  className="bg-white text-black px-8 py-3 rounded"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero; 