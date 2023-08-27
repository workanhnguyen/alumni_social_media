import React, { useEffect, useRef, useState } from "react";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const ImageEditor = ({ imageList=[], onImageChange }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState(imageList);

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
  };

  const handleRemoveImageFile = (indexToRemove) => {
    setImageFiles((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveImageUrl = (indexToRemove) => {
    setImageUrls((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => { onImageChange([...imageFiles, ...imageUrls]) }, [imageFiles, imageUrls]);

  return (
    <div className="w-full min-h-fit max-h-80 border mt-3 p-2 border-gray-2 rounded-md overflow-auto">
      {imageFiles.length === 0 && imageUrls.length === 0 ? (
        <label htmlFor="fileInput1" className={`relative overflow-auto`}>
          <div className="w-full h-full flex flex-col justify-center items-center py-20 bg-gray-3 rounded-md hover:bg-gray-2 cursor-pointer">
            <AddPhotoAlternateIcon fontSize="large" />
            <span className="font-semibold">Thêm ảnh/video</span>
            <span className="text-xs text-dark-gray">hoặc kéo và thả</span>
          </div>
        </label>
      ) : (
        <div className="relative w-full h-full bg-gray-3 overflow-auto rounded-md">
          <label
            htmlFor="fileInput1"
            className="absolute z-10 top-2.5 left-3 flex items-center px-2 py-1.5 drop-shadow-md rounded-md bg-white cursor-pointer hover:bg-gray-2"
          >
            <AddPhotoAlternateIcon fontSize="small" />
            <span className="text-sm ml-1">Thêm ảnh</span>
          </label>
          {imageFiles.length !== 0 &&
            imageFiles.map((imageFile, index) => (
              <div key={index} className="relative mb-3">
                <div
                  onClick={() => handleRemoveImageFile(index)}
                  className="absolute top-2.5 right-3 px-1.5 py-1 drop-shadow-md rounded-full bg-white cursor-pointer hover:bg-gray-2"
                >
                  <CloseIcon fontSize="small" />
                </div>
                <img
                  className="h-full"
                  src={URL.createObjectURL(imageFile)}
                  alt={`Preview ${index}`}
                />
              </div>
            ))}

          {imageUrls.length !== 0 &&
            imageUrls.map((imageUrl, index) => (
              <div key={index} className="relative mb-3">
                <div
                  onClick={() => handleRemoveImageUrl(index)}
                  className="absolute top-2.5 right-3 px-1.5 py-1 drop-shadow-md rounded-full bg-white cursor-pointer hover:bg-gray-2"
                >
                  <CloseIcon fontSize="small" />
                </div>
                <img className="h-full" src={imageUrl} alt={`Preview ${index}`} />
              </div>
            ))}
        </div>
      )}
      <input
        className="hidden"
        ref={fileInputRef}
        id="fileInput1"
        type="file"
        multiple
        accept=".png, .jpg"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageEditor;
