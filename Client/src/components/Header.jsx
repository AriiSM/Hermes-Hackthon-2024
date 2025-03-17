import React, { useState } from "react";
import Button from './Button';   

const Header = ({name, nextLevelHandler, textFake, textReal}) => {
    return (
        <header className="dark:bg-black flex flex-col items-center justify-center">
            
            <div className="flex justify-center space-x-4 py-2">
                <Button
                    onClick={() => {
                        nextLevelHandler(false);
                    }}
                    className="text-lg font-bold w-32 items-center justify-center bg-red-500"
                >
                    {textFake}
                </Button>
                <Button
                    onClick={() => {
                        nextLevelHandler(true);
                    }}
                    className="text-lg font-bold w-32 items-center justify-center"
                >
                    {textReal}
                </Button>
            </div>

            <div className="px-5 w-full">
                <h4 className="text-4xl font-heading text-white">
                    {name}
                </h4>
            </div>
        </header>
    );
};

export default Header;
