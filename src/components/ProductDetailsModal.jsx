import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Plus, Minus, Zap, Tag, CheckCircle2 } from 'lucide-react';

const ProductDetailsModal = () => {
  const {
    selectedProduct,
    closeProductDetails,
    addToCart,
    toggleWishlist,
    wishlist,
    setShowCart,
    setActiveTab
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const pId = selectedProduct._id || selectedProduct.id;
  const isWishlisted = wishlist.some(item => (item._id || item.id) === pId);
  const stockCount = selectedProduct.countInStock || 15;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    closeProductDetails();
    setActiveTab('cart');
    setShowCart(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel animate-fadeIn"
        style={{
          width: '100%',
          maxWidth: '860px',
          padding: '36px',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.96)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetails}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(241, 245, 249, 0.8)',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Product Image View */}
          <div>
            <div style={{
              width: '100%',
              height: '360px',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              background: '#f1f5f9',
              border: '1px solid rgba(226, 232, 240, 0.9)'
            }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
              }}>
                <Tag size={14} /> {selectedProduct.category}
              </div>
            </div>

            {/* Guarantees List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(241, 245, 249, 0.8)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                <Truck size={16} color="#0284c7" /> Express Shipping
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(241, 245, 249, 0.8)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                <RotateCcw size={16} color="#e11d48" /> 30-Day Money Back
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Title & Brand */}
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              NovaCraft Official Store
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 12px 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
              {selectedProduct.name}
            </h2>

            {/* Rating Stars & Stock Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      color={i < Math.floor(selectedProduct.rating || 4.5) ? "#f59e0b" : "#cbd5e1"}
                      fill={i < Math.floor(selectedProduct.rating || 4.5) ? "#f59e0b" : "none"}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {selectedProduct.rating || 4.5} <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>(124 reviews)</span>
                </span>
              </div>

              <div className="badge-stock">
                <span className="pulse-dot" /> {stockCount} units available
              </div>
            </div>

            {/* Price Tag */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>
                ${Number(selectedProduct.price).toFixed(2)}
              </span>
              <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                Free Delivery Included
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 20px 0' }}>
              {selectedProduct.description || 'Crafted with premium materials and ergonomic precision. Designed to deliver an unparalleled experience.'}
            </p>

            {/* Specifications Grid Table */}
            <div style={{
              borderRadius: '14px',
              background: 'rgba(241, 245, 249, 0.8)',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 10px 0', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📋 Product Specifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Brand:</span> <strong style={{ color: 'var(--text-main)' }}>NovaCraft</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Category:</span> <strong style={{ color: 'var(--text-main)' }}>{selectedProduct.category}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Warranty:</span> <strong style={{ color: 'var(--text-main)' }}>1-Year Guarantee</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Item ID:</span> <strong style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>#{pId.substring(18)}</strong></div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Select Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', borderRadius: '10px', padding: '4px', border: '1px solid rgba(203, 213, 225, 0.8)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '30px', height: '30px', borderRadius: '6px', border: 'none', background: 'rgba(241, 245, 249, 0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '15px', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '30px', height: '30px', borderRadius: '6px', border: 'none', background: 'rgba(241, 245, 249, 0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                className="glass-button"
                style={{ flex: 1, padding: '14px', fontSize: '14px' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)'
                }}
              >
                <Zap size={18} /> Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="glass-button-secondary"
                style={{ padding: '14px', borderRadius: '14px' }}
              >
                <Heart size={20} color={isWishlisted ? "#e11d48" : "#94a3b8"} fill={isWishlisted ? "#e11d48" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
