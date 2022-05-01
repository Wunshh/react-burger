import * as api from '../../utils/api';

const USER_FORM_SET_VALUE = 'USER_FORM_SET_VALUE'
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

const setUserFormValue = (field, value) => ({
    type: USER_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: GET_USER_DATA_FAILED
    };
}

function getUserData() {
    return function(dispatch) {
        dispatch({
            type: GET_USER_DATA_REQUEST
        });
        api.getUserData()
        .then((res) => {
            if (res) {
                dispatch({
                    type: GET_USER_DATA_SUCCESS,
                    res
                })
            } else {
                dispatch(
                    catchFetchError()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchFetchError()
            );
            console.log(err);
        });
    }
}

const updateUserData = () => {
    
}

export {
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED,
    setUserFormValue,
    getUserData,
    updateUserData
}