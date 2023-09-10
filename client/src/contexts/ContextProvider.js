import React, { createContext, useContext, useReducer, useState } from "react";

import cookie from "react-cookies";

import { HOME } from "../constants/page";
import UserReducer from "../reducers/UserReducer";
import { GROUP, LETTER, TOKEN, USER } from "../constants/common";
import PostReducer from "../reducers/PostReducer";
import CommentReducer from "../reducers/CommentReducer";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(
    UserReducer,
    cookie.load(USER) || null
  );
  const [posts, postDispatch] = useReducer(PostReducer, []);
  const [comments, commentDispatch] = useReducer(CommentReducer, []);
  const token = cookie.load(TOKEN) || null;
  const [letterSet, setLetterSet] = useState(cookie.load(LETTER) || []);
  const [groupsSet, setGroupsSet] = useState(cookie.load(GROUP) || []);

  const [pageContent, setPageContent] = useState(HOME);
  const [postType, setPostType] = useState(null);
  const [postDetail, setPostDetail] = useState({});
  const [postCount, setPostCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [commentCount, setCommentCount] = useState(0);
  const [commentIndex, setCommentIndex] = useState(1);

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
        commentCount,
        setCommentCount,
        pageIndex,
        setPageIndex,
        commentIndex,
        setCommentIndex,
        token,
        letterSet,
        setLetterSet,
        groupsSet,
        setGroupsSet,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
