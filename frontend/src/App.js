import './App.css';
import Header from './components/Loyalty/Header';
import Loyalty_Add_Form from './components/Loyalty/Loyalty_Add_Form';
import Home from './pages/home/Home';

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Loyalty_Add_Form />
    </div>
  );
}

export default App;
