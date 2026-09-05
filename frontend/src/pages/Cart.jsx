import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import ImageWithFallback from '../components/ImageWithFallback';
import { useToast } from '../components/Toast/ToastContext';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    showToast('Item removed from cart', 'info');
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = totalPrice >= 999 ? 0 : 49;
  const tax = Number((totalPrice * 0.03).toFixed(2));
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <ImageWithFallback src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{Number(item.price).toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQty(item, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleUpdateQty(item, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item.productId)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><strong>₹{totalPrice.toFixed(2)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>{shipping ? `₹${shipping.toFixed(2)}` : 'Free'}</strong></div>
            <div className="summary-row"><span>Tax</span><strong>₹{tax.toFixed(2)}</strong></div>
            <div className="summary-total"><span>Total</span><strong>₹{grandTotal.toFixed(2)}</strong></div>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
