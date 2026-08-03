import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import products from '../data/product';

const ProductList = () => {

  const {
    searchQuery,
    selectedCategory,
    addToCart,
    toggleWishlist,
    wishlist,
  } = useShop();

  // useMemo - only recalculates when
  // searchQuery or selectedCategory changes
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ padding: '0 20px' }}>

      {/* Products Count */}
      <p style={{
        marginTop: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        We have {products.length} products in our store
      </p>

      {/* Products Title */}
      <h2 style={{
        marginTop: '30px',
        marginBottom: '20px'
      }}>
        Our Products:
      </h2>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
        marginBottom: '40px'
      }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.some(
              item => item.id === product.id
            )}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#666'
        }}>
          <p style={{
            fontSize: '48px',
            margin: '20px 0'
          }}>
            🔍
          </p>
          <h3 style={{
            fontSize: '24px',
            margin: '10px 0'
          }}>
            No products found
          </h3>
          <p>Try searching for something else</p>
          {searchQuery && (
            <p style={{
              marginTop: '10px',
              color: '#999'
            }}>
              No results for "{searchQuery}"
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default ProductList;