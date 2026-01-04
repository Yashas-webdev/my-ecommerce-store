import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Star } from 'lucide-react';

function App() {

 const [cart, setCart] = useState([]);
 const [wishlist, setWishlist] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [showCart, setShowCart] = useState(false);

 const products = [
   {id:1,
     name : 'Wireless Headphones',
     price : 89.99,
     category : 'Electronics',
     image : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
     rating : 4.5
   },
   {id:2,
     name : 'Smart Watch',
     price : 790.99,
     category : 'Electronics',
     image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
     rating : 4.8
   },
   {id:3,
     name : 'Leather Backpack',
     price : 79.99,
     category : 'Fashion',
     image : 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
     rating : 4.3
   },
   {id:4,
     name : 'Running Shoes',
     price : 199.99,
     category : 'Fashion',
     image : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
     rating : 4.7
   },
   
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
  <div style={{padding : '20px'}}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1>My E-commerce Store</h1>
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

{/* SEARCH BAR */}
<div style={{
  marginTop: '20px',
  marginBottom: '20px',
  maxWidth: '600px',
  margin: '20px auto'
}}>
  <div style={{ position: 'relative' }}>
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

{/* CATEGORY FILTER - Starting with just one button */}
{/* CATEGORY FILTERS */}
<div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '20px',
  marginBottom: '30px'
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
            {/* Cart Header with Close Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px',
              borderBottom: '2px solid #ddd',
              paddingBottom: '10px'
            }}>
              <h2 style={{ margin: 0 }}>Shopping Cart</h2>
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
                    backgroundColor: '#f9f9f9',
                  }}>
                    {/* Product name and remove button row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'start',
              marginBottom: '10px'
            }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>
            {item.name}
          </h3>
          
          {/* Remove button (trash icon) */}
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

        {/* Price */}
        <p style={{ margin: '5px 0', color: '#666' }}>
          Price: <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
            ${item.price}
          </span>
        </p>

        {/* Quantity controls row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          marginTop: '10px',
          marginBottom: '10px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#666' }}>Quantity:</span>
          
          {/* Minus button */}
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
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            −
          </button>
          
          {/* Quantity number */}
          <span style={{
            minWidth: '30px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            {item.quantity}
          </span>
          
          {/* Plus button */}
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
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            +
          </button>
        </div>

        {/* Subtotal */}
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
                
                {/* Cart Total and Checkout */}
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
          </div>
        </>
      )}
      
   
    
  </div>
 );

}

export default App;
