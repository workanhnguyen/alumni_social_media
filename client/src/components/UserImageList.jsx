import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserImageList = ({ images }) => {
  return (
    <div className="w-full max-sm:w-full max-md:w-4/5 max-lg:w-150 h-fit p-4 bg-white drop-shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Ảnh</p>
        <Link
          to="/"
          className="p-2 -my-2 -mr-2 text-primary rounded-md hover:bg-gray"
        >
          Xem tất cả ảnh
        </Link>
      </div>
      <Grid container spacing={1}>
        {images.map((image, index) => (
          <Grid key={index} item xs={4}>
            <img className="w-full" src={image} alt={`img-${index}`} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserImageList;
