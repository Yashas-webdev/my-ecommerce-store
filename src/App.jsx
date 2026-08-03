import React from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Toast from './components/Toast';

const App = () => {
  return (
    <ShopProvider>
      <div style={{ padding: '0' }}>

        {/* Header - Sticky navbar with search and cart */}
        <Header />

        {/* Hero - Banner section */}
        <Hero />

        {/* Product List - Grid of all products */}
        <ProductList />

        {/* Cart Sidebar - Slides in from right */}
        <CartSidebar />

        {/* Footer */}
        <Footer />

        {/* Toast - Notification popup */}
        <Toast />

      </div>
    </ShopProvider>
  );
};

export default App;