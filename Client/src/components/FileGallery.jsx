import React from "react";

const FileGallery = ({ files, onFileClick }) => {
    return (
        <div>
            {files.map((file, index) => (
                <div key={index} onClick={() => onFileClick(file)} className="flex items-center cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <span className="mr-2">📎</span>
                    <span className="text-white">{file.split('/').pop()}</span>
                </div>
            ))}
        </div>
    );
};

export default FileGallery;