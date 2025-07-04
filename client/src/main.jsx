// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './main.css';


import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* ⬇️ AuthProvider MUST come after BrowserRouter for useLocation() to work */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
