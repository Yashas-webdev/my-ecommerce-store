import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Search, User, LogOut, ShieldCheck, Sparkles, Heart, LayoutDashboard, Store } from 'lucide-react';

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    setShowCart,
    cart,
    wishlist,
    cartBounce,
    user,
    openAuthModal,
    logout,
    setActiveTab,
    viewMode,
    setViewMode
  } = useShop();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      boxShadow: '0 4px 25px rgba(15, 23, 42, 0.04)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px 12px 24px'
      }}>
        {/* Top Header Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Store Brand: LUMINA LUXE */}
          <div 
            onClick={() => setViewMode('store')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
              position: 'relative'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: '25px', fontWeight: '800', letterSpacing: '-0.5px', margin: 0, lineHeight: 1 }}>
                LUMINA LUXE
              </h1>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: '700' }}>
                Boutique Store
              </span>
            </div>
          </div>

          {/* Search Bar */}
          {viewMode === 'store' && (
            <div style={{ flex: '1 1 320px', maxWidth: '480px', position: 'relative' }}>
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }} 
              />
              <input
                type="text"
                placeholder="Search electronics, fashion apparel, home decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input"
                style={{
                  width: '100%',
                  paddingLeft: '44px',
                  paddingRight: '16px',
                  height: '46px',
                  fontSize: '14px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}
              />
            </div>
          )}

          {/* Controls & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* ADMIN DEDICATED PANEL SWITCH BUTTON */}
            {user && user.isAdmin && (
              <button
                onClick={() => setViewMode(viewMode === 'admin' ? 'store' : 'admin')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: viewMode === 'admin'
                    ? 'linear-gradient(135deg, #0284c7, #2563eb)'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)',
                  transition: 'all 0.25s ease'
                }}
              >
                {viewMode === 'admin' ? (
                  <>
                    <Store size={16} /> 🛒 Storefront View
                  </>
                ) : (
                  <>
                    <LayoutDashboard size={16} /> 🛡️ Admin Dashboard
                  </>
                )}
              </button>
            )}

            {/* Wishlist Button */}
            {viewMode === 'store' && (
              <button
                onClick={() => {
                  setActiveTab('wishlist');
                  setShowCart(true);
                }}
                className="glass-button-secondary"
                style={{
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '12px',
                  position: 'relative'
                }}
              >
                <Heart size={18} color="#e11d48" fill={wishlist.length > 0 ? "#e11d48" : "none"} />
                <span style={{ fontSize: '14px', fontWeight: '700' }}>{wishlist.length}</span>
              </button>
            )}

            {/* User Profile */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="glass-button-secondary"
                  style={{
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '12px',
                    borderColor: 'rgba(99, 102, 241, 0.35)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #0284c7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="glass-panel animate-fadeIn" style={{
                    position: 'absolute',
                    right: 0,
                    top: '52px',
                    width: '220px',
                    padding: '12px',
                    zIndex: 200,
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 12px 30px -5px rgba(15, 23, 42, 0.12)'
                  }}>
                    <div style={{ padding: '8px 12px', marginBottom: '8px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
                      <p style={{ fontWeight: '700', fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>{user.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{user.email}</p>
                      {user.isAdmin && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10px',
                          color: '#0284c7',
                          background: 'rgba(2, 132, 199, 0.12)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          marginTop: '6px',
                          fontWeight: '700'
                        }}>
                          <ShieldCheck size={12} /> Store Admin
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '10px',
                        color: '#dc2626',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="glass-button-secondary"
                style={{
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '12px'
                }}
              >
                <User size={18} />
                <span style={{ fontSize: '14px', fontWeight: '700' }}>Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            {viewMode === 'store' && (
              <button
                onClick={() => {
                  setActiveTab('cart');
                  setShowCart(true);
                }}
                className="glass-button"
                style={{
                  padding: '10px 20px',
                  height: '46px',
                  borderRadius: '12px',
                  transform: cartBounce ? 'scale(1.1)' : 'scale(1)',
                  animation: cartBounce ? 'cartBounce 0.5s ease-in-out' : 'none'
                }}
              >
                <ShoppingCart size={18} />
                <span>Cart ({cart.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        {viewMode === 'store' && (
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            <CategoryPill label="✨ All Collection" value="All" />
            <CategoryPill label="📱 Electronics" value="Electronics" />
            <CategoryPill label="👕 Fashion Apparel" value="Fashion" />
            <CategoryPill label="🏠 Home Decor" value="Home" />
          </div>
        )}
      </div>
    </header>
  );
};

const CategoryPill = ({ label, value }) => {
  const { selectedCategory, setSelectedCategory } = useShop();
  const isActive = selectedCategory === value;

  return (
    <button
      onClick={() => setSelectedCategory(value)}
      style={{
        padding: '8px 18px',
        borderRadius: '20px',
        border: isActive ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(203, 213, 225, 0.8)',
        background: isActive 
          ? 'linear-gradient(135deg, #6366f1, #0284c7)' 
          : 'rgba(255, 255, 255, 0.85)',
        color: isActive ? '#ffffff' : 'var(--text-muted)',
        fontSize: '13px',
        fontWeight: isActive ? '700' : '600',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s ease',
        boxShadow: isActive ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none'
      }}
    >
      {label}
    </button>
  );
};

export default Header;