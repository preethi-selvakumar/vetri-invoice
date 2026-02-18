import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding } from 'react-icons/fa';
import axios from 'axios';

import logo from '../assets/images/main-logo.png';
import signupImg from '../assets/images/illustration.png';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ companyName: '', username: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value !== "") setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.username.trim()) newErrors.username = "Email or Username is required";
        if (!formData.password) newErrors.password = "Password is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.username && !emailRegex.test(formData.username)) {
            newErrors.username = "Please enter a valid email address";
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (formData.password && (formData.password.length < 6 || !specialCharRegex.test(formData.password))) {
            newErrors.password = "Min 6 chars + Special char required";
        }

        return newErrors;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            alert("Please fill all fields correctly!");
            setErrors(validationErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', formData);

                alert(response.data.message);

                // When navigating, we will send the email entered by the user through the state.
                navigate('/login', { state: { email: formData.username } });

            } catch (err) {
                alert(err.response?.data?.message || "Something went wrong!");
            }
        }
    };

    const handleCancel = () => {
        navigate('/');
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
                            <h2 className="login-welcome-title">Sign Up!</h2>
                            <p className="login-welcome-subtitle signup-welcome-subtitle">Invoicing is about to get easier.</p>

                            <form className="login-form-element" onSubmit={handleSignUp}>
                                <div className={`login-input-wrapper ${errors.companyName ? 'input-error-border' : ''}`}>
                                    <FaBuilding className="login-field-icon" />
                                    <input type="text" name="companyName" placeholder="Company's Name" className="login-input-control" value={formData.companyName} onChange={handleInputChange} />
                                </div>
                                {errors.companyName && <span className="error-text-msg">{errors.companyName}</span>}

                                <div className={`login-input-wrapper ${errors.username ? 'input-error-border' : ''}`}>
                                    <FaUser className="login-field-icon" />
                                    <input type="text" name="username" placeholder="Email Address" className="login-input-control" value={formData.username} onChange={handleInputChange} />
                                </div>
                                {errors.username && <span className="error-text-msg">{errors.username}</span>}

                                <div className={`login-input-wrapper ${errors.password ? 'input-error-border' : ''}`}>
                                    <FaLock className="login-field-icon" />
                                    <input name="password" type={showPassword ? "text" : "password"} placeholder="Password (Min. 6 chars + Special char)" className="login-input-control" value={formData.password} onChange={handleInputChange} />
                                    <div className="login-password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                                </div>
                                {errors.password && <span className="error-text-msg">{errors.password}</span>}

                                <button type="submit" className="login-action-btn">Create free account</button>

                                <button type="button" className="signup-cancel-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                        <div className="login-footer-redirect">
                            <span>Already have an account? </span>
                            <Link to="/login" className="login-signup-button">Login</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                        <img src={signupImg} alt="Signup Illustration" className="login-side-feature-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;