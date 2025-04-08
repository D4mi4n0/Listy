// Importa il modulo React dalla libreria 'react'
import React from 'react';
// Importa il modulo ReactDOM dalla libreria 'react-dom/client'
import ReactDOM from 'react-dom/client';
// Importa il file CSS per gli stili
import './index.css';
// Importa il componente principale dell'applicazione
import App from './App';

// Crea una radice ReactDOM collegata all'elemento con id 'root' nel DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
// Esegue il rendering del componente App all'interno della modalità Strict di React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
