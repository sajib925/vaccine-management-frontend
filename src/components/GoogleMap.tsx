import React from 'react';

const GoogleMap: React.FC = () => {
    return (
        <div className="mx-auto w-full px-4 max-w-screen-xl lg:h-[500px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0130721476394!2d90.3871419!3d24.7587492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564f20db960d11%3A0x7707fc65b079dc0d!2sSankipara%20Notun%20Jame%20Mosjid!5e0!3m2!1sen!2sbd!4v1698247412183!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
