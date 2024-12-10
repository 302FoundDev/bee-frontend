import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MotionConfig } from 'framer-motion'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

createRoot(document.getElementById('root')!).render(
  <KindeProvider
    clientId="556f3e9ae9ed4b5c90c5dde853235518"
    domain="https://notabussiness.kinde.com"
    redirectUri="http://localhost:5173"
    logoutUri="http://localhost:5173"
  >
    <Router>
      <AuthProvider>
        <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
          <App />
        </MotionConfig>
      </AuthProvider>
    </Router>
  </KindeProvider>
)
