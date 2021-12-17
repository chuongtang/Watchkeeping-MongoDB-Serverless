import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import dotenv from 'dotenv';


import { Auth0Provider } from "@auth0/auth0-react";


const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientID = import.meta.env.VITE_AUTH_CLIENTID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
