import React, { useEffect, useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import { actionHaha, actionHeart, actionLike } from "../assets";
import { Link } from "react-router-dom";
import { ACTION_HAHA, ACTION_HEART, ACTION_LIKE } from "../constants/common";
import {
  addReactionToPost,
  deleteReactionFromPost,
  getReactionOnPost,
} from "../apis/ReactionApi";

const PostActionSection = ({ postId, reactions, onReactionsChange }) => {
  const [reactionOnPost, setReactionOnPost] = useState({});
  const [currentReaction, setCurrentReaction] = useState("");

  // Get current reaction of post
  // useEffect(() => {
  //   const process = async () => {
  //     try {
  //       let res = await getReactionOnPost(postId);

  //       if (res.status === 200) setReactionOnPost(res.data);
  //     } catch (e) {}
  //   };

  //   process();
  // }, [postId]);

  const handleReactionChange = (reactionType, popupState) => {
    setCurrentReaction(reactionType);
    popupState.close();

    if (reactionType !== "") {
      const addReaction = async () => {
        const reactionData = { reaction_type: reactionType };
        try {
          let addReactionRes = await addReactionToPost(postId, reactionData);
          console.log(addReactionRes);
          if (addReactionRes.status === 201) {
            onReactionsChange(prev => [addReactionRes.data, ...prev]);
            let getReactionRes = await getReactionOnPost(postId);
            
            if (getReactionRes.status === 200)
              setReactionOnPost(getReactionRes.data);
          }
        } catch (e) {}
      };

      addReaction();
    } else {
      const deleteReaction = async () => {
        try {
          let findReactionRes = await getReactionOnPost(postId);
          
          if (findReactionRes.status === 200) {
            let res = await deleteReactionFromPost(findReactionRes.data.id);
            console.log(res);
            if (res.status === 204) {
              setReactionOnPost({});
              setCurrentReaction("");
              onReactionsChange(prev => prev.filter(reaction => reaction.id !== findReactionRes.data.id));
            }
          }
        } catch (e) {
          return;
        }
      };

      deleteReaction();
    }
  };

  const populateReaction = (reactionType) => {
    switch (reactionType) {
      case ACTION_LIKE:
        return (
          <>
            <Avatar src={actionLike} sx={{ width: 18, height: 18 }} />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Thích
            </span>
          </>
        );
      case ACTION_HEART:
        return (
          <>
            <Avatar src={actionHeart} sx={{ width: 18, height: 18 }} />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Yêu thích
            </span>
          </>
        );
      case ACTION_HAHA:
        return (
          <>
            <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Haha
            </span>
          </>
        );
    }
  };

  const populateReactionString = (reactionType) => {
    switch (reactionType) {
      case ACTION_LIKE:
        return "thích";
      case ACTION_HEART:
        return "yêu thích";
      case ACTION_HAHA:
        return "haha";
      default:
        return;
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-x-20">
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <div
              {...bindTrigger(popupState)}
              className="w-fit flex items-center px-10 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer"
            >
              {reactionOnPost.reactionType || currentReaction !== '' ? (
                populateReaction(reactionOnPost.reactionType || currentReaction)
              ) : (
                <>
                  <ThumbUpOutlinedIcon
                    fontSize="small"
                    className="text-dark-gray"
                  />
                  <span className="text-sm text-dark-gray ml-1 font-semibold">
                    Thích
                  </span>
                </>
              )}
            </div>
            <Menu
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              elevation={2}
              {...bindMenu(popupState)}
            >
              {reactionOnPost.reactionType || currentReaction !== "" ? (
                <MenuItem onClick={() => handleReactionChange("", popupState)}>
                  {/* <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} /> */}
                  <BlockOutlinedIcon fontSize="small" />
                  <span className="ml-1.5">{`Bỏ ${populateReactionString(
                    reactionOnPost.reactionType || currentReaction
                  )}`}</span>
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    onClick={() =>
                      handleReactionChange(ACTION_LIKE, popupState)
                    }
                  >
                    <Avatar src={actionLike} sx={{ width: 18, height: 18 }} />
                    <span className="ml-2">Thích</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleReactionChange(ACTION_HEART, popupState)
                    }
                  >
                    <Avatar src={actionHeart} sx={{ width: 18, height: 18 }} />
                    <span className="ml-2">Yêu thích</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleReactionChange(ACTION_HAHA, popupState)
                    }
                  >
                    <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
                    <span className="ml-2">Haha</span>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </>
        )}
      </PopupState>
      <Link
        to={`/posts/${postId}`}
        className="w-fit flex items-center px-6 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer"
      >
        <ChatBubbleOutlineOutlinedIcon
          fontSize="small"
          className="text-dark-gray -mb-0.5"
        />
        <span className="text-sm text-dark-gray ml-1 font-semibold">
          Bình luận
        </span>
      </Link>
      {/* <div className="w-fit flex items-center px-8 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
        <ReplyOutlinedIcon fontSize="small" className="text-dark-gray" />
        <span className="text-sm text-dark-gray ml-1 font-semibold">
          Chia sẻ
        </span>
      </div> */}
    </div>
  );
};

export default PostActionSection;
