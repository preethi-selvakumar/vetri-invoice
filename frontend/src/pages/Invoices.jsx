import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import InvoiceTable from '../components/InvoiceTable';

const Invoices = () => {
    const { allInvoices } = useContext(AppContext);
    const navigate = useNavigate();

    // 1. State to track the search term
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Filter logic: Filter by invoice number, client name, or email
    const filteredInvoices = allInvoices.filter(invoice => {
        const search = searchTerm.toLowerCase();
        return (
            invoice.invoiceNumber?.toLowerCase().includes(search) ||
            invoice.billTo?.clientName?.toLowerCase().includes(search) ||
            invoice.billTo?.email?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="cl-main-container">
            {/* Header Section: Title, Search, and Button */}
            <div className="container pt-5 pb-4">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <h2 className="cl-title">Invoices</h2>
                    </div>
                    <div className="col-md-8 d-flex justify-content-md-end align-items-center cl-header-actions">
                        <div className="cl-search-wrapper">
                            <input
                                type="text"
                                placeholder="Search by Client"
                                className="cl-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="cl-search-icon" />
                        </div>

                        <button
                            className="cl-add-btn"
                            onClick={() => navigate('/invoice-generator')}
                        >
                            <BsPlusCircleFill className="ct-btn-icon" /> New Invoice
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section: Pass the filtered data to the InvoiceTable */}
            <div className="cl-table-bg-wrapper">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            {/* Pass the filtered list here */}
                            <InvoiceTable invoices={filteredInvoices} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoices;
