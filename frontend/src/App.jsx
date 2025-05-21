import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import ProductInfo from './pages/ProductInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { CartProvider } from "./context/CartContext";
import AddToCart from './pages/AddToCart';
import Signup from './pages/Signup';
function App() {


  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/addtocart" element={<AddToCart />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
