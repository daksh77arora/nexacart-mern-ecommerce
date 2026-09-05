import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <ImageWithFallback src={product.imageUrl} alt={product.name} className="product-image" />
        {product.category && <span className="product-tag">{product.category}</span>}
        {product.stock === 0 && <span className="stock-badge stock-badge--out">Out of stock</span>}
        {product.stock > 0 && product.stock <= 5 && <span className="stock-badge">Only {product.stock} left</span>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        {product.ratings && <div className="product-rating">★ {product.ratings} <span>({product.numReviews || 0})</span></div>}
        <p className="price">₹{Number(product.price).toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
