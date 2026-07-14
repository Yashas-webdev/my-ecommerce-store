import React from 'react';

const Hero = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '80px 20px',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Decorative Circle 1 */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        top: '-100px',
        right: '-100px'
      }}></div>

      {/* Decorative Circle 2 */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        bottom: '-50px',
        left: '-50px'
      }}></div>

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        margin: '0 auto'
      }}>

        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Welcome to Elegant Shop
        </h1>

        <p style={{
          fontSize: '24px',
          marginBottom: '15px',
          opacity: 0.95
        }}>
          Discover Amazing Products at Unbeatable Prices
        </p>

        <p style={{
          fontSize: '18px',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          ✨ Premium Quality • 🚚 Free Shipping • 💯 100% Satisfaction
        </p>

        {/* Shop Now Button */}
        <button
          onClick={() => {
            window.scrollTo({
              top: 600,
              behavior: 'smooth'
            });
          }}
          style={{
            backgroundColor: 'white',
            color: '#667eea',
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          Shop Now →
        </button>

      </div>
    </div>
  );
};

export default Hero;