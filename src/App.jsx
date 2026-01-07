import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Star } from 'lucide-react';

function App() {

 const [cart, setCart] = useState([]);
 const [wishlist, setWishlist] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [showCart, setShowCart] = useState(false);
 const [activeTab, setActiveTab] = useState('cart');

 const products = [
  // ELECTRONICS
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    price: 34.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    rating: 4.4
  },
  
  // FASHION
  {
    id: 5,
    name: 'Leather Backpack',
    price: 79.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 4.3
  },
  {
    id: 6,
    name: 'Running Shoes',
    price: 119.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Sunglasses',
    price: 89.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    rating: 4.5
  },
  {
    id: 8,
    name: 'Denim Jacket',
    price: 129.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    rating: 4.6
  },
  
  // HOME
  {
    id: 9,
    name: 'Coffee Maker',
    price: 79.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    rating: 4.7
  },
  {
    id: 10,
    name: 'Table Lamp',
    price: 45.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    rating: 4.4
  },
  {
    id: 11,
    name: 'Wall Clock',
    price: 29.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',
    rating: 4.2
  },
  {
    id: 12,
    name: 'Throw Pillow Set',
    price: 39.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
    rating: 4.5
  }
];
   


 // REAL Add to Cart Function
const addToCart = (product) => {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    // Product already in cart - increase quantity
    setCart(cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    // New product - add it with quantity 1
    setCart([...cart, { ...product, quantity: 1 }]);
  }

 
};

 const updateQuantity = (productId, change) => {
  setCart(cart.map(item =>
    item.id === productId
      ? { ...item, quantity: Math.max(1, item.quantity + change) }
      : item
  ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };


 return(
  <div style={{padding: '0'}}>
    
    {/* STICKY HEADER CONTAINER */}
    <div style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      paddingBottom: '10px'
    }}>
      
      {/* Top Header Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 20px 10px 20px',
        backgroundColor: 'white'
      }}>
        <h1 style={{ margin: 0 }}>My E-commerce Store</h1>
        <button
          onClick={() => setShowCart(true)}
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#6366f1',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor:'pointer'
          }}
        >
          🛒 Cart : {cart.length} items
        </button>
      </div>

      {/* Search Bar */}
      <div style={{
        padding: '0 20px',
        marginTop: '15px',
        marginBottom: '15px'
      }}>
        <div style={{ 
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 45px 12px 45px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '25px',
              outline: 'none'
            }}
          />
          <span style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '20px'
          }}>
            🔍
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '0 20px',
        paddingBottom: '10px'
      }}>
        {/* All Button */}
        <button
          onClick={() => setSelectedCategory('All')}
          style={{
            padding: '10px 24px',
            border: selectedCategory === 'All' ? '2px solid #6366f1' : '2px solid #ddd',
            borderRadius: '20px',
            backgroundColor: selectedCategory === 'All' ? '#6366f1' : 'white',
            color: selectedCategory === 'All' ? 'white' : '#333',
            fontSize: '16px',
            fontWeight: selectedCategory === 'All' ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          All
        </button>
        
        {/* Electronics Button */}
        <button
          onClick={() => setSelectedCategory('Electronics')}
          style={{
            padding: '10px 24px',
            border: selectedCategory === 'Electronics' ? '2px solid #6366f1' : '2px solid #ddd',
            borderRadius: '20px',
            backgroundColor: selectedCategory === 'Electronics' ? '#6366f1' : 'white',
            color: selectedCategory === 'Electronics' ? 'white' : '#333',
            fontSize: '16px',
            fontWeight: selectedCategory === 'Electronics' ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📱 Electronics
        </button>
        
        {/* Fashion Button */}
        <button
          onClick={() => setSelectedCategory('Fashion')}
          style={{
            padding: '10px 24px',
            border: selectedCategory === 'Fashion' ? '2px solid #6366f1' : '2px solid #ddd',
            borderRadius: '20px',
            backgroundColor: selectedCategory === 'Fashion' ? '#6366f1' : 'white',
            color: selectedCategory === 'Fashion' ? 'white' : '#333',
            fontSize: '16px',
            fontWeight: selectedCategory === 'Fashion' ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          👕 Fashion
        </button>
      </div>
      
    </div>
    {/* END STICKY HEADER */}
    
   
    
    {/* ========================================= */}
    {/* HERO BANNER SECTION */}
    {/* ========================================= */}
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 20px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        top: '-100px',
        right: '-100px'
      }}></div>
      
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        bottom: '-50px',
        left: '-50px'
      }}></div>
      
      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Welcome to Elegant Shop
        </h1>
        
        <p style={{
          fontSize: '24px',
          marginBottom: '15px',
          opacity: 0.95
        }}>
          Discover Amazing Products at Unbeatable Prices
        </p>
        
        <p style={{
          fontSize: '18px',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          ✨ Premium Quality • 🚚 Free Shipping • 💯 100% Satisfaction
        </p>
        
        <button
          onClick={() => {
            // Scroll to products section
            window.scrollTo({
              top: 600,
              behavior: 'smooth'
            });
          }}
          style={{
            backgroundColor: 'white',
            color: '#667eea',
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          Shop Now →
        </button>
      </div>
    </div>
    {/* END HERO BANNER */}
    
  

    {
      <p>We have {products.length} products in our store</p>
    }


<h2 style={{marginTop: '30px', marginBottom: '20px'}}>Our Products:</h2>

{/* GRID CONTAINER - Products will appear in rows */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '20px',
  marginBottom: '40px'
}}>
  {products
    .filter((product) => 
      {
    // Check if product name matches search
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if product category matches selected category
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Product must match BOTH search AND category
    return matchesSearch && matchesCategory;
  })
    .map((product) => (
      <div 
        key={product.id} 
        style={{
          border: '2px solid #ddd',
          padding: '15px',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        {/* Product Image with Heart Button */}
<div style={{ position: 'relative' }}>
  <img 
    src={product.image} 
    alt={product.name}
    style={{
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '10px'
    }}
  />
  
  {/* Heart/Wishlist Button */}
  <button
    onClick={() => {
      // Check if product is in wishlist
      const isInWishlist = wishlist.some(item => item.id === product.id);
      
      if (isInWishlist) {
        // Remove from wishlist
        setWishlist(wishlist.filter(item => item.id !== product.id));
      } else {
        // Add to wishlist
        setWishlist([...wishlist, product]);
      }
    }}
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    {wishlist.some(item => item.id === product.id) ? '❤️' : '🤍'}
  </button>
</div>
        <h3 style={{margin:'10px 0', fontSize:'18px'}}>
          {product.name}
        </h3>
        <p style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2e7d32',
          margin: '8px 0'
        }}>
          Price: ${product.price}
        </p>
        <p style={{color: '#666', margin: '5px 0'}}>
          Category: {product.category}
        </p>
        <p style={{margin: '8px 0'}}>
          Rating: {product.rating} ⭐
        </p>
        
        <button 
          onClick={() => addToCart(product)} 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%',
            marginTop: '10px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Add to Cart
        </button>
      </div>
    ))
  }
</div>

{/* No results message */}
{products
  .filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).length === 0 && (
  <div style={{
    textAlign: 'center',
    padding: '50px',
    color: '#666'
  }}> 
    <p style={{fontSize: '48px', margin: '20px 0'}}>🔍</p>
    <h3 style={{fontSize:'24px', margin:'10px 0'}}>
      No products found
    </h3>
    <p>Try searching for something else</p>
    {searchQuery && (
      <p style={{marginTop:'10px', color:'#999'}}>
        No results for "{searchQuery}"
      </p>
    )}
  </div>
)}

 {/* Products map ends here */}
      
      {/* ========================================= */}
      {/* SHOPPING CART SIDEBAR */}
      {/* ========================================= */}
      {showCart && (
        <>
          {/* Dark background overlay - clicking it closes cart */}
          <div 
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
          />
          
          {/* Cart sidebar panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            maxWidth: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 1000,
            padding: '20px',
            boxShadow: '-2px 0 10px rgba(0,0,0,0.3)',
            overflowY: 'auto'
          }}>
            {/* Sidebar Header with Tabs */}
<div style={{ marginBottom: '20px' }}>
  {/* Top row with tab buttons and close button */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  }}>
    {/* Tab Buttons Container */}
    <div style={{ display: 'flex', gap: '10px' }}>
      
      {/* Cart Tab Button */}
      <button
        onClick={() => setActiveTab('cart')}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderBottom: activeTab === 'cart' ? '3px solid #6366f1' : '3px solid transparent',
          backgroundColor: 'transparent',
          color: activeTab === 'cart' ? '#6366f1' : '#666',
          fontSize: '18px',
          fontWeight: activeTab === 'cart' ? 'bold' : 'normal',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        🛒 Cart ({cart.length})
      </button>
      
      {/* Wishlist Tab Button */}
      <button
        onClick={() => setActiveTab('wishlist')}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderBottom: activeTab === 'wishlist' ? '3px solid #6366f1' : '3px solid transparent',
          backgroundColor: 'transparent',
          color: activeTab === 'wishlist' ? '#6366f1' : '#666',
          fontSize: '18px',
          fontWeight: activeTab === 'wishlist' ? 'bold' : 'normal',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        ❤️ Wishlist ({wishlist.length})
      </button>
      
    </div>
    
    {/* Close Button (X) */}
    <button 
      onClick={() => setShowCart(false)}
      style={{
        fontSize: '28px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#666'
      }}
    >
      ✕
    </button>
  </div>
  
  {/* Bottom border line */}
  <div style={{ borderBottom: '2px solid #ddd' }}></div>
</div>
            
       {/* ========================================= */}
{/* CART TAB CONTENT */}
{/* ========================================= */}
{activeTab === 'cart' && (
  <>
    {/* Check if cart is empty */}
    {cart.length === 0 ? (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        color: '#999'
      }}>
        <p style={{ fontSize: '48px', margin: '20px 0' }}>🛒</p>
        <p style={{ fontSize: '20px' }}>Your cart is empty</p>
        <p style={{ fontSize: '14px' }}>Add some products to get started!</p>
      </div>
    ) : (
      <div>
        {/* Display each cart item */}
        {cart.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'start',
              marginBottom: '10px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>
                {item.name}
              </h3>
              
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#d32f2f',
                  padding: '0'
                }}
              >
                🗑️
              </button>
            </div>

            <p style={{ margin: '5px 0', color: '#666' }}>
              Price: <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                ${item.price}
              </span>
            </p>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginTop: '10px',
              marginBottom: '10px'
            }}>
              <span style={{ fontWeight: 'bold', color: '#666' }}>Quantity:</span>
              
              <button
                onClick={() => updateQuantity(item.id, -1)}
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                −
              </button>
              
              <span style={{
                minWidth: '30px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {item.quantity}
              </span>
              
              <button
                onClick={() => updateQuantity(item.id, 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
            </div>

            <p style={{ 
              margin: '5px 0 0 0', 
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1976d2'
            }}>
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        
        {/* Cart Total */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          border: '2px solid #ddd'
        }}>
          <h3 style={{ 
            fontSize: '24px',
            margin: '0 0 15px 0',
            color: '#333'
          }}>
            Total: ${cart.reduce((total, item) => 
              total + (item.price * item.quantity), 0
            ).toFixed(2)}
          </h3>
          <button style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    )}
  </>
)}

{/* ========================================= */}
{/* WISHLIST TAB CONTENT */}
{/* ========================================= */}
{activeTab === 'wishlist' && (
  <>
    {/* Check if wishlist is empty */}
    {wishlist.length === 0 ? (
      <div style={{ 
        textAlign: 'center', 
        marginTop: '100px',
        color: '#999'
      }}>
        <p style={{ fontSize: '48px', margin: '20px 0' }}>❤️</p>
        <p style={{ fontSize: '20px' }}>Your wishlist is empty</p>
        <p style={{ fontSize: '14px' }}>Click the heart on products you love!</p>
      </div>
    ) : (
      <div>
        {/* Display each wishlist item */}
        {wishlist.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '8px',
            backgroundColor: '#fff9f9'
          }}>
            {/* Product image and info */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <img 
                src={item.image}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                  {item.name}
                </h3>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                  {item.category}
                </p>
                <p style={{ 
                  margin: '5px 0',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2e7d32'
                }}>
                  ${item.price}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginTop: '10px'
            }}>
              <button
                onClick={() => {
                  addToCart(item);
                  setActiveTab('cart');
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
              
              <button
                onClick={() => setWishlist(wishlist.filter(w => w.id !== item.id))}
                style={{
                  padding: '10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
)}
          </div>
        </>
      )}
      
   
    
  </div>
 );

}

export default App;
