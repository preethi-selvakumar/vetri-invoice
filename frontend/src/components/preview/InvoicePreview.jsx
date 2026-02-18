import React, { useEffect, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import PreviewHeader from './PreviewHeader';
import PreviewInvoiceTo from './PreviewInvoiceTo';
import PreviewTable from './PreviewTable';
import PreviewFooter from './PreviewFooter';
import { AppContext } from '../../context/AppContext';

// Design Pattern Image Import
import GrandSidePattern from '../../assets/images/1.png';

const InvoicePreview = ({ show, handleClose }) => {
    // Fetch all live data from the context
    const {
        template,
        headerData,
        billTo,
        invoiceMeta,
        invoiceItems,
        subTotal,
        paymentInfo,
        notesSettings
    } = useContext(AppContext);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="ip-overlay">
            <button className="ip-close-btn" onClick={handleClose} title="Close Preview">
                <IoClose size={30} />
            </button>

            <div className="container ip-modal-container ip-slide-down">
                <div className={`ip-layout-wrapper ${template === 'Grand' ? 'grand-flex' : ''}`}>

                    {/* Left-side pattern: Rendered only for Grand */}
                    {template === 'Grand' && (
                        <div className="ip-external-design">
                            <img src={GrandSidePattern} alt="pattern" className="ip-pattern-img" />
                        </div>
                    )}

                    {/* Main Card */}
                    <div className={`ip-card ${template === 'Grand' ? 'ip-grand-card' : ''}`}>
                        <PreviewHeader headerData={headerData} />

                        <PreviewInvoiceTo
                            billTo={billTo}
                            invoiceMeta={invoiceMeta}
                        />

                        <PreviewTable
                            items={invoiceItems}
                            subTotal={subTotal}
                            notesSettings={notesSettings}
                        />

                        <PreviewFooter
                            paymentInfo={paymentInfo}
                            notesSettings={notesSettings}
                            headerData={headerData}
                        />

                        <div className="ip-bottom-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;