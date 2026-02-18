import React from 'react';
import { Link } from 'react-router-dom';
import { HiPlusCircle } from 'react-icons/hi';

const GenerateInvoiceCta = () => {
    return (
        <section className="cta-section-wrapper">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-12 d-flex flex-column align-items-center">

                        {/* Link Box */}
                        <Link to="/invoice-generator" className="cta-invoice-box">
                            <div className="cta-icon-wrapper">
                                <HiPlusCircle size={45} />
                            </div>
                            <div className="cta-divider"></div>
                            <span className="cta-text">Generate New Invoice</span>
                        </Link>

                        {/* Description text */}
                        <div className="cta-content-group">
                            <p className="cta-description">
                                Creating stunning invoices and getting paid has never been easier.
                            </p>
                            <p className="cta-sub-description">
                                Give it a try yourself!
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenerateInvoiceCta;