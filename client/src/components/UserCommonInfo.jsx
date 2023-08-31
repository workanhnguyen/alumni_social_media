import React from "react";

const UserCommonInfo = ({ userInfo }) => {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center max-lg:items-center max-lg:mt-2 lg:ml-5 gap-y-1">
        <p className="text-3xl font-semibold">{`${userInfo?.lastName} ${userInfo?.firstName}`}</p>
        <p className="text-dark-gray">Khoa {userInfo?.majorId?.departmentId.name}</p>
      </div>
    </>
  );
};

export default UserCommonInfo;
