import React, { useState } from "react";

const Modal = ({ isOpen, onClose, isCorrect }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <button
                onClick={onClose}
                className="w-full h-full bg-white dark:bg-black flex flex-col items-center justify-center transition-transform duration-300 transform"
                style={{
                    transform: isOpen ? "translateY(0)" : "translateY(-20px)",
                }}
            >
                <h1
                    className={`text-9xl font-bold mb-4 ${
                        isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {isCorrect ? "Correct" : "Wrong"}
                </h1>
            </button>
        </div>
    );
};

export default Modal;
