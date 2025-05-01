import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import Login from '../pages/Login';
function LoginButton() {
  const {loginWithRedirect,isAuthenticated} = useAuth0();
    
  return (
    <Button 
    variant="outlined" 
    color="primary" 
    sx={{ mr: 1 }}
    onClick={loginWithRedirect}
  >
    Login
  </Button>
  
  )
}

export default LoginButton