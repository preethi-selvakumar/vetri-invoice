import React from 'react';
import DefaultQRCode from '../../assets/images/ic_baseline-qrcode.png';

const PreviewFooter = ({ paymentInfo, notesSettings, headerData }) => {
    // Use values passed through props
    // Business name logic for the signature
    const businessName = headerData?.companyName || "VETRI IT SYSTEMS PVT LTD.,";

    // QR Code Image Logic:
    // 1. Append and use the uploads path received from the backend
    // 2. Otherwise, use the generator blob URL or the default image
    let qrSrc = DefaultQRCode;
    let isExternal = false;

    if (paymentInfo?.qrCodeImage) {
        if (paymentInfo.qrCodeImage.startsWith('uploads/')) {
            qrSrc = `https://vetri-invoice-backend.onrender.com/${paymentInfo.qrCodeImage}`;
            isExternal = true; // Mark as external image if it is a backend URL
        } else {
            qrSrc = paymentInfo.qrCodeImage;
        }
    }

    return (
        <div className="pv-footer-wrapper">
            <div className="row g-0">
                {/* Left Side: Payment Info Section */}
                <div className="col-md-7 col-12">
                    <div className="pv-payment-content">
                        <h4 className="pv-payment-title">Payment Info</h4>

                        <div className="pv-info-grid">
                            <div className="pv-info-item">
                                <span className="pv-label">Account Number</span>
                                <span className="pv-sep">:</span>
                                <span className="pv-value">{paymentInfo?.accountNumber || "0000 0000 0000 0000"}</span>
                            </div>
                            <div className="pv-info-item">
                                <span className="pv-label">Account Name</span>
                                <span className="pv-sep">:</span>
                                <span className="pv-value">{paymentInfo?.accountName || "Enter Account Name"}</span>
                            </div>
                            <div className="pv-info-item">
                                <span className="pv-label">IFSC CODE</span>
                                <span className="pv-sep">:</span>
                                <span className="pv-value">{paymentInfo?.ifscCode || "Enter IFSC Code"}</span>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="pv-qr-section">
                            <h5 className="pv-qr-title">Please scan the QR code for easy payment</h5>
                            <div className="pv-qr-box">
                                <img
                                    src={qrSrc}
                                    alt="Payment QR"
                                    className="pv-qr-img"
                                    /* During PDF conversion, loading backend images
                                       requires this crossOrigin attribute.
                                    */
                                    crossOrigin={isExternal ? "anonymous" : undefined}
                                />
                            </div>
                        </div>

                        {/* Terms & Conditions Section */}
                        <div className="pv-terms-section">
                            <div className="pv-terms-head">AS PER THE TERMS & CONDITIONS,</div>
                            <p className="pv-terms-text">
                                {notesSettings?.terms || "Please make the payment by the due date."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Signature Section */}
                <div className="col-md-5 col-12">
                    <div className="pv-signature-container">
                        <div className="pv-ack-text">ACKNOWLEDGED BY,</div>

                        {/* Signature Line */}
                        <div className="pv-sign-line"></div>

                        <div className="pv-auth-section">
                            <div className="pv-auth-label">AUTHORISED SIGN</div>
                            <div className="pv-auth-details">
                                Managing Director, <span className="pv-company-name">{businessName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewFooter;
