import './App.css';
import "react-toastify/dist/ReactToastify.css";

//import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Loyalty/Header';
import LoyaltyAddForm from './components/Loyalty/LoyaltyAddForm';
import AllLoyaltyForm from './components/Loyalty/AllLoyaltyForms.js';
import UpdateLoyalty from './components/Loyalty/UpdateLoyalty';
import DeleteLoyaltyForm from './components/Loyalty/DeleteLoyalty.js';
import Home from './pages/home/Home.jsx';
import './index.css';

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





import { Routes, Route } from 'react-router-dom';
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

  if (userRole === "admin" || userRole === "user" ||userRole === "staff" ) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};


function App() {
  return (
    <>
      <Header />
      <ToastContainer />
  
      <Routes>

      {/* <Route path="/" element={<UserRouteGuard element={<HomePage />} />} />
        { <Route path="/product/:id" element={<ProductPage />} /> }

        <Route
          path="/admin/*"
          element={<AdminRouteGuard element={<Dashboard />} />}
        /> */}
        {/* <Route path="/admin/productsList" element={<ProductsList />} />
        <Route
          path="/admin/productsList/addProduct"
          element={<AdminRouteGuard element={<AddProduct />} />}
        />
        <Route
          path="/admin/productsList/editProduct/:id"
          element={<AdminRouteGuard element={<EditProduct />} />}
        />
        <Route
          path="/admin/productsList/viewProduct/:id"
          element={<AdminRouteGuard element={<ViewProduct />} />}
        /> */}

      <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/otp" element={<OTP />} />
        {<Route
          path="/userdetails"
          element={<AdminRouteGuard element={<Users />} />}
        /> }

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

        {/* <Route path="/staff/myprofile" element={<MyprofileS />} /> */}
        {/* <Route path="/staff/homepage" element={<HomePageS />} />
        <Route path="/admin/settings" element={<Settings />} />  */}


        <Route path="/list" element={<AllLoyaltyForm/>} />
        <Route path="/" element={<Home />} />
        <Route path="/addForm" element={<LoyaltyAddForm />} />
        <Route path="/updateLoyalty/:id" element={<UpdateLoyalty />} />
        <Route path="/deleteLoyaltyForm/:id" element={<DeleteLoyaltyForm />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/not-found" element={Notfound} />
        
        
      
      </Routes>

      <footer>Footer</footer>
    </>
  );
}

export default App;
