import React from 'react';
import { useShop } from '../context/ShopContext';

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
  } = useShop();

  // If cart is not open, render nothing
  if (!showCart) return null;

  return (
    <>
      {/* Dark Overlay - click to close */}
      <div
        onClick={() => setShowCart(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}
      />

      {/* Cart Sidebar Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        maxWidth: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000,
        padding: '20px',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.3)',
        overflowY: 'auto'
      }}>

        {/* ── Sidebar Header with Tabs ── */}
        <div style={{ marginBottom: '20px' }}>

          {/* Top Row - Tabs + Close Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>

            {/* Tab Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>

              {/* Cart Tab */}
              <button
                onClick={() => setActiveTab('cart')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'cart'
                    ? '3px solid #6366f1'
                    : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeTab === 'cart' ? '#6366f1' : '#666',
                  fontSize: '18px',
                  fontWeight: activeTab === 'cart' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                🛒 Cart ({cart.length})
              </button>

              {/* Wishlist Tab */}
              <button
                onClick={() => setActiveTab('wishlist')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'wishlist'
                    ? '3px solid #6366f1'
                    : '3px solid transparent',
                  backgroundColor: 'transparent',
                  color: activeTab === 'wishlist' ? '#6366f1' : '#666',
                  fontSize: '18px',
                  fontWeight: activeTab === 'wishlist' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ❤️ Wishlist ({wishlist.length})
              </button>

            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCart(false)}
              style={{
                fontSize: '28px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ✕
            </button>

          </div>

          {/* Divider Line */}
          <div style={{ borderBottom: '2px solid #ddd' }}></div>
        </div>

        {/* ── CART TAB CONTENT ── */}
        {activeTab === 'cart' && (
          <>
            {cart.length === 0 ? (

              /* Empty Cart Message */
              <div style={{
                textAlign: 'center',
                marginTop: '100px',
                color: '#999'
              }}>
                <p style={{ fontSize: '48px', margin: '20px 0' }}>🛒</p>
                <p style={{ fontSize: '20px' }}>Your cart is empty</p>
                <p style={{ fontSize: '14px' }}>
                  Add some products to get started!
                </p>
              </div>

            ) : (
              <div>

                {/* Cart Items List */}
                {cart.map((item) => (
                  <div key={item.id} style={{
                    border: '1px solid #ddd',
                    padding: '15px',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                  }}>

                    {/* Item Image + Info Row */}
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>

                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }}
                      />

                      {/* Item Info */}
                      <div style={{ flex: 1 }}>

                        {/* Name + Remove Button */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: '8px'
                        }}>
                          <h3 style={{ margin: 0, fontSize: '16px' }}>
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '20px',
                              cursor: 'pointer',
                              color: '#d32f2f',
                              padding: '0'
                            }}
                          >
                            🗑️
                          </button>
                        </div>

                        {/* Price */}
                        <p style={{
                          margin: '5px 0',
                          color: '#666',
                          fontSize: '14px'
                        }}>
                          Price: <span style={{
                            fontWeight: 'bold',
                            color: '#2e7d32'
                          }}>
                            ${item.price}
                          </span>
                        </p>

                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '10px',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        fontWeight: 'bold',
                        color: '#666'
                      }}>
                        Quantity:
                      </span>

                      {/* Decrease */}
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '2px solid #ddd',
                          borderRadius: '5px',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        −
                      </button>

                      {/* Quantity Display */}
                      <span style={{
                        minWidth: '30px',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}>
                        {item.quantity}
                      </span>

                      {/* Increase */}
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '2px solid #ddd',
                          borderRadius: '5px',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p style={{
                      margin: '5px 0 0 0',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1976d2'
                    }}>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>

                  </div>
                ))}

                {/* Cart Total + Checkout */}
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    margin: '0 0 15px 0',
                    color: '#333'
                  }}>
                    Total: ${cartTotal.toFixed(2)}
                  </h3>
                  <button
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) =>
                      e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={(e) =>
                      e.target.style.backgroundColor = '#4CAF50'}
                  >
                    Proceed to Checkout
                  </button>
                </div>

              </div>
            )}
          </>
        )}

        {/* ── WISHLIST TAB CONTENT ── */}
        {activeTab === 'wishlist' && (
          <>
            {wishlist.length === 0 ? (

              /* Empty Wishlist Message */
              <div style={{
                textAlign: 'center',
                marginTop: '100px',
                color: '#999'
              }}>
                <p style={{ fontSize: '48px', margin: '20px 0' }}>❤️</p>
                <p style={{ fontSize: '20px' }}>Your wishlist is empty</p>
                <p style={{ fontSize: '14px' }}>
                  Click the heart on products you love!
                </p>
              </div>

            ) : (
              <div>

                {/* Wishlist Items */}
                {wishlist.map((item) => (
                  <div key={item.id} style={{
                    border: '1px solid #ddd',
                    padding: '15px',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#fff9f9'
                  }}>

                    {/* Item Image + Info */}
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '10px'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          margin: '0 0 5px 0',
                          fontSize: '16px'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          margin: '5px 0',
                          color: '#666',
                          fontSize: '14px'
                        }}>
                          {item.category}
                        </p>
                        <p style={{
                          margin: '5px 0',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#2e7d32'
                        }}>
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '10px'
                    }}>

                      {/* Add to Cart */}
                      <button
                        onClick={() => {
                          addToCart(item);
                          setActiveTab('cart');
                        }}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Add to Cart
                      </button>

                      {/* Remove from Wishlist */}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        style={{
                          padding: '10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}
          </>
        )}

      </div>
    </>
  );
};

export default CartSidebar;