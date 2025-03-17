import React from "react";
import "./Laptop.css";

const Laptop = ({ className, children, onZoom }) => {
    return (
        <div className={`laptop ${className} ${onZoom ? 'zoom' : ''}`}>
            <div className="screen">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Laptop;
