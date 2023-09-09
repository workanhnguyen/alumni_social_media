import React, { useEffect, useState } from "react";

import {
  CoverImage,
  DataLoading,
  Post,
  SkeletonLoading,
  UserAvatar,
  UserCommonInfo,
  UserDetailInfo,
} from "../components";
import { DefaultLayout } from "../layouts";
import { emptyPlaceholder1 } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";
import { getPostsByUserId } from "../apis/PostApi";
import { FETCH_BY_USER } from "../constants/common";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../apis/UserApi";
import { Skeleton } from "@mui/material";

const PersonalPage = () => {
  const { username } = useParams();
  const { user, posts, postDispatch } = useStateContext();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const isCurrentUser = () => {
    if (username) return username === user?.username;
  };

  useEffect(() => {
    if (isCurrentUser()) {
      setCurrentUser(user);
      const process = async () => {
        setIsPostLoading(true);
        try {
          let postRes = await getPostsByUserId(user.id);
        if (postRes.status === 200)
          postDispatch({ type: FETCH_BY_USER, payload: postRes.data });
        } catch (e) {}
        finally {
          setIsPostLoading(false);
        }
      };

      process();
    } else {
      const process = async () => {
        setIsLoading(true);
        setIsPostLoading(true);
        try {
          let userRes = await getUserByUsername(username);

          if (userRes.status === 200) {
            console.log(userRes.data);
            setCurrentUser(userRes.data);

            let postRes = await getPostsByUserId(userRes.data.id);
            if (postRes.status === 200) {
              postDispatch({ type: FETCH_BY_USER, payload: postRes.data });
              setIsPostLoading(false);
            }
          }
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      };

      process();
    }
  }, [username]);

  return (
    <DefaultLayout>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <DataLoading />
        </div>
      ) : (
        <>
          <div className="w-full h-full flex flex-col items-center bg-white drop-shadow-sm">
            <div className="max-lg:w-full lg:w-235 flex flex-col items-center my-6 mt-16">
              <CoverImage
                bgImage={isCurrentUser() ? user.bgImage : currentUser?.bgImage}
              />
              <div className="w-full flex max-lg:flex-col max-lg:items-center px-8">
                <UserAvatar
                  avatar={isCurrentUser() ? user.avatar : currentUser?.avatar}
                />
                <UserCommonInfo userInfo={currentUser} />
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
                {isPostLoading ? (
                  <div className="max-sm:w-full max-md:w-4/5 max-lg:w-150 lg:w-128">
                    <SkeletonLoading />
                  </div>
                ) : (
                  <>
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <Post
                          key={index}
                          data={post}
                          className="max-sm:w-full max-md:w-4/5 max-lg:w-150 lg:w-128"
                        />
                      ))
                    ) : (
                      <div className="w-full flex flex-col mt-10 justify-center items-center">
                        <img
                          className="max-sm:w-3/4 w-1/2"
                          src={emptyPlaceholder1}
                          alt="no-posts"
                        />
                        <p>Hiện tại không có bài viết nào!</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default PersonalPage;
