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
     category : 'Electonics',
     image : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
     rating : 4.5
   },
   {id:2,
     name : 'Smart Watch',
     price : 199.99,
     category : 'Electonics',
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
     name : 'Wireless Headphones',
     price : 199.99,
     category : 'Electonics',
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
    🛒Cart : {cart.length} items;
   </button>

      {/* TEMPORARY TEST - We'll remove this soon */}
    <p style={{ color: 'red', fontWeight: 'bold' }}>
      Cart sidebar state: {showCart ? 'OPEN' : 'CLOSED'}
    </p>
</div>

<p>We have {products.length} products</p>

    {
      <p>We have {products.length} products in our store</p>
    }


    <h2 style={{marginTop: '30px', marginBottom: '20px'}}>Our Products:</h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    }}></div>

    {products.map((product) => (
      <div key={product.id} style={{
        border: '2px solid #ddd',
        padding: '15px',
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1',
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
        <h3 style={{margin:'10px 0', fontSize:'18px'}}>{product.name}</h3>
        <p style={{fontSize: '24px',
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

      {/*  add to the button cart */}
      <button onClick={()=>addToCart(product)} 
      style={{backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '10 px',
        transition: 'background-color 0.2s'
        }}
        
        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
          Add to Cart
        </button>
      </div>
    ))}

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
                    backgroundColor: '#f9f9f9'
                  }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
                      {item.name}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      Price: <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                        ${item.price}
                      </span>
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      Quantity: <span style={{ fontWeight: 'bold' }}>
                        {item.quantity}
                      </span>
                    </p>
                    <p style={{ 
                      margin: '10px 0 0 0', 
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
