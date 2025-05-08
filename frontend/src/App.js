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
import Signup from "./components/User_Management/signup";
import Login from "./components/User_Management/Login";
import ForgotPassword from "./components/User_Management/ForgotPassword";
import UpdateUsers from "./components/User_Management/updateuser";
import ResetPassword from "./components/User_Management/ResetPassword";
import Users from "./components/User_Management/displayuserdetails";
import CreateUsers from "./components/User_Management/createuser";
import AccountDetails from "./components/User_Management/AccountDetails";
import SecuritySettings from "./components/User_Management/SecuritySettings";
import Staff from "./components/User_Management/staffdetails";
import CreateStaff from "./components/User_Management/createstaff";
import UpdateStaff from "./components/User_Management/staffupdate";
import Dashboard from "./pages/Admin/Dashboard";

// Helpers
const isAuthenticated = () => !!Cookies.get("userId");

// Route Guards
const AdminRouteGuard = ({ element }) => {
  const role = Cookies.get("role");
  return role === "admin" ? element : <Navigate to="/login" />;
};

const UserRouteGuard = ({ element }) => {
  const role = Cookies.get("role");
  return role === "user" ? element : <Navigate to="/login" />;
};

const AllUsersRouteGuard = ({ element }) => {
  const role = Cookies.get("role");
  return role === "admin" || role === "user" || role === "staff"
    ? element
    : <Navigate to="/login" />;
};

// Prevent login/signup access if already authenticated
const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/" /> : element;
};

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />

        {/* Loyalty */}
        <Route path="/list" element={<AllLoyaltyForm />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />

        {/* Auth */}
        <Route path="/register" element={<PublicRoute element={<Signup />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRouteGuard element={<Dashboard />} />} />
        <Route path="/userdetails" element={<AdminRouteGuard element={<Users />} />} />
        <Route path="/usercreate" element={<AdminRouteGuard element={<CreateUsers />} />} />
        <Route path="/userupdate/:id" element={<AdminRouteGuard element={<UpdateUsers />} />} />

        {/* All Authenticated Users */}
        <Route path="/AccountDetails" element={<AllUsersRouteGuard element={<AccountDetails />} />} />
        <Route path="/SecuritySettings" element={<AllUsersRouteGuard element={<SecuritySettings />} />} />

        {/* Staff */}
        <Route path="/createstaff" element={<CreateStaff />} />
        <Route path="/staffdetails" element={<Staff />} />
        <Route path="/staffupdate/:id" element={<UpdateStaff />} />
      </Routes>
    </div>
  );
}

export default App;