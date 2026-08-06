import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid rgba(226, 232, 240, 0.8)',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      padding: '60px 24px 30px 24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #0284c7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <h3 className="gradient-text" style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>
                NOVACRAFT
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
              Boutique MERN Stack e-commerce platform built with React, Node.js, Express, and MongoDB.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <FooterLink label="Electronics Collection" />
              <FooterLink label="Fashion Apparel" />
              <FooterLink label="Home & Office Decor" />
              <FooterLink label="Special Offers" />
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
              Customer Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <FooterLink label="Order Tracking" />
              <FooterLink label="Shipping & Delivery" />
              <FooterLink label="30-Day Returns" />
              <FooterLink label="Privacy Policy" />
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
              Store Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--primary)" /> support@novacraft.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#0284c7" /> +1 (555) 987-6543
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#e11d48" /> San Francisco, CA, USA
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          paddingTop: '24px',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '13px'
        }}>
          &copy; {new Date().getFullYear()} NovaCraft. All Rights Reserved. Crafted with MERN Stack & Premium UI.
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label }) => (
  <li>
    <a
      href="#"
      style={{
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'color 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
    >
      {label}
    </a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="glass-button-secondary"
    style={{
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}
  >
    {icon}
  </a>
);

export default Footer;