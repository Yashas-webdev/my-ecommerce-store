import React from 'react';

const Footer = () => {

  const quickLinks = ['About Us', 'Contact', 'Shipping Info', 'Returns'];
  const customerLinks = ['FAQ', 'Privacy Policy', 'Terms of Service', 'Support'];
  const socialIcons = ['📘', '🐦', '📷'];

  const linkStyle = {
    color: '#b0b0b0',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s'
  };

  const handleMouseEnter = (e) => { e.target.style.color = '#6366f1'; };
  const handleMouseLeave = (e) => { e.target.style.color = '#b0b0b0'; };

  const handleSocialEnter = (e) => { e.currentTarget.style.backgroundColor = '#6366f1'; };
  const handleSocialLeave = (e) => { e.currentTarget.style.backgroundColor = '#333'; };

  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '60px 20px 20px 20px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>

        {/* Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>

          {/* Column 1: About */}
          <div>
            <h3 style={{
              fontSize: '20px',
              marginBottom: '20px',
              color: '#6366f1'
            }}>
              Elegant Shop
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#b0b0b0',
              fontSize: '14px'
            }}>
              Your one-stop destination for premium quality
              products at unbeatable prices. We believe in
              delivering excellence with every purchase.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              marginBottom: '20px',
              color: 'white'
            }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link} style={{ marginBottom: '12px' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 style={{
              fontSize: '18px',
              marginBottom: '20px',
              color: 'white'
            }}>
              Customer Service
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {customerLinks.map((link) => (
                <li key={link} style={{ marginBottom: '12px' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 style={{
              fontSize: '18px',
              marginBottom: '20px',
              color: 'white'
            }}>
              Connect With Us
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '14px',
              marginBottom: '15px'
            }}>
              📧 support@elegantshop.com
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              📞 +1 (555) 123-4567
            </p>

            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '20px'
            }}>
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontSize: '20px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={handleSocialEnter}
                  onMouseLeave={handleSocialLeave}
                >
                  {icon}
                </a>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#b0b0b0',
            fontSize: '14px',
            margin: 0
          }}>
            &copy; 2026 Elegant Shop. All rights reserved.
            Made with ❤️ by You
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;