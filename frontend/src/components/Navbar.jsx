import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { AppContext } from '../context/AppContext';
import logo from '../assets/images/main-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, logout } = useContext(AppContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            logout();
            setIsOpen(false);
            navigate('/login');
        }
    };

    return (
        <nav className="navbar-main-container">
            <div className="container-fluid h-100 px-md-5 py-4">
                <div className="row h-100 align-items-center position-relative">
                    <div className="col-8 col-md-4 d-flex align-items-center justify-content-start">
                        <img src={logo} alt="Vetri Logo" className="navbar-logo-img" />
                        <div className="navbar-brand-text-group">
                            <h1 className="navbar-brand-title">VETRI IT SYSTEMS</h1>
                            <p className="navbar-brand-subtitle">-Invoice Generator-</p>
                        </div>
                    </div>

                    <div className="col-4 d-md-none d-flex justify-content-end align-items-center">
                        <div className="navbar-mobile-icon" onClick={toggleMenu}>
                            {isOpen ? <HiX size={35} /> : <HiMenuAlt3 size={35} />}
                        </div>
                    </div>

                    <div className={`col-md-8 navbar-menu-wrapper ${isOpen ? 'active' : ''}`}>
                        <div className="row w-100 align-items-center">
                            <div className="col-md-7 d-flex justify-content-center">
                                <div className="navbar-links-wrapper">
                                    <NavLink to="/" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
                                    <NavLink to="/client" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Client</NavLink>
                                    <NavLink to="/invoices" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Invoices</NavLink>
                                </div>
                            </div>

                            <div className="col-md-5 d-flex justify-content-md-end justify-content-center align-items-center mt-md-0 mt-4">
                                <div className="navbar-auth-group">
                                    {isLoggedIn ? (
                                        <>
                                            <button
                                                className="navbar-nav-link"
                                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                            <span className="navbar-vertical-divider d-none d-md-block">|</span>
                                            <NavLink to="/signup" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Register</NavLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to="/login" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Login</NavLink>
                                            <span className="navbar-vertical-divider d-none d-md-block">|</span>
                                            <NavLink to="/signup" className="navbar-nav-link" onClick={() => setIsOpen(false)}>Register</NavLink>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;