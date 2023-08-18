import React from "react";

import { Container } from "@mui/material";
import { Post, PostPanel } from "../components";
import { DefaultLayout } from "../layouts";
import { postData } from "../data";

const posts = postData;

const DashBoard = () => {
  return (
    <DefaultLayout>
      <div className="w-full h-fit bg-gray">
        <Container>
          <PostPanel className="my-6 mt-20" />
          <div className="w-full flex flex-col items-center">
            {posts.length > 0 &&
              posts.map((post, index) => <Post key={index} data={post} />)}
          </div>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default DashBoard;
