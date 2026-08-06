import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight, Shield, Truck, RefreshCw, Zap, Star, Users, CheckCircle2 } from 'lucide-react';

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
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(241, 245, 249, 0.85))',
          border: '1px solid rgba(99, 102, 241, 0.22)',
          borderRadius: '28px',
          boxShadow: '0 20px 45px -15px rgba(99, 102, 241, 0.12)'
        }}
      >
        {/* Soft Ambient Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '20%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.14) 0%, transparent 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Hero Left Content */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '30px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              color: 'var(--primary)',
              fontSize: '13px',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              <Zap size={14} color="var(--primary)" /> Next-Gen E-Commerce Platform
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: '800',
              lineHeight: '1.15',
              margin: '0 0 16px 0',
              letterSpacing: '-1px',
              color: 'var(--text-main)'
            }}>
              Elevate Your Shopping with <span className="gradient-text">NovaCraft</span>
            </h2>

            {/* Subtext */}
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 28px 0'
            }}>
              Discover boutique electronics, fashion apparel, and home decor with real-time MongoDB database sync & secure JWT authentication.
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

          {/* Hero Right Floating Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <StatCard icon={<Users size={22} color="#6366f1" />} number="10,000+" label="Happy Shoppers" />
            <StatCard icon={<Star size={22} color="#f59e0b" fill="#f59e0b" />} number="4.9 ★★★★★" label="Average Rating" />
            <StatCard icon={<CheckCircle2 size={22} color="#10b981" />} number="100%" label="Verified Quality" />
            <StatCard icon={<Truck size={22} color="#0284c7" />} number="Fast Shipping" label="Free on $100+" />
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '36px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)'
        }}>
          <FeatureBadge icon={<Truck size={18} color="#0284c7" />} title="Express Delivery" desc="Free shipping on $100+" />
          <FeatureBadge icon={<Shield size={18} color="#6366f1" />} title="Secure Checkout" desc="JWT Encrypted Auth" />
          <FeatureBadge icon={<RefreshCw size={18} color="#e11d48" />} title="Instant Returns" desc="30-Day Money Back" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, number, label }) => (
  <div style={{
    padding: '20px',
    borderRadius: '18px',
    background: '#ffffff',
    border: '1px solid rgba(226, 232, 240, 0.9)',
    boxShadow: '0 8px 20px -5px rgba(15, 23, 42, 0.05)'
  }}>
    <div style={{ marginBottom: '10px' }}>{icon}</div>
    <strong style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', display: 'block' }}>{number}</strong>
    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>{label}</span>
  </div>
);

const FeatureBadge = ({ icon, title, desc }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '14px',
    background: '#ffffff',
    border: '1px solid rgba(226, 232, 240, 0.9)',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)'
  }}>
    <div style={{
      padding: '8px',
      borderRadius: '10px',
      background: 'rgba(241, 245, 249, 0.8)'
    }}>
      {icon}
    </div>
    <div>
      <h4 style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>{title}</h4>
      <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>{desc}</p>
    </div>
  </div>
);

export default Hero;