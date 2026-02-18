import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsPlusCircleFill } from 'react-icons/bs';
import ClientTable from '../components/ClientTable';
import { AppContext } from '../context/AppContext';

const Client = () => {
    const { clients } = useContext(AppContext);

    // New state to track the search term
    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic: Search by name or email
    // Use toLowerCase() to make it case-insensitive
    const filteredClients = clients.filter(client =>
        client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="cl-main-container">
            <div className="container pt-5 pb-4">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <h2 className="cl-title">Clients</h2>
                    </div>
                    <div className="col-md-8 d-flex justify-content-md-end align-items-center cl-header-actions">
                        <div className="cl-search-wrapper">
                            <input
                                type="text"
                                placeholder="Search by Client"
                                className="cl-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update state while typing
                            />
                            <FaSearch className="cl-search-icon" />
                        </div>
                        <button className="cl-add-btn">
                            <BsPlusCircleFill className="ct-btn-icon" /> New Client
                        </button>
                    </div>
                </div>
            </div>

            <div className="cl-table-bg-wrapper">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12">
                            {/* Pass the filtered clients list here */}
                            <ClientTable clients={filteredClients} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client;
