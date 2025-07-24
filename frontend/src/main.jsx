import React from 'react'; // 🔧 Esto es necesario para evitar errores en algunos entornos
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css'; // 🟨 Asegúrate que existe y contiene las directivas de Tailwind
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
