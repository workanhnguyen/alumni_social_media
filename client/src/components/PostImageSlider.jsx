import React from "react";

const PostImageSlider = ({ images }) => {
  return (
    <div className="flex overflow-auto gap-x-1">
      {images?.map((image, index) => (
        <img key={index} src={image} alt="img" />
      ))}
    </div>
  );
};

export default PostImageSlider;
