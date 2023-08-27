import React from "react";

import { Container } from "@mui/material";
import { Post, PostPanel } from "../components";
import { DefaultLayout } from "../layouts";
import { useStateContext } from "../contexts/ContextProvider";
import { emptyPlaceholder1 } from "../assets";

const DashBoard = () => {
  const { posts } = useStateContext();
  return (
    <>
      <DefaultLayout>
        <div className="w-full min-h-screen flex flex-col bg-gray">
          <Container>
            <PostPanel className="my-6 mt-20" />
            <div className="flex flex-col items-center mb-4">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <Post key={index} data={post} className="sm:w-150 max-sm:w-full" />
                ))
              ) : (
                <div className="w-full flex flex-col mt-10 justify-center items-center">
                  <img className="max-sm:w-3/4 w-1/2" src={emptyPlaceholder1} alt="no-posts" />
                  <p>Hiện tại không có bài viết nào!</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export default DashBoard;
