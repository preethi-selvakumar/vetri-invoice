import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import PreviewHeader from '../components/preview/PreviewHeader';
import PreviewInvoiceTo from '../components/preview/PreviewInvoiceTo';
import PreviewTable from '../components/preview/PreviewTable';
import PreviewFooter from '../components/preview/PreviewFooter';

import GrandSidePattern from '../assets/images/1.png';
import PrintIcon from '../assets/images/print-icon.png';
import DownloadIcon from '../assets/images/download-icon.png';
import MailIcon from '../assets/images/mail-icon.png';

const ClientInvoice = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfLoading, setPdfLoading] = useState(false);
    const invoiceRef = useRef();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `https://vetri-invoice-backend.onrender.com/api/invoices/${id}`,
                    { headers: { 'x-auth-token': token } }
                );
                setInvoiceData(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                } else {
                    setLoading(false);
                }
            }
        };
        fetchInvoice();
    }, [id]);

    const handleDownloadPDF = async () => {
        if (!invoiceData) return;
        const element = invoiceRef.current;
        setPdfLoading(true);
        const rawName = invoiceData.billTo?.clientName || "Client";
        const clientName = rawName.trim().replace(/\s+/g, '_');
        const fileName = `${clientName}_Invoice.pdf`;

        try {
            const canvas = await html2canvas(element, { scale: 1.5, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const finalImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalImgHeight);
            pdf.save(fileName);
        } catch (error) {
            console.error("PDF Download Error: ", error);
        } finally {
            setPdfLoading(false);
        }
    };

    const handleSendMail = async () => {
        if (!invoiceData) return;
        const element = invoiceRef.current;
        setPdfLoading(true);

        try {
            const canvas = await html2canvas(element, { scale: 1.5, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const finalImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalImgHeight);

            const pdfBlob = pdf.output('blob');

            const formData = new FormData();
            const rawName = invoiceData.billTo?.clientName || "Client";
            const cleanName = rawName.trim().replace(/\s+/g, '_');

            formData.append('pdf', pdfBlob, `${cleanName}_Invoice.pdf`);
            formData.append('email', invoiceData.billTo.email);
            formData.append('clientName', invoiceData.billTo.clientName);
            formData.append('invoiceNumber', invoiceData.invoiceMeta.invoiceNumber);
            formData.append('companyName', invoiceData.headerData.companyName);

            formData.append('senderEmail', invoiceData.headerData.email);

            const token = localStorage.getItem('token');
            const res = await axios.post(
                'https://vetri-invoice-backend.onrender.com/api/invoices/send-mail',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-auth-token': token
                    }
                }
            );

            if (res.status === 200) {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Email Error: ", error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert(error.response?.data?.message || "Failed to send email!");
            }
        } finally {
            setPdfLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading Invoice...</div>;
    if (!invoiceData) return <div className="text-center mt-5">Invoice Not Found!</div>;

    const { headerData, billTo, invoiceMeta, invoiceItems, paymentInfo, notesSettings, template, subTotal } = invoiceData;

    return (
        <div className="ig-page-wrapper success-view-layout">
            <div className="container-fluid ig-top-bar">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="ig-title-badge">CLIENT'S INVOICE</div>
                    </div>
                </div>
            </div>

            <div className="container mt-4 d-print-none">
                <div className="row justify-content-center g-4">
                    <div className="col-auto">
                        <button className="ci-action-btn" type="button" onClick={() => window.print()}>
                            <img src={PrintIcon} className="ci-btn-icon" alt="Print" />
                            <span>Print</span>
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="ci-action-btn" type="button" onClick={handleDownloadPDF} disabled={pdfLoading}>
                            <img src={DownloadIcon} className="ci-btn-icon" alt="Download" />
                            <span>{pdfLoading ? '...' : 'Download'}</span>
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="ci-action-btn" type="button" onClick={handleSendMail} disabled={pdfLoading}>
                            <img src={MailIcon} className="ci-btn-icon" alt="Mail" />
                            <span>{pdfLoading ? 'Sending...' : 'Send via mail'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container ci-invoice-container py-5" ref={invoiceRef}>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className={`ci-layout-wrapper ${template === 'Grand' ? 'grand-flex' : ''}`}>
                            {template === 'Grand' && (
                                <div className="ci-external-design">
                                    <img src={GrandSidePattern} className="ci-pattern-img" alt="pattern" crossOrigin="anonymous" />
                                </div>
                            )}
                            <div className={`ci-white-paper-card ${template === 'Grand' ? 'ci-grand-card' : ''}`}>
                                <PreviewHeader headerData={headerData} />
                                <PreviewInvoiceTo billTo={billTo} invoiceMeta={invoiceMeta} />
                                <PreviewTable items={invoiceItems} subTotal={subTotal} notesSettings={notesSettings} />
                                <PreviewFooter paymentInfo={paymentInfo} notesSettings={notesSettings} headerData={headerData} />
                                <div className="ip-bottom-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientInvoice;