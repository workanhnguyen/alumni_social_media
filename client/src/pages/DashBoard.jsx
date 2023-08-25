import React from "react";

import { Container } from "@mui/material";
import { Post, PostPanel } from "../components";
import { DefaultLayout } from "../layouts";
import { postData } from "../data";
import { useStateContext } from "../contexts/ContextProvider";
import PageException from "../components/exceptions/PageException";
import { UNAUTHORIZED } from "../constants/common";

const posts = postData;

const DashBoard = () => {
  const { token } = useStateContext();

  return (
    <>
      {token ? (
        <DefaultLayout>
          <div className="w-full h-fit flex flex-col bg-gray">
            <Container>
              <PostPanel className="my-6 mt-20" />
              <div className="flex flex-col items-center mb-4">
                {posts.length > 0 &&
                  posts.map((post, index) => (
                    <Post key={index} data={post} className="sm:w-150" />
                  ))}
              </div>
            </Container>
          </div>
        </DefaultLayout>
      ) : (
        <PageException type={UNAUTHORIZED} />
      )}
    </>
  );
};

export default DashBoard;
