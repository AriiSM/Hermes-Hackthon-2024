import React, { useEffect, useState } from "react";
import "./ScreenLeft.css";
import gif1 from '../Assets/loginScreen.gif';

function ScreenLeft() {
    // const [codeLines, setCodeLines] = useState([]);
    // const maxLines = 20;
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Generate 5 random code lines at once
    //         const newCodeLines = Array.from({ length: 5 }, () => `0x${Math.floor(Math.random() * 124).toString(16)}`);
    //         setCodeLines((prevLines) => [...newCodeLines, ...prevLines].slice(0, maxLines));
    //     }, 100);
    //
    //     return () => clearInterval(interval);
    // }, []);


    return (
        <div className="app-container">
            <div className="computer-frame">
                <img src={gif1} alt="loginScreen" className="loginScreen" />
            </div>
        </div>
    );
}

export default ScreenLeft;