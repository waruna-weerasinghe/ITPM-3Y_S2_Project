import './App.css';
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import Home from './pages/home/Home';
import './index.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header /> {/* Always show the Header */}
      
      {/* Define Routes */}
      <Routes>
        {/* Define a route for Home */}
        <Route path="/" element={<Home />} />
        {/* Define a route for LoyaltyAddForm */}
        <Route path="/addForm" element={<LoyaltyAddForm />} />

      </Routes>

      <footer>Footer</footer> {/* Always show the Footer */}
    </>
  );
}

export default App;
