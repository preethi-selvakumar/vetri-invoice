import React from 'react';
import defaultLogo from '../../assets/images/main-logo.png';

const PreviewHeader = ({ headerData }) => {
    const companyName = headerData?.companyName || "VETRI IT SYSTEMS PVT LTD.,";
    const address = headerData?.address || "Shanthi complex, Second floor,";
    const cityState = headerData?.cityState || "Surandai, Tenkasi - 627 859";
    const country = headerData?.country || "India";

    let logoSrc = defaultLogo;
    let isExternal = false;

    if (headerData?.logo) {
        if (headerData.logo.startsWith('uploads/')) {
            // Backend URL - ensures no double slashes
            logoSrc = `https://vetri-invoice-backend.onrender.com/${headerData.logo.replace(/^\//, '')}`;
            isExternal = true;
        } else {
            logoSrc = headerData.logo;
        }
    }

    return (
        <div className="ph-blue-header">
            <div className="row align-items-center g-0">
                <div className="col-8 d-flex align-items-center ph-header-left">
                    <div className="ph-logo-bg">
                        <img
                            src={logoSrc}
                            alt="Logo"
                            className="ph-main-logo"
                            // Only this crossOrigin attribute helps the image appear in the PDF
                            // But if the server does not support CORS, the image will not load
                            crossOrigin={isExternal ? "anonymous" : undefined}
                            // If the image fails to load, show the default logo
                            onError={(e) => {
                                e.target.src = defaultLogo;
                                e.target.removeAttribute('crossOrigin');
                            }}
                        />
                    </div>
                    <div className="ph-company-info text-white ms-3">
                        <h4 className="ph-company-name">{companyName}</h4>
                        <p className="ph-company-addr">{address}</p>
                        <p className="ph-company-addr">{cityState}</p>
                        <p className="ph-company-addr">{country}</p>
                    </div>
                </div>

                <div className="col-4 text-end ph-header-right">
                    <div className="ph-title-container">
                        <h1 className="ph-title text-white">INVOICE</h1>
                    </div>
                </div>
            </div>
            <div className="ph-green-divider"></div>
        </div>
    );
};

export default PreviewHeader;
