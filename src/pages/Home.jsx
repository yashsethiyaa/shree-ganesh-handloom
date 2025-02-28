import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';
import Sustainability from '../components/Sustainability';
import Newsletter from '../components/Newsletter';
import FeaturedCollections from '../components/FeaturedCollections';

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      navigate(`/collections?search=${encodeURIComponent(search)}`);
    }
  }, [searchParams, navigate]);

  return (
    <div className="bg-white">
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <NewArrivals />
      <Sustainability />
      <Newsletter />
    </div>
  );
};

export default Home;