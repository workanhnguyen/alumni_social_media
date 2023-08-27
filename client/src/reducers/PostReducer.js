import { CREATE, DELETE, UPDATE } from "../constants/common";

const PostReducer = (currentState, action) => {
    switch (action.type) {
        case CREATE:
            return [action.payload, ...currentState];
        case UPDATE:
            return [...currentState.map((post) => post.id === action.payload.id ? action.payload : post)];
        case DELETE:
            return [...currentState.filter((post) => post.id !== action.payload)];
        default:
            return currentState;
    }
}

export default PostReducer;