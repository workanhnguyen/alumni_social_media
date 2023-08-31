import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_USER,
  LOCK_COMMENT,
  UNLOCK_COMMENT,
  UPDATE,
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
    default:
      return currentState;
  }
};

export default PostReducer;
