import {
  ADD_COMMENT,
  ADD_RESPONSE_COMMENT,
  CREATE,
  DELETE,
  DELETE_COMMENT,
  FETCH_ALL,
  FETCH_BY_USER,
  LOCK_COMMENT,
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
    default:
      return currentState;
  }
};

export default PostReducer;
