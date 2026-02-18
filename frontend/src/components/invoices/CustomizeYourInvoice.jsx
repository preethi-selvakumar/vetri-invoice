import React, { useState, useContext } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const CustomizeYourInvoice = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Get the template state from the context
    const { template, setTemplate } = useContext(AppContext);

    const [customSettings, setCustomSettings] = useState({
        primaryColor: '#11176f',
        secondaryColor: '#70ff56',
        tertiaryColor: '#edfff0',
        textColor: '#ffffff'
    });

    // Update the context when the template changes
    const handleTemplateChange = (e) => {
        setTemplate(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomSettings({ ...customSettings, [name]: value });
    };

    return (
        <div className="cyi-container">
            {/* Toggle Header */}
            <div className="pi-toggle-header" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <FaMinusCircle className="pi-icon" />
                ) : (
                    <FaPlusCircle className="pi-icon" />
                )}
                <span className="pi-toggle-text">Customize your Invoice</span>
            </div>

            {/* Expandable Content */}
            {isOpen && (
                <div className="pi-content animate-fade">
                    <div className="row g-0">

                        {/* Choose Template */}
                        <div className="col-12 cyi-input-row">
                            <label className="pi-input-label cyi-label-width">Choose Template :</label>
                            <div className="cyi-radio-group">
                                <label className="cyi-radio-label">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="Standard"
                                        className="cyi-radio-input"
                                        checked={template === 'Standard'}
                                        onChange={handleTemplateChange}
                                    />
                                    <span>Standard</span>
                                </label>
                                <label className="cyi-radio-label">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="Grand"
                                        className="cyi-radio-input"
                                        checked={template === 'Grand'}
                                        onChange={handleTemplateChange}
                                    />
                                    <span>Grand</span>
                                </label>
                            </div>
                        </div>

                        {/* Primary Color */}
                        <div className="col-12 cyi-input-row">
                            <label className="pi-input-label cyi-label-width">Primary Color Code :</label>
                            <div className="cyi-color-field-wrapper">
                                <input
                                    type="text"
                                    name="primaryColor"
                                    className="pi-field"
                                    value={customSettings.primaryColor}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="color"
                                    name="primaryColor"
                                    className="cyi-color-picker"
                                    value={customSettings.primaryColor}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Secondary Color */}
                        <div className="col-12 cyi-input-row">
                            <label className="pi-input-label cyi-label-width">Secondary Color Code :</label>
                            <div className="cyi-color-field-wrapper">
                                <input
                                    type="text"
                                    name="secondaryColor"
                                    className="pi-field"
                                    value={customSettings.secondaryColor}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="color"
                                    name="secondaryColor"
                                    className="cyi-color-picker"
                                    value={customSettings.secondaryColor}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Tertiary Color */}
                        <div className="col-12 cyi-input-row">
                            <label className="pi-input-label cyi-label-width">Tertiary Color Code :</label>
                            <div className="cyi-color-field-wrapper">
                                <input
                                    type="text"
                                    name="tertiaryColor"
                                    className="pi-field"
                                    value={customSettings.tertiaryColor}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="color"
                                    name="tertiaryColor"
                                    className="cyi-color-picker"
                                    value={customSettings.tertiaryColor}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Text Color */}
                        <div className="col-12 cyi-input-row">
                            <label className="pi-input-label cyi-label-width">Text Inside Primary Color :</label>
                            <div className="cyi-color-field-wrapper">
                                <input
                                    type="text"
                                    name="textColor"
                                    className="pi-field"
                                    value={customSettings.textColor}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="color"
                                    name="textColor"
                                    className="cyi-color-picker"
                                    value={customSettings.textColor}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <hr className="ih-divider" />
        </div>
    );
};

export default CustomizeYourInvoice;