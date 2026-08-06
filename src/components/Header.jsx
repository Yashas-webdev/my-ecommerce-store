import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Search, User, LogOut, ShieldCheck, Sparkles, Heart } from 'lucide-react';

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
    selectedCategory,
    setSelectedCategory,
    setActiveTab
  } = useShop();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 13, 22, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
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
          {/* Store Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
            }}>
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <h1 className="gradient-text" style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>
                ELEGANT
              </h1>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
                Glass Store
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: '1 1 320px', maxWidth: '520px', position: 'relative' }}>
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
              placeholder="Search premium tech, fashion, home..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{
                width: '100%',
                paddingLeft: '44px',
                paddingRight: '16px',
                height: '44px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* User Controls & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Wishlist quick trigger */}
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
                borderRadius: '12px'
              }}
            >
              <Heart size={18} color="#ec4899" fill={wishlist.length > 0 ? "#ec4899" : "none"} />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{wishlist.length}</span>
            </button>

            {/* Auth / Profile Area */}
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
                    borderColor: 'rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>
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
                    background: 'rgba(15, 23, 42, 0.95)'
                  }}>
                    <div style={{ padding: '8px 12px', marginBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <p style={{ fontWeight: '600', fontSize: '14px', margin: 0, color: 'var(--text-main)' }}>{user.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{user.email}</p>
                      {user.isAdmin && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10px',
                          color: '#38bdf8',
                          background: 'rgba(56, 189, 248, 0.15)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          marginTop: '6px',
                          fontWeight: '600'
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
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '8px',
                        color: '#fca5a5',
                        fontWeight: '600',
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
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => {
                setActiveTab('cart');
                setShowCart(true);
              }}
              className="glass-button"
              style={{
                padding: '10px 20px',
                height: '44px',
                borderRadius: '12px',
                transform: cartBounce ? 'scale(1.1)' : 'scale(1)',
                animation: cartBounce ? 'cartBounce 0.5s ease-in-out' : 'none'
              }}
            >
              <ShoppingCart size={18} />
              <span>Cart ({cart.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          <CategoryPill label="✨ All Items" value="All" />
          <CategoryPill label="📱 Electronics" value="Electronics" />
          <CategoryPill label="👕 Fashion" value="Fashion" />
          <CategoryPill label="🏠 Home Decor" value="Home" />
        </div>
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
        border: isActive ? '1px solid rgba(139, 92, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4))' 
          : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        color: isActive ? '#ffffff' : 'var(--text-muted)',
        fontSize: '13px',
        fontWeight: isActive ? '600' : '500',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s ease',
        boxShadow: isActive ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none'
      }}
    >
      {label}
    </button>
  );
};

export default Header;