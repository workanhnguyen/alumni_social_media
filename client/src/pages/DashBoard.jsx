import React, { useEffect, useState, memo } from "react";

import { Container, Pagination } from "@mui/material";

import { Post, PostPanel, SkeletonLoading } from "../components";
import { DefaultLayout } from "../layouts";
import { useStateContext } from "../contexts/ContextProvider";
import { emptyPlaceholder1 } from "../assets";
import { countAllPosts, getAllPosts } from "../apis/PostApi";
import { FETCH_ALL, POST_NORMAL, POST_PER_PAGE } from "../constants/common";

const DashBoard = () => {
  const {
    user,
    posts,
    postDispatch,
    postCount,
    setPostCount,
    pageIndex,
    setPageIndex,
  } = useStateContext();
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    const handleFetchAllPosts = async () => {
      setIsPostsLoading(true);
      try {
        let res = await getAllPosts(pageIndex);

        if (res.status === 200) {
          postDispatch({ type: FETCH_ALL, payload: res.data });
        }
      } catch (e) {
      } finally {
        setIsPostsLoading(false);
      }
    };

    const handleGetCountAllPosts = async () => {
      try {
        let res = await countAllPosts();
        setPostCount(res.data);
      } catch (e) {
        console.log(e);
        return;
      }
    };

    handleFetchAllPosts();
    handleGetCountAllPosts();
  }, [postCount, pageIndex]);

  // if (isPostsLoading)
  // return <div>
  //   <SkeletonLoading />
  // </div>

  return (
    <>
      <DefaultLayout>
        <div className="w-full min-h-screen flex flex-col bg-gray">
          <Container>
            <PostPanel className="my-6 mt-20" />
            <div className="flex flex-col items-center mb-4">
              {isPostsLoading ? (
                <SkeletonLoading className="sm:w-150 max-sm:w-full" />
              ) : (
                <>
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <Post
                        key={index}
                        data={post}
                        className="sm:w-150 max-sm:w-full"
                        type={POST_NORMAL}
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
            {/* Pagination */}
            {postCount !== 0 && (
              <div className="w-full flex justify-center mt-24 mb-3">
                <Pagination
                  color="primary"
                  count={Math.ceil(postCount / POST_PER_PAGE)}
                  onChange={(event, page) => setPageIndex(page)}
                  page={pageIndex}
                />
              </div>
            )}
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export default memo(DashBoard);
