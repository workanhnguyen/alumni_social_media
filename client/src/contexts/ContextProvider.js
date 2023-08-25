import React, { createContext, useContext, useReducer, useState } from "react";

import cookie from "react-cookies";

import { HOME } from "../constants/page";
import UserReducer from "../reducers/UserReducer";
import { TOKEN, USER } from "../constants/common";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load(USER) || null);
  const token = cookie.load(TOKEN) || null;

  const [pageContent, setPageContent] = useState(HOME);
  const [postType, setPostType] = useState(null);
  const [postDetail, setPostDetail] = useState(null);

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
        dispatch,
        token,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
