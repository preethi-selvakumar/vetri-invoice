import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import InvoiceHeader from '../components/invoices/InvoiceHeader';
import InvoiceBillTo from '../components/invoices/InvoiceBillTo';
import InvoiceTable from '../components/invoices/InvoiceTable';
import AdditionalInfo from '../components/invoices/AdditionalInfo';
import PaymentInfo from '../components/invoices/PaymentInfo';
import CustomizeYourInvoice from '../components/invoices/CustomizeYourInvoice';
import InvoicePreview from '../components/preview/InvoicePreview';

const InvoiceGenerator = () => {
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const [errors, setErrors] = useState({});

    const {
        headerData,
        billTo,
        invoiceMeta,
        paymentInfo,
        invoiceItems,
        notesSettings,
        template,
        subTotal,
        setHeaderData,
        fetchNextInvoiceNumber,
        resetForm,
        refreshData // Get refreshData from AppContext
    } = useContext(AppContext);

    useEffect(() => {
        if (!invoiceMeta.invoiceNumber) {
            fetchNextInvoiceNumber();
        }
    }, [fetchNextInvoiceNumber, invoiceMeta.invoiceNumber]);

    const togglePreview = () => setShowPreview(!showPreview);

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!headerData.companyName.trim()) tempErrors.companyName = "Required";
        if (!headerData.address.trim()) tempErrors.address = "Required";
        if (!billTo.clientName.trim()) tempErrors.clientName = "Client Name is required";
        if (!billTo.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(billTo.email)) {
            tempErrors.email = "Invalid Email";
        }

        if (!invoiceMeta.invoiceNumber) tempErrors.invoiceNumber = "Required";
        if (!invoiceMeta.invoiceDate) tempErrors.invoiceDate = "Select Date";

        if (!paymentInfo.qrCodeImage) {
            if (!paymentInfo.accountNumber.trim()) tempErrors.accountNumber = "Required";
            if (!paymentInfo.accountName.trim()) tempErrors.accountName = "Required";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleGenerate = async () => {
        if (validateForm()) {
            const isConfirmed = window.confirm("Are you sure you want to generate this invoice?");
            if (isConfirmed) {
                try {
                    const formData = new FormData();

                    const { logo, ...cleanHeaderData } = headerData;
                    const { qrCodeImage, ...cleanPaymentInfo } = paymentInfo;

                    formData.append('headerData', JSON.stringify(cleanHeaderData));
                    formData.append('billTo', JSON.stringify(billTo));
                    formData.append('invoiceMeta', JSON.stringify(invoiceMeta));
                    formData.append('invoiceItems', JSON.stringify(invoiceItems));
                    formData.append('notesSettings', JSON.stringify(notesSettings));
                    formData.append('paymentInfo', JSON.stringify(cleanPaymentInfo));
                    formData.append('template', template);
                    formData.append('subTotal', subTotal);

                    formData.append('receivedAmount', 0);
                    formData.append('status', 'Unpaid');

                    if (headerData.logo) {
                        const logoRes = await fetch(headerData.logo);
                        const logoBlob = await logoRes.blob();
                        formData.append('logo', logoBlob, 'company_logo.png');
                    }

                    if (paymentInfo.qrCodeImage) {
                        const qrRes = await fetch(paymentInfo.qrCodeImage);
                        const qrBlob = await qrRes.blob();
                        formData.append('qrCodeImage', qrBlob, 'qrcode.png');
                    }

                    const token = localStorage.getItem('token');

                    const res = await axios.post(
                        'http://localhost:5000/api/invoices/create',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'x-auth-token': token
                            }
                        }
                    );

                    if (res.status === 201) {
                        alert("Invoice generated successfully!");

                        // After data is saved in the backend, refresh the context data
                        await refreshData();

                        const newInvoiceId = res.data.invoice._id;
                        resetForm();
                        navigate(`/client-invoice/${newInvoiceId}`);
                    }
                } catch (err) {
                    console.error(err);
                    // If the token is expired, redirect instead of showing an alert
                    if (err.response && err.response.status === 401) {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    } else {
                        alert(err.response?.data?.message || "Something went wrong!");
                    }
                }
            }
        } else {
            alert("Please fill the required fields.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className={`ig-page-wrapper ${showPreview ? 'ig-blur' : ''}`}>
                <div className="container-fluid ig-top-bar">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="ig-title-badge">INVOICE GENERATOR</div>
                        </div>
                    </div>
                </div>

                <div className="container ig-form-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="ig-white-card">
                                <InvoiceHeader headerData={headerData} setHeaderData={setHeaderData} errors={errors} clearError={clearError} />
                                <InvoiceBillTo errors={errors} clearError={clearError} />
                                <InvoiceTable errors={errors} />
                                <AdditionalInfo />
                                <PaymentInfo errors={errors} clearError={clearError} />
                                <CustomizeYourInvoice />

                                <div className="ig-action-section">
                                    <div className="row justify-content-center g-3">
                                        <div className="col-auto">
                                            <button onClick={togglePreview} className="ig-btn-preview">Preview</button>
                                        </div>
                                        <div className="col-auto">
                                            <button onClick={handleGenerate} className="ig-btn-generate">Generate Invoice</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InvoicePreview show={showPreview} handleClose={togglePreview} headerData={headerData} />
        </>
    );
};

export default InvoiceGenerator;
