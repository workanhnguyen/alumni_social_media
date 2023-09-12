import { FETCH_ALL } from "../constants/common";

const GroupReducer = (currentState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        default:
            return currentState;
    }
}

export default GroupReducer;