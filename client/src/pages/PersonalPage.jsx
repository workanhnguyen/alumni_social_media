import React, { useEffect } from "react";

import {
  CoverImage,
  Post,
  UserAvatar,
  UserCommonInfo,
  UserDetailInfo,
  UserImageList
} from "../components";
import { DefaultLayout } from "../layouts";
import { blankAvatar, emptyPlaceholder1 } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";
import { getPostsByCurrentUser } from "../apis/PostApi";
import { FETCH_BY_USER } from "../constants/common";

const images = [
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
];

const PersonalPage = () => {
  const { user, posts, postDispatch } = useStateContext(); 

  useEffect(() => {
    const process = async () => {
      try {
        let res = await getPostsByCurrentUser();

        if (res.status === 200) {
          postDispatch({ type: FETCH_BY_USER, payload: res.data });
        }
      } catch (e) {
        console.log(e);
        return;
      }
    }

    console.log("re-render");

    process();
  }, []);
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
            <UserDetailInfo userInfo={user} />
            <UserImageList images={images} />
          </div>
          {/* Posts */}
          <div className="w-full h-full flex flex-col max-lg:items-center">
            {posts.length > 0 ?
              (posts.map((post, index) => (
                <Post
                  key={index}
                  data={post}
                  className='max-sm:w-full max-md:w-4/5 max-lg:w-150 lg:w-128'
                />
              ))) : (
                <div className="w-full flex flex-col mt-10 justify-center items-center">
                  <img
                    className="max-sm:w-3/4 w-1/2"
                    src={emptyPlaceholder1}
                    alt="no-posts"
                  />
                  <p>Hiện tại không có bài viết nào!</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PersonalPage;
