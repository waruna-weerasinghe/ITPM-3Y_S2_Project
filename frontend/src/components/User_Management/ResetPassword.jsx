import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './style.css';

function ResetPassword() {
    const [Password, setPassword] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const navigate = useNavigate();

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
    
            // Cleanup function to remove event listeners when component unmounts
            return () => {
                input.removeEventListener("focus", focusFunc);
                input.removeEventListener("blur", blurFunc);
            };
        });
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = Cookies.get('userEmail');
        //axios.defaults.withCredentials = true;

        try {
            const response = await axios.post(
              'http://localhost:8175/user/reset-password',
              { Password,userEmail }
            );

            if (response.status === 200) {
                if (response.data.status === "Password reset successfully") {
                    // Handle successful password reset
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Password reset successfully!",
                        showConfirmButton: false,
                        timer: 1500
                        
                      });
                    setVerificationStatus("Password reset successfully");
                    navigate('/login'); // Navigate to login page
                } else if (response.data.status === "User not found") {
                    // Handle case where user is not found
                    setVerificationStatus("User not found");
                } else {
                    // Handle unexpected response
                    setVerificationStatus("An error occurred. Please try again later.");
                }
            } else {
                // Handle non-200 status codes
                setVerificationStatus("Unexpected response status: " + response.status);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setVerificationStatus('Error resetting password: ' + error.message);
        }
    }

    return (
        <div className="container">
            <span className="big-circle"></span>
            <img src="img/shape.png" className="square" alt="" />
            <div className="form">
                {/* Contact Info Section */}
                <div className="contact-info">
                    <h3 className="title"> Tech-Connect</h3>
                    <p className="text">
                    Welcome to our online mobile phone shop!
                    </p>
                    {/* Information */}
                    <div className="info">
                        <div className="information d-flex align-items-center">
                            <i className="bi bi-geo-alt-fill fs-5 me-3"></i>
                            <p className="mb-0">No:43, Namaluwa Rd, Dekatana, Sri Lanka</p>
                        </div>
                        <div className="information">
                            <i className="bi bi-envelope-fill fs-5 me-3"></i>
                            <p className="mb-0">techconnectstore@gmail.com</p>
                        </div>
                        <div className="information">
                            <i className="bi bi-telephone-fill fs-5 me-3"></i>
                            <p className="mb-0">+94 757 717 569</p>
                        </div>
                    </div>
                    {/* Social Media Links */}
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
                {/* Contact Form Section */}
                <div className="contact-form">
                    <span className="circle one"></span>
                    <span className="circle two"></span>
                    {/* Form */}
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h3 className="title">Reset Password</h3>
                        <div className="input-container">
                            <input type="password" name="password" className="input" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="">Enter password</label>
                            <span>Enter password</span>
                        </div>
                        <button type="submit" className="btn">Reset Password</button>
                        {verificationStatus && <p className="mt-3">{verificationStatus}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
