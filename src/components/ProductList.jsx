import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { Package, Search, RefreshCw, AlertTriangle } from 'lucide-react';

const ProductList = () => {
  const {
    products,
    loadingProducts,
    productsError,
    fetchProducts,
    searchQuery,
    selectedCategory,
    addToCart,
    toggleWishlist,
    wishlist,
  } = useShop();

  return (
    <div id="product-section" style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>

      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            <Package size={16} /> LIVE MONGO DB CATALOG
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>
            Featured <span className="gradient-text">Products</span>
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
          Showing <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{products.length}</span> items in store
        </p>
      </div>

      {/* Loading State */}
      {loadingProducts && (
        <div style={{
          padding: '80px 20px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <RefreshCw size={36} color="var(--primary)" style={{ animation: 'logo-spin 1.5s linear infinite', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', margin: '0 0 6px 0' }}>Fetching Products from Database...</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px', margin: 0 }}>Connecting to Express / MongoDB backend</p>
        </div>
      )}

      {/* Error State */}
      {productsError && !loadingProducts && (
        <div className="glass-panel" style={{
          padding: '30px',
          textAlign: 'center',
          borderColor: 'rgba(239, 68, 68, 0.4)',
          background: 'rgba(239, 68, 68, 0.08)'
        }}>
          <AlertTriangle size={36} color="#ef4444" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', color: '#fca5a5', margin: '0 0 8px 0' }}>Database Connection Error</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 16px 0' }}>{productsError}</p>
          <button onClick={fetchProducts} className="glass-button-secondary">
            Retry Connection
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loadingProducts && !productsError && products.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {products.map((product) => {
            const pId = product._id || product.id;
            return (
              <ProductCard
                key={pId}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some(
                  item => (item._id || item.id) === pId
                )}
              />
            );
          })}
        </div>
      )}

      {/* No Results Found */}
      {!loadingProducts && !productsError && products.length === 0 && (
        <div className="glass-panel" style={{
          textAlign: 'center',
          padding: '60px 20px',
          margin: '20px 0'
        }}>
          <Search size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>No Products Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 16px 0' }}>
            {searchQuery ? `No matches found for "${searchQuery}"` : `No products found in category "${selectedCategory}"`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;