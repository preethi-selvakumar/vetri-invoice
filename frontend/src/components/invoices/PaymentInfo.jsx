import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaPlusCircle, FaMinusCircle, FaTimes } from 'react-icons/fa';
import UploadIcon from '../../assets/images/upload.png';

const PaymentInfo = ({ errors, clearError }) => {
    const { paymentInfo, setPaymentInfo } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });

        if (clearError) {
            clearError(name);
        }
    };

    // Handler function to update the QR image
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageURL = URL.createObjectURL(event.target.files[0]);
            setPaymentInfo({ ...paymentInfo, qrCodeImage: imageURL });

            // Clear bank details errors as soon as the QR is uploaded
            if (clearError) {
                clearError('accountNumber');
                clearError('accountName');
            }
        }
    };

    const removeImage = () => {
        setPaymentInfo({ ...paymentInfo, qrCodeImage: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="pi-container">
            <div className="pi-toggle-header" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <FaMinusCircle className="pi-icon" />
                ) : (
                    <FaPlusCircle className="pi-icon" />
                )}
                <span className="pi-toggle-text">Add Payment Info</span>
            </div>

            {isOpen && (
                <div className="pi-content animate-fade">
                    <div className="row g-0">
                        {/* Account Number */}
                        <div className="col-12 pi-input-group-wrapper">
                            <div className="pi-input-row">
                                <label className="pi-input-label">Account Number :</label>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    className={`pi-field ${errors?.accountNumber ? 'input-error-border' : ''}`}
                                    placeholder="Enter your Account Number"
                                    value={paymentInfo.accountNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors?.accountNumber && <span className="error-text-msg pi-error-margin">{errors.accountNumber}</span>}
                        </div>

                        {/* Account Name */}
                        <div className="col-12 pi-input-group-wrapper">
                            <div className="pi-input-row">
                                <label className="pi-input-label">Account Name :</label>
                                <input
                                    type="text"
                                    name="accountName"
                                    className={`pi-field ${errors?.accountName ? 'input-error-border' : ''}`}
                                    placeholder="Enter your Account Holder's Name"
                                    value={paymentInfo.accountName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors?.accountName && <span className="error-text-msg pi-error-margin">{errors.accountName}</span>}
                        </div>

                        {/* IFSC Code */}
                        <div className="col-12 pi-input-group-wrapper">
                            <div className="pi-input-row">
                                <label className="pi-input-label">IFSC Code :</label>
                                <input
                                    type="text"
                                    name="ifscCode"
                                    className={`pi-field ${errors?.ifscCode ? 'input-error-border' : ''}`}
                                    placeholder="Enter your IFSC CODE"
                                    value={paymentInfo.ifscCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors?.ifscCode && <span className="error-text-msg pi-error-margin">{errors.ifscCode}</span>}
                        </div>

                        {/* QR Code Upload Section */}
                        <div className="col-12 pi-upload-section">
                            <div className="pi-qr-wrapper">
                                {!paymentInfo.qrCodeImage ? (
                                    <div className="pi-upload-box" onClick={() => fileInputRef.current.click()}>
                                        <img src={UploadIcon} alt="Upload" className="pi-custom-upload-icon" />
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            hidden
                                            accept="image/*"
                                        />
                                    </div>
                                ) : (
                                    <div className="pi-preview-container">
                                        <img src={paymentInfo.qrCodeImage} alt="QR Preview" className="pi-qr-img" />
                                        <button className="pi-close-btn" onClick={removeImage}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}

                                <div className="pi-upload-info">
                                    <h4 className="pi-upload-title">Upload Your QR SCAN CODE For Quick & Easy Payment</h4>
                                    <p className="pi-upload-size">120*120 pixels</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <hr className="ih-divider" />
        </div>
    );
};

export default PaymentInfo;