import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { Container } from "@mui/material";
import { blankAvatar } from "../assets";

const PersonalPage = () => {
  const { username } = useParams();
  const [contentWidth, setContentWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setContentWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <DefaultLayout>
      <div className="w-full h-full flex flex-col items-center bg-gray">
          <div className="max-lg:w-full lg:w-235 flex flex-col items-center my-6 mt-16">
            <div className="w-full max-h-80 bg-emerald-400 overflow-hidden rounded-bl-md rounded-br-md" style={{ height: `${contentWidth / 3}px`}}>
              <img className="w-full" src={blankAvatar} alt="" />
            </div>
          </div>
      </div>
    </DefaultLayout>
  );
};

export default PersonalPage;
