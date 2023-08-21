import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { DefaultLayout } from "../layouts";

const PostDetailPage = () => {
  const { postDetail } = useStateContext();
  return (
    <DefaultLayout>
      <div className="w-full h-full flex justify-center bg-gray">
        <div className="max-sm:w-full w-150 bg-white my-6 mt-20 px-4 py-3 rounded-md drop-shadow-sm">
          hihi
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PostDetailPage;
