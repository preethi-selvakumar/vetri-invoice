import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/header-image.png';

const HeroSection = () => {
    return (
        <section className="hero-main-wrapper">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left Content */}
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="hero-left-content">
                            <h2 className="hero-title">No-cost Invoice Generator.</h2>
                            <p className="hero-description">
                                Showcase your value by crafting a custom online invoice with the
                                Vetri IT Systems Invoice Generator, or use a professional template.
                            </p>
                            <Link to="/invoice-generator" className="hero-btn-link">
                                Generate Now
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-4 mt-md-0">
                        <div className="hero-image-container">
                            <img src={heroImage} alt="Invoice Samples" className="hero-main-img" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;