import * as actionTypes from "../constants/action-types";

const initialState = {
    categories: [],
    status: 'idle',
    error: null,
};

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORY_START:
            return {
                ...state,
                status: 'loading',
            }

        case actionTypes.FETCH_CATEGORY_FAIL:
            return {
                ...state,
                status: 'failed',
            }

        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                status: 'succeeded',
                categories: [...action.payload]
            }

        default:
            return state
    }
}

export default categoryReducer;