import React from 'react';

const PreviewTable = ({ items, subTotal, notesSettings }) => {

    const sampleData = [
        { name: "Product Posters Design", desc: "Instagram Size Posters", qty: "5", rate: "200" },
        { name: "Enter Item Name", desc: "Item Description", qty: "00", rate: "000" },
        { name: "Enter Item Name", desc: "Item Description", qty: "00", rate: "000" },
        { name: "Enter Item Name", desc: "Item Description", qty: "00", rate: "000" },
        { name: "Enter Item Name", desc: "Item Description", qty: "00", rate: "000" }
    ];

    // Show sample data when the generator is empty
    // But display backend items directly when they are available
    const isItemsEmpty = !items || (items.length === 1 && items[0].name === '');
    const finalDisplayItems = isItemsEmpty ? sampleData : items;

    return (
        <div className="pt-section-wrapper">
            <div className="row g-0">
                <div className="col-12">
                    <table className="pt-custom-table">
                        <thead>
                            <tr className="pt-head-bg">
                                <th className="pt-text-left">Item Name & Description</th>
                                <th className="pt-text-center">Qty</th>
                                <th className="pt-text-center">Rate</th>
                                <th className="pt-text-center">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalDisplayItems.map((item, index) => (
                                <tr key={index} className={index % 2 !== 0 ? 'pt-row-even' : 'pt-row-odd'}>
                                    <td className="pt-text-left">
                                        <div className="pt-item-title">{item.name || "Enter Item Name"}</div>
                                        <div className="pt-item-subtitle">{item.desc || "Item Description"}</div>
                                    </td>
                                    <td className="pt-text-center pt-val">{item.qty || "00"}</td>
                                    <td className="pt-text-center pt-val">
                                        ₹ {item.rate ? Number(item.rate).toLocaleString('en-IN') : "000"}
                                    </td>
                                    <td className="pt-text-center pt-val">
                                        ₹ {(item.qty * item.rate).toLocaleString('en-IN') || "000"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row g-0">
                <div className="col-12 pt-total-flex-container">
                    <div className="pt-total-inner">
                        <div className="pt-total-row">
                            <div className="pt-total-label-text">TOTAL -</div>
                            <div className="pt-total-amount-box">
                                ₹ {isItemsEmpty ? "1,000" : (subTotal || 0).toLocaleString('en-IN')}
                            </div>
                        </div>
                        <div className="pt-tax-text">INCLUSIVE OF ALL TAXES*</div>
                    </div>
                </div>
            </div>

            <hr className="ih-divider" />

            <div className="pt-notes-display">
                <p className="pt-notes-text">{notesSettings?.notes || ""}</p>
            </div>
        </div>
    );
};

export default PreviewTable;
