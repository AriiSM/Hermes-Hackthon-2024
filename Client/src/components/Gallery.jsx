import React from "react";

const Gallery = ({images, onImageClick }) => {

    //console.log(images);
    return (
        <div className="dark:bg-black grid grid-cols-3 h-full">
            {images.map((img, index) => (
                <div key={index} className="w-full relative" 
                style={{ paddingBottom: '100%' }}>
                <img
                    src={img.image}
                    className="object-cover cursor-pointer border border-black absolute inset-0 w-full h-full"
                    style={{ maxHeight: '200px' }}
                    onClick={() => onImageClick(images[index])}
                />
                </div>
            ))}
        </div>
    );
};

export default Gallery;
