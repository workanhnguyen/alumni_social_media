import { CREATE, DELETE, UPDATE } from "../constants/common";

const CommentReducer = (currentState, action) => {
    switch (action.type) {
        case CREATE:
            return [action.payload, ...currentState];
        case UPDATE:
            return [...currentState.map((comment) => comment.id === action.payload.id ? action.payload : comment)];
        case DELETE:
            return [...currentState.filter((comment) => comment.id !== action.payload)];
        default:
            return currentState;
    }
}

export default CommentReducer;