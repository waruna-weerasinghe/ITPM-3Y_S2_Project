import './App.css';
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import DeleteLoyaltyForm from './components/Loyalty/DeleteLoyalty.js';
import Home from './pages/home/Home';
import './index.css';
import Login from './components/User/Login.jsx';
import Signup from './components/User/SignUp.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
  
      <Routes>
        <Route path="/list" element={<AllLoyaltyForm/>} />
        <Route path="/" element={<Home />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />
        <Route path="/deleteLoyaltyForm/:id" element={<DeleteLoyaltyForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>

      <footer>Footer</footer>
    </>
  );
}

export default App;
