import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [clients, setClients] = useState([]);
    const [allInvoices, setAllInvoices] = useState([]);

    const [headerData, setHeaderData] = useState({ logo: null, companyName: '', address: '', cityState: '', country: '' });
    const [invoiceItems, setInvoiceItems] = useState([{ id: Date.now(), name: '', desc: '', qty: 1, rate: 0 }]);
    const [billTo, setBillTo] = useState({ clientName: '', companyName: '', email: '', address: '', cityState: '', country: '' });

    const [invoiceMeta, setInvoiceMeta] = useState({ invoiceNumber: '', invoiceDate: '', dueDate: '' });

    const [paymentInfo, setPaymentInfo] = useState({ accountNumber: '', accountName: '', ifscCode: '', qrCodeImage: null });
    const [notesSettings, setNotesSettings] = useState({ notes: 'It was great doing business with you.', terms: 'Please make the payment by the due date.' });
    const [template, setTemplate] = useState('Standard');

    const fetchInvoices = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const res = await axios.get('http://localhost:5000/api/invoices/all', {
                headers: { 'x-auth-token': token }
            });
            setAllInvoices(res.data);
        } catch (err) {
            console.error("Fetch Invoices Error:", err.response?.status);
        }
    }, []);

    const fetchClients = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const res = await axios.get('http://localhost:5000/api/clients/all', {
                headers: { 'x-auth-token': token }
            });
            setClients(res.data);
        } catch (err) {
            console.error("Fetch Clients Error:", err.response?.status);
        }
    }, []);

    const fetchNextInvoiceNumber = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await axios.get('http://localhost:5000/api/invoices/next-number', {
                headers: { 'x-auth-token': token }
            });

            if (res.data && res.data.nextNumber) {
                setInvoiceMeta(prev => ({ ...prev, invoiceNumber: res.data.nextNumber }));
            }
        } catch (err) {
            console.error("Error fetching invoice number:", err.response?.status || err.message);
        }
    }, []);

    const refreshData = useCallback(async () => {
        await fetchClients();
        await fetchInvoices();
        await fetchNextInvoiceNumber();
    }, [fetchClients, fetchInvoices, fetchNextInvoiceNumber]);

    const resetForm = useCallback(() => {
        setHeaderData({ logo: null, companyName: '', address: '', cityState: '', country: '' });
        setInvoiceItems([{ id: Date.now(), name: '', desc: '', qty: 1, rate: 0 }]);
        setBillTo({ clientName: '', companyName: '', email: '', address: '', cityState: '', country: '' });
        setInvoiceMeta({ invoiceNumber: '', invoiceDate: '', dueDate: '' });
        setPaymentInfo({ accountNumber: '', accountName: '', ifscCode: '', qrCodeImage: null });
        fetchNextInvoiceNumber();
    }, [fetchNextInvoiceNumber]);

    // Logic to refetch invoices immediately after updating the client payment
    const updateClientPayment = useCallback(async (clientId, amount) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/clients/payment/${clientId}`, {
                receivedAmount: amount
            }, {
                headers: { 'x-auth-token': token }
            });

            await fetchClients();
            await fetchInvoices();
        } catch (err) {
            console.error("Update Payment Error:", err.response?.status);
        }
    }, [fetchClients, fetchInvoices]);

    const deleteClient = useCallback(async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/clients/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchClients();
            fetchInvoices();
        } catch (err) {
            console.error("Delete Client Error:", err.response?.status);
        }
    }, [fetchClients, fetchInvoices]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchInvoices();
            fetchClients();
            fetchNextInvoiceNumber();
        }
    }, [isLoggedIn, fetchInvoices, fetchClients, fetchNextInvoiceNumber]);

    const calculateSubTotal = () => {
        return invoiceItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    };

    const login = (userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setClients([]);
        setAllInvoices([]);
    };

    return (
        <AppContext.Provider value={{
            isLoggedIn, login, logout,
            clients, fetchClients, deleteClient, updateClientPayment,
            allInvoices, fetchInvoices,
            invoiceItems, setInvoiceItems,
            billTo, setBillTo,
            invoiceMeta, setInvoiceMeta,
            paymentInfo, setPaymentInfo,
            notesSettings, setNotesSettings,
            subTotal: calculateSubTotal(),
            template, setTemplate,
            headerData, setHeaderData,
            resetForm,
            fetchNextInvoiceNumber,
            refreshData
        }}>
            {children}
        </AppContext.Provider>
    );
};