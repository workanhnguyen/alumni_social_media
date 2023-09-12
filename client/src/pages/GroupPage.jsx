import React, { memo, useEffect, useMemo, useState } from "react";
import moment from "moment";
import "moment/locale/vi";

import { Avatar, Button, Container, Skeleton } from "@mui/material";

import { DefaultLayout } from "../layouts";
import { useStateContext } from "../contexts/ContextProvider";
import { emptyPlaceholder1, messengerIcon } from "../assets";
import { Link } from "react-router-dom";
import { getGroups } from "../apis/UserApi";
import { FETCH_ALL } from "../constants/common";

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

const Group = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const process = async () => {
      setIsLoading(true);
      try {
        let res = await getGroups();

        if (res.status === 200) {
          setGroups(res.data);
        }
      } catch (e) {}
      finally {
        setIsLoading(false);
      }
    };

    process();
  }, []);

  return (
    <DefaultLayout>
      <div className="w-full min-h-screen flex bg-gray">
        <div className="flex-1 my-6 mt-20">
          {isLoading ? (
            <Container maxWidth="sm">
              <div className="flex p-4 bg-white rounded-md">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="ml-2 flex flex-col justify-center gap-y-2">
                  <Skeleton variant="rounded" width={300} height={14} />
                  <Skeleton variant="rounded" width={150} height={14} />
                </div>
              </div>
            </Container>
          ) : (
            <Container maxWidth="sm">
              {groups?.length > 0 ? (
                groups?.map((group, index) => (
                  <div
                    key={index}
                    className="w-full flex p-4 mb-2 items-center bg-white rounded-md drop-shadow-sm"
                  >
                    <Avatar {...stringAvatar(group.groupName)} />
                    <div className="flex flex-col justify-center ml-2">
                      <p className="font-semibold">{group.groupName}</p>
                      <p className="text-sm">
                        Bạn được thêm vào nhóm này vào{" "}
                        {moment(group.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="flex-1 flex justify-end">
                      <Link to={`/chattings/${group.id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          size="large"
                        >
                          <img src={messengerIcon} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col mt-10 justify-center items-center">
                  <img
                    className="max-sm:w-3/4 w-1/2"
                    src={emptyPlaceholder1}
                    alt="no-posts"
                  />
                  <p>Hiện tại bạn không tham gia nhóm nào!</p>
                </div>
              )}
            </Container>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default memo(Group);
