import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import Cart from './cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBanner from './pages/admin/AdminBanner';
import AdminCoupons from './pages/admin/AdminCoupon';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminShipping from './pages/admin/AdminShipping';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAdminRoute && <Navbar />}
      <div className={`${!isAdminRoute ? 'pt-16' : ''} flex-grow`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedAdminRoute>
              <AdminCategories />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/banners" element={
            <ProtectedAdminRoute>
              <AdminBanner />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/coupons" element={
            <ProtectedAdminRoute>
              <AdminCoupons />
            </ProtectedAdminRoute>
          } />

<Route path="/admin/shipping" element={
  <ProtectedAdminRoute>
    <AdminShipping />
  </ProtectedAdminRoute>} />


        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;