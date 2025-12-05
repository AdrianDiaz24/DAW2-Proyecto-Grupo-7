/**
 * @file Punto de entrada de la aplicación React.
 * @description Renderiza el componente raíz de la aplicación en el DOM.
 * @requires react
 * @requires react-dom/client
 * @requires ./styles/index.css
 * @requires ./App
 * @requires ./reportWebVitals
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
