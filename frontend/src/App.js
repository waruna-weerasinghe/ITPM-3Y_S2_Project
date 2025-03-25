import './App.css';
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import DeleteLoyaltyForm from './components/Loyalty/DeleteLoyalty.js';
import Approve from './components/Loyalty/approve.js';
import Home from './pages/home/Home';
import './index.css';
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
        <Route path="/approve/:id" element={<Approve/>} />
      </Routes>

      <footer>Footer</footer> 
    </>
  );
}

export default App;
