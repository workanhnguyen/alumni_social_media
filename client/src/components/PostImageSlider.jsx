import React from "react";

const PostImageSlider = ({ images }) => {
  return (
    <div className="min-h-fit flex items-center overflow-auto gap-x-1">
      {images?.map((image, index) => (
        <img className="h-fit" key={index} src={image.url} alt="img" />
      ))}
    </div>
  );
};

export default PostImageSlider;
