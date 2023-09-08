import React, { memo, useEffect, useState } from "react";

import { Avatar } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { actionHaha, actionHeart, actionLike } from "../assets";
import { ACTION_HAHA, ACTION_HEART, ACTION_LIKE } from "../constants/common";
import { useStateContext } from "../contexts/ContextProvider";

const PostReactionQuantity = ({ reactions, postId }) => {
  
  const { user, posts } = useStateContext();
  const [commentQuantity, setCommentQuantity] = useState(0);

  useEffect(() => {
    const quantityCommentOfPost = posts.reduce((sum, currentPost) => {
      if (currentPost.id === postId) {
        sum += currentPost.comments.length;
    
        // If you want to count responses within comments as well
        currentPost.comments.forEach((comment) => {
          sum += comment.listComments.length;
        });
      }
      return sum;
    }, 0);
    setCommentQuantity(quantityCommentOfPost)
  }, [posts]);

  if (postId === 24)
    console.log(commentQuantity);

  const handleUniqueReactions = (reactions) => {
    const uniqueIconArray = reactions.reduce((accumulator, reaction) => {
      if (!accumulator[reaction.reactionType]) {
        accumulator[reaction.reactionType] = true;
        accumulator.result.push(reaction);
      }
      return accumulator;
    }, { result: []}).result;
    return uniqueIconArray;
  };

  const populateIconReaction = (reactionType) => {
    switch (reactionType) {
      case ACTION_LIKE:
        return <Avatar src={actionLike} sx={{ width: 18, height: 18 }} />
      case ACTION_HEART:
        return <Avatar src={actionHeart} sx={{ width: 18, height: 18 }} />
      case ACTION_HAHA:
        return <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
    }
  };

  const checkLoggingUserReactionExisting = (reactions) => {
    return reactions.some(reaction => reaction.userId.id === user.id);
  };

  const populateStringReaction = (reactions) => {
    const isLoggingUser = checkLoggingUserReactionExisting(reactions);
    if (isLoggingUser && reactions.length === 1)
      return "Bạn";
    else if (isLoggingUser &&  reactions.length > 1)
      return `Bạn và ${reactions.length - 1} người khác`
    else if (!isLoggingUser && reactions.length === 1)
      return `${reactions[0].userId.lastName} ${reactions[0].userId.firstName}`;
    else if (!isLoggingUser && reactions.length > 1)
    return `${reactions[0].userId.lastName} ${reactions[0].userId.firstName} và ${reactions.length - 1} người khác`;
    else
      return "Chưa có người thích bài viết này"
  };

  return (
    <div className="w-full flex justify-between px-4 py-3">
      {/* Like quantities */}
      <div className="w-fit flex items-center">
        {handleUniqueReactions(reactions).map((reaction, index) => 
          <div key={index}>
          {populateIconReaction(reaction.reactionType)}
          </div>
        )}
        <span className={`${reactions.length > 0 && 'ml-2'} text-dark-gray text-sm`}>
          {populateStringReaction(reactions)}
        </span>
      </div>
      {/* Comment quantities */}
      <div className="w-fit flex items-center">
        <ChatBubbleOutlineOutlinedIcon
          className="text-dark-gray"
          fontSize="small"
        />
        <span className="text-sm text-dark ml-1 -mt-1">{commentQuantity}</span>
      </div>
    </div>
  );
};

export default memo(PostReactionQuantity);
