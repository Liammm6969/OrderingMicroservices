import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import ProductInfo from './pages/ProductInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productinfo" element={<ProductInfo />} />





        </Routes>
      </Router>
    </>
  )
}

export default App
