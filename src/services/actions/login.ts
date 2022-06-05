import * as api from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../../utils/types';

const LOGIN_FORM_SET_VALUE: 'LOGIN_FORM_SET_VALUE' = 'LOGIN_FORM_SET_VALUE';
const POST_LOGIN_FORM_SUBMIT: 'POST_LOGIN_FORM_SUBMIT' = 'POST_LOGIN_FORM_SUBMIT';
const POST_LOGIN_FORM_SUCCESS: 'POST_LOGIN_FORM_SUCCESS' = 'POST_LOGIN_FORM_SUCCESS';
const POST_LOGIN_FORM_FAILED: 'POST_LOGIN_FORM_FAILED' = 'POST_LOGIN_FORM_FAILED';
const LOGOUT: 'LOGOUT' = 'LOGOUT'

export interface ILoginFormSetValueAction {
    readonly type: typeof LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IPostLoginFormSubmitAction {
    readonly type: typeof POST_LOGIN_FORM_SUBMIT
}

export interface IPostLoginFormSuccessAction {
    readonly type: typeof POST_LOGIN_FORM_SUCCESS
}

export interface IPostLoginFormFaildAction {
    readonly type: typeof POST_LOGIN_FORM_FAILED
}

export interface ILogout {
    readonly type: typeof LOGOUT
}


export type TLoginAction = 
| ILoginFormSetValueAction
| IPostLoginFormSubmitAction
| IPostLoginFormSuccessAction
| IPostLoginFormFaildAction
| ILogout

const setLoginFormValue = (field: string, value: string) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_LOGIN_FORM_FAILED
    };
}

const login: AppThunk = (email: string, password: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_LOGIN_FORM_SUBMIT
        });
        api.login(email, password) 
        .then((res) => {
            if (res) {
                dispatch({
                    type: POST_LOGIN_FORM_SUCCESS
                }); 
                localStorage.setItem('refreshToken', res.refreshToken); 
                setCookie('accessToken', res.accessToken, {});
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