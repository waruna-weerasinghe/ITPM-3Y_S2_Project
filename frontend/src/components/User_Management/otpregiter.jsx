import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './style.css';

function OTP() {
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      handleAccountDeletion();
    }
  }, [countdown]);

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;
        if (this.value === "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
       
        return () => {
            input.removeEventListener("focus", focusFunc);
            input.removeEventListener("blur", blurFunc);
        };
    });
  }, []);

  const handleAccountDeletion = async () => {
    try {
      const userEmail = Cookies.get('userEmail');
      const response = await axios.delete('http://localhost:8175/user/registerdelete', { data: { userEmail } });
      if (response.status === 200) {
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: "sign up is faild. Please try again",
        });

        navigate('/register');
      } else {
        setVerificationStatus("Failed to delete account.");
      }
    } catch (error) {
      setVerificationStatus('Error deleting account: ' + error.message);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userEmail = Cookies.get('userEmail');
      const response = await axios.post(
        'http://localhost:8175/user/otp',
        { otp, userEmail }
      );
  
      if (response.status === 200) {
        if (response.data.status === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sign up successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login');
        } else if (response.data.status === "Incorrect OTP") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect OTP. Please try again",
          });
        } else {
          setVerificationStatus("An error occurred. Please try again later.");
        }
      } else {
        setVerificationStatus("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setVerificationStatus('Error verifying OTP: ' + error.message);
    }
  };

  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Tech-Connect </h3>
          <p className="text">Welcome to our online mobile phone shop!</p>
          <div className="info">
            <div className="information d-flex align-items-center">
              <i className="bi bi-geo-alt-fill fs-5 me-3"></i>
              <p className="mb-0">92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <i className="bi bi-envelope-fill fs-5 me-3"></i>
              <p className="mb-0">lorem@ipsum.com</p>
            </div>
            <div className="information">
              <i className="bi bi-telephone-fill fs-5 me-3"></i>
              <p className="mb-0">123-456-789</p>
            </div>
          </div>
          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons d-flex justify-content-center">
              <button onClick={() => {}} className="me-3">
                <i className="bi bi-facebook fs-5"></i>
              </button>
              <button onClick={() => {}}>
                <i className="bi bi-whatsapp fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>
          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="title">check your email </h3>
            <div className="input-container">
              <input type="text" name="otp" className="input" value={otp} onChange={(e) => setOTP(e.target.value)} />
              <label htmlFor="">Enter OTP</label>
              <span>Enter OTP</span>
            </div>
            <button type="submit" className="btn">Send</button>
            {verificationStatus && <p className="mt-3">{verificationStatus}</p>}
            <p className="mt-3">Time Left: {countdown} seconds</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;
