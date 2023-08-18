import React from "react";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { Container } from "@mui/material";

const PersonalPage = () => {
  const { username } = useParams();
  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col bg-gray">
        <Container>
          <div className="my-6 mt-20">{username}</div>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default PersonalPage;
