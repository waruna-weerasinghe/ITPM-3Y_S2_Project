import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';

import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import DeleteLoyaltyForm from './components/Loyalty/DeleteLoyalty.js';
import Home from './pages/home/Home.jsx';
import './index.css';
import Login from './components/User/Login.jsx';
import Signup from './components/User/SignUp.jsx';
import Cart from './Cart/Cart.jsx';
import Notfound from './Cart/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <>
      <Header />
      <ToastContainer />

      <Routes>
        <Route path="/list" element={<AllLoyaltyForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />
        <Route path="/deleteLoyaltyForm/:id" element={<DeleteLoyaltyForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/not-found" element={<Notfound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>

      <footer>Footer</footer>
    </>
  );
}

export default App;
