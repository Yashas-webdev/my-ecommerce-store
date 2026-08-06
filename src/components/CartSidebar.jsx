import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Heart, X, Trash2, Plus, Minus, CreditCard, MapPin, CheckCircle, Lock } from 'lucide-react';

const CartSidebar = () => {
  const {
    showCart,
    setShowCart,
    cart,
    wishlist,
    activeTab,
    setActiveTab,
    cartTotal,
    updateQuantity,
    removeFromCart,
    addToCart,
    removeFromWishlist,
    createOrder,
    user,
    openAuthModal
  } = useShop();

  const [checkoutStep, setCheckoutStep] = useState(false);
  const [address, setAddress] = useState('123 Modern Glass Ave');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94103');
  const [country, setCountry] = useState('USA');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (!showCart) return null;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
      return;
    }

    setIsPlacingOrder(true);
    const result = await createOrder({ address, city, postalCode, country });
    setIsPlacingOrder(false);
    if (result) {
      setCheckoutStep(false);
    }
  };

  return (
    <>
      {/* Dark Glass Overlay */}
      <div
        onClick={() => setShowCart(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 8, 16, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 999
        }}
      />

      {/* Cart Drawer Panel */}
      <div
        className="animate-fadeIn"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '440px',
          maxWidth: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Tab Buttons */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              onClick={() => {
                setActiveTab('cart');
                setCheckoutStep(false);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'cart' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'cart' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShoppingCart size={15} /> Cart ({cart.length})
            </button>

            <button
              onClick={() => {
                setActiveTab('wishlist');
                setCheckoutStep(false);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'wishlist' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'wishlist' ? '#fff' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Heart size={15} /> Wishlist ({wishlist.length})
            </button>
          </div>

          <button
            onClick={() => setShowCart(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {/* CART TAB */}
          {activeTab === 'cart' && !checkoutStep && (
            <>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '80px', color: 'var(--text-dim)' }}>
                  <ShoppingCart size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
                  <h3 style={{ fontSize: '18px', margin: '0 0 6px 0', color: 'var(--text-main)' }}>Your Cart is Empty</h3>
                  <p style={{ fontSize: '14px', margin: 0 }}>Add products from the catalog to get started</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map((item) => {
                    const pId = item._id || item.id;
                    return (
                      <div key={pId} style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: 'var(--text-main)' }}>
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(pId)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#fca5a5',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <p style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '700', margin: '0 0 10px 0' }}>
                            ${Number(item.price).toFixed(2)}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              onClick={() => updateQuantity(pId, -1)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                background: 'rgba(255, 255, 255, 0.06)',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Minus size={14} />
                            </button>

                            <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(pId, 1)}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                background: 'rgba(255, 255, 255, 0.06)',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Plus size={14} />
                            </button>

                            <span style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-muted)' }}>
                              Total: <strong style={{ color: 'var(--text-main)' }}>${(item.price * item.quantity).toFixed(2)}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* CHECKOUT STEP FORM */}
          {activeTab === 'cart' && checkoutStep && (
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <MapPin size={20} color="#a78bfa" />
                <div>
                  <h4 style={{ fontSize: '14px', margin: 0, color: '#fff' }}>Shipping & Delivery Details</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Enter address to process MongoDB order</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px' }}>Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginTop: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span>Est. Tax (10%)</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                  <span>Shipping</span>
                  <span>{cartTotal > 100 ? 'FREE' : '$10.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                  <span>Final Total</span>
                  <span style={{ color: '#38bdf8' }}>
                    ${(cartTotal * 1.1 + (cartTotal > 100 ? 0 : 10)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPlacingOrder}
                className="glass-button"
                style={{ width: '100%', padding: '14px', marginTop: '8px' }}
              >
                {isPlacingOrder ? 'Processing Order...' : (
                  <>
                    <CheckCircle size={18} /> Confirm & Pay Order
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep(false)}
                className="glass-button-secondary"
                style={{ width: '100%' }}
              >
                Back to Cart Items
              </button>
            </form>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '80px', color: 'var(--text-dim)' }}>
                  <Heart size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
                  <h3 style={{ fontSize: '18px', margin: '0 0 6px 0', color: 'var(--text-main)' }}>Wishlist is Empty</h3>
                  <p style={{ fontSize: '14px', margin: 0 }}>Heart products while browsing to save for later</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {wishlist.map((item) => {
                    const pId = item._id || item.id;
                    return (
                      <div key={pId} style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0', color: 'var(--text-main)' }}>
                            {item.name}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '700', margin: '0 0 10px 0' }}>
                            ${Number(item.price).toFixed(2)}
                          </p>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                addToCart(item);
                                setActiveTab('cart');
                              }}
                              className="glass-button"
                              style={{ padding: '6px 12px', fontSize: '12px', flex: 1 }}
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(pId)}
                              className="glass-button-secondary"
                              style={{ padding: '6px 10px' }}
                            >
                              <Trash2 size={14} color="#fca5a5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {activeTab === 'cart' && !checkoutStep && cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 13, 22, 0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Total Amount</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#38bdf8' }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {user ? (
              <button
                onClick={() => setCheckoutStep(true)}
                className="glass-button"
                style={{ width: '100%', padding: '14px' }}
              >
                <CreditCard size={18} /> Proceed to Checkout
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="glass-button"
                style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}
              >
                <Lock size={18} /> Sign In to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;