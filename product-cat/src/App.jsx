import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import ProductInfo from './pages/ProductInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from './Auth/LoginButton';
import LogoutButton from './Auth/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./pages/Profile";

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/productinfo" element={<ProductInfo />} />
            </>
          ) : (
            <></>
          )}



        </Routes>
      </Router>
    </>
  )
}

export default App
