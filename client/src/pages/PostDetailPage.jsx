import React from "react";

import { DefaultLayout } from "../layouts";
import { Post } from "../components";
import { postData } from "../data";
import { useParams } from "react-router-dom";
import { POST_DETAIL } from "../constants/common";
import { useStateContext } from "../contexts/ContextProvider";

const PostDetailPage = () => {
  const { posts } = useStateContext();
  const { postId } = useParams();

  return (
    <DefaultLayout>
      <div className="w-full min-h-screen flex flex-col items-center bg-gray">
        <div className="my-6 mt-20 max-sm:px-4 bg-white rounded-md">
          <Post data={posts.filter((post) => post.id === postId - 1)} className='sm:w-150' type={POST_DETAIL} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PostDetailPage;
