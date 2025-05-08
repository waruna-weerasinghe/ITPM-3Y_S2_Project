import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import { ProductProvider } from './context/ProductContext';

// Create Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </Provider>
  </React.StrictMode>
);
