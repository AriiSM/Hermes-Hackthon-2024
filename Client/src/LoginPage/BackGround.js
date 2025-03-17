import React, { useState } from 'react';
import './BackGround.css';

const BackGround = ({ children }) => {
    const [zoom, setZoom] = useState(false);

    const handleZoom = (event) => {
        if (event.target.tagName === 'BUTTON') {
            setZoom(!zoom);
        }
    };

    return (
        <div className={`background ${zoom ? 'zoom' : ''}`} onClick={handleZoom}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { onZoom: handleZoom })
            )}
        </div>
    );
};

export default BackGround;