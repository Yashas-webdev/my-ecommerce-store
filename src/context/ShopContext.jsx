import React, { useState, useCallback, createContext, useContext } from 'react';

// Step 1: Create the context
const ShopContext = createContext();

// Step 2: Create the provider
export const ShopProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [toast, setToast] = useState(null);
  const [cartBounce, setCartBounce] = useState(false);

  // Toast notification
  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  // Add to cart
  const addToCart = useCallback((product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showToast('✓ Added to cart!');
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  }, [cart, showToast]);

  // Update quantity
  const updateQuantity = useCallback((productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  }, [cart]);

  // Remove from cart
  const removeFromCart = useCallback((productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showToast('🗑️ Removed from cart');
  }, [cart, showToast]);

  // Toggle wishlist
  const toggleWishlist = useCallback((product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);

    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast('💔 Removed from wishlist');
    } else {
      setWishlist([...wishlist, product]);
      showToast('❤️ Added to wishlist!');
    }
  }, [wishlist, showToast]);

  // Remove from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(wishlist.filter(w => w.id !== productId));
    showToast('💔 Removed from wishlist');
  }, [wishlist, showToast]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) =>
    total + (item.price * item.quantity), 0
  );

  // All values and functions shared across components
  const value = {
    // State
    cart,
    wishlist,
    searchQuery,
    selectedCategory,
    showCart,
    activeTab,
    toast,
    cartBounce,
    cartTotal,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    setShowCart,
    setActiveTab,
    setWishlist,

    // Functions
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    removeFromWishlist,
    showToast,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

// Step 3: Custom hook to use the context
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return context;
};

export default ShopContext;