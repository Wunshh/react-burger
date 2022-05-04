import * as api from '../../utils/api';
import { setCookie } from '../../utils/cookie';

const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
const POST_LOGIN_FORM_SUBMIT = 'POST_LOGIN_FORM_SUBMIT';
const POST_LOGIN_FORM_SUCCESS = 'POST_LOGIN_FORM_SUCCESS';
const POST_LOGIN_FORM_FAILED = 'POST_LOGIN_FORM_FAILED';
const LOGOUT = 'LOGOUT'

const setLoginFormValue = (field, value) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_LOGIN_FORM_FAILED
    };
}

const login = (email, password) => {
    return function(dispatch) {
        dispatch({
            type: POST_LOGIN_FORM_SUBMIT
        });
        api.login(email, password) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_LOGIN_FORM_SUCCESS,
                    res
                }); 
                localStorage.setItem('refreshToken', res.refreshToken); 
                setCookie('accessToken', res.accessToken);
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

export {
    LOGIN_FORM_SET_VALUE,
    POST_LOGIN_FORM_SUBMIT,
    POST_LOGIN_FORM_SUCCESS,
    POST_LOGIN_FORM_FAILED,
    LOGOUT,
    setLoginFormValue,
    login
}