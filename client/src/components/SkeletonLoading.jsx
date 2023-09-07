import { Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoading = ({ className }) => {
  return (
    <div
      className={`${className} flex flex-col pt-4 p-4 mt-3 bg-white rounded-md drop-shadow-sm`}
    >
      <div className="w-full flex flex-col justify-between gap-y-3">
        <div className="flex">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="ml-2 flex flex-col justify-center gap-y-1">
            <Skeleton variant="rounded" width={120} height={14} />
            <Skeleton variant="rounded" width={100} height={14} />
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <Skeleton variant="rounded" width="full" height={30} />
          <Skeleton variant="rounded" width="full" height={200} />
        </div>
        <div className="flex justify-between">
          <Skeleton variant="rounded" width={200} height={14} />
          <Skeleton variant="rounded" width={200} height={14} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
