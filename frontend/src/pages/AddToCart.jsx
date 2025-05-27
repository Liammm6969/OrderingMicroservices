import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/AddToCart.css";
import axios from "axios";
import Navbar from "./Navbar";
export default function AddToCart() {
  const { cartItems, updateCart, removeFromCart, getCartTotal } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuantity = (item, delta) => {
    updateCart(item.id, item.size, {
      quantity: Math.max(1, (item.quantity || 1) + delta)
    });
  };

  const deliveryFee = 0;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID is missing. Please log in.");
        setLoading(false);
        return;
      }
      const response = await axios.post("http://localhost:3000/api/cart/checkout", {
        userId,
      });
      if (response.status !== 201) throw new Error("Failed to place order");
      setOrderSuccess(true);
      cartItems.forEach(item => removeFromCart(item.id, item.size));
      setShowModal(false);
      setCheckoutName("");
      setCheckoutEmail("");
      setCheckoutAddress("");
      setPaymentMethod("Cash on Delivery");
    } catch (err) {
      // setError(err.message || "Something went wrong");
      console.log("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deliveryTimeMsg = "Expected delivery: 3-5 business days";

  return (
    <div className="cart-root">
      <Navbar />
      <div className="cart-container">
        <h2 className="cart-title">Your cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-desc">{item.description}</div>
                    <div className="cart-item-size">Size: {item.size || <span className="cart-item-size-empty">-</span>}</div>
                  </div>
                  <div className="cart-item-price">₱{item.price.toLocaleString()}</div>
                  <div className="cart-controls">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="cart-remove-btn"
                      title="Remove"
                    >
                      <span role="img" aria-label="delete">🗑️</span>
                    </button>
                    <span className="cart-qty">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item, -1)}
                      className="cart-qty-btn"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleQuantity(item, 1)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="cart-empty">Your cart is empty.</div>
            )}
            <hr className="cart-divider" />
          </div>
          <div className="cart-summary">
            <div className="cart-summary-title">Summary</div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{cartItems.length > 0 ? `₱${subtotal.toLocaleString()}` : '-'}</span>
            </div>
            <div className="cart-summary-row">
              <span>Estimated Delivery Fee</span>
              <span>{cartItems.length > 0 ? `₱${deliveryFee}` : '-'}</span>
            </div>
            <hr className="cart-summary-divider" />
            <div className="cart-summary-total-row">
              <span>Total</span>
              <span>{cartItems.length > 0 ? `₱${total.toLocaleString()}` : '-'}</span>
            </div>
            <button
              className="cart-checkout-btn"
              disabled={cartItems.length === 0}
              onClick={() => setShowModal(true)}
            >
              Check Out
            </button>
            {orderSuccess && (
              <div className="cart-success-msg">
                Order placed successfully!<br />
                <span className="cart-delivery-time">{deliveryTimeMsg}</span>
              </div>
            )}
            {error && <div className="cart-error-msg">{error}</div>}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h3>Checkout</h3>
            <form onSubmit={handleCheckout} className="cart-modal-form">
              <label>
                Name:
                <input
                  type="text"
                  value={checkoutName}
                  onChange={e => setCheckoutName(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={e => setCheckoutEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
              <label>
                Address:
                <textarea
                  value={checkoutAddress}
                  onChange={e => setCheckoutAddress(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
              <label>
                Payment Method:
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option>Cash on Delivery</option>
                  <option>Credit Card</option>
                  <option>GCash</option>
                </select>
              </label>
              <div className="cart-modal-delivery-time">{deliveryTimeMsg}</div>
              <div className="cart-modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cart-modal-cancel" disabled={loading}>Cancel</button>
                <button type="submit" className="cart-modal-confirm" disabled={loading}>{loading ? "Placing Order..." : "Confirm Order"}</button>
              </div>
              {error && <div className="cart-error-msg">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
