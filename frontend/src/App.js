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
import Signup from "./components/User/SignUp";
import Login from "./components/User/Login";
import ForgotPassword from "./components/User/ForgotPassword";
import UpdateUsers from "./components/User/UpdateUsers";
import ResetPassword from "./components/User/ResetPassword";
import OTPVerification from "./components/User/OTPVerification";
import OTP from "./components/User/otpregiter";

import Users from "./components/User/displayuserdetails";
import CreateUsers from "./components/User/createuser";
import AccountDetails from "./components/User/AccountDetails";
import SecuritySettings from "./components/User/SecuritySettings";
import Staff from "./components/User/staffdetails";
import CreateStaff from "./components/User/createstaff";
import UpdateStaff from "./components/User/staffupdate";
import Dashboard from "./pages/Admin/Dashboard";
 
import NotFound from './Cart/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminClothesManager from './admin/AdminClothesManager';
 

// Route Guards
const AdminRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");

  if (userRole === "admin") {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

const UserRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");

  if (userRole === "user") {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

const AllUsersRouteGuard = ({ element }) => {
  const userRole = Cookies.get("role");

  if (userRole === "admin" || userRole === "user" ||userRole === "staff" ) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};


function App() {
  return (
    <div>

 
      
      <ToastContainer />
      <Routes>
        {/* Loyalty Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<AllLoyaltyForm />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />

        {/* User Routes */}
        <Route
          path="/admin/*"
          element={<AdminRouteGuard element={<Dashboard />} />}
        />
        
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/otp" element={<OTP />} />
        <Route
          path="/userdetails"
          element={<AdminRouteGuard element={<Users />} />}
        />
        <Route
          path="/usercreate"
          element={<AdminRouteGuard element={<CreateUsers />} />}
        />
        <Route
          path="/userupdate/:id"
          element={<AdminRouteGuard element={<UpdateUsers />} />}
        />
        <Route
          path="/AccountDetails"
          element={<AllUsersRouteGuard element={<AccountDetails />} />}
        />
        <Route
          path="/SecuritySettings"
          element={<AllUsersRouteGuard element={<SecuritySettings />} />}
        />
        <Route path="/createstaff" element={<CreateStaff />} />
        <Route path="/staffdetails" element={<Staff />} />
        <Route path="/staffupdate/:id" element={<UpdateStaff />} />
        <Route path="/staffdetails" element={<Staff />} />

        

        {/* Cart & Admin */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clothes" element={<AdminClothesManager />} />

        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
