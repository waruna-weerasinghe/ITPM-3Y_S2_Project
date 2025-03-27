import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import cartReducer from './features/cartSlice'
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
