import React, { createContext, useContext, useState } from "react";
import { HOME } from "../constants/Role";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [pageContent, setPageContent] = useState(HOME);
  return (
    <StateContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
