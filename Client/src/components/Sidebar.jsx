import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ level, text, showText, isProfile }) => {
    const navigate = useNavigate(); // Hook for navigation
    const displayLevel = level >= 3 ? 2 : 1
    const displayProfile = level >= 3 ? level-2 : level+1

    return (
        <div className="flex flex-col items-center justify-center p-4 text-white">
            <button
                onClick={() => navigate('/main')} // Navigates back to the home route
                className="absolute top-4 left-4 text-xl font-bold text-white"
            >
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-8 w-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2 7-7 7 7 2 2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                </svg>
            </button>

            {level !== null && <p>Level: {displayLevel}</p>}
            {level !== null && <p> {isProfile? "Profile Number" : "Message Number" }: {displayProfile} / {level >= 3 ? 5 : 3}</p>}
            <p
                className={`text-center transition-opacity duration-500 ease-in-out ${showText ? 'opacity-100' : 'opacity-0'}`}
            >{text}</p>
        </div>
    );
};

export default Sidebar;