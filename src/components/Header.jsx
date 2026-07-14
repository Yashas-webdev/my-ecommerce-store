import React from 'react';
import { useShop } from '../context/ShopContext';

const Header = () => {

  const {
    searchQuery,
    setSearchQuery,
    setShowCart,
    cart,
    cartBounce,
  } = useShop();

  return (
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

        {/* Cart Button */}
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
            cursor: 'pointer',
            transition: 'transform 0.1s',
            transform: cartBounce ? 'scale(1.1)' : 'scale(1)',
            animation: cartBounce ? 'cartBounce 0.5s ease-in-out' : 'none'
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

      {/* Category Filter Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '0 20px',
        paddingBottom: '10px'
      }}>
        <CategoryButton label="All" />
        <CategoryButton label="📱 Electronics" value="Electronics" />
        <CategoryButton label="👕 Fashion" value="Fashion" />
        <CategoryButton label="🏠 Home" value="Home" />
      </div>

    </div>
  );
};

// ─────────────────────────────────────────
// Category Button Sub-Component
// ─────────────────────────────────────────
const CategoryButton = ({ label, value }) => {

  const { selectedCategory, setSelectedCategory } = useShop();

  // If no value passed, use label as value (for "All")
  const categoryValue = value || label;
  const isActive = selectedCategory === categoryValue;

  return (
    <button
      onClick={() => setSelectedCategory(categoryValue)}
      style={{
        padding: '10px 24px',
        border: isActive ? '2px solid #6366f1' : '2px solid #ddd',
        borderRadius: '20px',
        backgroundColor: isActive ? '#6366f1' : 'white',
        color: isActive ? 'white' : '#333',
        fontSize: '16px',
        fontWeight: isActive ? 'bold' : 'normal',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {label}
    </button>
  );
};

export default Header;