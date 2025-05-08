import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import Swal from 'sweetalert2';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/user/forgot-password', { email })
      .then((result) => {
        Swal.fire({
          title: "Email sent successfully!",
          text: "Please check your email for password reset instructions",
          icon: "success"
        });
        navigate('/login');
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email not found",
        });
      });
  };

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
    });

    return () => {
        inputs.forEach((input) => {
            input.removeEventListener("focus", focusFunc);
            input.removeEventListener("blur", blurFunc);
        });
    };
  }, []);

  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Tech-Connect</h3>
          <p className="text">
          Welcome to our online mobile phone shop!
          </p>
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
            <h3 className="title">Forgot Password</h3>
            <div className="input-container">
              <input type="email" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="">Email</label>
              <span>Email</span>
            </div>
            <button type="submit" className="btn">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;