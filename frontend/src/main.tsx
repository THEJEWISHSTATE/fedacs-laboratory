// ============================================
// FILE: main.tsx
// Punto di ingresso principale dell'applicazione React
// ============================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importiamo i CSS globali (creeremo dopo)

/**
 * Inizializza l'app React e la monta nel DOM.
 * Utilizza la nuova API createRoot di React 18.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Fallback di sicurezza se l'elemento #root non esiste
  throw new Error(
    "Elemento root non trovato. Verifica che index.html contenga un elemento con id 'root'."
  );
}

// Crea una root React
const root = ReactDOM.createRoot(rootElement);

// Renderizza l'app all'interno della root
root.render(
  <React.StrictMode>
    {/* StrictMode aiuta a identificare potenziali problemi durante lo sviluppo */}
    <App />
  </React.StrictMode>
);

// Informazioni di debug (visibili solo in sviluppo)
if (import.meta.env.DEV) {
  console.log(
    `%c🚀 FEDACS Lab avviato in modalità sviluppo`,
    'color: #3B82F6; font-weight: bold; font-size: 14px;'
  );
  console.log(`Ambiente: ${import.meta.env.MODE}`);
  console.log(`Base URL: ${import.meta.env.BASE_URL}`);
}
