import React, { useEffect, useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import { actionHaha, actionHeart, actionLike } from "../assets";
import { Link } from "react-router-dom";
import {
  ACTION_HAHA,
  ACTION_HEART,
  ACTION_LIKE,
  ADD_REACTION,
  REMOVE_REACTION,
} from "../constants/common";
import {
  addReactionToPost,
  deleteReactionFromPost,
  getReactionOnPost,
} from "../apis/ReactionApi";
import { useStateContext } from "../contexts/ContextProvider";

const PostActionSection = ({ postId, reactions }) => {
  const { user, postDispatch } = useStateContext();

  const [reactionOnPost, setReactionOnPost] = useState({});

  useEffect(() => {
    setReactionOnPost(
      reactions.find((reaction) => reaction.userId === user.id) || {}
    );
  }, [postId]);

  const handleReactionChange = (reactionType, popupState) => {
    popupState.close();

    if (reactionType !== "") {
      const addReaction = async () => {
        const reactionData = { reaction_type: reactionType };
        try {
          let addReactionRes = await addReactionToPost(postId, reactionData);
          
          if (addReactionRes.status === 201) {
            postDispatch({
              type: ADD_REACTION,
              payload: { postId: postId, newReaction: addReactionRes.data },
            });
            setReactionOnPost(addReactionRes.data);
          }
        } catch (e) {}
      };

      addReaction();
    } else {
      const deleteReaction = async () => {
        try {
          let res = await deleteReactionFromPost(reactionOnPost?.id);

          if (res.status === 204) {
            postDispatch({
              type: REMOVE_REACTION,
              payload: { postId: postId, removedReactionId: reactionOnPost.id },
            });
            setReactionOnPost({});
          }
          // }
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
              {reactionOnPost.reactionType ? (
                populateReaction(reactionOnPost.reactionType)
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
              {reactionOnPost.reactionType ? (
                <MenuItem onClick={() => handleReactionChange("", popupState)}>
                  {/* <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} /> */}
                  <BlockOutlinedIcon fontSize="small" />
                  <span className="ml-1.5">{`Bỏ ${populateReactionString(
                    reactionOnPost.reactionType
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
    </div>
  );
};

export default PostActionSection;
