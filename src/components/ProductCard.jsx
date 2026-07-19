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
      
    </div>
  );
});

// Display name for debugging in React DevTools
ProductCard.displayName = 'ProductCard';

export default ProductCard;