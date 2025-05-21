import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import ProductInfo from './pages/ProductInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productinfo" element={<ProductInfo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
