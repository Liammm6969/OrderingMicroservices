import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@mui/material';
import {User} from "lucide-react"
function LoginButton() {
  const {loginWithPopup,isAuthenticated} = useAuth0();
    
  return (
    <>
    {!isAuthenticated ? ( <Button 
        variant="outlined" 
        color="primary" 
        sx={{ mr: 1 }}
        onClick={loginWithPopup}
        style={{ backgroundColor: '#1976d2', color: 'white' }} 
        startIcon={<User size={18}/>}
      >
        Login
      </Button>) : (
        "")}
   
  
    </>
  )
}

export default LoginButton