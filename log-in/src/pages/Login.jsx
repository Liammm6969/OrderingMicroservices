import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { TextField } from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login-container">
      
      <div className="login-side">
        <div className="login-content">
          <h2 className="login-txt">Log In</h2>
          <form className="login-form">
            <div className="form-group">
              <TextField
                type="text"
                variant="standard"
                name="username"
                placeholder="Username"
                value={formData.username}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                variant="standard"
                value={formData.password}
                required
                className="form-input"
              />
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
            <div className="form-footer">
              <div className="signup-link">
                <span>Don't have an account yet?</span> 
                <a href="#"> <u>Sign Up</u></a>
              </div>
              <div className="forgot-password">
                <a href="#"><u>Forgot Password?</u></a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="loginBg">
      <h1 className="app-name">E-Commerce</h1>
      <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, repudiandae commodi deleniti quia nihil aspernatur quidem.</p>
        <div className="image-content">
        <div className="pic">
          <img src="../src/pictures/LogIn.png" alt=" " />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;