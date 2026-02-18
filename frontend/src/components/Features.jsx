import React from 'react';
import featureIcon1 from '../assets/images/painting-1.png';
import featureIcon2 from '../assets/images/credit-cards-payment-1.png';
import featureIcon3 from '../assets/images/customers-1.png';

const Features = () => {
    const featureData = [
        {
            id: 1,
            icon: featureIcon1,
            title: "Customize Your Invoice",
            description: "Showcase your value by crafting a custom online invoice with the Vetri IT Systems Invoice Generator."
        },
        {
            id: 2,
            icon: featureIcon2,
            title: "Receive Payments Online",
            description: "Showcase your value by crafting a custom online invoice with the Vetri IT Systems Invoice Generator."
        },
        {
            id: 3,
            icon: featureIcon3,
            title: "Client Management",
            description: "Showcase your value by crafting a custom online invoice with the Vetri IT Systems Invoice Generator."
        }
    ];

    return (
        <section className="features-section-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    {featureData.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                            <div className="feature-card">
                                <div className="feature-icon-container">
                                    <img src={item.icon} alt={item.title} className="feature-main-icon" />
                                </div>
                                <h3 className="feature-card-title">{item.title}</h3>
                                <p className="feature-card-description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;