import './App.css';
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
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
      </Routes>

      <footer>Footer</footer> 
    </>
  );
}

export default App;
