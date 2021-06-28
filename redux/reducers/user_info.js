import * as actionTypes from "../constants/action-types";

const initialState = {
    user_id: null,
    user_name: null,
    user_mobile: null,
    profilepic: null,
    hubspot_mail: null
};


function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default userInfoReducer;