import React, { createContext, useContext, useReducer, useState } from "react";

import cookie from "react-cookies";

import { HOME } from "../constants/page";
import UserReducer from "../reducers/UserReducer";
import { TOKEN, USER } from "../constants/common";
import PostReducer from "../reducers/PostReducer";
import CommentReducer from "../reducers/CommentReducer";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(UserReducer, cookie.load(USER) || null);
  const [posts, postDispatch] = useReducer(PostReducer, []);
  const [comments, commentDispatch] = useReducer(CommentReducer, []);
  const token = cookie.load(TOKEN) || null;

  const [pageContent, setPageContent] = useState(HOME);
  const [postType, setPostType] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <StateContext.Provider
      value={{
        pageContent,
        setPageContent,
        postType,
        setPostType,
        postDetail,
        setPostDetail,
        user,
        userDispatch,
        posts,
        postDispatch,
        comments,
        commentDispatch,
        postCount,
        setPostCount,
        pageIndex, setPageIndex,
        token,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
