import React, { useEffect, useState } from "react";

import { DefaultLayout } from "../layouts";
import { Post } from "../components";
import { useParams } from "react-router-dom";
import { POST_DETAIL } from "../constants/common";
import { useStateContext } from "../contexts/ContextProvider";
import { getPostById } from "../apis/PostApi";

const PostDetailPage = () => {
  const [postDetail, setPostDetail] = useState(null);

  const { comments, posts } = useStateContext();
  const { postId } = useParams();

  useEffect(() => {
    const process = async () => {
      try {
        let res = await getPostById(postId);
        if (res.status === 200) {
          setPostDetail(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    process();
  }, [comments, posts, postId]);
  return (
    <DefaultLayout>
      <div className="w-full min-h-screen flex flex-col items-center bg-gray">
        {postDetail && (
          <div className="my-6 mt-20 max-sm:px-4 bg-white rounded-md">
            <Post data={postDetail} className="sm:w-150" type={POST_DETAIL} />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PostDetailPage;
