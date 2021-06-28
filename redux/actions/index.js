import * as actionTypes from "../constants/action-types";
import axios from "axios";
import * as constants from "../../components/constants";

export const fetchCategorySuccess = ( data ) => {
    return {
        type: actionTypes.FETCH_CATEGORY_SUCCESS,
        payload: data
    };
};

export const fetchCategoryFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CATEGORY_FAIL,
        error: error
    };
}

export const fetchCategoryStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORY_START
    };
};

export const fetchCategory = ( orderData ) => {
    return dispatch => {
        dispatch( fetchCategoryStart() );
        axios.get(constants.apiURL + '/api/categories')
            .then( response => {
                dispatch( fetchCategorySuccess( response.data.data ) );
            } )
            .catch( error => {
                dispatch( fetchCategoryFail( error ) );
            } );
    };
};

export const setUserInfo = ( data ) => {
    return {
        type: actionTypes.SET_USER_INFO,
        payload: data
    };
};