import {
  ADD_COMMENT,
  ADD_REACTION,
  ADD_RESPONSE_COMMENT,
  CREATE,
  DELETE,
  DELETE_COMMENT,
  FETCH_ALL,
  FETCH_BY_USER,
  LOCK_COMMENT,
  REMOVE_REACTION,
  UNLOCK_COMMENT,
  UPDATE,
  UPDATE_COMMENT,
  UPDATE_RESPONSE_COMMENT,
} from "../constants/common";

const PostReducer = (currentState, action) => {
  switch (action.type) {
    case FETCH_ALL:
    case FETCH_BY_USER:
      return action.payload;
    case CREATE:
      return [action.payload, ...currentState];
    case UPDATE:
      return currentState.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case DELETE:
      return currentState.filter((post) => post.id !== action.payload);
    case LOCK_COMMENT:
    case UNLOCK_COMMENT:
      return currentState.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case ADD_COMMENT:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? { ...post, comments: [action.payload.newComment, ...post.comments] }
          : post
      );
    case ADD_RESPONSE_COMMENT:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === action.payload.parentCommentId
                  ? {
                      ...comment,
                      listComments: [
                        action.payload.newResponseComment,
                        ...comment.listComments,
                      ],
                    }
                  : comment
              ),
            }
          : post
      );
    case UPDATE_COMMENT:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === action.payload.updatedComment.id
                  ? action.payload.updatedComment
                  : {
                      ...comment,
                      listComments: comment.listComments.map((childComment) =>
                        childComment.id === action.payload.updatedComment.id
                          ? action.payload.updatedComment
                          : childComment
                      ),
                    }
              ),
            }
          : post
      );
    case DELETE_COMMENT:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              comments: post.comments
                .map((comment) =>
                  comment.id === action.payload.deletedCommentId
                    ? null
                    : {
                        ...comment,
                        listComments: comment.listComments.filter(
                          (childComment) =>
                            childComment.id !== action.payload.deletedCommentId
                        ),
                      }
                )
                .filter(Boolean),
            }
          : post
      );
    case ADD_REACTION:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              reactions: [
                {
                  id: action.payload.newReaction.id,
                  reactionType: action.payload.newReaction.reactionType,
                  postId: action.payload.newReaction.postId.id,
                  userId: action.payload.newReaction.userId.id,
                },
                ...post.reactions,
              ],
            }
          : post
      );
    case REMOVE_REACTION:
      return currentState.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              reactions: post.reactions.filter(
                (reaction) => reaction.id !== action.payload.removedReactionId
              ),
            }
          : post
      );
    default:
      return currentState;
  }
};

export default PostReducer;
