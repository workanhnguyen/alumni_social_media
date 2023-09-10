import React from "react";
import { DefaultLayout } from "../layouts";
import { Avatar, Button, Container } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Letter = () => {
  const { user } = useStateContext();
  console.log(user);
  return (
    <DefaultLayout>
      <div className="w-full min-h-screen flex bg-gray">
        <div className="flex-1 my-6 mt-20">
          <Container maxWidth="sm">
            {user.letterSet.length > 0 &&
              user.letterSet.map((letter, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col p-4 mb-3 bg-white rounded-md drop-shadow-sm"
                >
                  <div className="flex items-center">
                    <Avatar {...stringAvatar(letter.content)} />
                    <div className="flex flex-col justify-center ml-2">
                      <p className="font-semibold">{letter.content}</p>
                      <p className="text-sm">
                        Bạn được mời vào {moment(letter.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p>{letter.description}</p>
                  </div>
                </div>
              ))}
          </Container>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Letter;
