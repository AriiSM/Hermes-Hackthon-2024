import React, { useState, useEffect } from "react";

const FileViewer = ({ file, onClose }) => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (!file) return;

        if (isImage(file)) {
            setContent(file);
        } else {
            fetch(file)
                .then(response => response.text())
                .then(text => setContent(text));
        }
    }, [file]);

    const isImage = (fileName) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileName);
    };

    if (!file) return null;

    return (
        <div className="dark:bg-black p-4" onClick={onClose}>
            {isImage(file) ? (
                <img src={content} alt="Full-size" className="max-w-full max-h-full" />
            ) : (
                <div className="flex items-start">
                    <span className="mr-2">📎</span>
                    <textarea 
                        value={content} 
                        readOnly 
                        className="scrollbar w-full h-96 bg-white dark:bg-gray-800 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-700"
                    />
                </div>
            )}
        </div>
    );
};

export default FileViewer;