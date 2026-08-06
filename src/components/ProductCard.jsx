import React from 'react';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingCart, Heart, Tag, Eye } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const { openProductDetails } = useShop();
  const pId = product._id || product.id;
  const stockCount = product.countInStock || 10;

  const handleCardClick = (e) => {
    // If click was on button, don't trigger modal
    if (e.target.closest('button')) return;
    openProductDetails(product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {/* Category Tag */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '700',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
      }}>
        <Tag size={12} /> {product.category}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          zIndex: 10,
          background: isWishlisted ? 'rgba(225, 29, 72, 0.12)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          border: isWishlisted ? '1px solid rgba(225, 29, 72, 0.35)' : '1px solid rgba(226, 232, 240, 0.9)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
        }}
      >
        <Heart 
          size={18} 
          color={isWishlisted ? "#e11d48" : "#94a3b8"} 
          fill={isWishlisted ? "#e11d48" : "none"} 
        />
      </button>

      {/* Image Wrapper */}
      <div style={{
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        position: 'relative',
        background: '#f1f5f9'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Quick Details Hover Hint */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'none'
        }}>
          <Eye size={12} /> Click for Full Specs
        </div>
      </div>

      {/* Product Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Title & Stock Indicator Pill */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: '700',
            margin: 0,
            color: 'var(--text-main)',
            lineHeight: '1.3'
          }}>
            {product.name}
          </h3>
        </div>

        {/* Rating Stars & Stock Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color={i < Math.floor(product.rating || 4.5) ? "#f59e0b" : "#cbd5e1"}
                  fill={i < Math.floor(product.rating || 4.5) ? "#f59e0b" : "none"}
                />
              ))}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
              {product.rating || 4.5}
            </span>
          </div>

          <div className="badge-stock">
            <span className="pulse-dot" /> {stockCount} in stock
          </div>
        </div>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-dim)',
          margin: '0 0 16px 0',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description || 'High-quality premium product crafted with durable materials.'}
        </p>

        {/* Price & Add to Cart */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>Price</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="glass-button"
            style={{
              padding: '10px 16px',
              fontSize: '13px',
              borderRadius: '10px'
            }}
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;