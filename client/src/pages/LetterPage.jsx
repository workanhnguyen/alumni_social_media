import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../layouts";
import { Avatar, Button, Container, Skeleton } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { emptyPlaceholder1 } from "../assets";
import { getLetters } from "../apis/UserApi";

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
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const process = async () => {
      setIsLoading(true);
      try {
        let res = await getLetters();

        if (res.status === 200) {
          setLetters(res.data);
        }
      } catch (e) {
      } finally {
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
              {letters?.length > 0 ? (
                <>
                  {letters?.map((letter, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col p-4 mb-3 bg-white rounded-md drop-shadow-sm"
                    >
                      <div className="flex items-center">
                        <Avatar {...stringAvatar(letter.content)} />
                        <div className="flex flex-col justify-center ml-2">
                          <p className="font-semibold">{letter.content}</p>
                          <p className="text-sm">
                            Bạn được mời vào{" "}
                            {moment(letter.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p>{letter.description}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full flex flex-col mt-10 justify-center items-center">
                  <img
                    className="max-sm:w-3/4 w-1/2"
                    src={emptyPlaceholder1}
                    alt="no-posts"
                  />
                  <p>Hiện tại không có thư mời nào!</p>
                </div>
              )}
            </Container>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Letter;
