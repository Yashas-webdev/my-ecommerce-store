import React from 'react';

const ProductCard = React.memo(({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  return (
    <div 
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
          onClick={() => onToggleWishlist(product)}
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
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      <h3 style={{ margin: '10px 0', fontSize: '18px' }}>
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
      <p style={{ color: '#666', margin: '5px 0' }}>
        Category: {product.category}
      </p>
      <p style={{ margin: '8px 0' }}>
        Rating: {product.rating} ⭐
      </p>

      <button
        onClick={() => onAddToCart(product)}
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
  );
});

// Display name for debugging in React DevTools
ProductCard.displayName = 'ProductCard';

export default ProductCard;