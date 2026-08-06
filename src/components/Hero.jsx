import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight, Shield, Truck, RefreshCw, Zap } from 'lucide-react';

const Hero = () => {
  const { openAuthModal, user } = useShop();

  return (
    <div style={{ maxWidth: '1280px', margin: '28px auto 0 auto', padding: '0 24px' }}>
      <div 
        className="glass-panel"
        style={{
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 27, 75, 0.6))',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '28px'
        }}
      >
        {/* Background Ambient Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-120px',
          left: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#a78bfa',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            <Zap size={14} color="#a78bfa" /> Next-Gen E-Commerce Experience
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '800',
            lineHeight: '1.15',
            margin: '0 0 16px 0',
            letterSpacing: '-1px'
          }}>
            Discover Exceptional Products with <span className="gradient-text">Glass Elegance</span>
          </h2>

          {/* Subtext */}
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0 0 28px 0',
            maxWidth: '580px'
          }}>
            Shop our curated collection of high-tech electronics, fashion accessories, and modern home decor with real-time MongoDB sync & secure MERN authentication.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#product-section"
              className="glass-button"
              style={{ padding: '14px 28px', textDecoration: 'none' }}
            >
              <ShoppingBag size={18} /> Explore Collection <ArrowRight size={16} />
            </a>

            {!user && (
              <button
                onClick={() => openAuthModal('register')}
                className="glass-button-secondary"
                style={{ padding: '14px 24px' }}
              >
                Create Account
              </button>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '40px',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <FeatureBadge icon={<Truck size={18} color="#38bdf8" />} title="Express Delivery" desc="Free shipping on $100+" />
          <FeatureBadge icon={<Shield size={18} color="#a78bfa" />} title="Secure Checkout" desc="JWT Encrypted Auth" />
          <FeatureBadge icon={<RefreshCw size={18} color="#f472b6" />} title="Instant Returns" desc="30-Day Money Back" />
        </div>
      </div>
    </div>
  );
};

const FeatureBadge = ({ icon, title, desc }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  }}>
    <div style={{
      padding: '8px',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.05)'
    }}>
      {icon}
    </div>
    <div>
      <h4 style={{ fontSize: '13px', fontWeight: '600', margin: 0, color: 'var(--text-main)' }}>{title}</h4>
      <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>{desc}</p>
    </div>
  </div>
);

export default Hero;