import React, { useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import calendarIcon from '../../assets/images/calendar.png';

const InvoiceBillTo = ({ errors, clearError }) => {
    // Fetch states from the context
    const { billTo, setBillTo, invoiceMeta, setInvoiceMeta } = useContext(AppContext);

    const invoiceDateRef = useRef(null);
    const dueDateRef = useRef(null);

    // Common function to update Bill To details
    const handleBillToChange = (e) => {
        const { name, value } = e.target;
        setBillTo({ ...billTo, [name]: value });

        // Clear the error while typing
        if (clearError) {
            clearError(name);
        }
    };

    // Common function to update Invoice Meta (date, etc.)
    const handleMetaChange = (e) => {
        const { name, value } = e.target;
        setInvoiceMeta({ ...invoiceMeta, [name]: value });

        // Clear the error while typing
        if (clearError) {
            clearError(name);
        }
    };

    const handleIconClick = (ref) => {
        if (ref.current) {
            ref.current.showPicker();
        }
    };

    return (
        <div className="ibt-wrapper">
            <div className="row justify-content-between">
                {/* Left Side: Bill To Details */}
                <div className="col-md-6 col-sm-12">
                    <h5 className="ibt-section-title">Bill To:</h5>
                    <div className="ibt-client-inputs">
                        <div className="ih-field-group">
                            <input
                                type="text"
                                name="clientName"
                                placeholder="Client's Name"
                                className={`ih-input ibt-field ${errors?.clientName ? 'error-border' : ''}`}
                                value={billTo.clientName}
                                onChange={handleBillToChange}
                            />
                            {errors?.clientName && <span className="error-text">{errors.clientName}</span>}
                        </div>

                        <input
                            type="text"
                            name="companyName"
                            placeholder="Client's Company Name"
                            className="ih-input ibt-field"
                            value={billTo.companyName}
                            onChange={handleBillToChange}
                        />

                        <div className="ih-field-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Client's Email ID"
                                className={`ih-input ibt-field ${errors?.email ? 'error-border' : ''}`}
                                value={billTo.email}
                                onChange={handleBillToChange}
                            />
                            {errors?.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <input
                            type="text"
                            name="address"
                            placeholder="Client's Address"
                            className="ih-input ibt-field"
                            value={billTo.address}
                            onChange={handleBillToChange}
                        />
                        <input
                            type="text"
                            name="cityState"
                            placeholder="City, State"
                            className="ih-input ibt-field"
                            value={billTo.cityState}
                            onChange={handleBillToChange}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            className="ih-input ibt-field"
                            value={billTo.country}
                            onChange={handleBillToChange}
                        />
                    </div>
                </div>

                {/* Right Side: Invoice Meta Data */}
                <div className="col-md-5 col-sm-12">
                    <div className="ibt-meta-container">
                        <div className="ibt-meta-row-wrapper">
                            <div className="ibt-meta-row">
                                <label className="ibt-label">Invoice#</label>
                                <span className="ibt-separator">:</span>
                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    className={`ih-input ibt-meta-input ${errors?.invoiceNumber ? 'error-border' : ''}`}
                                    value={invoiceMeta.invoiceNumber}
                                    readOnly
                                    style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}
                                />
                            </div>
                            {errors?.invoiceNumber && <span className="error-text text-end">{errors.invoiceNumber}</span>}
                        </div>

                        {/* Invoice Date */}
                        <div className="ibt-meta-row-wrapper">
                            <div className="ibt-meta-row">
                                <label className="ibt-label">Invoice Date</label>
                                <span className="ibt-separator">:</span>
                                <div className="ibt-date-input-wrapper">
                                    <img
                                        src={calendarIcon}
                                        alt="calendar"
                                        className="ibt-custom-calendar-icon-left"
                                        onClick={() => handleIconClick(invoiceDateRef)}
                                    />
                                    <input
                                        type="date"
                                        name="invoiceDate"
                                        ref={invoiceDateRef}
                                        className={`ih-input ibt-meta-input ibt-date-field-left ${errors?.invoiceDate ? 'error-border' : ''}`}
                                        value={invoiceMeta.invoiceDate}
                                        onChange={handleMetaChange}
                                    />
                                </div>
                            </div>
                            {errors?.invoiceDate && <span className="error-text text-end">{errors.invoiceDate}</span>}
                        </div>

                        {/* Due Date */}
                        <div className="ibt-meta-row-wrapper">
                            <div className="ibt-meta-row">
                                <label className="ibt-label">Due Date</label>
                                <span className="ibt-separator">:</span>
                                <div className="ibt-date-input-wrapper">
                                    <img
                                        src={calendarIcon}
                                        alt="calendar"
                                        className="ibt-custom-calendar-icon-left"
                                        onClick={() => handleIconClick(dueDateRef)}
                                    />
                                    <input
                                        type="date"
                                        name="dueDate"
                                        ref={dueDateRef}
                                        className="ih-input ibt-meta-input ibt-date-field-left"
                                        value={invoiceMeta.dueDate}
                                        onChange={handleMetaChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="ih-divider" />
        </div>
    );
};

export default InvoiceBillTo;