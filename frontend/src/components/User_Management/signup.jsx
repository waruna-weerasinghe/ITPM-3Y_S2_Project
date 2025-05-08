import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./style1s.css";
import Swal from 'sweetalert2';

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }
        if (!/^\d{10}$/.test(formData.number)) {
            newErrors.number = "Invalid phone number (10 digits required)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
      
        try {
            const response = await axios.post('http://localhost:8080/user/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                number: formData.number
            });
        
            if (response.data.success) {
                await Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: "You have been successfully registered. Please login.",
                    showConfirmButton: false,
                    timer: 1500
                });
            
                navigate('/login');
            } else {
                throw new Error(response.data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            let errorMsg = "Registration failed. Please try again.";
            
            if (error.response) {
                if (error.response.status === 400) {
                    errorMsg = error.response.data.error || "Validation error";
                } else if (error.response.data?.error) {
                    errorMsg = error.response.data.error;
                }
            }
        
            Swal.fire({
                icon: "error",
                title: "Registration Error",
                text: errorMsg,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <span className="big-circle"></span>
            <img src="img/shape.png" className="square" alt="" />
            <div className="form">
                <div className="contact-info">
                    <h3 className="title">Tech-Connect</h3>
                    <p className="text">Welcome to our online mobile phone shop!</p>
                    <div className="info">
                        <div className="information">
                            <i className="bi bi-geo-alt-fill icon"></i>
                            <p>No:43, Namaluwa Rd, Dekatana, Sri Lanka</p>
                        </div>
                        <div className="information">
                            <i className="bi bi-envelope-fill icon"></i>
                            <p>techconnectstore@gmail.com</p>
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
                        <h3 className="title">Sign up</h3>
                        <div className="input-container">
                            <input 
                                type="text" 
                                name="name" 
                                className={`input ${errors.name ? 'error' : ''}`} 
                                value={formData.name} 
                                onChange={handleChange} 
                                required
                                disabled={isLoading}
                            />
                            <label>Username</label>
                            <span>Username</span>
                            {errors.name && <div className="error-text">{errors.name}</div>}
                        </div>
                        <div className="input-container">
                            <input 
                                type="email" 
                                name="email" 
                                className={`input ${errors.email ? 'error' : ''}`} 
                                value={formData.email} 
                                onChange={handleChange} 
                                required
                                disabled={isLoading}
                            />
                            <label>Email</label>
                            <span>Email</span>
                            {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>
                        <div className="input-container">
                            <input 
                                type="password" 
                                name="password" 
                                className={`input ${errors.password ? 'error' : ''}`} 
                                value={formData.password} 
                                onChange={handleChange} 
                                required
                                minLength="4"
                                disabled={isLoading}
                            />
                            <label>Password</label>
                            <span>Password</span>
                            {errors.password && <div className="error-text">{errors.password}</div>}
                        </div>
                        <div className="input-container">
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                className={`input ${errors.confirmPassword ? 'error' : ''}`} 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                required
                                disabled={isLoading}
                            />
                            <label>Confirm Password</label>
                            <span>Confirm Password</span>
                            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
                        </div>
                        <div className="input-container">
                            <input 
                                type="tel" 
                                name="number"
                                className={`input ${errors.number ? 'error' : ''}`} 
                                value={formData.number} 
                                onChange={handleChange} 
                                required
                                pattern="[0-9]{10}"
                                disabled={isLoading}
                            />
                            <label>Mobile Number</label>
                            <span>Mobile Number</span>
                            {errors.number && <div className="error-text">{errors.number}</div>}
                        </div>
                        <button 
                            type="submit" 
                            className="btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;