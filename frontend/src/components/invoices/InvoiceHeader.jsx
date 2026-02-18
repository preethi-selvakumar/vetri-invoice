import React from 'react';
import { IoClose } from "react-icons/io5";
import uploadIcon from '../../assets/images/upload.png';

// Destructure the clearError prop along with errors
const InvoiceHeader = ({ headerData, setHeaderData, errors, clearError }) => {

    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setHeaderData({ ...headerData, logo: URL.createObjectURL(file) });
        }
    };

    const handleRemoveLogo = (e) => {
        e.preventDefault();
        setHeaderData({ ...headerData, logo: null });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHeaderData({ ...headerData, [name]: value });

        // Call clearError here
        if (clearError) {
            clearError(name);
        }
    };

    return (
        <div className="ih-wrapper">
            <div className="row align-items-start">
                <div className="col-md-4 text-md-end order-1 order-md-2">
                    <h1 className="ih-main-title">INVOICE</h1>
                </div>

                <div className="col-md-8 order-2 order-md-1">
                    <div className="ih-logo-section">
                        <div className="ih-logo-container">
                            <label htmlFor="logo-upload" className="ih-logo-box">
                                {headerData.logo ? (
                                    <img src={headerData.logo} alt="Company Logo" className="ih-preview-img" />
                                ) : (
                                    <div className="ih-upload-content">
                                        <img src={uploadIcon} alt="Upload" className="ih-upload-img-icon" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="logo-upload"
                                    hidden
                                    onChange={handleLogoChange}
                                    accept="image/*"
                                />
                            </label>

                            {headerData.logo && (
                                <button className="ih-remove-btn" onClick={handleRemoveLogo}>
                                    <IoClose />
                                </button>
                            )}
                        </div>

                        <div className="ih-logo-text">
                            <p className="ih-logo-title">Upload Your Company's LOGO</p>
                            <p className="ih-logo-size">120*120 pixels</p>
                        </div>
                    </div>

                    <div className="ih-company-inputs">
                        {/* Company Name Field */}
                        <div className="ih-field-group">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Your Company's Name"
                                className={`ih-input ${errors?.companyName ? 'error-border' : ''}`}
                                value={headerData.companyName}
                                onChange={handleInputChange}
                            />
                            {errors?.companyName && <span className="error-text">{errors.companyName}</span>}
                        </div>

                        {/* Address Field */}
                        <div className="ih-field-group">
                            <input
                                type="text"
                                name="address"
                                placeholder="Company's Address"
                                className={`ih-input ${errors?.address ? 'error-border' : ''}`}
                                value={headerData.address}
                                onChange={handleInputChange}
                            />
                            {errors?.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        {/* City, State Field */}
                        <div className="ih-field-group">
                            <input
                                type="text"
                                name="cityState"
                                placeholder="City, State"
                                className="ih-input"
                                value={headerData.cityState}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Country Field */}
                        <div className="ih-field-group">
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                className="ih-input"
                                value={headerData.country}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="ih-divider" />
        </div>
    );
};

export default InvoiceHeader;