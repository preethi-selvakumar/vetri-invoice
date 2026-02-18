import React, { useState, useContext, useEffect } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ClientTable = ({ clients }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const { deleteClient, updateClientPayment, setBillTo } = useContext(AppContext);
    const navigate = useNavigate();

    // This logic closes the menu when clicking anywhere outside while it is open
    useEffect(() => {
        const handleOutsideClick = () => setOpenMenuId(null);
        if (openMenuId) {
            window.addEventListener('click', handleOutsideClick);
        }
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [openMenuId]);

    const handleDelete = (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            deleteClient(id);
            setOpenMenuId(null);
        }
    };

    const handleNewInvoice = (client) => {
        setBillTo({
            clientName: client.clientName || '',
            companyName: client.companyName || '',
            email: client.email || '',
            address: client.address || '',
            cityState: client.cityState || '',
            country: client.country || ''
        });
        navigate('/invoice-generator');
    };

    const handleUpdatePayment = async (clientId, clientName) => {
        const amount = window.prompt(`Enter the amount received from ${clientName}:`);

        if (amount !== null && !isNaN(amount) && amount.trim() !== "") {
            await updateClientPayment(clientId, Number(amount));
            alert("Payment updated successfully!");
            setOpenMenuId(null);
        } else if (amount !== null) {
            alert("Please enter a valid number!");
        }
    };

    const getStatusLabel = (total, received) => {
        const totalAmt = Number(total || 0);
        const receivedAmt = Number(received || 0);

        if (receivedAmt === 0) return { text: 'Unpaid', class: 'badge-unpaid' };
        if (receivedAmt < totalAmt) return { text: 'Partially Paid', class: 'badge-partial' };
        if (receivedAmt >= totalAmt) return { text: 'Paid', class: 'badge-paid' };
        return { text: 'Unpaid', class: 'badge-unpaid' };
    };

    return (
        <>
            <div className="ct-table-responsive">
                <table className="ct-main-table">
                    <thead>
                        <tr>
                            <th className="ct-th-name">Name</th>
                            <th className="ct-th-email">Email ID</th>
                            <th className="ct-th-billed">Total Billed</th>
                            <th className="ct-th-received">Received Amount</th>
                            <th className="ct-th-status">Status</th>
                            <th className="ct-th-action"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients && clients.length > 0 ? (
                            clients.map((client) => {
                                const clientId = client._id;
                                const status = getStatusLabel(client.totalBilled, client.receivedAmount);

                                return (
                                    <tr key={clientId} className="ct-tr-row">
                                        <td className="ct-td-name">
                                            <div className="ct-client-info">
                                                <span className="ct-name-text">{client.clientName}</span>
                                                <span className="ct-invoice-count">
                                                    {client.invoiceCount} Invoices
                                                </span>
                                            </div>
                                        </td>
                                        <td className="ct-td-email">{client.email}</td>
                                        <td className="ct-td-billed">₹ {Number(client.totalBilled || 0).toLocaleString()}</td>
                                        <td className="ct-td-received">₹ {Number(client.receivedAmount || 0).toLocaleString()}</td>
                                        <td className="ct-td-status">
                                            <span className={`status-badge ${status.class}`}>
                                                {status.text}
                                            </span>
                                        </td>
                                        <td className="ct-td-action">
                                            <div className="ct-menu-container" onClick={(e) => e.stopPropagation()}>
                                                <HiDotsVertical
                                                    className="ct-icon-menu"
                                                    onClick={() => setOpenMenuId(openMenuId === clientId ? null : clientId)}
                                                />
                                                {openMenuId === clientId && (
                                                    <div className="ct-menu-list">
                                                        <div
                                                            className="ct-menu-item"
                                                            onClick={() => handleNewInvoice(client)}
                                                        >
                                                            New Invoice
                                                        </div>
                                                        <div
                                                            className="ct-menu-item"
                                                            onClick={() => handleUpdatePayment(clientId, client.clientName)}
                                                        >
                                                            Update Payment
                                                        </div>
                                                        <div
                                                            className="ct-menu-item ct-item-delete"
                                                            onClick={() => handleDelete(clientId, client.clientName)}
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="ct-no-data-msg">
                                    No clients found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className="ct-auto-save-text">All your Clients are auto saved here</p>
        </>
    );
};

export default ClientTable;