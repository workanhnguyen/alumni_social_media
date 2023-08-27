import React, { useRef, useState } from "react";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const ImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleRemoveImage = (indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesChange(newImages);
  };
  return (
    <div className="w-full min-h-fit max-h-80 border mt-3 p-2 border-gray-2 rounded-md overflow-auto">
      {images.length === 0 ? (
        <label htmlFor="fileInput" className={`relative overflow-auto`}>
          <div className="w-full h-full flex flex-col justify-center items-center py-20 bg-gray-3 rounded-md hover:bg-gray-2 cursor-pointer">
            <AddPhotoAlternateIcon fontSize="large" />
            <span className="font-semibold">Thêm ảnh/video</span>
            <span className="text-xs text-dark-gray">hoặc kéo và thả</span>
          </div>
        </label>
      ) : (
        <div className="relative w-full h-full bg-gray-3 overflow-auto rounded-md">
          <label
            htmlFor="fileInput"
            className="absolute z-10 top-2.5 left-3 flex items-center px-2 py-1.5 drop-shadow-md rounded-md bg-white cursor-pointer hover:bg-gray-2"
          >
            <AddPhotoAlternateIcon fontSize="small" />
            <span className="text-sm ml-1">Thêm ảnh</span>
          </label>
          {images.map((image, index) => (
            <div key={index} className="relative mb-3">
              <div
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2.5 right-3 px-1.5 py-1 drop-shadow-md rounded-full bg-white cursor-pointer hover:bg-gray-2"
              >
                <CloseIcon fontSize="small" />
              </div>
              <img
                className="h-full"
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
              />
            </div>
          ))}
        </div>
      )}
      <input
        className="hidden"
        ref={fileInputRef}
        id="fileInput"
        type="file"
        multiple
        accept=".png, .jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
