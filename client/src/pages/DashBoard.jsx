import React from "react";

import { Container } from "@mui/material";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { GROUP, HOME, LETTER } from "../constants/Role";

const DashBoard = () => {
    const { pageContent } = useStateContext();
  return (
    <div className="w-full h-fit bg-gray">
      <Header />
      <Container>
        {pageContent === HOME && (<h1>home</h1>)}
        {pageContent === GROUP && (<h1>group</h1>)}
        {pageContent === LETTER && (<h1>letter</h1>)}
      </Container>
    </div>
  );
};

export default DashBoard;
