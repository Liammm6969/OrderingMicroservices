import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/AddToCart.css";

export default function AddToCart() {
  const { cartItem, updateCart, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuantity = (delta) => {
    if (!cartItem) return;
    updateCart({ quantity: Math.max(1, (cartItem.quantity || 1) + delta) });
  };

  const subtotal = cartItem ? cartItem.price * cartItem.quantity : 0;
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5003/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: [cartItem.id],
          userEmail: checkoutEmail,
        }),
      });
      if (!response.ok) throw new Error("Failed to place order");
      setOrderSuccess(true);
      removeFromCart();
      setShowModal(false);
      setCheckoutName("");
      setCheckoutEmail("");
      setCheckoutAddress("");
      setPaymentMethod("Cash on Delivery");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deliveryTimeMsg = "Expected delivery: 3-5 business days";

  return (
    <div className="cart-root">
      <div className="cart-container">
        <h2 className="cart-title">Your cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cartItem ? (
              <div className="cart-item-row">
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">{cartItem.name}</div>
                  <div className="cart-item-desc">{cartItem.description}</div>
                  <div className="cart-item-size">Size: {cartItem.size || <span className="cart-item-size-empty">-</span>}</div>
                </div>
                <div className="cart-item-price">₱{cartItem.price.toLocaleString()}</div>
              </div>
            ) : (
              <div className="cart-empty">Your cart is empty.</div>
            )}
            {cartItem && (
              <div className="cart-controls">
                <button
                  onClick={removeFromCart}
                  className="cart-remove-btn"
                  title="Remove"
                >
                  <span role="img" aria-label="delete">🗑️</span>
                </button>
                <span className="cart-qty">{cartItem.quantity}</span>
                <button
                  onClick={() => handleQuantity(-1)}
                  className="cart-qty-btn"
                  disabled={cartItem.quantity === 1}
                >
                  -
                </button>
                <button
                  onClick={() => handleQuantity(1)}
                  className="cart-qty-btn"
                >
                  +
                </button>
              </div>
            )}
            <hr className="cart-divider" />
          </div>
          <div className="cart-summary">
            <div className="cart-summary-title">Summary</div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{cartItem ? `₱${subtotal.toLocaleString()}` : '-'}</span>
            </div>
            <div className="cart-summary-row">
              <span>Estimated Delivery Fee</span>
              <span>{cartItem ? `₱${deliveryFee}` : '-'}</span>
            </div>
            <hr className="cart-summary-divider" />
            <div className="cart-summary-total-row">
              <span>Total</span>
              <span>{cartItem ? `₱${total.toLocaleString()}` : '-'}</span>
            </div>
            <button
              className="cart-checkout-btn"
              disabled={!cartItem}
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
