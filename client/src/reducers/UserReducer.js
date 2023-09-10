import cookie from "react-cookies";

import { GROUP, LETTER, LOGIN, LOGOUT, TOKEN, UPDATE, USER } from "../constants/common";

const UserReducer = (currentState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            cookie.remove(TOKEN);
            cookie.remove(USER);
            cookie.remove(LETTER);
            cookie.remove(GROUP);
            return null;
        case UPDATE:
            cookie.save(USER, { ...currentState, ...action.payload });
            return { ...currentState, ...action.payload };
        default:
            return currentState;
    }
}

export default UserReducer;