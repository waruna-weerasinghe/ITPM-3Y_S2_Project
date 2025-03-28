import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './style.css';

function Login() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all fields",
            });
            return;
        }

        setLoading(true);
        axios.post('http://localhost:8080/user/login', { email, password })
            .then((result) => {
                setLoading(false);
                if (result.data.status === 'success') {
                    Cookies.set('userEmail', email, { expires: 1 });
                    Cookies.set('userId', result.data.userId, { expires: 1 });
                    Cookies.set('role', result.data.role, { expires: 1 });
                    const isAdmin = result.data.isAdmin;
                    const isStaff = result.data.isStaff; 
                    
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                  
                    if (isAdmin) {
                        navigate('/userdetails');
                    } else if (isStaff) {
                        navigate('/staff/mLeave');
                    } else {
                        navigate('/');
                    }
                } else if (result.data.status === 'no record existed') {
                    Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: "Email does not exist. Please register.",
                    });
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email or password incorrect. Please try again.",
                });
            });
    }
    
    return (
        <div className="login-wrapper">
            <div className="container">
                <span className="big-circle"></span>
                <img src="img/shape.png" className="square" alt="" />
                <div className="form">
                    <div className="contact-info">
                        <h3 className="title">DE-RUSH</h3>
                        <p className="text">
                            Welcome to our online clothing shop!
                        </p>
                        <div className="info">
                            <div className="information">
                                <i className="bi bi-geo-alt-fill icon"></i>
                                <p>No:43, Kandy Road, Kadawatha, Sri Lanka</p>
                            </div>
                            <div className="information">
                                <i className="bi bi-envelope-fill icon"></i>
                                <p>derushclothing@gmail.com</p>
                            </div>
                            <div className="information">
                                <i className="bi bi-telephone-fill icon"></i>
                                <p>+94 757 717 569</p>
                            </div>
                        </div>
                        <div className="social-media">
                            <p>Connect with us:</p>
                            <div className="social-icons">
                                <a href="#"><i className="bi bi-facebook"></i></a>
                                <a href="#"><i className="bi bi-whatsapp"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <h3 className="title">Login</h3>
                            <div className="input-container">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="input" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required
                                />
                                <label>Email</label>
                                <span>Email</span>
                            </div>
                            <div className="input-container">
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="input" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required
                                />
                                <label>Password</label>
                                <span>Password</span>
                            </div>
                            <input 
                                type="submit" 
                                value={loading ? "Logging in..." : "Login"} 
                                className="btn" 
                                disabled={loading}
                            />
                        </form>
                        <div className="auth-links">
                            <p>Don't have an account? <Link to="/signup">Register</Link></p>
                            <p><Link to="/forgot-password">Forgot Password?</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;