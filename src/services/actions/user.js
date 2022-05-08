import * as api from '../../utils/api';
import { setCookie } from '../../utils/cookie';

const USER_FORM_SET_VALUE = 'USER_FORM_SET_VALUE'
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';
const RESET_USER_DATA_FAILED = 'RESET_USER_DATA_FAILED';
const USER_LOGOUT = 'USER_LOGOUT';

const setUserFormValue = (field, value) => ({
    type: USER_FORM_SET_VALUE,
    field,
    value
});

function catchUserDataErr() {
    return {
        type: GET_USER_DATA_FAILED
    };
}

function catchUserUpdateErr() {
    return {
        type: UPDATE_USER_DATA_FAILED
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
            }
        })
        .catch((res) => {
            if (res.message === 'jwt expired') {
                dispatch(updateToken(getUserData()))
            } else {
                dispatch(
                    catchUserDataErr()
                );
                console.log(res);
            }
        });
    }
}

const updateToken = (afterRefresh) => {
    return function(dispatch) {
        dispatch({
            type: GET_USER_DATA_REQUEST
        });
        api.updateToken() 
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken); 
            setCookie('accessToken', res.accessToken);
            dispatch(afterRefresh);
        })
    }
}

const updateUserData = (name, email, password) => {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_DATA_REQUEST
        });
        api.updateUserData(name, email, password) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: UPDATE_USER_DATA_SUCCESS,
                    res
                })
            } else {
                dispatch(
                    catchUserUpdateErr()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchUserUpdateErr()
            );
            console.log(err);
        })
    }
}

export {
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    RESET_USER_DATA_FAILED,
    USER_LOGOUT,
    setUserFormValue,
    getUserData,
    updateUserData
}