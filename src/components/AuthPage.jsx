import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Mail, Lock, User, UserPlus, LogIn, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const { login, register, authLoading, authError } = useShop();

  // Show Signup by default when unauthenticated
  const [isSignUp, setIsSignUp] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      const result = await register(name, email, password);
      if (result && result.exists) {
        // If email already exists, switch directly to Sign In page
        setIsSignUp(false);
      }
    } else {
      await login(email, password);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    await login(demoEmail, demoPassword);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      background: '#f8fafc'
    }}>
      {/* Ambient Soft Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glass Card */}
      <div 
        className="glass-panel animate-fadeIn"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '40px',
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.88)',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08), 0 0 30px rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: '24px'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: '30px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            <Sparkles size={16} color="var(--primary)" /> LUMINA LUXE AUTH
          </div>

          <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            {isSignUp 
              ? 'Sign up to unlock the exclusive Lumina Luxe boutique catalog' 
              : 'Sign in to access your cart, orders & account'}
          </p>
        </div>

        {/* Error Alert */}
        {authError && (
          <div style={{
            background: 'rgba(254, 242, 242, 0.9)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '13px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            ⚠️ {authError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px', fontWeight: '600' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', paddingLeft: '46px', height: '46px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px', fontWeight: '600' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                style={{ width: '100%', paddingLeft: '46px', height: '46px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px', fontWeight: '600' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
                style={{ width: '100%', paddingLeft: '46px', height: '46px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="glass-button"
            style={{
              width: '100%',
              height: '48px',
              marginTop: '10px',
              fontSize: '15px',
              borderRadius: '12px'
            }}
          >
            {authLoading 
              ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
              : (
                isSignUp ? (
                  <>
                    <UserPlus size={18} /> Sign Up Now <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    <LogIn size={18} /> Sign In to Store <ArrowRight size={16} />
                  </>
                )
              )}
          </button>
        </form>

        {/* Direct Link Navigation */}
        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
          {isSignUp ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  padding: 0,
                  marginLeft: '4px'
                }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  padding: 0,
                  marginLeft: '4px'
                }}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>

        {/* Quick Demo Test Logins */}
        <div style={{ marginTop: '20px', paddingTop: '16px' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '11px', textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>
            ⚡ Instant Demo Login Test
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleDemoLogin('john@example.com', 'password123')}
              className="glass-button-secondary"
              style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@example.com', 'password123')}
              className="glass-button-secondary"
              style={{ flex: 1, padding: '8px', fontSize: '12px', borderColor: 'rgba(99, 102, 241, 0.4)', color: 'var(--primary)' }}
            >
              Admin Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
