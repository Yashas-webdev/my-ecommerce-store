import React from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

const App = () => {
  return (
    <ShopProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Sticky Frosted Glass Navbar */}
        <Header />

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          {/* Glass Hero Banner */}
          <Hero />

          {/* MongoDB Backend Product List Grid */}
          <ProductList />
        </main>

        {/* Slide-in Glass Cart & Checkout Sidebar Drawer */}
        <CartSidebar />

        {/* Sign In & Sign Up Glassmorphism Modal */}
        <AuthModal />

        {/* Footer */}
        <Footer />

        {/* Toast Notification Container */}
        <Toast />

      </div>
    </ShopProvider>
  );
};

export default App;