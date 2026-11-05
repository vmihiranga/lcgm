import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/*
  PORT=5000
  JWT_SECRET=lions_metro_premium_secret_2026
  NODE_ENV=development
  ADMIN_EMAIL=admin@lions.org
  ADMIN_PASSWORD=w
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
