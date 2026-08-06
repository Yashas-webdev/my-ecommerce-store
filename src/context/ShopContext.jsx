import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

// Create Context
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

  // Products from Backend API
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Shop & Navigation States
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('shop_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [toast, setToast] = useState(null);
  const [cartBounce, setCartBounce] = useState(false);

  // User Auth States
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Fetch Products from Backend API
  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setProductsError(null);

      let url = '/api/products';
      const params = new URLSearchParams();
      if (searchQuery) params.append('keyword', searchQuery);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch products from backend');
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch products error:', err);
      setProductsError(err.message);
    } finally {
      setLoadingProducts(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auth Functions
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthError(null);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthError(null);
  };

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      setAuthError(null);

      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid login credentials');
      }

      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      showToast(`Welcome back, ${data.name}! 👋`);
      closeAuthModal();
      return { success: true, user: data };
    } catch (err) {
      setAuthError(err.message);
      showToast(err.message, 'danger');
      return { success: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setAuthLoading(true);
      setAuthError(null);

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.message || 'Registration failed';
        
        // Handle User Already Exists specifically
        if (errorMsg.toLowerCase().includes('already exists')) {
          showToast('⚠️ User with this email already exists! Redirecting to Sign In...', 'warning');
          return { success: false, exists: true, message: errorMsg };
        }
        
        throw new Error(errorMsg);
      }

      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      showToast(`Welcome to Elegant Shop, ${data.name}! 🎉`);
      closeAuthModal();
      return { success: true, user: data };
    } catch (err) {
      setAuthError(err.message);
      showToast(err.message, 'danger');
      return { success: false, exists: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setViewMode('store');
    localStorage.removeItem('userInfo');
    showToast('Logged out successfully');
  };

  // Add to cart
  const addToCart = useCallback((product) => {
    const pId = product._id || product.id;
    const existingItem = cart.find(item => (item._id || item.id) === pId);

    if (existingItem) {
      setCart(cart.map(item =>
        (item._id || item.id) === pId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, id: pId, quantity: 1 }]);
    }

    showToast('✓ Added to cart!');
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  }, [cart, showToast]);

  // Update quantity
  const updateQuantity = useCallback((productId, change) => {
    setCart(cart.map(item =>
      (item._id || item.id) === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  }, [cart]);

  // Remove from cart
  const removeFromCart = useCallback((productId) => {
    setCart(cart.filter(item => (item._id || item.id) !== productId));
    showToast('🗑️ Removed from cart');
  }, [cart, showToast]);

  // Toggle wishlist
  const toggleWishlist = useCallback((product) => {
    const pId = product._id || product.id;
    const isInWishlist = wishlist.some(item => (item._id || item.id) === pId);

    if (isInWishlist) {
      setWishlist(wishlist.filter(item => (item._id || item.id) !== pId));
      showToast('💔 Removed from wishlist');
    } else {
      setWishlist([...wishlist, { ...product, id: pId }]);
      showToast('❤️ Added to wishlist!');
    }
  }, [wishlist, showToast]);

  // Remove from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(wishlist.filter(w => (w._id || w.id) !== productId));
    showToast('💔 Removed from wishlist');
  }, [wishlist, showToast]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) =>
    total + (item.price * item.quantity), 0
  );

  // Create Order Endpoint integration
  const createOrder = async (shippingDetails) => {
    if (!user) {
      openAuthModal('login');
      showToast('Please login to place an order', 'warning');
      return false;
    }

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id || item.id
        })),
        shippingAddress: shippingDetails || {
          address: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'PayPal / Credit Card',
        itemsPrice: cartTotal,
        taxPrice: Number((cartTotal * 0.1).toFixed(2)),
        shippingPrice: cartTotal > 100 ? 0 : 10,
        totalPrice: Number((cartTotal * 1.1 + (cartTotal > 100 ? 0 : 10)).toFixed(2))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      setCart([]);
      setShowCart(false);
      showToast(`🎉 Order #${data._id.substring(18)} placed successfully!`);
      return data;
    } catch (err) {
      console.error('Create order error:', err);
      showToast(err.message, 'danger');
      return false;
    }
  };

  // --- ADMIN API HELPER METHODS ---
  const addNewProduct = async (productData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add product');
      showToast('✅ New product created in MongoDB!');
      fetchProducts();
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const updateExistingProduct = async (id, productData) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update product');
      showToast('✏️ Product updated successfully!');
      fetchProducts();
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const deleteExistingProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete product');
      showToast('🗑️ Product deleted from MongoDB!');
      fetchProducts();
      return true;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      return [];
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      return [];
    }
  };

  const markOrderDelivered = async (id) => {
    try {
      const res = await fetch(`/api/orders/${id}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to mark delivered');
      showToast('🚚 Order marked as Delivered!');
      return data;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const deleteUserAccount = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete user');
      showToast('🗑️ User deleted successfully');
      return true;
    } catch (err) {
      showToast(err.message, 'danger');
      return false;
    }
  };

  const value = {
    // Navigation & View Mode
    viewMode,
    setViewMode,

    // Products State
    products,
    loadingProducts,
    productsError,
    fetchProducts,

    // Shop State
    cart,
    wishlist,
    searchQuery,
    selectedCategory,
    showCart,
    activeTab,
    toast,
    cartBounce,
    cartTotal,

    // Auth State & Methods
    user,
    showAuthModal,
    authMode,
    authLoading,
    authError,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    login,
    register,
    logout,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    setShowCart,
    setActiveTab,

    // Functions
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    removeFromWishlist,
    createOrder,
    showToast,

    // Admin Helper Methods
    addNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
    fetchAllOrders,
    fetchAllUsers,
    markOrderDelivered,
    deleteUserAccount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return context;
};

export default ShopContext;