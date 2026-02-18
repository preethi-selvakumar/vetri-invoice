import React from 'react';

const PreviewInvoiceTo = ({ billTo, invoiceMeta }) => {

    // Helper function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) return dateString;

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getDate()).padStart(2, '0'); // Corrected to date.getMonth() + 1
        const monthFixed = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${monthFixed}-${year}`;
    };

    return (
        <div className="pit-wrapper">
            <div className="row g-0">
                {/* Left Side: Client Info */}
                <div className="col-md-7">
                    <h5 className="pit-label-title">Invoice to,</h5>
                    <div className="pit-client-details">
                        <p className="pit-text">
                            {billTo?.clientName || "Client's Name"}
                        </p>
                        <p className="pit-text">
                            {billTo?.companyName || "Client's Company's Name"}
                        </p>
                        <p className="pit-text pit-email">
                            {billTo?.email || "client-email@example.com"}
                        </p>
                        <p className="pit-text">
                            {billTo?.address || "Client's Address"}
                        </p>
                        <p className="pit-text">
                            {billTo?.cityState || "City, State, ZIP"}
                        </p>
                        <p className="pit-text">
                            {billTo?.country || "Country"}
                        </p>
                    </div>
                </div>

                {/* Right Side: Invoice Meta Data */}
                <div className="col-md-5">
                    <div className="pit-meta-container">
                        <div className="pit-meta-item">
                            <span className="pit-meta-label">Invoice#</span>
                            <span className="pit-meta-separator">:</span>
                            <span className="pit-meta-value">
                                {invoiceMeta?.invoiceNumber || "0000"}
                            </span>
                        </div>
                        <div className="pit-meta-item">
                            <span className="pit-meta-label">Invoice Date</span>
                            <span className="pit-meta-separator">:</span>
                            <span className="pit-meta-value">
                                {formatDate(invoiceMeta?.invoiceDate) || "17-10-2025"}
                            </span>
                        </div>
                        <div className="pit-meta-item">
                            <span className="pit-meta-label">Due Date</span>
                            <span className="pit-meta-separator">:</span>
                            <span className="pit-meta-value">
                                {formatDate(invoiceMeta?.dueDate) || "25-10-2025"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewInvoiceTo;