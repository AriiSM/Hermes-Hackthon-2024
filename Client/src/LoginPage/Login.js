import React, { useState } from 'react';
import BackGround from "./BackGround";
import Laptop from "./Laptop";
import ScreenLeft from "./ScreenLeft";
import ScreenRight from "./ScreenRight";


function Login() {
    const [zoom, setZoom] = useState(false);

    const handleZoom = () => {
        setZoom(true);
        setTimeout(() => {
            setZoom(false);
        }, 200);
    };

    return (
        <BackGround>
            <div>
                <Laptop className="left-laptop">
                    <ScreenLeft />
                </Laptop>
                <Laptop className="right-laptop" onZoom={zoom}>
                    <ScreenRight onZoom={handleZoom} />
                </Laptop>
            </div>
        </BackGround>
    );
}

export default Login;
