import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchInput), 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="shop-container">
      <h2>All Products</h2>
      <div className="search-wrap">
        <input
          type="search"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-bar"
          aria-label="Search products"
        />
        {searchInput && <button type="button" className="search-clear" onClick={() => setSearchInput('')} aria-label="Clear search">×</button>}
      </div>
      {loading ? (
        <div className="product-grid">{Array.from({ length: 4 }, (_, index) => <ProductCardSkeleton key={index} />)}</div>
      ) : (
        filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)}</div> : <div className="empty-state"><h3>No products found</h3><p>Try a different search term.</p></div>
      )}
    </div>
  );
};

export default Shop;
