import React from "react";

import {
  CoverImage,
  Post,
  UserAvatar,
  UserCommonInfo,
  UserDetailInfo,
  UserImageList
} from "../components";
import { DefaultLayout } from "../layouts";
import { postData } from "../data";
import { blankAvatar } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";

const posts = postData;
const images = [
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
];

const PersonalPage = () => {
  const { user } = useStateContext(); 
  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col items-center bg-white drop-shadow-sm">
        <div className="max-lg:w-full lg:w-235 flex flex-col items-center my-6 mt-16">
          <CoverImage bgImage={user?.bgImage} />
          <div className="w-full flex max-lg:flex-col max-lg:items-center px-8">
            <UserAvatar avatar={user?.avatar} />
            <UserCommonInfo userInfo={user}  />
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center bg-gray">
        <div className="max-lg:w-full lg:w-235 flex max-lg:flex-col max-lg:items-center max-sm:px-4 gap-x-3">
          <div className="lg:sticky lg:top-20 w-full h-fit flex flex-col mt-3 items-center rounded-md gap-y-3">
            <UserDetailInfo />
            <UserImageList images={images} />
          </div>
          {/* Posts */}
          <div className="w-full h-full flex flex-col max-lg:items-center">
            {posts.length > 0 &&
              posts.map((post, index) => (
                <Post
                  key={index}
                  data={post}
                  className='max-sm:w-full max-md:w-4/5 max-lg:w-150 lg:w-128'
                />
              ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PersonalPage;
