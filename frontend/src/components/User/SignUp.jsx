import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./style1s.css";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState("");
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
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", focusFunc);
                input.removeEventListener("blur", blurFunc);
            });
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !reenterPassword || !number) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "All fields must be filled.",
            });
            return;
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!name.match(nameRegex)) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Name should only contain letters.",
            });
            return;
        }

        if (password !== reenterPassword) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Passwords do not match.",
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Password should be at least 8 characters long.",
            });
            return;
        }

        if (number.length !== 10 || isNaN(number)) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Mobile number should be 10 digits.",
            });
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailPattern)) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Please enter a valid email address.",
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/register', {
                name,
                email,
                password,
                number,
            });

            // Set user authentication tokens/cookies
            Cookies.set('authToken', response.data.token, { expires: 7 }); // Store token for 7 days
            Cookies.set('userEmail', email, { expires: 7 });
            
            // Show success message
            await Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "You have been successfully registered.",
            });

            // Redirect to home page
            navigate('/');
            
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: error.response.data.error || "Registration failed. Please try again.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "An error occurred. Please try again later.",
                });
            }
        }
    };

    return (
        <div className="container">
            <span className="big-circle"></span>
            <img src="img/shape.png" className="square" alt="" />
            <div className="form">
                <div className="contact-info">
                    <h3 className="title">DE-RUSH</h3>
                    <p className="text">Welcome to our online clothing shop!</p>
                    <div className="info">
                        <div className="information d-flex align-items-center">
                            <i className="bi bi-geo-alt-fill fs-5 me-3"></i>
                            <p className="mb-0">No:43, Kandy Road, Kadawatha, Sri Lanka</p>
                        </div>
                        <div className="information">
                            <i className="bi bi-envelope-fill fs-5 me-3"></i>
                            <p className="mb-0">derushclothing@gmail.com</p>
                        </div>
                        <div className="information">
                            <i className="bi bi-telephone-fill fs-5 me-3"></i>
                            <p className="mb-0">+94 757 717 569</p>
                        </div>
                    </div>
                    <div className="social-media">
                        <p>Connect with us :</p>
                        <div className="social-icons d-flex justify-content-center">
                            <button type="button" className="me-3">
                                <i className="bi bi-facebook fs-5"></i>
                            </button>
                            <button type="button">
                                <i className="bi bi-whatsapp fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <span className="circle one"></span>
                    <span className="circle two"></span>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h3 className="title">Sign up</h3>
                        <div className="input-container">
                            <input type="text" name="name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="name">Username</label>
                            <span>Username</span>
                        </div>
                        <div className="input-container">
                            <input type="email" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <span>Email</span>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <span>Password</span>
                        </div>
                        <div className="input-container">
                            <input type="password" name="reenterPassword" className="input" value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} />
                            <label htmlFor="reenterPassword">Re-enter Password</label>
                            <span>Re-enter Password</span>
                        </div>
                        <div className="input-container">
                            <input type="tel" name="number" className="input" value={number} onChange={(e) => setNumber(e.target.value)} />
                            <label htmlFor="number">Mobile Number</label>
                            <span>Mobile Number</span>
                        </div>
                        <input type="submit" value="Sign Up" className="btn" />
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;