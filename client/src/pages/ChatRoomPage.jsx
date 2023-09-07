import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
import moment from "moment";
import "moment/locale/vi";

import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { auth, database } from "../configs/FirebaseConfig";
import { Link, useParams } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { useStateContext } from "../contexts/ContextProvider";
import { messengerIcon } from "../assets";

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

const ChatRoomPage = () => {
  const { user } = useStateContext();
  const { chatRoomId: room } = useParams();
  const lastMessageRef = useRef(null);

  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(
    user?.groupsSet.find((group) => group.id === parseInt(room))
  );
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const messagesRef = collection(database, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const unsubcribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });

      setMessages(messages);
    });

    setCurrentGroup(user?.groupsSet.find((group) => group.id === parseInt(room)))

    return () => unsubcribe();
  }, [room]);

  useEffect(() => {
    // Scroll to the last message when messages change or on initial load
    if (lastMessageRef.current) {
        lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    const process = async () => {
      setIsSendingMessage(true);

      try {
        let res = await addDoc(messagesRef, {
          text: messageContent,
          createdAt: serverTimestamp(),
          user: user,
          room: room,
        });

        setMessageContent("");
      } catch (error) {
      } finally {
        setIsSendingMessage(false);
      }
    };

    process();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
  }

  return (
    <DefaultLayout>
      <div className="w-full h-screen flex-1 flex bg-gray overflow-hidden">
        <Container>
          <div className="flex mt-20">
            {/* Groups */}
            <div className="w-2/5 max-sm:w-20 max-md:w-20 min-h-screen mr-3">
              <p className="max-md:hidden mb-5 font-semibold text-xl">
                Danh sách nhóm
              </p>
              <div className="max-md:mt-4 h-5/6 overflow-auto">
                {user.groupsSet.length > 0 &&
                  user.groupsSet.map((group, index) => (
                    <Link
                    to={`/chattings/${group.id}`}
                      key={index}
                      className="w-full flex max-md:justify-center px-4 py-2 mb-3 rounded-md hover:bg-white"
                    >
                      <Avatar {...stringAvatar(group.groupName)} />
                      <div className="max-md:hidden flex flex-col justify-center ml-2">
                        <p className="font-semibold">{group.groupName}</p>
                        <p className="text-sm">
                          Bạn được thêm vào nhóm này vào{" "}
                          {moment(group.createdAt).fromNow()}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Messages */}
            <div className="relative h-fit flex-1 flex flex-col justify-between p-3 bg-white rounded-md">
              {/* Group chat info */}
              <div className="border-b-0.5 border-gray w-full">
                <div className="w-full flex items-center px-4 py-2 mb-3">
                  <Avatar {...stringAvatar(currentGroup.groupName)} />
                  <div className="flex flex-col justify-center ml-2">
                    <p className="font-semibold">{currentGroup.groupName}</p>
                    <div className="text-sm flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2 bg-green-400"></div>
                      <p>Đang hoạt động</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Messages content */}
              <div ref={lastMessageRef} className="w-full h-128 mb-5 p-4 overflow-auto">
                  {messages.map((message, index) => (
                      <div key={index} className={`my-1 flex ${user.id === message.user.id ? 'justify-end' : 'flex-row-reverse justify-end'} rounded-md`}>
                        <p className={`px-4 py-2 break-all ${user.id === message.user.id ? 'mr-1 bg-blue text-white' : 'ml-1 bg-gray-4 text-black'}  rounded-md`}>{message.text}</p>
                        <Avatar src={message.user.avatar} sx={{ width: 24, height: 24 }} />
                      </div>
                  ))}
                </div>
              {/* Input message */}
              <div className="w-auto flex items-center rounded-3xl cursor-pointer hover:bg-gray-2 overflow-hidden">
                <input
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 pr-10 py-2 border-none outline-none bg-gray"
                  placeholder="Nhắn tin..."
                />
                <span
                  onClick={handleSendMessage}
                  className={`absolute right-6 ${
                    messageContent.trim() === ""
                      ? "hidden"
                      : "flex flex-col justify-center"
                  } text-primary`}
                >
                  {isSendingMessage ? (
                    <CircularProgress size={"24px"} />
                  ) : (
                    <SendIcon fontSize="small" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default ChatRoomPage;
