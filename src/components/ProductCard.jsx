import React from 'react';
import { Star, ShoppingCart, Heart, Tag } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const pId = product._id || product.id;

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Category Tag */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 10,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#a78bfa',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <Tag size={12} /> {product.category}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product)}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          zIndex: 10,
          background: isWishlisted ? 'rgba(236, 72, 153, 0.25)' : 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(10px)',
          border: isWishlisted ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease'
        }}
      >
        <Heart 
          size={18} 
          color={isWishlisted ? "#ec4899" : "#cbd5e1"} 
          fill={isWishlisted ? "#ec4899" : "none"} 
        />
      </button>

      {/* Image Wrapper */}
      <div style={{
        width: '100%',
        height: '220px',
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.02)'
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
      </div>

      {/* Product Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: '700',
          margin: '0 0 8px 0',
          color: 'var(--text-main)',
          lineHeight: '1.3'
        }}>
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                color={i < Math.floor(product.rating || 4.5) ? "#f59e0b" : "#475569"}
                fill={i < Math.floor(product.rating || 4.5) ? "#f59e0b" : "none"}
              />
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
            {product.rating || 4.5}
          </span>
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
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Price</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8' }}>
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
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