import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter here
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

// Components
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import Home from './pages/home/Home.jsx';

// User Components
import Login from './components/User/Login.jsx';
import Signup from './components/User/SignUp.jsx';
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import UpdateUsers from "./components/User/updateuser.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import OTPVerification from "./components/User/OTPVerification.jsx";
import OTP from "./components/User/otpregiter.jsx";
import Users from "./components/User/displayuserdetails.jsx";
import CreateUsers from "./components/User/createuser.jsx";
import AccountDetails from "./components/User/AccountDetails.jsx";
import SecuritySettings from "./components/User/SecuritySettings.jsx";
import Staff from "./components/User/staffdetails.jsx";
import CreateStaff from "./components/User/createstaff.jsx";
import UpdateStaff from "./components/User/staffupdate.jsx";

// Cart Components
import Cart from './Cart/Cart.jsx';
import Notfound from './Cart/NotFound.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Route Guards
const AdminRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");
  return userRole === "admin" ? element : <Navigate to="/login" />;
};

const UserRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");
  return userRole === "user" ? element : <Navigate to="/login" />;
};

const AllUsersRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");
  return (userRole === "admin" || userRole === "user" || userRole === "staff") ? element : <Navigate to="/login" />;
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
        <Route path="/staff" element={<AdminRouteGuard element={<Staff />} />} />
        <Route path="/createstaff" element={<AdminRouteGuard element={<CreateStaff />} />} />
        <Route path="/updatestaff/:id" element={<AdminRouteGuard element={<UpdateStaff />} />} />
        
        {/* Cart & Admin */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<AdminRouteGuard element={<AdminDashboard />} />} />
        
        {/* Fallback Routes */}
        <Route path="/not-found" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;