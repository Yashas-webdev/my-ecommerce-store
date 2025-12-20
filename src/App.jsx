import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Star } from 'lucide-react';

function App() {

 const [cart, setCart] = useState([]);
 const [wishlist, setWishlist] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');

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
  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
    🛒 Cart: {cart.length} items
  </div>
</div>

<p>We have {products.length} products</p>

    {
      <p>We have {products.length} products in our store</p>
    }


    <h2>Our Products:</h2>

    {products.map((product) => (
      <div key={product.id} style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10 px 0'
      }}>
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating} ⭐</p>

      {/*  add to the button cart */}
      <button onClick={()=>addToCart(product)} 
      style={{backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'}}>
        </button>
      </div>
    ))}
    
  </div>
 );

}

export default App;
