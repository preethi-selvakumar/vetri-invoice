import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { IoCloseCircle } from "react-icons/io5";
import { FaPlusCircle } from 'react-icons/fa';

const InvoiceTable = () => {
    const { invoiceItems, setInvoiceItems, subTotal } = useContext(AppContext);

    const addRow = () => {
        const newRow = { id: Date.now(), name: '', desc: '', qty: 1, rate: 0 };
        setInvoiceItems([...invoiceItems, newRow]);
    };

    const removeRow = (id) => {
        if (invoiceItems.length > 1) {
            setInvoiceItems(invoiceItems.filter(item => item.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        const updatedItems = invoiceItems.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setInvoiceItems(updatedItems);
    };

    return (
        <div className="it-wrapper">
            <div className="it-table-container">
                <div className="row it-header-row g-0">
                    <div className="col-6 it-header-col">Item Name & Description</div>
                    <div className="col-2 it-header-col">Qty</div>
                    <div className="col-2 it-header-col">Rate</div>
                    <div className="col-2 it-header-col">Amount</div>
                </div>

                {invoiceItems.map((item) => (
                    <div className="row it-body-row g-0" key={item.id}>
                        <div className="col-6 it-body-col it-name-desc">
                            <input
                                type="text"
                                placeholder="Enter Item Name"
                                className="it-main-input"
                                value={item.name}
                                onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                            />
                            <textarea
                                placeholder="Item Description"
                                className="it-sub-input"
                                value={item.desc}
                                onChange={(e) => handleInputChange(item.id, 'desc', e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-2 it-body-col">
                            <input
                                type="number"
                                className="it-number-input"
                                value={item.qty}
                                onChange={(e) => handleInputChange(item.id, 'qty', Number(e.target.value))}
                            />
                        </div>
                        <div className="col-2 it-body-col">
                            <div className="it-currency-wrapper">
                                <span>₹</span>
                                <input
                                    type="number"
                                    className="it-number-input"
                                    value={item.rate}
                                    onChange={(e) => handleInputChange(item.id, 'rate', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="col-2 it-body-col it-amount-cell">
                            <div className="it-currency-wrapper">
                                <span>₹</span>
                                <span className="it-amount-text">{(item.qty * item.rate).toLocaleString('en-IN')}</span>
                            </div>
                            {invoiceItems.length > 1 && (
                                <button className="it-remove-btn" onClick={() => removeRow(item.id)}>
                                    <IoCloseCircle />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="it-add-btn" onClick={addRow}>
                <FaPlusCircle className="pi-icon it-plus-icon" /> Add Line Item
            </button>

            <div className="it-total-container">
                <div className="it-total-row">
                    <span className="it-total-label">SUB TOTAL -</span>
                    <div className="it-total-box">₹ {subTotal.toLocaleString('en-IN')}</div>
                </div>
                <div className="it-total-row">
                    <span className="it-total-label">TAX -</span>
                    <div className="it-total-box">₹ 0</div>
                </div>
                <div className="it-total-row it-grand-total">
                    <span className="it-total-label total1">TOTAL -</span>
                    <div className="it-total-box it-dark-box">₹ {subTotal.toLocaleString('en-IN')}</div>
                </div>
            </div>

            <hr className="ih-divider" />
        </div>
    );
};

export default InvoiceTable;