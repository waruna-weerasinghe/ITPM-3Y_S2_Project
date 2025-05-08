import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './style.css';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });

            if (response.data && response.data.status === 'success') {
                Cookies.set('userEmail', formData.email, { expires: 1 });
                Cookies.set('userId', response.data.userId, { expires: 1 });
                Cookies.set('role', response.data.role, { expires: 1 });

                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                if (response.data.role === "admin") {
                    navigate('/userdetails');
                } else if (response.data.role === "staff") {
                    navigate('/staff/mLeave');
                } else {
                    navigate('/');
                }
            } else {
                throw new Error(response.data?.message || "Invalid server response");
            }
        } catch (error) {
            console.error("Login error:", error);
            
            let errorMessage = "Login failed. Please try again.";
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = "Invalid email or password";
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                errorMessage = "Server not responding. Please try again later.";
            } else {
                errorMessage = error.message;
            }

            setError(errorMessage);
            Swal.fire({
                icon: "error",
                title: "Login Error",
                text: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="container">
                <span className="big-circle"></span>
                <img src="img/shape.png" className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">DE-RUSH</h3>
                        <p className="text">Welcome to our online clothing shop!</p>
                        <div className="info">
                            <div className="information">
                                <i className="bi bi-geo-alt-fill icon"></i>
                                <p>No:43, Namaluwa Rd, Dekatana, Sri Lanka</p>
                            </div>
                            <div className="information">
                                <i className="bi bi-envelope-fill icon"></i>
                                <p>derush@gmail.com</p>
                            </div>
                            <div className="information">
                                <i className="bi bi-telephone-fill icon"></i>
                                <p>+94 757 717 569</p>
                            </div>
                        </div>
                        <div className="social-media">
                            <p>Connect with us:</p>
                            <div className="social-icons">
                                <button type="button" className="social-icon">
                                    <i className="bi bi-facebook"></i>
                                </button>
                                <button type="button" className="social-icon">
                                    <i className="bi bi-whatsapp"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <h3 className="title">Login</h3>
                            {error && <div className="error-message">{error}</div>}
                            <div className="input-container">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="input" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required
                                    disabled={isLoading}
                                />
                                <label>Email</label>
                                <span>Email</span>
                            </div>
                            <div className="input-container">
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="input" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required
                                    disabled={isLoading}
                                />
                                <label>Password</label>
                                <span>Password</span>
                            </div>
                            <button 
                                type="submit" 
                                className="btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span> Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                        <div className="auth-links">
                            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                            <p><Link to="/forgot-password">Forgot Password?</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;