import cookie from "react-cookies";

import { LOGIN, LOGOUT, TOKEN, USER } from "../constants/common";

const UserReducer = (currentState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            cookie.remove(TOKEN);
            cookie.remove(USER);
            return null;
        default:
            return currentState;
    }
}

export default UserReducer;