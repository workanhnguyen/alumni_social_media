import React, { createContext, useContext, useState } from "react";
import { HOME } from "../constants/page";

const StateContext = createContext();

const initUser = {
  username: "anhnguyen",
  firstName: "Anh",
  lastName: "Nguyễn",
  avatar:
    "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg",
};

export const ContextProvider = ({ children }) => {
  const [pageContent, setPageContent] = useState(HOME);
  const [loggingUser, setLoggingUser] = useState(initUser);
  const [postType, setPostType] = useState(null);
  const [postDetail, setPostDetail] = useState(null);

  return (
    <StateContext.Provider
      value={{
        pageContent,
        setPageContent,
        loggingUser,
        setLoggingUser,
        postType,
        setPostType,
        postDetail,
        setPostDetail
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
