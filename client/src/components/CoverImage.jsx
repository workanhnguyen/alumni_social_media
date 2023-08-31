import React, { useEffect, useState } from "react";

import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CoverImage = ({ bgImage }) => {
  const [contentWidth, setContentWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setContentWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
      <div
        className="relative w-full max-h-80 bg-gray-2 overflow-hidden rounded-bl-md rounded-br-md"
        style={{ height: `${contentWidth / 3}px` }}
      >
        <img className="w-full" src={bgImage} alt="" />
        <div className="absolute bottom-4 right-3 w-fit flex justify-center items-center p-2 bg-blackOverlay text-white rounded-md cursor-pointer">
          <CameraAltIcon />
          <span className="ml-1 font-semibold max-md:hidden">{bgImage === null ? 'Thêm ảnh bìa' : 'Chỉnh sửa ảnh bìa' }</span>
        </div>
      </div>
  );
};

export default CoverImage;
