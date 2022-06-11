import * as api from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk, TUser, TForm} from '../../utils/types';

const LOGIN_FORM_SET_VALUE: 'LOGIN_FORM_SET_VALUE' = 'LOGIN_FORM_SET_VALUE';
const POST_LOGIN_FORM_SUBMIT: 'POST_LOGIN_FORM_SUBMIT' = 'POST_LOGIN_FORM_SUBMIT';
const POST_LOGIN_FORM_SUCCESS: 'POST_LOGIN_FORM_SUCCESS' = 'POST_LOGIN_FORM_SUCCESS';
const POST_LOGIN_FORM_FAILED: 'POST_LOGIN_FORM_FAILED' = 'POST_LOGIN_FORM_FAILED';

const USER_FORM_SET_VALUE: 'USER_FORM_SET_VALUE' = 'USER_FORM_SET_VALUE';
const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';
const RESET_USER_DATA_FAILED: 'RESET_USER_DATA_FAILED' = 'RESET_USER_DATA_FAILED';
const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export interface ILoginFormSetValueAction {
    readonly type: typeof LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IPostLoginFormSubmitAction {
    readonly type: typeof POST_LOGIN_FORM_SUBMIT
}

export interface IPostLoginFormSuccessAction {
    readonly type: typeof POST_LOGIN_FORM_SUCCESS;
    readonly user: TUser;
}

export interface IPostLoginFormFaildAction {
    readonly type: typeof POST_LOGIN_FORM_FAILED
}

export interface ICatchUserDataErrAction {
    readonly type: typeof GET_USER_DATA_FAILED
}

export interface ICatchUserUpdateErrAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    readonly user: TForm
}


export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface ISetUserFormValueAction {
    readonly type: typeof USER_FORM_SET_VALUE;
    field: string;
    value: string
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_DATA_REQUEST
} 

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly user: TForm
} 

export interface IResetUserDataFaildAction {
    readonly type: typeof RESET_USER_DATA_FAILED;
}

export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}

export type TLoginAction = 
| ILoginFormSetValueAction
| IPostLoginFormSubmitAction
| IPostLoginFormSuccessAction
| IPostLoginFormFaildAction
| ISetUserFormValueAction
| ICatchUserDataErrAction
| ICatchUserUpdateErrAction
| IGetUserSuccessAction
| IGetUserRequestAction
| IUpdateUserRequestAction
| IResetUserDataFaildAction
| IUserLogout
| IUpdateUserSuccessAction


const setLoginFormValue = (field: string, value: string) => ({
    type: LOGIN_FORM_SET_VALUE,
    field,
    value
});

const setUserFormValue = (field: string, value: string) => ({
    type: USER_FORM_SET_VALUE,
    field,
    value
});

function catchFetchError() {
    return {
        type: POST_LOGIN_FORM_FAILED
    };
}

const catchUserDataErr = () => {
    return {
        type: GET_USER_DATA_FAILED
    };
}

const catchUserUpdateErr = () => {
    return {
        type: UPDATE_USER_DATA_FAILED
    };
}

const login: AppThunk = (email: string, password: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: POST_LOGIN_FORM_SUBMIT
        });
        api.login(email, password) 
        .then((res) => {
            const user = res.user
            if (res) {
                dispatch({
                    type: POST_LOGIN_FORM_SUCCESS,
                    user
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

const getUserData: AppThunk = () => (dispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
    api.getUserData()
    .then((res) => {
        const user = res.user;
        if (res.user) {
            dispatch({
                type: GET_USER_DATA_SUCCESS,
                user
            })
        }
    })
    .catch((res) => {
        debugger
        if (res.message === 'jwt expired') {
            dispatch(updateToken());
            dispatch(getUserData());
        } else {
            dispatch(
                catchUserDataErr()
            );
            console.log(res);
        }
    });
}

const updateToken: AppThunk = () => {
 
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_DATA_REQUEST
        });
        api.updateToken() 
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken); 
            setCookie('accessToken', res.accessToken);
        })
    }
}

const updateUserData: AppThunk = (name: string, email: string, password: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER_DATA_REQUEST
        });
        api.updateUserData(name, email, password) 
        .then((res) => {
            const user = res.user;
            if (res.user) {                
                dispatch({
                    type: UPDATE_USER_DATA_SUCCESS,
                    user
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
    LOGIN_FORM_SET_VALUE,
    POST_LOGIN_FORM_SUBMIT,
    POST_LOGIN_FORM_SUCCESS,
    POST_LOGIN_FORM_FAILED,
    setLoginFormValue,
    login,
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