import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

// Components
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import Home from './pages/home/Home';

// User Components
import Login from './components/User/Login';
import Signup from './components/User/SignUp';
import Cart from './Cart/CartPage';
import ForgotPassword from "./components/User/ForgotPassword";
import UpdateUsers from "./components/User/updateuser";
import ResetPassword from "./components/User/ResetPassword";
import OTPVerification from "./components/User/OTPVerification";
import OTP from "./components/User/otpregiter";
import Users from "./components/User/displayuserdetails";
import CreateUsers from "./components/User/createuser";
import AccountDetails from "./components/User/AccountDetails";
import SecuritySettings from "./components/User/SecuritySettings";
 
import NotFound from './Cart/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminClothesManager from './admin/AdminClothesManager';
import ContactUs from './pages/home/clothes/ContactUs';
import Faq from './pages/home/clothes/Faq';
import Shippingreturns from './pages/home/clothes/Shippingreturns';
 

// Route Guards
const AdminRouteGuard = ({ element }) => {
  return Cookies.get("role") === "admin" ? element : <Navigate to="/login" />;
};

const UserRouteGuard = ({ element }) => {
  return Cookies.get("role") === "user" ? element : <Navigate to="/login" />;
};

const AllUsersRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");
  return ["admin", "user", "staff"].includes(userRole) ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>

 
      <Header />
      <ToastContainer />
      <Routes>
        {/* Loyalty Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<AllLoyaltyForm />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />

        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/updateuser" element={<UpdateUsers />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/otp" element={<OTP />} />

        {/* Protected User Routes */}
        <Route path="/users" element={<AllUsersRouteGuard element={<Users />} />} />
        <Route path="/createuser" element={<AdminRouteGuard element={<CreateUsers />} />} />
        <Route path="/accountdetails" element={<UserRouteGuard element={<AccountDetails />} />} />
        <Route path="/securitysettings" element={<UserRouteGuard element={<SecuritySettings />} />} />

        {/* Staff Routes */}
        {/* Uncomment if needed */}
        {/* <Route path="/staff" element={<AdminRouteGuard element={<Staff />} />} />
        <Route path="/createstaff" element={<AdminRouteGuard element={<CreateStaff />} />} />
        <Route path="/updatestaff/:id" element={<AdminRouteGuard element={<UpdateStaff />} />} /> */}

        {/* Cart & Admin */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clothes" element={<AdminClothesManager />} />

        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/shipping-returns" element={<Shippingreturns />} />

         
          
      </Routes>
       
    </>
  );
}

export default App;
