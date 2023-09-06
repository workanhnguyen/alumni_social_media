import React, { useEffect, useState } from "react";

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
import { getPostsByUserId } from "../apis/PostApi";
import { FETCH_BY_USER } from "../constants/common";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../apis/UserApi";

const images = [
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
];

const PersonalPage = () => {
  const { posts, postDispatch } = useStateContext(); 

  const [currentUser, setCurrentUser] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const process = async () => {
      try {
        let userRes = await getUserByUsername(username);

        if (userRes.status === 200) {
          setCurrentUser(userRes.data);

          let postRes = await getPostsByUserId(userRes.data.id);
          if (postRes.status === 200)
            postDispatch({ type: FETCH_BY_USER, payload: postRes.data });
        }
      } catch (e) {
        console.log(e);
        return;
      }
    }

    process();
  }, [username]);
  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col items-center bg-white drop-shadow-sm">
        <div className="max-lg:w-full lg:w-235 flex flex-col items-center my-6 mt-16">
          <CoverImage bgImage={currentUser?.bgImage} />
          <div className="w-full flex max-lg:flex-col max-lg:items-center px-8">
            <UserAvatar avatar={currentUser?.avatar} />
            <UserCommonInfo userInfo={currentUser}  />
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center bg-gray">
        <div className="max-lg:w-full lg:w-235 flex max-lg:flex-col max-lg:items-center max-sm:px-4 gap-x-3">
          <div className="lg:sticky lg:top-20 w-full h-fit flex flex-col my-3 items-center rounded-md gap-y-3">
            <UserDetailInfo userInfo={currentUser} />
            {/* <UserImageList images={images} /> */}
          </div>
          {/* Posts */}
          <div className="w-full h-full flex flex-col max-lg:items-center mb-5">
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
