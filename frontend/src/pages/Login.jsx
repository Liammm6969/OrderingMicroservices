import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { TextField } from "@mui/material";
import axios from "axios";
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function SignUp() {
    navigate("/signup");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/auth/login", formData)
      .then((response) => {
        setTimeout(() => {
          alert("Login Successful");
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });

  }
  return (
    <div className='login-container'>
      <div className='login-side'>
        <div className='login-content'>
          <h2 className='login-txt'>Log In</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <TextField
                type='email'
                variant='standard'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className='form-input'
              />
            </div>

            <div className='form-group'>
              <TextField
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Password'
                variant='standard'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className='form-input'
              />
            </div>

            <button type='submit' className='login-button'>
              Login
            </button>
            <div className='form-footer'>
              <div className='signup-link'>
                <span>Don't have an account yet?</span>
                <a href='#' onClick={SignUp}>
                  {" "}
                  <u>Sign Up</u>
                </a>
              </div>
              <div className='forgot-password'>
                <a href='#'>
                  <u>Forgot Password?</u>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='loginBg'>
        <h1 className='app-name'>E-Commerce</h1>

        <p className='message'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          repudiandae commodi deleniti quia nihil aspernatur quidem.
        </p>
        <div className='image-content'>
          <div className='pic'>
            <img src='../src/pictures/LogIn.png' alt=' ' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;