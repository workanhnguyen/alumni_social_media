import React from "react";
import moment from 'moment';
import "moment/locale/vi";

import { Avatar, Container } from "@mui/material";

import { DefaultLayout } from "../layouts";
import { useStateContext } from "../contexts/ContextProvider";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

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
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Group = () => {
  const { user } = useStateContext();
  return (
    <DefaultLayout>
      <div className="w-full min-h-screen flex bg-gray">
        <div className="flex-1 my-6 mt-20">
          <Container maxWidth="sm">
            {user.groupsSet.length > 0 && user.groupsSet.map((group, index) => (
              <div key={index} className="w-full flex p-4 mb-2 items-center bg-white rounded-md drop-shadow-sm">
                <Avatar {...stringAvatar(group.groupName)} />
                <div className="flex flex-col justify-center ml-2">
                  <p className="font-semibold">{group.groupName}</p>
                  <p className="text-sm">Bạn đã được thêm vào nhóm này vào {moment(group.createdAt).fromNow()}</p>
                </div>
              </div>
            ))}
          </Container>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Group;
