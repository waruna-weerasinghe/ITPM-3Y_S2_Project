import './App.css';
import Header from './components/Loyalty/Header';
import Loyalty_Add_Form from './components/Loyalty/Loyalty_Add_Form';
import Home from './pages/home/Home';
import './index.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Loyalty_Add_Form />
      <footer>Footer</footer>


    </div>
  );
}

export default App;
