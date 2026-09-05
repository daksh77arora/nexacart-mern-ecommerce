import React from 'react';
import './skeleton.css';

export const ProductCardSkeleton = () => (
  <div className="product-card product-card--skeleton" aria-hidden="true">
    <div className="skeleton skeleton--image" />
    <div className="product-info">
      <div className="skeleton skeleton--line skeleton--wide" />
      <div className="skeleton skeleton--line skeleton--short" />
      <div className="skeleton skeleton--button" />
    </div>
  </div>
);
