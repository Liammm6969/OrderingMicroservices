import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.size === product.size);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Send to backend cart-api
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      await axios.post("http://localhost:3000/api/cart", {
        userId,
        productId: product.id || product._id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Failed to add to cart backend:", err);
    }
  };

  const updateCart = (productId, size, updates) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, ...updates }
          : item
      )
    );
  };

  const removeFromCart = async (productId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
    // Send to backend cart-api
    try {
      const userId = localStorage.getItem("userId");
      // Find the item in the cart to get the right productId
      const item = cartItems.find(item => (item.id === productId || item.productId === productId || item._id === productId) && item.size === size);
      const backendProductId = item?.productId || item?.id || item?._id || productId;
      console.log('Removing from cart:', { userId, backendProductId }); // Debug log
      if (!userId) return;
      const response = await axios.delete("http://localhost:3000/api/cart", {
        data: {
          userId,
          productId: backendProductId
        }
      });
      console.log('Backend remove response:', response.data); // Debug log
    } catch (err) {
      console.error("Failed to remove from cart backend:", err);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCart,
      removeFromCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}