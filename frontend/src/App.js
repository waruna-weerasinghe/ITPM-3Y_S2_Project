import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';

import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
//import DeleteLoyaltyForm from './components/Loyalty/DeleteLoyalty.js';
import Home from './pages/home/Home.jsx';
import './index.css';

import Login from './components/User/Login.jsx';
import Signup from './components/User/SignUp.jsx';
//import { Routes, Route } from 'react-router-dom';
import Cart from './Cart/CartPage.js';
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






import Cart from './Cart/Cart.jsx';
import Notfound from './Cart/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

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

  if (userRole === "admin" || userRole === "user" || userRole === "staff") {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};


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

        // <Route path="/cart" exact element={<Cart />} />
        <Route path="/not-found" element={Notfound} />



        <Route path="/deleteLoyaltyForm/:id" element={<DeleteLoyaltyForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/not-found" element={<Notfound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/updateuser" element={<UpdateUsers />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/users" element={<Users />} />
        <Route path="/createuser" element={<CreateUsers />} />
        <Route path="/accountdetails" element={<AccountDetails />} />
        <Route path="/securitysettings" element={<SecuritySettings />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/createstaff" element={<CreateStaff />} />
        <Route path="/updatestaff/:id" element={<UpdateStaff />} />


      </Routes>


    </>
  );
}

export default App;
