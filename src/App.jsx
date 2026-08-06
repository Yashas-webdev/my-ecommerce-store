import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Protected App Content Component
const ProtectedDashboard = () => {
  const { user, viewMode } = useShop();

  // If user is not signed in / logged in, show Auth Page (Sign Up / Sign In) first!
  if (!user) {
    return (
      <>
        <AuthPage />
        <Toast />
      </>
    );
  }

  // If Admin user is in Admin View Mode, show dedicated Admin Dashboard!
  if (user.isAdmin && viewMode === 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <AdminDashboard />
        </main>
        <Footer />
        <Toast />
      </div>
    );
  }

  // Once authenticated (Customer or Admin in Storefront view), show Store Dashboard
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Frosted Glass Navbar */}
      <Header />

      {/* Main Storefront View */}
      <main style={{ flex: 1 }}>
        {/* Glass Hero Banner */}
        <Hero />

        {/* MongoDB Backend Product Catalog Grid */}
        <ProductList />
      </main>

      {/* Slide-in Glass Cart & Order Checkout Drawer */}
      <CartSidebar />

      {/* Auth Modal */}
      <AuthModal />

      {/* Footer */}
      <Footer />

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
};

const App = () => {
  return (
    <ShopProvider>
      <ProtectedDashboard />
    </ShopProvider>
  );
};

export default App;