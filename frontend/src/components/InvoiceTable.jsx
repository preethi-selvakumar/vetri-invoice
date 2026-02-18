import React from 'react';

const InvoiceTable = ({ invoices }) => {

    // Helper function to format the date as DD-MM-YYYY
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="ct-table-responsive">
                <table className="ct-main-table">
                    <thead>
                        <tr>
                            <th className="ct-th-name">Invoice</th>
                            <th className="ct-th-email">Client</th>
                            <th className="ct-th-billed">Date</th>
                            {/* New Column: Displays the total bill amount */}
                            <th className="ct-th-total" style={{ textAlign: 'right' }}>Total Billed</th>
                            {/* Balance Due Column: Shows the remaining amount after deduction */}
                            <th className="ct-th-status" style={{ textAlign: 'right', paddingRight: '24px' }}>Balance Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices && invoices.length > 0 ? (
                            invoices.map((invoice) => {
                                // Logic: Balance = Total Billed - Received Amount
                                const totalAmount = Number(invoice.subTotal || 0);
                                const receivedAmount = Number(invoice.receivedAmount || 0);
                                const balanceDue = totalAmount - receivedAmount;

                                return (
                                    <tr key={invoice._id} className="ct-tr-row">
                                        {/* Invoice Number */}
                                        <td className="ct-td-name">
                                            <span className="ct-name-text">
                                                {invoice.invoiceMeta?.invoiceNumber || "INV000"}
                                            </span>
                                        </td>

                                        {/* Client Name */}
                                        <td className="ct-td-email">
                                            {invoice.billTo?.clientName || "Client Details"}
                                        </td>

                                        {/* Formatted Date */}
                                        <td className="ct-td-billed">
                                            {formatDate(invoice.invoiceMeta?.invoiceDate)}
                                        </td>

                                        {/* Total Billed Amount */}
                                        <td className="ct-td-total" style={{ textAlign: 'right' }}>
                                            ₹ {totalAmount.toLocaleString('en-IN')}
                                        </td>

                                        {/* Balance Due Amount (Calculated) */}
                                        <td className="ct-td-status-combined" style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <span className={`ct-name-text ${balanceDue > 0 ? 'text-danger' : 'text-success'}`}>
                                                ₹ {balanceDue.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            /* Search result or initial state empty message */
                            <tr>
                                <td colSpan="5" className="ct-no-data-msg">
                                    No invoices found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="ct-auto-save-text">All your Invoices are auto saved here</p>
        </>
    );
};

export default InvoiceTable;