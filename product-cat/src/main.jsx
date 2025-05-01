import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Auth0Provider
      domain="dev-ysmsh3x5jebrkmue.us.auth0.com"
      clientId="DD0t6065y0VMj70DD7g7BxsHN11DtkCn"
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>

  </StrictMode>,
)
