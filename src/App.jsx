import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Star } from 'lucide-react';

function App() {
  
 const [cart, setCart] = useState([]);
 cosnt [wishlist, setWishlist] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('All');

 return(
  <div>
    <h1>My E-commerce Store</h1>
    <p>Cart has {cart.length} items</p>
    <p>Wishlist has {wishlist.lenght} items</p>
    <p>You searched for: {searchQuery}</p>
    <p>Current category: {selectedCategory}</p>
  </div>
 )
}

export default App;
