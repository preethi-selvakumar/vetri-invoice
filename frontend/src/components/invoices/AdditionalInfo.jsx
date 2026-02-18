import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdditionalInfo = () => {
    // Fetch values from the context
    const { notesSettings } = useContext(AppContext);

    return (
        <div className="ai-container">
            {/* Notes Section */}
            <div className="row g-0">
                <div className="col-12 ai-input-group">
                    <h3 className="ai-heading">Notes</h3>
                    <div className="ai-text-box">
                        {notesSettings.notes}
                    </div>
                    <hr className="ih-divider" />
                </div>

                {/* Terms & Conditions Section */}
                <div className="col-12 ai-input-group">
                    <h3 className="ai-heading">Terms & Conditions</h3>
                    <div className="ai-text-box">
                        {notesSettings.terms}
                    </div>
                    <hr className="ih-divider" />
                </div>
            </div>
        </div>
    );
};

export default AdditionalInfo;