import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { TextField } from "@mui/material";
import axios from "axios";
export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:9000/auth/register", formData);
      if (response.status !== 200) {
        throw new Error("Registration failed");
      }
      setSuccess(true);
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className='login-container'>
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
      <div className='login-side'>
        <div className='login-content'>
          <h2 className='login-txt'>Sign Up</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <TextField
                type='email'
                variant='standard'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
                className='form-input'
                disabled={loading}
              />
            </div>
            <div className='form-group'>
              <TextField
                type='password'
                name='password'
                placeholder='Password'
                variant='standard'
                value={formData.password}
                onChange={handleChange}
                required
                className='form-input'
                disabled={loading}
              />
            </div>
            <div className='form-group'>
              <TextField
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                variant='standard'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='form-input'
                disabled={loading}
              />
            </div>
            <button type='submit' className='login-button' disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <div className='form-footer'>
              <div className='signup-link'>
                <span>Already have an account?</span>
                <a href='#' onClick={goToLogin}>
                  <u>Log In</u>
                </a>
              </div>
            </div>
            {error && <div className='signup-error'>{error}</div>}
            {success && <div className='signup-success'>Registration successful!</div>}
          </form>
        </div>
      </div>

    </div>
  );
} 