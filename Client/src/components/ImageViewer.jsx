import React, {useContext, useEffect, useState} from "react";

const ImageViewer = ({ image, onClose }) => {
    return (
        <>
        { image ? (
            <div 
                className={`dark:bg-black flex flex-col items-center justify-center h-full`} >
            <img src={image.image ? image.image : image} alt="Full-size" 
                className={`transition-transform duration-500 transform scale-90 hover:scale-100`}
             />
            <div className="text-white flex items-center space-x-16">
                { image.likes &&
                    <><div className="flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 text-red-500"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="font-bold">{image.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 text-blue-500"
                        >
                            <path d="M21 6h-2v9H6v2h10.59L21 19.59V6z" />
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 .55-.45 1-1 1H6l-4 4V6c0-1.1.9-2 2-2z" />
                        </svg>
                        <span className="font-bold">{image.comments}</span>
                    </div></>
                }
                </div>
            </div>
            ) : (
                <div
                    className="w-full h-full dark:bg-black flex items-center justify-center"
                >
                    <span className="text-white">No Image</span>
                </div>
        )}
        </>
    );
};

export default ImageViewer;
