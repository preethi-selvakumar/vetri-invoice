import React, { useState, useContext, useEffect } from 'react'; // useEffect added
import { Link, useNavigate, useLocation } from 'react-router-dom'; // useLocation added
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

import logo from '../assets/images/main-logo.png';
import loginImg from '../assets/images/illustration.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation(); // Hook to access state from navigate

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    // auto fill logic
    // If an email comes from the signup page, set it in the field
    useEffect(() => {
        if (location.state && location.state.email) {
            setFormData(prev => ({ ...prev, username: location.state.email }));
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value !== "") {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username/Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            alert("Please fill all fields!");
        }
        else if (!rememberMe) {
            alert("Please check 'Remember me' to login!");
        }
        else {
            try {
                // backend login api call
                const response = await axios.post('https://vetri-invoice-backend.onrender.com/api/auth/login', formData);

                const { token, user, message } = response.data;

                // Save the token
                localStorage.setItem('token', token);

                // Context logic
                login(user);

                alert(message); // "Login successful!"
                navigate('/');

            } catch (err) {
                alert(err.response?.data?.message || "Invalid email or server error. Please try again!");
            }
        }
    };

    return (
        <div className="login-page-container">
            <div className="container login-main-content">
                <div className="row justify-content-center login-header-row">
                    <div className="col-auto d-flex align-items-center login-logo-wrapper">
                        <img src={logo} alt="Vetri Logo" className="login-main-logo" />
                        <div className="login-logo-text">
                            <h1 className="login-company-name">VETRI IT SYSTEMS</h1>
                            <p className="login-app-subtitle">-Invoice Generator-</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-5 col-md-6">
                        <div className="login-form-card">
                            <h2 className="login-welcome-title">Hello, Welcome Back!</h2>
                            <p className="login-welcome-subtitle">Login to continue</p>

                            <form className="login-form-element" onSubmit={handleLogin}>
                                <div className={`login-input-wrapper ${errors.username ? 'input-error-border' : ''}`}>
                                    <FaUser className="login-field-icon" />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username/Email"
                                        className="login-input-control"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errors.username && <span className="error-text-msg">{errors.username}</span>}

                                <div className={`login-input-wrapper ${errors.password ? 'input-error-border' : ''}`}>
                                    <FaLock className="login-field-icon" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="login-input-control"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <div className="login-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {errors.password && <span className="error-text-msg">{errors.password}</span>}

                                <div className="login-options-row">
                                    <label className="login-remember-me">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span className="custom-checkbox"></span>
                                        Remember me
                                    </label>
                                    <span className="login-forgot-text">Forget Password?</span>
                                </div>

                                <button type="submit" className="login-action-btn">Login</button>
                            </form>
                        </div>
                        <div className="login-footer-redirect">
                            <span>Don't have an account? </span>
                            <Link to="/signup" className="login-signup-button">Register</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                        <img src={loginImg} alt="Login Illustration" className="login-side-feature-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
