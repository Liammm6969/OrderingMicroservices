import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState(null);

  const addToCart = (product) => setCartItem(product);
  const updateCart = (updates) => setCartItem((item) => ({ ...item, ...updates }));
  const removeFromCart = () => setCartItem(null);

  return (
    <CartContext.Provider value={{ cartItem, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}